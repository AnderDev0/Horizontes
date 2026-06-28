'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InfiniteMarqueeProps {
  items: React.ReactNode[]
  speed?: number
  className?: string
  direction?: 'left' | 'right'
  gap?: number
}

export default function InfiniteMarquee({
  items,
  speed = 30,
  className,
  direction = 'left',
  gap = 48,
}: InfiniteMarqueeProps) {
  const doubled = [...items, ...items]
  const animationDuration = items.length * (speed / 10)

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex items-center"
        style={{ gap }}
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
