'use client'

import { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { ArrowUpRight, Check, Clock } from 'lucide-react'
import { destinations } from '@/content/destinations'
import { getWhatsAppQuoteUrl } from '@/lib/whatsapp'

gsap.registerPlugin(ScrollTrigger)

const BorderGlow = dynamic(() => import('@/components/ui/BorderGlow'), { ssr: false })
const CardSwap   = dynamic(() => import('@/components/ui/CardSwap').then(m => m.default), { ssr: false })

type SwapCardProps = { children?: React.ReactNode; style?: React.CSSProperties; className?: string }
const SwapCard = dynamic(
  () => import('@/components/ui/CardSwap').then(m => m.Card as React.ComponentType<SwapCardProps>),
  { ssr: false }
)

/* ─── Photo data ──────────────────────────────────────────────────────────────── */
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

/* ─── Photo stack ─────────────────────────────────────────────────────────────── */
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

/* ─── Info card ───────────────────────────────────────────────────────────────── */
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
  const waUrl = getWhatsAppQuoteUrl(
    { name: '', phone: '', destination: name, travelers: '2', date: '', budget: '', experiences: [] },
    locale
  )

  const inner = (
    <div className="p-6 flex flex-col gap-3.5" style={{ height: '100%' }}>
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
    /* height: 100% here ensures BorderGlow fills the parent */
    <div style={{ height: '100%', perspective: 1000 }}>
      {g ? (
        <BorderGlow
          glowColor={g.glowColor}
          backgroundColor={g.backgroundColor}
          colors={[...g.colors]}
          borderRadius={22}
          glowRadius={28}
          glowIntensity={1.1}
          edgeSensitivity={26}
          coneSpread={28}
          animated
          className="h-full"
        >
          {inner}
        </BorderGlow>
      ) : (
        <div className="rounded-3xl border bg-white" style={{ height: '100%' }}>{inner}</div>
      )}
    </div>
  )
}

/* ─── Main ────────────────────────────────────────────────────────────────────── */
export default function StorytellingSection() {
  const locale = useLocale()
  const isEs   = locale === 'es'

  const outerRef   = useRef<HTMLDivElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const routeRef   = useRef<HTMLDivElement>(null)
  const stageRef   = useRef<HTMLDivElement>(null)
  const footerRef  = useRef<HTMLDivElement>(null)
  const slide0Ref  = useRef<HTMLDivElement>(null)
  const slide1Ref  = useRef<HTMLDivElement>(null)
  const barRef     = useRef<HTMLDivElement>(null)
  const planeRef   = useRef<HTMLDivElement>(null)

  /*
   * LAYOUT: all elements inside the sticky panel use absolute positioning.
   * useEffect measures header + route heights and sets the stage top/bottom
   * so it fills EXACTLY the remaining space — no flex/grid height cascade.
   *
   * Padding constants (px):
   *   paddingTop  = 48   (3rem  top)
   *   paddingBot  = 24   (1.5rem bottom)
   *   gap         = 16   (mb-4 between header→route and route→stage)
   *   footerGap   = 12   (pt-3 above footer)
   */
  useEffect(() => {
    const PAD_TOP = 48
    const PAD_BOT = 24
    const GAP     = 16

    const measure = () => {
      const header = headerRef.current
      const route  = routeRef.current
      const stage  = stageRef.current
      const footer = footerRef.current
      if (!header || !route || !stage || !footer) return

      const stageTop    = PAD_TOP + header.offsetHeight + GAP + route.offsetHeight + GAP
      const stageBottom = PAD_BOT + footer.offsetHeight + 12   // 12 = pt-3

      stage.style.top    = `${stageTop}px`
      stage.style.bottom = `${stageBottom}px`
    }

    measure()
    // Second pass after fonts settle
    const t = setTimeout(measure, 250)
    window.addEventListener('resize', measure, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('resize', measure) }
  }, [])

  /* GSAP: ScrollTrigger drives slide animations, no pin (CSS sticky handles it) */
  useGSAP(() => {
    if (!outerRef.current) return

    gsap.set([slide0Ref.current, slide1Ref.current], { opacity: 0, x: 40 })
    gsap.set(barRef.current,   { scaleX: 0 })
    gsap.set(planeRef.current, { left: '0%' })

    const st = { trigger: outerRef.current, start: 'top top', end: 'bottom bottom', scrub: 1.4 }

    const tl = gsap.timeline({ scrollTrigger: st })

    // Colombia: enter 0→12%, hold 12→55%, exit 55→68%
    tl.to(slide0Ref.current, { opacity: 1, x: 0,   duration: 0.12, ease: 'power2.out' }, 0)
      .to(slide0Ref.current, { opacity: 1, x: 0,   duration: 0.43 },                     0.12)
      .to(slide0Ref.current, { opacity: 0, x: -40, duration: 0.13, ease: 'power2.in'  }, 0.55)

    // Roma: enter 60→75%, hold 75→100%
      .to(slide1Ref.current, { opacity: 1, x: 0,   duration: 0.15, ease: 'power2.out' }, 0.60)
      .to(slide1Ref.current, { opacity: 1, x: 0,   duration: 0.25 },                     0.75)

    // Progress bar
      .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0)

    // Plane (independent timeline, same trigger)
    gsap.timeline({ scrollTrigger: st })
      .fromTo(planeRef.current,
        { left: '0%' },
        { left: 'calc(100% - 56px)', ease: 'none', duration: 0.88 },
        0)

  }, { scope: outerRef })

  return (
    <div ref={outerRef} style={{ height: '300vh' }} className="relative bg-[#F8FAFC]">

      {/* Sticky panel: h-screen, everything inside is absolute */}
      <div className="sticky top-0 overflow-hidden bg-[#F8FAFC]" style={{ height: '100svh' }}>

        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(15,23,42,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        {/* Progress bar */}
        <div
          ref={barRef}
          className="absolute top-0 left-0 right-0 z-10"
          style={{ height: 2, background: 'linear-gradient(90deg,#22C55E,#F59E0B)', transformOrigin: 'left center', transform: 'scaleX(0)' }}
        />

        {/* Centered content wrapper — absolute fill, padded */}
        <div
          className="absolute inset-0"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 24px' }}
        >

          {/* Header */}
          <div ref={headerRef}>
            <span className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.22em] mb-3" style={{ color: 'rgba(34,197,94,0.7)' }}>
              <span className="w-5 h-px" style={{ background: 'rgba(34,197,94,0.4)' }} />
              {isEs ? 'Tu próximo viaje' : 'Your next journey'}
            </span>
            <h2 className="font-serif font-bold text-[#0F172A] leading-tight mb-0" style={{ fontSize: 'clamp(1.75rem,4vw,3rem)' }}>
              {isEs ? 'Elige tu destino extraordinario' : 'Choose your extraordinary destination'}
            </h2>
          </div>

          {/* Flight route BOG → FCO */}
          <div ref={routeRef} className="relative overflow-visible" style={{ height: 36, marginTop: 16 }}>
            <div className="absolute top-1/2 left-8 right-8 border-t-2 border-dashed" style={{ borderColor: '#22C55E28' }} />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#22C55E', boxShadow: '0 0 0 4px rgba(34,197,94,0.2)' }} />
              <span className="font-label text-[9px] uppercase tracking-wider" style={{ color: '#475569' }}>BOG</span>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="font-label text-[9px] uppercase tracking-wider" style={{ color: '#475569' }}>FCO</span>
              <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B', boxShadow: '0 0 0 4px rgba(245,158,11,0.2)' }} />
            </div>
            <div ref={planeRef} className="absolute top-1/2 -translate-y-1/2" style={{ left: '0%' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#0F172A"
                style={{ transform: 'rotate(90deg)', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.18))' }}>
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
          </div>

          {/*
            Stage: positioned absolutely with top/bottom set by useEffect.
            This guarantees the stage fills EXACTLY the space between the route
            and the footer, regardless of font loading or layout recalculations.
          */}
          <div ref={stageRef} className="absolute left-6 right-6" style={{ top: 200, bottom: 60 }}>

            {/* Slide 0 — Colombia */}
            <div ref={slide0Ref} className="absolute inset-0" style={{ opacity: 0 }}>
              <div className="flex gap-6" style={{ height: '100%' }}>
                <div className="flex-1 min-w-0" style={{ height: '100%' }}>
                  <InfoCard dest={destinations[0]} locale={locale} />
                </div>
                <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center">
                  <PhotoStack slug={destinations[0].slug} />
                </div>
              </div>
            </div>

            {/* Slide 1 — Roma */}
            <div ref={slide1Ref} className="absolute inset-0" style={{ opacity: 0 }}>
              <div className="flex gap-6" style={{ height: '100%' }}>
                <div className="flex-1 min-w-0" style={{ height: '100%' }}>
                  <InfoCard dest={destinations[1]} locale={locale} />
                </div>
                <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center">
                  <PhotoStack slug={destinations[1].slug} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer strip — absolute at bottom */}
          <div
            ref={footerRef}
            className="absolute left-6 right-6 flex items-center justify-between"
            style={{ bottom: 0 }}
          >
            <p className="font-sans text-xs" style={{ color: '#94A3B8' }}>
              {isEs ? 'Desplázate para explorar' : 'Scroll to explore'}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 rounded-full" style={{ background: 'rgba(34,197,94,0.5)' }} />
              <div className="w-6 h-1 rounded-full" style={{ background: 'rgba(245,158,11,0.5)' }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
