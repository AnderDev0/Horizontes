'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ── Lat/lon → SVG (x, y) for a simple equirectangular projection ── */
function toXY(lat: number, lon: number, cx: number, cy: number, r: number) {
  const x = cx + (lon / 180) * r
  const y = cy - (lat / 90) * (r / 2)
  return { x, y }
}

/* ── SVG arc path between two points (cubic bezier) ── */
function arcPath(
  x1: number, y1: number,
  x2: number, y2: number,
  lift = 80
): string {
  const mx = (x1 + x2) / 2
  const my = Math.min(y1, y2) - lift
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`
}

/* ── Animated dot that travels along a path ── */
function TravelingDot({ pathId, duration = 4 }: { pathId: string; duration?: number }) {
  return (
    <circle r="4" fill="#DCFCE7">
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.6 1"
      >
        <mptath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  )
}

/* ── Pulsing location pin ── */
function LocationPin({
  x, y, color = '#22C55E', label,
}: {
  x: number; y: number; color?: string; label?: string
}) {
  return (
    <g>
      <motion.circle
        cx={x} cy={y} r={5}
        fill={color}
        animate={{ r: [4, 7, 4], opacity: [1, 0.4, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx={x} cy={y} r={3} fill={color} />
      {label && (
        <text
          x={x + 10} y={y + 4}
          fill="rgba(255,255,255,0.7)"
          fontSize="9"
          fontFamily="Space Grotesk, monospace"
        >
          {label}
        </text>
      )}
    </g>
  )
}

export default function GlobeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* ── Stars via canvas (lightweight) ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const stars: { x: number; y: number; r: number; o: number }[] = Array.from(
      { length: 180 },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        o: Math.random() * 0.7 + 0.1,
      })
    )

    let frame = 0
    let raf: number
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      frame++
      stars.forEach((s, i) => {
        const flicker = 0.5 + 0.5 * Math.sin(frame * 0.02 + i)
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255,255,255,${s.o * flicker})`
        ctx!.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  /* ── SVG globe geometry ── */
  const CX = 300
  const CY = 240
  const R = 190

  // Bogotá: 4.711°N, -74.072°W
  const bogota = toXY(4.711, -74.072, CX, CY, R)
  // Rome: 41.902°N, 12.496°E
  const rome = toXY(41.902, 12.496, CX, CY, R)

  const arc = arcPath(bogota.x, bogota.y, rome.x, rome.y, 80)
  const arcId = 'flight-arc'

  /* ── Latitude / longitude grid lines ── */
  const latLines = [-60, -30, 0, 30, 60]
  const lonLines = [-120, -60, 0, 60, 120]

  return (
    <div className="relative w-full h-full min-h-[500px]">
      {/* Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Globe SVG */}
      <motion.svg
        viewBox="0 0 600 480"
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <defs>
          <radialGradient id="globeGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="60%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </radialGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </radialGradient>
          <clipPath id="globeClip">
            <ellipse cx={CX} cy={CY} rx={R} ry={R * 0.96} />
          </clipPath>
          <path id={arcId} d={arc} />
        </defs>

        {/* Outer atmospheric glow */}
        <ellipse cx={CX} cy={CY} rx={R + 28} ry={R * 0.96 + 28} fill="url(#glowGrad)" />

        {/* Globe body */}
        <ellipse cx={CX} cy={CY} rx={R} ry={R * 0.96} fill="url(#globeGrad)" />

        {/* Grid — clipped to globe */}
        <g clipPath="url(#globeClip)" stroke="#334155" strokeWidth="0.6" fill="none" opacity="0.5">
          {/* Latitude lines */}
          {latLines.map((lat) => {
            const y = CY - (lat / 90) * (R * 0.96)
            const halfW = Math.sqrt(Math.max(0, R * R - (y - CY) * (y - CY)))
            return (
              <ellipse
                key={`lat-${lat}`}
                cx={CX} cy={y}
                rx={halfW} ry={halfW * 0.18}
              />
            )
          })}
          {/* Longitude arcs */}
          {lonLines.map((lon) => {
            const x = CX + (lon / 180) * R
            return (
              <ellipse
                key={`lon-${lon}`}
                cx={x} cy={CY}
                rx={Math.abs(R * Math.cos((lon * Math.PI) / 180)) * 0.12}
                ry={R * 0.96}
              />
            )
          })}
          {/* Equator (thicker) */}
          <ellipse cx={CX} cy={CY} rx={R} ry={R * 0.18} stroke="#334155" strokeWidth="1" />
        </g>

        {/* Globe border */}
        <ellipse
          cx={CX} cy={CY} rx={R} ry={R * 0.96}
          fill="none" stroke="#22C55E" strokeWidth="0.8" opacity="0.25"
        />

        {/* Highlight */}
        <ellipse
          cx={CX - 60} cy={CY - 55}
          rx={55} ry={40}
          fill="white" opacity="0.04"
        />

        {/* Flight arc */}
        <motion.path
          d={arc}
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.5"
          strokeDasharray="5 3"
          opacity="0.7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
        />

        {/* Traveling dot along arc */}
        <circle r="4.5" fill="#DCFCE7" opacity="0.95">
          <animateMotion dur="4s" repeatCount="indefinite">
            <mpath href={`#${arcId}`} />
          </animateMotion>
        </circle>

        {/* Location pins */}
        <LocationPin x={bogota.x} y={bogota.y} color="#22C55E" label="Bogotá" />
        <LocationPin x={rome.x} y={rome.y} color="#F59E0B" label="Roma" />
      </motion.svg>

      {/* Rotating ring decoration */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="rounded-full border border-leaf/10"
          style={{ width: '75%', height: '75%' }}
        />
      </motion.div>

      {/* Stats overlay */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 pointer-events-none">
        {[
          { flag: '🇨🇴', name: 'Bogotá', coord: '4.7°N, 74.1°W' },
          { flag: '🇮🇹', name: 'Roma', coord: '41.9°N, 12.5°E' },
        ].map((loc) => (
          <motion.div
            key={loc.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-label"
          >
            <span>{loc.flag}</span>
            <span className="text-white">{loc.name}</span>
            <span className="text-mist/50">{loc.coord}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
