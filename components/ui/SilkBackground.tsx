'use client'

import { useEffect, useRef } from 'react'

interface SilkBackgroundProps {
  className?: string
  /** Base color (light mode: white, dark: #0F172A) */
  baseColor?: string
  /** Primary blob color in rgba */
  color1?: string
  color2?: string
  color3?: string
  speed?: number
}

/**
 * Silk-like animated background using SVG feTurbulence + animated radial gradients.
 * No WebGL / three.js — pure CSS+SVG, compatible with React 19.
 */
export default function SilkBackground({
  className = '',
  baseColor = '#ffffff',
  color1 = 'rgba(34,197,94,0.18)',
  color2 = 'rgba(15,23,42,0.07)',
  color3 = 'rgba(21,128,61,0.12)',
  speed = 18,
}: SilkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let t = 0

    function resize() {
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }

    function drawBlob(
      cx: number, cy: number,
      rx: number, ry: number,
      color: string,
      angle = 0
    ) {
      ctx!.save()
      ctx!.translate(cx, cy)
      ctx!.rotate(angle)
      const grd = ctx!.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry))
      grd.addColorStop(0, color)
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx!.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry))
      ctx!.beginPath()
      ctx!.arc(0, 0, Math.max(rx, ry), 0, Math.PI * 2)
      ctx!.fillStyle = grd
      ctx!.fill()
      ctx!.restore()
    }

    function draw() {
      const w = canvas!.width
      const h = canvas!.height
      t += 0.003 * (speed / 18)

      ctx!.clearRect(0, 0, w, h)

      // Base
      ctx!.fillStyle = baseColor
      ctx!.fillRect(0, 0, w, h)

      // Blob 1 — green, top-right area, drifts
      drawBlob(
        w * (0.65 + Math.sin(t * 0.7) * 0.1),
        h * (0.25 + Math.cos(t * 0.5) * 0.12),
        w * 0.55,
        h * 0.55,
        color1,
        t * 0.08
      )

      // Blob 2 — indigo, bottom-left
      drawBlob(
        w * (0.2 + Math.cos(t * 0.6) * 0.08),
        h * (0.7 + Math.sin(t * 0.8) * 0.1),
        w * 0.45,
        h * 0.45,
        color2,
        -t * 0.05
      )

      // Blob 3 — forest green, center
      drawBlob(
        w * (0.5 + Math.sin(t * 0.4) * 0.12),
        h * (0.45 + Math.cos(t * 0.6) * 0.1),
        w * 0.35,
        h * 0.35,
        color3,
        t * 0.12
      )

      // Subtle noise grain overlay
      const imageData = ctx!.getImageData(0, 0, w, h)
      const data = imageData.data
      const noiseAmount = 8
      for (let i = 0; i < data.length; i += 4 * 12) { // every 12th pixel for perf
        const noise = (Math.random() - 0.5) * noiseAmount
        data[i] = Math.min(255, Math.max(0, data[i] + noise))
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise))
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise))
      }
      ctx!.putImageData(imageData, 0, 0)

      raf = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [baseColor, color1, color2, color3, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
