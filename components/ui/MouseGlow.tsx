'use client'

import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -400, y: -400 })
  const cur = useRef({ x: -400, y: -400 })
  let raf: number

  useEffect(() => {
    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    function tick() {
      cur.current.x += (pos.current.x - cur.current.x) * 0.08
      cur.current.y += (pos.current.y - cur.current.y) * 0.08
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${cur.current.x - 200}px, ${cur.current.y - 200}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[9998] w-[400px] h-[400px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(34,197,94,0.055) 0%, transparent 70%)',
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
    />
  )
}
