'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  { num: '01', icon: '❤', colorClass: 'text-rose-400', key: 'service' as const },
  { num: '02', icon: '⭐', colorClass: 'text-gold', key: 'quality' as const },
  { num: '03', icon: '🌿', colorClass: 'text-leaf', key: 'sustainability' as const },
  { num: '04', icon: '💡', colorClass: 'text-blue-400', key: 'innovation' as const },
]

export default function WhyUsSection() {
  const t = useTranslations('why')
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  /* ── GSAP horizontal scroll pin ── */
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const cards = track.querySelectorAll('.value-card')

    const ctx = gsap.context(() => {
      /* Animate header text on enter */
      gsap.from('.why-headline span', {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      })

      /* Stagger cards */
      gsap.from(cards, {
        x: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: track,
          start: 'top 80%',
        },
      })

      /* Subtle parallax on NTS row */
      gsap.to('.nts-row', {
        x: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-dusk/40 overflow-hidden"
    >
      {/* Top + bottom borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* BG blob */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-leaf/5 blur-[100px] pointer-events-none" />

      <div className="container-wide section-py">

        {/* Header */}
        <div className="mb-16" ref={headerRef}>
          <span className="flex items-center gap-2 font-label text-leaf/70 text-[10px] uppercase tracking-[0.2em] mb-4">
            <span className="w-4 h-px bg-leaf/50" />
            Nuestros valores
          </span>
          <h2 className="why-headline font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight overflow-hidden">
            {t('title').split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-3">
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Value cards grid */}
        <div ref={trackRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {VALUES.map(({ num, icon, colorClass, key }) => (
            <div
              key={key}
              className="value-card group relative p-7 rounded-2xl border border-white/6 bg-night/60 overflow-hidden cursor-default hover:border-white/14 transition-all duration-500"
            >
              {/* Number — large decorative */}
              <span
                className="absolute -top-2 -right-1 font-label font-bold text-7xl leading-none pointer-events-none select-none"
                style={{ color: 'rgba(255,255,255,0.03)' }}
              >
                {num}
              </span>

              <div className={`text-2xl mb-5 ${colorClass}`}>{icon}</div>

              <h3 className="font-serif font-semibold text-lg text-white mb-3 leading-snug">
                {t(`values.${key}.title`)}
              </h3>
              <p className="font-sans text-mist/60 text-sm leading-relaxed">
                {t(`values.${key}.desc`)}
              </p>

              {/* Hover line accent */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: 'linear-gradient(90deg, #22C55E, transparent)' }}
              />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '2', label: t('stats.destinations'), suffix: '' },
            { value: '2', label: t('stats.packages'), suffix: '+' },
            { value: '∞', label: t('stats.anato'), suffix: '' },
            { value: '4', label: t('stats.compliance'), suffix: '' },
          ].map(({ value, label, suffix }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center py-6 px-4 rounded-2xl border border-leaf/15 bg-leaf/4 text-center"
            >
              <span className="font-label font-bold text-3xl text-leaf mb-1.5">
                {value}{suffix}
              </span>
              <span className="font-sans text-mist/50 text-xs leading-tight">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* NTS compliance tape — scrolling */}
        <div className="mt-16 overflow-hidden">
          <div className="nts-row flex items-center gap-10 opacity-30 whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="font-label text-xs uppercase tracking-[0.25em] text-mist shrink-0">
                NTS-AV 001 · NTS-AV 002 · NTS-AV 003 · NTS-AV 004 · ANATO · RNT ·
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
