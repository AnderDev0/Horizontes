'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface BackgroundGradientAnimationProps {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  interactive?: boolean
  // Blob colors in RGB format
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
}

export function BackgroundGradientAnimation({
  children,
  className,
  containerClassName,
  interactive = true,
  // Horizontes palette: indigo/green
  firstColor = '34, 197, 94',       // leaf green
  secondColor = '21, 128, 61',      // forest green
  thirdColor = '15, 23, 42',        // night (dark)
  fourthColor = '30, 58, 95',       // deep blue
  fifthColor = '51, 65, 85',        // slate
  pointerColor = '34, 197, 94',     // leaf green glow under cursor
  size = '60%',
  blendingValue = 'hard-light',
}: BackgroundGradientAnimationProps) {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const curX = useRef(0)
  const curY = useRef(0)
  const tgX = useRef(0)
  const tgY = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))

    const el = document.documentElement
    el.style.setProperty('--hga-first', firstColor)
    el.style.setProperty('--hga-second', secondColor)
    el.style.setProperty('--hga-third', thirdColor)
    el.style.setProperty('--hga-fourth', fourthColor)
    el.style.setProperty('--hga-fifth', fifthColor)
    el.style.setProperty('--hga-pointer', pointerColor)
    el.style.setProperty('--hga-size', size)
    el.style.setProperty('--hga-blend', blendingValue)
  }, [])

  useEffect(() => {
    if (!interactive) return

    function animate() {
      if (!interactiveRef.current) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }
      curX.current += (tgX.current - curX.current) / 22
      curY.current += (tgY.current - curY.current) / 22
      interactiveRef.current.style.transform = `translate(${Math.round(curX.current)}px, ${Math.round(curY.current)}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [interactive])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!interactiveRef.current) return
    const rect = interactiveRef.current.getBoundingClientRect()
    tgX.current = e.clientX - rect.left
    tgY.current = e.clientY - rect.top
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        'relative overflow-hidden bg-[#0F172A]',
        containerClassName
      )}
    >
      {/* SVG filter for gooey blob effect */}
      <svg className="hidden">
        <defs>
          <filter id="hga-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Content on top */}
      <div className={cn('relative z-10', className)}>{children}</div>

      {/* Gradient blobs */}
      <div
        className={cn(
          'absolute inset-0 w-full h-full',
          isSafari ? 'blur-2xl' : '[filter:url(#hga-blur)_blur(40px)]'
        )}
      >
        {/* Blob 1 — leaf green, center */}
        <div
          className="absolute w-[var(--hga-size)] h-[var(--hga-size)] top-[calc(50%-var(--hga-size)/2)] left-[calc(50%-var(--hga-size)/2)] [transform-origin:center_center] animate-hga-first opacity-60"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--hga-first),0.9) 0%, rgba(var(--hga-first),0) 50%) no-repeat`,
            mixBlendMode: blendingValue as any,
          }}
        />
        {/* Blob 2 — forest, orbits */}
        <div
          className="absolute w-[var(--hga-size)] h-[var(--hga-size)] top-[calc(50%-var(--hga-size)/2)] left-[calc(50%-var(--hga-size)/2)] [transform-origin:calc(50%-380px)] animate-hga-second opacity-70"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--hga-second),0.8) 0%, rgba(var(--hga-second),0) 50%) no-repeat`,
            mixBlendMode: blendingValue as any,
          }}
        />
        {/* Blob 3 — deep blue, slow orbit */}
        <div
          className="absolute w-[var(--hga-size)] h-[var(--hga-size)] top-[calc(50%-var(--hga-size)/2)] left-[calc(50%-var(--hga-size)/2)] [transform-origin:calc(50%+380px)] animate-hga-third opacity-50"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--hga-fourth),0.8) 0%, rgba(var(--hga-fourth),0) 50%) no-repeat`,
            mixBlendMode: blendingValue as any,
          }}
        />
        {/* Blob 4 — slate, horizontal drift */}
        <div
          className="absolute w-[var(--hga-size)] h-[var(--hga-size)] top-[calc(50%-var(--hga-size)/2)] left-[calc(50%-var(--hga-size)/2)] [transform-origin:calc(50%-180px)] animate-hga-fourth opacity-40"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--hga-fifth),0.7) 0%, rgba(var(--hga-fifth),0) 50%) no-repeat`,
            mixBlendMode: blendingValue as any,
          }}
        />
        {/* Blob 5 — accent */}
        <div
          className="absolute w-[var(--hga-size)] h-[var(--hga-size)] top-[calc(50%-var(--hga-size)/2)] left-[calc(50%-var(--hga-size)/2)] [transform-origin:calc(50%-700px)_calc(50%+700px)] animate-hga-fifth opacity-60"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--hga-second),0.7) 0%, rgba(var(--hga-second),0) 50%) no-repeat`,
            mixBlendMode: blendingValue as any,
          }}
        />

        {/* Interactive pointer blob */}
        {interactive && (
          <div
            ref={interactiveRef}
            className="absolute w-full h-full -top-1/2 -left-1/2 opacity-50"
            style={{
              background: `radial-gradient(circle at center, rgba(var(--hga-pointer),0.7) 0%, rgba(var(--hga-pointer),0) 50%) no-repeat`,
              mixBlendMode: blendingValue as any,
            }}
          />
        )}
      </div>
    </div>
  )
}
