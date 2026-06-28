'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import {
  useScroll, useTransform, useSpring,
  motion, useMotionValue, useMotionTemplate,
} from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { ArrowUpRight, Check, Clock } from 'lucide-react'
import { destinations } from '@/content/destinations'
import { getWhatsAppQuoteUrl } from '@/lib/whatsapp'

gsap.registerPlugin(ScrollTrigger)

const BorderGlow = dynamic(() => import('@/components/ui/BorderGlow'), { ssr: false })
const CardSwap   = dynamic(() => import('@/components/ui/CardSwap').then(m => m.default), { ssr: false })

// Cast to typed component so TypeScript accepts children prop
type SwapCardProps = { children?: React.ReactNode; style?: React.CSSProperties; className?: string }
const SwapCard = dynamic(
  () => import('@/components/ui/CardSwap').then(
    m => m.Card as React.ComponentType<SwapCardProps>
  ),
  { ssr: false }
)

/* ─── Photo data ─────────────────────────────────────────────────────────────── */
const PHOTOS = {
  'cano-cristales': [
    { label: 'El Tapete Rojo',             accent: '#4ade80', photo: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=640&h=480&fit=crop&q=80', text: 'Macarenia clavigera pinta el río de rojo, amarillo y verde' },
    { label: 'Cielo de las Mil Estrellas', accent: '#93c5fd', photo: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=640&h=480&fit=crop&q=80', text: 'Noche mágica con fogata y astronomía guiada en el llano' },
    { label: '+400 Especies de Aves',      accent: '#86efac', photo: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=640&h=480&fit=crop&q=80', text: 'Avistamiento de aves tropicales con guía local certificado' },
  ],
  'roma-italia': [
    { label: 'Coliseo Romano',    accent: '#fde68a', photo: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=640&h=480&fit=crop&q=80', text: 'Ingreso exclusivo con guía especializado en historia imperial' },
    { label: 'Costa Amalfitana', accent: '#7dd3fc', photo: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=640&h=480&fit=crop&q=80', text: 'Yate privado — Positano, Fiordo di Furore y Amalfi' },
    { label: 'Ferrari Maranello', accent: '#fca5a5', photo: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=640&h=480&fit=crop&q=80', text: 'Simulador F1 + conducción en carretera con instructor' },
  ],
}

const GLOW = {
  'cano-cristales': { glowColor: '142 71 45', backgroundColor: '#F0FDF4', colors: ['#22C55E', '#4ade80', '#15803D'], accent: '#22C55E' },
  'roma-italia':    { glowColor: '38 92 50',  backgroundColor: '#FFFBEB', colors: ['#F59E0B', '#FCD34D', '#D97706'], accent: '#F59E0B' },
} as const

/* ─── Photo stack ────────────────────────────────────────────────────────────── */
function PhotoStack({ slug }: { slug: string }) {
  const photos = PHOTOS[slug as keyof typeof PHOTOS] ?? []
  return (
    <div className="relative" style={{ height: 380, width: '100%' }}>
      <CardSwap width={340} height={280} cardDistance={38} verticalDistance={44} delay={3000} pauseOnHover skewAmount={4} easing="elastic">
        {photos.map((p, i) => (
          <SwapCard key={i}>
            <div className="relative w-full h-full overflow-hidden rounded-[20px] select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photo} alt={p.label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-label text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: p.accent }}>{p.label}</p>
                <p className="font-sans text-white/85 text-xs leading-snug">{p.text}</p>
              </div>
            </div>
          </SwapCard>
        ))}
      </CardSwap>
    </div>
  )
}

/* ─── Info card ──────────────────────────────────────────────────────────────── */
function InfoCard({ dest, locale }: { dest: typeof destinations[0]; locale: string }) {
  const name     = locale === 'es' ? dest.nameEs     : dest.nameEn
  const subtitle = locale === 'es' ? dest.subtitleEs : dest.subtitleEn
  const tagline  = locale === 'es' ? dest.taglineEs  : dest.taglineEn
  const duration = locale === 'es' ? dest.duration   : dest.durationEn
  const includes = (locale === 'es' ? dest.includes  : dest.includesEn).slice(0, 4)
  const g        = GLOW[dest.slug as keyof typeof GLOW]
  const accent   = g?.accent ?? '#22C55E'
  const catLabel = dest.category === 'eco'
    ? (locale === 'es' ? 'Ecoturismo' : 'Eco-Tourism')
    : (locale === 'es' ? 'Lujo & Romance' : 'Luxury & Romance')
  const waUrl = getWhatsAppQuoteUrl({ name: '', phone: '', destination: name, travelers: '2', date: '', budget: '', experiences: [] }, locale)

  const inner = (
    <div className="p-6 flex flex-col gap-3.5 h-full">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-3xl">{dest.flag}</span>
          <div>
            <p className="font-label text-[9px] uppercase tracking-[0.2em]" style={{ color: `${accent}99` }}>{dest.country}</p>
            <span className="flex items-center gap-1 font-label text-[10px] text-[#475569]">
              <Clock size={9} style={{ color: accent }} />{duration}
            </span>
          </div>
        </div>
        <span className="font-label text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest"
          style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>{catLabel}</span>
      </div>
      <div>
        <h3 className="font-serif font-bold text-2xl text-[#0F172A] leading-tight">{name}</h3>
        <p className="font-sans text-sm italic mt-0.5" style={{ color: `${accent}cc` }}>{subtitle}</p>
      </div>
      <p className="font-sans text-xs text-[#475569] leading-relaxed border-l-2 pl-3" style={{ borderColor: `${accent}50` }}>{tagline}</p>
      <ul className="space-y-1.5">
        {includes.map(item => (
          <li key={item} className="flex items-start gap-2 text-xs font-sans text-[#475569]">
            <Check size={10} className="mt-0.5 shrink-0" style={{ color: accent }} />{item}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1">
        {dest.gastronomy.slice(0, 3).map(gItem => (
          <span key={gItem} className="px-2 py-0.5 rounded-full text-[9px] font-label text-[#475569]"
            style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>{gItem}</span>
        ))}
      </div>
      <div className="flex gap-2 mt-auto pt-1">
        <Link href={`/${locale}/destinos/${dest.slug}`}
          className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full font-sans font-semibold text-xs text-[#0F172A]"
          style={{ background: accent }}>
          {locale === 'es' ? 'Ver itinerario' : 'Itinerary'}<ArrowUpRight size={11} />
        </Link>
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-full font-sans text-xs font-medium transition-colors"
          style={{ border: `1px solid ${accent}35`, color: accent }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${accent}14` }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
          WA
        </a>
      </div>
    </div>
  )

  return (
    <div className="h-full" style={{ perspective: 1000 }}>
      {g ? (
        <BorderGlow glowColor={g.glowColor} backgroundColor={g.backgroundColor} colors={g.colors}
          borderRadius={22} glowRadius={28} glowIntensity={1.1} edgeSensitivity={26} coneSpread={28} animated className="h-full">
          {inner}
        </BorderGlow>
      ) : <div className="rounded-3xl border h-full bg-white">{inner}</div>}
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────────────── */
export default function StorytellingSection() {
  const locale   = useLocale()
  const outerRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<HTMLDivElement>(null)
  const isEs = locale === 'es'

  /*
   * useScroll tracks progress of the outer div (300vh) through the viewport.
   * "start start" = when top of outer reaches top of viewport (sticky kicks in)
   * "end end"     = when bottom of outer reaches bottom of viewport (sticky ends)
   * NO GSAP pin, NO DOM manipulation → zero removeChild errors.
   */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth spring (feels more physical than raw scroll)
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  /* ── Slide 0 (Colombia): visible 0→0.72, peaks at 0.3–0.58 ── */
  const s0Opacity = useTransform(smooth, [0, 0.25, 0.55, 0.72], [0, 1, 1, 0])
  const s0X       = useTransform(smooth, [0, 0.25, 0.55, 0.72], [48, 0, 0, -48])

  /* ── Slide 1 (Roma): visible 0.65→1.0 ── */
  const s1Opacity = useTransform(smooth, [0.62, 0.82], [0, 1])
  const s1X       = useTransform(smooth, [0.62, 0.82], [48, 0])

  /* ── Progress bar ── */
  const barScale = useTransform(smooth, [0, 1], [0, 1])

  /* ── Plane: travels full route width, fades near FCO ── */
  // routeWidth computed reactively via a state would cause re-render;
  // instead we drive in percentages of the container and let CSS handle pixels
  const planePercent = useTransform(smooth, [0, 0.88], ['0%', 'calc(100% - 56px)'])
  const planeOpacity = useTransform(smooth, [0.85, 1], [1, 0])

  return (
    /*
     * Outer div: 300vh — creates the scroll space.
     * bg-[#F8FAFC] prevents the dark page background from showing through.
     */
    <div ref={outerRef} style={{ height: '300vh' }} className="relative bg-[#F8FAFC]">

      {/* Inner sticky panel — CSS handles the "pin", no GSAP DOM modification */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#F8FAFC]">

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(15,23,42,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Progress bar — driven by Framer Motion */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left z-10"
          style={{ background: 'linear-gradient(90deg,#22C55E,#F59E0B)', scaleX: barScale }}
        />

        <div className="relative z-[1] h-full flex flex-col container-wide py-12">

          {/* Header */}
          <div className="mb-6 flex-shrink-0">
            <span className="flex items-center gap-2 font-label text-[10px] text-[#22C55E]/70 uppercase tracking-[0.22em] mb-3">
              <span className="w-5 h-px bg-[#22C55E]/40" />
              {isEs ? 'Tu próximo viaje' : 'Your next journey'}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] leading-tight">
              {(isEs ? 'Elige tu destino extraordinario' : 'Choose your extraordinary destination')
                .split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.22em]"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
            </h2>
          </div>

          {/* Flight route */}
          <div ref={routeRef} className="relative h-9 flex-shrink-0 mb-5 overflow-visible">
            <div className="absolute top-1/2 left-8 right-8 border-t-2 border-dashed" style={{ borderColor: '#22C55E28' }} />

            {/* BOG */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#22C55E] ring-4 ring-[#22C55E]/20" />
              <span className="font-label text-[9px] text-[#475569] uppercase tracking-wider">BOG</span>
            </div>

            {/* FCO */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="font-label text-[9px] text-[#475569] uppercase tracking-wider">FCO</span>
              <div className="w-3 h-3 rounded-full bg-[#F59E0B] ring-4 ring-[#F59E0B]/20" />
            </div>

            {/* Plane — driven by Framer Motion, no GSAP */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: planePercent, opacity: planeOpacity }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#0F172A"
                style={{ transform: 'rotate(90deg)', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.18))' }}>
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </motion.div>
          </div>

          {/* Slides stage */}
          <div className="relative flex-1 min-h-0">
            {/* Slide 0 — Colombia */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: s0Opacity, x: s0X }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full px-1">
                <div className="h-full"><InfoCard dest={destinations[0]} locale={locale} /></div>
                <div className="hidden lg:flex items-center justify-center"><PhotoStack slug={destinations[0].slug} /></div>
              </div>
            </motion.div>

            {/* Slide 1 — Roma */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: s1Opacity, x: s1X }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full px-1">
                <div className="h-full"><InfoCard dest={destinations[1]} locale={locale} /></div>
                <div className="hidden lg:flex items-center justify-center"><PhotoStack slug={destinations[1].slug} /></div>
              </div>
            </motion.div>
          </div>

          {/* Footer strip */}
          <div className="flex-shrink-0 pt-4 flex items-center justify-between">
            <p className="font-sans text-[#94A3B8] text-xs">
              {isEs ? 'Desplázate para explorar' : 'Scroll to explore'}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 rounded-full bg-[#22C55E]/50" />
              <div className="w-6 h-1 rounded-full bg-[#F59E0B]/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
