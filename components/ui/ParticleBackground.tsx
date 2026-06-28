'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseX: number
  baseY: number
  alpha: number
  color: string
}

interface ParticleBackgroundProps {
  count?: number
  repelRadius?: number
  className?: string
}

export default function ParticleBackground({
  count = 90,
  repelRadius = 160,
  className = '',
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mouse = { x: -9999, y: -9999 }
    let raf: number
    let particles: Particle[] = []

    // Colors — green dots + dark blue particles
    const COLORS = [
      'rgba(34,197,94,',   // leaf green
      'rgba(34,197,94,',
      'rgba(21,128,61,',   // forest
      'rgba(30,58,95,',    // deep indigo
      'rgba(51,65,85,',    // slate
    ]

    function init() {
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
      particles = []

      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas!.width
        const y = Math.random() * canvas!.height
        const isGreen = Math.random() < 0.35
        const colorBase = isGreen
          ? `rgba(34,197,94,`
          : COLORS[Math.floor(Math.random() * COLORS.length)]

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.8 + 0.4,
          alpha: Math.random() * 0.5 + 0.1,
          color: colorBase,
        })
      }
    }

    function connect() {
      const maxDist = canvas!.width / 6
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.12
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(34,197,94,${opacity})`
            ctx!.lineWidth = 0.5
            ctx!.moveTo(particles[a].x, particles[a].y)
            ctx!.lineTo(particles[b].x, particles[b].y)
            ctx!.stroke()
          }
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      for (const p of particles) {
        // Mouse repulsion
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius
          const angle = Math.atan2(dy, dx)
          p.vx -= Math.cos(angle) * force * 1.2
          p.vy -= Math.sin(angle) * force * 1.2
        }

        // Return to base position gently
        p.vx += (p.baseX - p.x) * 0.002
        p.vy += (p.baseY - p.y) * 0.002

        // Drift
        p.x += p.vx
        p.y += p.vy

        // Friction
        p.vx *= 0.92
        p.vy *= 0.92

        // Wrap
        if (p.x < 0) p.x = canvas!.width
        if (p.x > canvas!.width) p.x = 0
        if (p.y < 0) p.y = canvas!.height
        if (p.y > canvas!.height) p.y = 0

        // Draw
        const glowing = dist < repelRadius * 0.6
        if (glowing) {
          ctx!.shadowBlur = 8
          ctx!.shadowColor = 'rgba(34,197,94,0.6)'
        }
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `${p.color}${glowing ? p.alpha + 0.3 : p.alpha})`
        ctx!.fill()
        ctx!.shadowBlur = 0
      }

      connect()
      raf = requestAnimationFrame(animate)
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    const ro = new ResizeObserver(() => init())
    ro.observe(canvas)

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    init()
    animate()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [count, repelRadius])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'auto' }}
    />
  )
}
