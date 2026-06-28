'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  children?: React.ReactNode
  className?: string
  intensity?: number
}

export function AuroraBackground({ children, className, intensity = 1 }: AuroraBackgroundProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Aurora blob 1 — green */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          right: '5%',
          width: '55%',
          height: '70%',
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: intensity,
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.92, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora blob 2 — deep teal/blue */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          left: '10%',
          width: '45%',
          height: '55%',
          background: 'radial-gradient(ellipse, rgba(30,58,95,0.7) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: intensity,
        }}
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 25, -20, 0],
          scale: [1, 0.88, 1.12, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Aurora blob 3 — subtle forest green accent */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          left: '30%',
          width: '30%',
          height: '40%',
          background: 'radial-gradient(ellipse, rgba(21,128,61,0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: intensity * 0.8,
        }}
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {children}
    </div>
  )
}
