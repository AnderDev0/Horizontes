'use client'

import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on pointer devices
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Start way off-screen — no snapping on first render
    const mouse  = { x: -500, y: -500 }
    const dot    = { x: -500, y: -500 }
    const ring   = { x: -500, y: -500 }
    let hovering = false
    let visible  = false
    let raf: number

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function applyPositions() {
      if (!dotRef.current || !ringRef.current || !wrapRef.current) return
      const ringSize = hovering ? 44 : 28
      dotRef.current.style.transform  = `translate(${dot.x - 4}px,${dot.y - 4}px)`
      ringRef.current.style.width     = `${ringSize}px`
      ringRef.current.style.height    = `${ringSize}px`
      ringRef.current.style.transform = `translate(${ring.x - ringSize / 2}px,${ring.y - ringSize / 2}px)`
      wrapRef.current.style.opacity   = visible ? '1' : '0'
    }

    function tick() {
      dot.x  = lerp(dot.x, mouse.x, 0.28)
      dot.y  = lerp(dot.y, mouse.y, 0.28)
      ring.x = lerp(ring.x, mouse.x, 0.1)
      ring.y = lerp(ring.y, mouse.y, 0.1)
      applyPositions()
      raf = requestAnimationFrame(tick)
    }

    function onMove(e: MouseEvent) {
      if (!visible) {
        // Snap instantly on first move — no lerp lag
        dot.x = ring.x = mouse.x = e.clientX
        dot.y = ring.y = mouse.y = e.clientY
        visible = true
      } else {
        mouse.x = e.clientX
        mouse.y = e.clientY
      }
    }

    function onOut() { visible = false }

    function attachHoverListeners() {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => { hovering = true })
        el.addEventListener('mouseleave', () => { hovering = false })
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onOut)

    attachHoverListeners()

    // Re-attach when DOM changes
    const mo = new MutationObserver(attachHoverListeners)
    mo.observe(document.body, { childList: true, subtree: true })

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onOut)
      mo.disconnect()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: 0, transition: 'opacity 0.3s' }}
    >
      {/* Dot — fast */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#0F172A]"
        style={{ mixBlendMode: 'exclusion' }}
      />
      {/* Ring — slow, expands on hover */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border border-[#0F172A]/40 transition-[width,height] duration-200"
        style={{ mixBlendMode: 'exclusion' }}
      />
    </div>
  )
}
