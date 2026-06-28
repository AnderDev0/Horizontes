'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations, useLocale } from 'next-intl'
import { getWhatsAppDirectUrl } from '@/lib/whatsapp'

gsap.registerPlugin(ScrollTrigger)

// Ballpit uses vanilla three.js — no React 19 issues
const Ballpit = dynamic(() => import('@/components/ui/Ballpit'), {
  ssr: false,
  loading: () => null,
})

/* ─── Letter animation: per-word groups (no mid-word breaks) ─────────────────*/
function AnimatedHeadline({
  line,
  delay = 0,
  colorClass = 'text-[#0F172A]',
}: {
  line: string
  delay?: number
  colorClass?: string
}) {
  const words = line.split(' ')
  let charIndex = 0

  return (
    <div className="flex flex-wrap gap-x-[0.22em]" aria-label={line}>
      {words.map((word, wi) => {
        const wordDelay = delay + charIndex * 0.032
        charIndex += word.length
        return (
          <span key={wi} className="inline-flex overflow-hidden" style={{ verticalAlign: 'bottom' }}>
            {word.split('').map((char, ci) => (
              <motion.span
                key={ci}
                className={colorClass}
                style={{ display: 'inline-block' }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: wordDelay + ci * 0.032,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        )
      })}
    </div>
  )
}

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)

  /* scroll: fade content out */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-content', {
        y: '-12%',
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '65% top',
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
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-white"
    >
      {/* ── Ballpit fills the entire hero ── */}
      <div className="absolute inset-0 z-0">
        <Ballpit
          count={300}
          gravity={0.12}
          friction={0.9992}
          wallBounce={0.88}
          followCursor={true}
          colors={[0x22C55E, 0x0F172A, 0x15803D, 0x4ade80, 0x1E293B, 0x86efac]}
          ambientColor={0xffffff}
          ambientIntensity={1.2}
          lightIntensity={160}
          minSize={0.35}
          maxSize={0.9}
        />
      </div>

      {/* ── Gradient overlay: keeps left side legible ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Strong left fade for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/75 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="hero-content relative z-[2] w-full container-wide pt-32 pb-24">
        <div className="max-w-[700px]">

          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="w-7 h-px bg-leaf/50" />
            <span className="font-label text-[10px] text-leaf/80 uppercase tracking-[0.26em]">
              {t('badge')}
            </span>
            <span className="w-7 h-px bg-leaf/50" />
          </motion.div>

          {/* Headline — word-by-word, never breaks mid-word */}
          <h1 className="font-serif font-bold leading-[0.92] tracking-tight mb-8">
            {/* Line 1: "Experiencias" — dark indigo */}
            <div className="text-[clamp(4.5rem,10.5vw,8rem)] mb-1">
              <AnimatedHeadline
                line="Experiencias"
                delay={0.25}
                colorClass="text-[#0F172A]"
              />
            </div>
            {/* Line 2: "que transforman" — green gradient */}
            <div className="text-[clamp(3.2rem,7.5vw,6rem)]">
              <AnimatedHeadline
                line="que transforman"
                delay={0.7}
                colorClass="text-gradient-green"
              />
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-[#475569] text-base sm:text-lg leading-relaxed mb-10 max-w-[440px]"
          >
            {t('subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 items-start"
          >
            {/* Primary — dark indigo pill */}
            <motion.a
              href={getWhatsAppDirectUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0F172A] text-white font-sans font-semibold text-sm uppercase tracking-wider shadow-lg shadow-[#0F172A]/20 hover:bg-[#1E293B] hover:shadow-xl hover:shadow-[#0F172A]/30 transition-all duration-300"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('cta_quote')}
            </motion.a>

            {/* Secondary — ghost */}
            <Link
              href={`/${locale}/destinos`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#0F172A]/12 text-[#475569] font-sans text-sm tracking-wide hover:border-leaf/50 hover:text-leaf transition-all duration-300 group"
            >
              {t('cta_explore')}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          {/* Compliance strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-12"
          >
            {[
              { dot: true, label: 'RNT Certificado' },
              { label: '·' },
              { label: 'Miembro ANATO' },
              { label: '·' },
              { label: 'NTS-AV 001–004' },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5 font-label text-[9px] uppercase tracking-[0.2em] text-[#94A3B8]">
                {item.dot && <span className="w-1.5 h-1.5 rounded-full bg-leaf/60 animate-pulse" />}
                {item.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-leaf/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          style={{ originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="font-label text-[8px] text-[#94A3B8] uppercase tracking-[0.22em]">
          {t('scroll')}
        </span>
      </motion.div>
    </section>
  )
}
