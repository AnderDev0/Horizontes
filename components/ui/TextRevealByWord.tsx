'use client'

import { useRef } from 'react'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealByWordProps {
  text: string
  className?: string
}

function Word({ children, progress, range }: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [12, 0])

  return (
    <span className="relative inline-block mx-1">
      <span className="absolute opacity-20 select-none">{children}</span>
      <motion.span style={{ opacity, y }} className="text-white">
        {children}
      </motion.span>
    </span>
  )
}

export function TextRevealByWord({ text, className }: TextRevealByWordProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const words = text.split(' ')

  return (
    <div ref={ref} className={cn('relative z-0 h-[180vh]', className)}>
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center px-6">
        <p className="flex flex-wrap font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white/20 leading-snug">
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </p>
      </div>
    </div>
  )
}
