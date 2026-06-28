'use client'

import { motion, type AnimationProps } from 'framer-motion'
import { cn } from '@/lib/utils'

const shineAnimation: AnimationProps = {
  initial: { '--x': '100%', scale: 0.95 } as never,
  animate: { '--x': '-100%', scale: 1 } as never,
  whileTap: { scale: 0.96 },
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 1.2,
    type: 'spring',
    stiffness: 18,
    damping: 15,
    mass: 2,
    scale: { type: 'spring', stiffness: 220, damping: 6, mass: 0.5 },
  },
}

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
}

export function ShinyButton({ children, className, as = 'button', href, target, rel, ...props }: ShinyButtonProps) {
  const Comp = motion[as === 'a' ? 'a' : 'button'] as any

  return (
    <Comp
      {...shineAnimation}
      href={href}
      target={target}
      rel={rel}
      {...props}
      className={cn(
        'relative rounded-full px-8 py-4 font-semibold font-sans text-sm',
        'bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.18)_0%,transparent_60%)]',
        'backdrop-blur-sm',
        'transition-shadow duration-300 ease-in-out',
        'hover:shadow-[0_0_24px_rgba(34,197,94,0.22)]',
        className
      )}
    >
      <span
        className="relative block text-white uppercase tracking-widest text-xs font-label"
        style={{
          maskImage:
            'linear-gradient(-75deg, #22C55E calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #22C55E calc(var(--x) + 100%))',
        } as React.CSSProperties}
      >
        {children}
      </span>
      <span
        style={{
          mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))',
          maskComposite: 'exclude',
        } as React.CSSProperties}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(34,197,94,0.08)_calc(var(--x)+20%),rgba(34,197,94,0.45)_calc(var(--x)+25%),rgba(34,197,94,0.08)_calc(var(--x)+100%))] p-px"
      />
    </Comp>
  )
}
