'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  trigger?: boolean
}

export default function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  trigger = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !trigger) return
    const chars = containerRef.current.querySelectorAll('.char')

    gsap.fromTo(
      chars,
      { y: '110%', opacity: 0, rotateX: -90 },
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger,
        delay,
      }
    )
  }, [trigger, delay, stagger])

  const words = text.split(' ')

  return (
    <div ref={containerRef} className={cn('overflow-hidden', className)} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em]">
          {word.split('').map((char, ci) => (
            <span
              key={ci}
              className="char inline-block"
              style={{ display: 'inline-block', overflow: 'hidden' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}
