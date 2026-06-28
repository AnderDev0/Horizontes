'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, Clock, MapPin } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { destinations } from '@/content/destinations'
import { getWhatsAppQuoteUrl } from '@/lib/whatsapp'

const ACCENT: Record<string, string> = {
  'cano-cristales': '#22C55E',
  'roma-italia': '#F59E0B',
}
const SPOTLIGHT: Record<string, string> = {
  'cano-cristales': 'rgba(34,197,94,0.16)',
  'roma-italia': 'rgba(245,158,11,0.16)',
}

/* ── Spring tilt ── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 350, damping: 35 })
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 350, damping: 35 })

  function move(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  function leave() { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Single card ── */
function DestCard({ dest, locale, index, inView }: {
  dest: typeof destinations[0]
  locale: string
  index: number
  inView: boolean
}) {
  const t = useTranslations('destinations')
  const name = locale === 'es' ? dest.nameEs : dest.nameEn
  const subtitle = locale === 'es' ? dest.subtitleEs : dest.subtitleEn
  const duration = locale === 'es' ? dest.duration : dest.durationEn
  const includes = (locale === 'es' ? dest.includes : dest.includesEn).slice(0, 4)

  const accent = ACCENT[dest.slug] ?? '#22C55E'
  const spotlight = SPOTLIGHT[dest.slug] ?? 'rgba(34,197,94,0.16)'

  const waUrl = getWhatsAppQuoteUrl(
    { name: '', phone: '', destination: name, travelers: '2', date: '', budget: '', experiences: [] },
    locale
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard className="h-full">
        <SpotlightCard spotlightColor={spotlight} className="h-full flex flex-col">

          {/* Image zone — gradient with pattern */}
          <div
            className="relative h-52 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accent}18 0%, #0F172A 100%)`,
            }}
          >
            {/* Dot-grid pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(${accent}60 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Country + flag */}
            <div className="absolute top-5 left-6 flex items-center gap-2.5">
              <span className="text-3xl">{dest.flag}</span>
              <div>
                <p className="font-label text-[9px] uppercase tracking-[0.2em]" style={{ color: `${accent}99` }}>
                  {dest.country}
                </p>
                <p className="font-sans text-white/50 text-xs">{dest.location}</p>
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute top-5 right-6">
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label text-[10px] uppercase tracking-wider border"
                style={{ color: accent, borderColor: `${accent}40`, background: `${accent}14` }}
              >
                <Clock size={10} />
                {duration}
              </span>
            </div>

            {/* Large flag watermark */}
            <div
              className="absolute bottom-0 right-6 text-9xl opacity-[0.07] select-none pointer-events-none leading-none"
            >
              {dest.flag}
            </div>

            {/* Bottom swoosh */}
            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 400 30"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d="M0 30 Q200 0 400 30 L400 30 L0 30 Z" fill="#0F172A" />
            </svg>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 gap-5 p-7">

            {/* Title */}
            <div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white leading-tight">
                {name}
              </h3>
              <p
                className="font-sans text-sm italic mt-1"
                style={{ color: `${accent}cc` }}
              >
                {subtitle}
              </p>
            </div>

            {/* Includes checklist */}
            <ul className="space-y-2.5">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 font-sans text-xs text-mist/60 leading-snug">
                  <Check size={11} style={{ color: accent }} className="mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Gastronomy chips */}
            <div className="flex flex-wrap gap-1.5">
              {dest.gastronomy.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-1 rounded-full font-label text-[10px] text-mist/50 border border-white/6"
                >
                  🍽 {g}
                </span>
              ))}
            </div>

            {/* CTA row — pushed to bottom */}
            <div className="mt-auto pt-3 flex gap-3">
              <Link
                href={`/${locale}/destinos/${dest.slug}`}
                className="group/btn flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-sans font-semibold text-sm text-night transition-all duration-300 hover:brightness-110"
                style={{ background: accent }}
              >
                {t('see_more')}
                <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full font-sans text-sm font-medium transition-all duration-300"
                style={{ border: `1px solid ${accent}35`, color: accent }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${accent}14` }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                WA
              </a>
            </div>
          </div>

          {/* Bottom glow line */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px blur-sm"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }}
          />
        </SpotlightCard>
      </TiltCard>
    </motion.div>
  )
}

export default function DestinationsGrid() {
  const t = useTranslations('destinations')
  const locale = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative bg-night overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div ref={ref} className="container-wide section-py">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-2 font-label text-leaf/60 text-[10px] uppercase tracking-[0.22em] mb-3"
            >
              <span className="w-6 h-px bg-leaf/40" />
              Portafolio 2026
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-bold text-4xl sm:text-5xl lg:text-[56px] text-white leading-[1.05]"
            >
              {t('title')}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-sans text-mist/50 text-sm max-w-[200px] leading-relaxed sm:text-right"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {destinations.map((dest, i) => (
            <DestCard key={dest.slug} dest={dest} locale={locale} index={i} inView={inView} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-white/5"
        >
          <span className="font-sans text-mist/30 text-xs">
            {locale === 'es' ? '¿Buscas algo diferente?' : 'Looking for something different?'}
          </span>
          <a
            href={getWhatsAppQuoteUrl(
              { name: '', phone: '', destination: 'Personalizado', travelers: '2', date: '', budget: '', experiences: [] },
              locale
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-label text-leaf/70 text-[10px] uppercase tracking-widest hover:text-leaf transition-colors"
          >
            {locale === 'es' ? 'Cotiza tu viaje a medida' : 'Custom trip quote'}
            <ArrowUpRight size={11} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
