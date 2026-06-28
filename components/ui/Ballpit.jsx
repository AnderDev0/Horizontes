// Ballpit — React Bits (reactbits.dev)
// Uses vanilla three.js only — compatible with React 19
'use client';

import { useEffect, useRef } from 'react';
import {
  AmbientLight, Color, InstancedMesh, MathUtils,
  MeshPhysicalMaterial, Object3D, PerspectiveCamera,
  Plane, PMREMGenerator, PointLight, Raycaster,
  Scene, ShaderChunk, SphereGeometry, SRGBColorSpace,
  Vector2, Vector3, WebGLRenderer, ACESFilmicToneMapping,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

// ─── Pointer tracker ──────────────────────────────────────────────────────────
const _registry = new Map();
const _cursor = new Vector2(-9999, -9999);
let _bound = false;

function _pointerMove(e) {
  _cursor.set(e.clientX, e.clientY);
  _registry.forEach((s, el) => {
    const r = el.getBoundingClientRect();
    _syncState(s, r);
    const inside = _cursor.x >= r.left && _cursor.x <= r.right && _cursor.y >= r.top && _cursor.y <= r.bottom;
    if (inside) {
      if (!s.hover) { s.hover = true; s.onEnter(s); }
      s.onMove(s);
    } else if (s.hover) {
      s.hover = false; s.onLeave(s);
    }
  });
}
function _pointerLeave() {
  _registry.forEach(s => { if (s.hover) { s.hover = false; s.onLeave(s); } });
}
function _syncState(s, r) {
  s.pos.set(_cursor.x - r.left, _cursor.y - r.top);
  s.nPos.set((_cursor.x - r.left) / r.width * 2 - 1, -(_cursor.y - r.top) / r.height * 2 + 1);
}

function trackPointer(el, opts) {
  const state = { pos: new Vector2(), nPos: new Vector2(), hover: false, onEnter(){}, onMove(){}, onLeave(){}, ...opts };
  _registry.set(el, state);
  if (!_bound) {
    document.body.addEventListener('pointermove', _pointerMove, { passive: true });
    document.body.addEventListener('pointerleave', _pointerLeave);
    _bound = true;
  }
  return {
    get nPos() { return state.nPos; },
    dispose() {
      _registry.delete(el);
      if (_registry.size === 0) {
        document.body.removeEventListener('pointermove', _pointerMove);
        document.body.removeEventListener('pointerleave', _pointerLeave);
        _bound = false;
      }
    }
  };
}

// ─── Color gradient ───────────────────────────────────────────────────────────
function colorAt(colors, ratio, out = new Color()) {
  const scaled = Math.max(0, Math.min(1, ratio)) * (colors.length - 1);
  const i = Math.floor(scaled);
  if (i >= colors.length - 1) return out.copy(colors[colors.length - 1]);
  const t = scaled - i;
  const a = colors[i], b = colors[i + 1];
  out.r = a.r + t * (b.r - a.r);
  out.g = a.g + t * (b.g - a.g);
  out.b = a.b + t * (b.b - a.b);
  return out;
}

// ─── Subsurface scattering material ──────────────────────────────────────────
class SSMaterial extends MeshPhysicalMaterial {
  constructor(params) {
    super(params);
    this.defines.USE_UV = '';
    const u = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient:    { value: 0 },
      thicknessAttenuation:{ value: 0.1 },
      thicknessPower:      { value: 2 },
      thicknessScale:      { value: 10 },
    };
    this.onBeforeCompile = (s) => {
      Object.assign(s.uniforms, u);
      s.fragmentShader = Object.entries(u).map(([k]) => `uniform float ${k};`).join('\n') + '\n' + s.fragmentShader;
      s.fragmentShader = s.fragmentShader.replace('void main() {', `
void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
  vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
  float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
  #ifdef USE_COLOR
    vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
  #else
    vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
  #endif
  reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
}
void main() {`);
      s.fragmentShader = s.fragmentShader.replace(
        '#include <lights_fragment_begin>',
        ShaderChunk.lights_fragment_begin.replaceAll(
          'RE_Direct( directLight',
          'RE_Direct( directLight'
        ).replaceAll(
          'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
          'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);'
        )
      );
    };
  }
}

// ─── Physics ──────────────────────────────────────────────────────────────────
const rnd = MathUtils.randFloat;
const rndSpread = MathUtils.randFloatSpread;

class Physics {
  constructor(cfg) {
    this.cfg = cfg;
    this.pos = new Float32Array(3 * cfg.count);
    this.vel = new Float32Array(3 * cfg.count);
    this.sizes = new Float32Array(cfg.count);
    this.center = new Vector3();
    this._init();
  }
  _init() {
    const { cfg, pos, sizes } = this;
    sizes[0] = cfg.size0;
    for (let i = 1; i < cfg.count; i++) {
      const b = i * 3;
      pos[b]   = rndSpread(2 * cfg.maxX);
      pos[b+1] = rndSpread(2 * cfg.maxY);
      pos[b+2] = rndSpread(2 * cfg.maxZ);
      sizes[i] = rnd(cfg.minSize, cfg.maxSize);
    }
  }
  update(delta) {
    const { cfg, pos, vel, sizes, center } = this;
    const p  = new Vector3(), v  = new Vector3();
    const p2 = new Vector3(), v2 = new Vector3();
    const diff = new Vector3(), imp = new Vector3();
    let start = 0;

    if (cfg.controlSphere0) {
      start = 1;
      p.fromArray(pos, 0).lerp(center, 0.1).toArray(pos, 0);
      vel[0] = vel[1] = vel[2] = 0;
    }

    for (let i = start; i < cfg.count; i++) {
      const b = i * 3;
      p.fromArray(pos, b); v.fromArray(vel, b);
      v.y -= delta * cfg.gravity * sizes[i];
      v.multiplyScalar(cfg.friction).clampLength(0, cfg.maxVelocity);
      p.add(v).toArray(pos, b); v.toArray(vel, b);
    }

    const c0 = new Vector3().fromArray(pos, 0);
    for (let i = start; i < cfg.count; i++) {
      const b = i * 3;
      p.fromArray(pos, b); v.fromArray(vel, b);
      const ri = sizes[i];

      for (let j = i + 1; j < cfg.count; j++) {
        const bj = j * 3;
        p2.fromArray(pos, bj); v2.fromArray(vel, bj);
        diff.copy(p2).sub(p);
        const dist = diff.length(), sum = ri + sizes[j];
        if (dist < sum) {
          const ov = sum - dist;
          imp.copy(diff).normalize().multiplyScalar(ov * 0.5);
          p.sub(imp); v.sub(imp.clone().multiplyScalar(Math.max(v.length(), 1)));
          p.toArray(pos, b); v.toArray(vel, b);
          p2.add(imp); v2.add(imp.clone().multiplyScalar(Math.max(v2.length(), 1)));
          p2.toArray(pos, bj); v2.toArray(vel, bj);
        }
      }

      if (cfg.controlSphere0) {
        diff.copy(c0).sub(p);
        const dist = diff.length(), sum0 = ri + sizes[0];
        if (dist < sum0) {
          imp.copy(diff.normalize()).multiplyScalar(sum0 - dist);
          p.sub(imp); v.sub(imp.clone().multiplyScalar(Math.max(v.length(), 2)));
        }
      }

      const { maxX, maxY, maxZ, maxSize, wallBounce, gravity } = cfg;
      if (Math.abs(p.x) + ri > maxX) { p.x = Math.sign(p.x) * (maxX - ri); v.x = -v.x * wallBounce; }
      if (gravity === 0) {
        if (Math.abs(p.y) + ri > maxY) { p.y = Math.sign(p.y) * (maxY - ri); v.y = -v.y * wallBounce; }
      } else if (p.y - ri < -maxY) { p.y = -maxY + ri; v.y = -v.y * wallBounce; }
      const mb = Math.max(maxZ, maxSize);
      if (Math.abs(p.z) + ri > mb) { p.z = Math.sign(p.z) * (maxZ - ri); v.z = -v.z * wallBounce; }

      p.toArray(pos, b); v.toArray(vel, b);
    }
  }
}

// ─── Default props ────────────────────────────────────────────────────────────
const DEFAULTS = {
  count: 200,
  colors: [0x22C55E, 0x0F172A, 0x15803D],
  ambientColor: 0xffffff,
  ambientIntensity: 1.2,
  lightIntensity: 180,
  materialParams: { metalness: 0.4, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 },
  minSize: 0.5, maxSize: 1, size0: 1,
  gravity: 0.5, friction: 0.9975, wallBounce: 0.95,
  maxVelocity: 0.15, maxX: 5, maxY: 5, maxZ: 2,
  controlSphere0: false, followCursor: true,
};

// ─── React component ──────────────────────────────────────────────────────────
export default function BallpitCanvas({
  className = '',
  followCursor = true,
  count = 200,
  gravity = 0.5,
  friction = 0.9975,
  wallBounce = 0.95,
  colors = [0x22C55E, 0x0F172A, 0x15803D],
  ambientColor = 0xffffff,
  ambientIntensity = 1.2,
  lightIntensity = 180,
  minSize = 0.5,
  maxSize = 1,
  size0 = 1,
  maxVelocity = 0.15,
  maxX = 5,
  maxY = 5,
  maxZ = 2,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const cfg = {
      ...DEFAULTS,
      followCursor, count, gravity, friction, wallBounce,
      colors, ambientColor, ambientIntensity, lightIntensity,
      minSize, maxSize, size0, maxVelocity, maxX, maxY, maxZ,
    };

    let cleanup = () => {};
    let initRaf;

    function initBallpit() {
      // Check WebGL support on a SEPARATE test canvas (not the main one!)
      // Using the main canvas would lock in context attributes before three.js sets its own.
      try {
        const testCanvas = document.createElement('canvas');
        const testCtx = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!testCtx) {
          console.warn('Ballpit: WebGL not supported.');
          return;
        }
      } catch (_) { return; }

      let renderer;
      try {
        renderer = new WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        });
      } catch (err) {
        console.warn('Ballpit: WebGLRenderer init failed.', err);
        return;
      }

      renderer.outputColorSpace = SRGBColorSpace;
      renderer.toneMapping = ACESFilmicToneMapping;

    // ── Scene / Camera ──
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, 1, 0.01, 1000);
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);

    // ── Material ──
    const pmrem = new PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    const mat = new SSMaterial({ envMap: envTex, ...cfg.materialParams });
    // envMapRotation exists in three.js >= 0.163 — guard for older versions
    if (mat.envMapRotation) mat.envMapRotation.x = -Math.PI / 2;

    // ── Instanced mesh ──
    const geo = new SphereGeometry();
    const mesh = new InstancedMesh(geo, mat, cfg.count);
    const colObjs = cfg.colors.map(c => new Color(c));
    for (let i = 0; i < cfg.count; i++) {
      mesh.setColorAt(i, colorAt(colObjs, i / cfg.count));
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // ── Lights ──
    const ambient = new AmbientLight(cfg.ambientColor, cfg.ambientIntensity);
    const light = new PointLight(colObjs[0] ?? 0xffffff, cfg.lightIntensity);
    scene.add(mesh, ambient, light);

    // ── Physics ──
    const phys = new Physics(cfg);
    const dummy = new Object3D();

    // ── Resize ──
    function resize() {
      const p = canvas.parentElement;
      const w = p ? p.clientWidth : window.innerWidth;
      const h = p ? p.clientHeight : window.innerHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      const fovRad = (camera.fov * Math.PI) / 180;
      const wH = 2 * Math.tan(fovRad / 2) * camera.position.length();
      cfg.maxX = (wH * camera.aspect) / 2;
      cfg.maxY = wH / 2;
    }

    // ── Pointer (cursor ball) ──
    const raycaster = new Raycaster();
    const hitPlane = new Plane(new Vector3(0, 0, 1), 0);
    const hitPt = new Vector3();
    const ptr = trackPointer(canvas, {
      onMove(s) {
        raycaster.setFromCamera(s.nPos, camera);
        camera.getWorldDirection(hitPlane.normal);
        raycaster.ray.intersectPlane(hitPlane, hitPt);
        phys.center.copy(hitPt);
        cfg.controlSphere0 = true;
      },
      onLeave() { cfg.controlSphere0 = false; },
    });

    // ── Render loop ──
    let rafId;
    let prev = performance.now();

    function tick() {
      rafId = requestAnimationFrame(tick);
      const now = performance.now();
      const delta = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      phys.update(delta);

      for (let i = 0; i < cfg.count; i++) {
        dummy.position.fromArray(phys.pos, i * 3);
        dummy.scale.setScalar(i === 0 && !cfg.followCursor ? 0 : phys.sizes[i]);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        if (i === 0) light.position.copy(dummy.position);
      }
      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    }

      const ro = new ResizeObserver(resize);
      ro.observe(canvas.parentElement || canvas);
      resize();
      tick();

      // Return cleanup for this scope
      cleanup = () => {
        cancelAnimationFrame(rafId);
        ptr.dispose();
        ro.disconnect();
        geo.dispose();
        mat.dispose();
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    } // end initBallpit

    // Defer initialization by one animation frame so canvas is fully painted
    initRaf = requestAnimationFrame(initBallpit);

    return () => {
      cancelAnimationFrame(initRaf);
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
