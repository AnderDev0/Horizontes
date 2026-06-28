import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Check, Leaf, Clock, MapPin, Users } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { destinations, getDestinationBySlug } from '@/content/destinations'
import { getWhatsAppQuoteUrl } from '@/lib/whatsapp'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) return {}
  const name = locale === 'es' ? dest.nameEs : dest.nameEn
  return {
    title: name,
    description: locale === 'es' ? dest.taglineEs : dest.taglineEn,
  }
}

const BG_GRADIENTS: Record<string, string> = {
  'cano-cristales': 'from-emerald-950 via-teal-950 to-night',
  'roma-italia': 'from-amber-950 via-orange-950 to-night',
}

export default async function DestinationPage({ params }: Props) {
  const { slug, locale } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) notFound()

  const t = await getTranslations('destinations')
  const tc = await getTranslations('contact')

  const name = locale === 'es' ? dest.nameEs : dest.nameEn
  const subtitle = locale === 'es' ? dest.subtitleEs : dest.subtitleEn
  const tagline = locale === 'es' ? dest.taglineEs : dest.taglineEn
  const duration = locale === 'es' ? dest.duration : dest.durationEn
  const includes = locale === 'es' ? dest.includes : dest.includesEn
  const itinerary = locale === 'es' ? dest.itineraryEs : dest.itineraryEn
  const sustainability = locale === 'es' ? dest.sustainability : dest.sustainabilityEn
  const bgGrad = BG_GRADIENTS[slug] ?? 'from-dusk to-night'

  const waUrl = getWhatsAppQuoteUrl(
    { name: '', phone: '', destination: name, travelers: '2', date: '', budget: '', experiences: [] },
    locale
  )

  return (
    <div className="bg-night min-h-screen">

      {/* Hero */}
      <div className={`relative pt-[var(--nav-height)] min-h-[55vh] bg-gradient-to-br ${bgGrad} flex flex-col justify-end`}>
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
        <div className="relative z-10 container-wide pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-mist/60 font-label text-xs uppercase tracking-wider mb-6">
            <Link href={`/${locale}`} className="hover:text-leaf transition-colors">
              {locale === 'es' ? 'Inicio' : 'Home'}
            </Link>
            <ChevronRight size={12} />
            <Link href={`/${locale}/destinos`} className="hover:text-leaf transition-colors">
              {t('title')}
            </Link>
            <ChevronRight size={12} />
            <span className="text-leaf">{name}</span>
          </nav>

          {/* Title */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{dest.flag}</span>
            <span className="font-label text-leaf text-xs uppercase tracking-widest">
              {dest.country}
            </span>
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-2 leading-tight">
            {name}
          </h1>
          <p className="font-sans text-leaf/90 text-xl italic mb-4">{subtitle}</p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-mist/80 font-label text-xs uppercase tracking-wider">
              <Clock size={12} className="text-leaf" /> {duration}
            </span>
            <span className="text-slate-border/50">·</span>
            <span className="flex items-center gap-1.5 text-mist/80 font-label text-xs uppercase tracking-wider">
              <MapPin size={12} className="text-leaf" /> {dest.location}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-12">

            {/* Tagline */}
            <p className="font-sans text-mist text-lg leading-relaxed border-l-2 border-leaf pl-5">
              {tagline}
            </p>

            {/* What's included */}
            <div>
              <h2 className="font-serif font-bold text-2xl text-white mb-6 heading-underline">
                {locale === 'es' ? '¿Qué incluye?' : "What's included?"}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-mist text-sm font-sans">
                    <Check size={16} className="text-leaf mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gastronomy */}
            <div>
              <h2 className="font-serif font-bold text-2xl text-white mb-4 heading-underline">
                {locale === 'es' ? 'Gastronomía incluida' : 'Included gastronomy'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {dest.gastronomy.map((g) => (
                  <span
                    key={g}
                    className="px-4 py-2 rounded-full border border-leaf/30 bg-leaf/10 text-leaf/90 text-sm font-sans"
                  >
                    🍽 {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="font-serif font-bold text-2xl text-white mb-6 heading-underline">
                {locale === 'es' ? 'Itinerario día a día' : 'Day-by-day itinerary'}
              </h2>
              <div className="space-y-4">
                {itinerary.map((day, i) => (
                  <details
                    key={day.day}
                    className="group rounded-card border border-slate-border/50 bg-dusk/30 overflow-hidden"
                    open={i === 0}
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-dusk/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-leaf/20 border border-leaf/40 flex items-center justify-center text-leaf font-label font-bold text-sm shrink-0">
                          {day.day}
                        </span>
                        <span className="font-serif font-semibold text-white">{day.title}</span>
                      </div>
                      <span className="text-mist/50 group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <div className="px-5 pb-5 text-mist text-sm font-sans leading-relaxed border-t border-slate-border/30 pt-4">
                      {day.description}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Sustainability */}
            <div className="p-6 rounded-card border border-leaf/30 bg-leaf/5 flex items-start gap-4">
              <Leaf size={20} className="text-leaf mt-0.5 shrink-0" />
              <div>
                <h3 className="font-serif font-semibold text-leaf mb-2">
                  {locale === 'es' ? 'Turismo con Propósito' : 'Purposeful Tourism'}
                </h3>
                <p className="font-sans text-mist/80 text-sm leading-relaxed">{sustainability}</p>
              </div>
            </div>
          </div>

          {/* Sticky booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-card border border-leaf/30 bg-dusk p-6 shadow-2xl shadow-black/40">
                <h3 className="font-serif font-bold text-xl text-white mb-1">
                  {locale === 'es' ? 'Reservar este paquete' : 'Book this package'}
                </h3>
                <p className="font-label text-leaf text-xs uppercase tracking-wider mb-6">
                  {duration}
                </p>

                {/* Price placeholder */}
                <div className="p-4 rounded-xl bg-night border border-slate-border/40 mb-6">
                  <p className="font-label text-mist/60 text-xs uppercase tracking-wider mb-1">
                    {locale === 'es' ? 'Precio' : 'Price'}
                  </p>
                  <p className="font-serif font-bold text-2xl text-white">
                    {locale === 'es' ? 'Consultar precio' : 'Ask for price'}
                  </p>
                  <p className="font-sans text-mist/70 text-xs mt-1">
                    {locale === 'es' ? 'Precio por persona · incluye todo' : 'Per person · all inclusive'}
                  </p>
                </div>

                {/* Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-mist text-sm font-sans">
                    <Clock size={14} className="text-leaf shrink-0" />
                    {duration}
                  </div>
                  <div className="flex items-center gap-3 text-mist text-sm font-sans">
                    <MapPin size={14} className="text-leaf shrink-0" />
                    {dest.location}
                  </div>
                  <div className="flex items-center gap-3 text-mist text-sm font-sans">
                    <Users size={14} className="text-leaf shrink-0" />
                    {locale === 'es' ? 'Grupos privados y parejas' : 'Private groups and couples'}
                  </div>
                </div>

                {/* CTAs */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-leaf text-night font-semibold font-sans mb-3 hover:bg-forest transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {locale === 'es' ? 'Cotizar por WhatsApp' : 'Quote via WhatsApp'}
                </a>

                <Link
                  href={`/${locale}/contacto`}
                  className="w-full flex items-center justify-center px-5 py-3 rounded-full border border-leaf/30 text-mist font-sans text-sm hover:text-leaf hover:border-leaf/60 transition-all"
                >
                  {locale === 'es' ? 'Formulario de cotización' : 'Quote form'}
                </Link>

                {/* Trust badges */}
                <div className="mt-6 pt-5 border-t border-slate-border/30 grid grid-cols-3 gap-2 text-center">
                  {[
                    { icon: '🔒', label: locale === 'es' ? 'Pago Seguro' : 'Secure Pay' },
                    { icon: '📋', label: 'RNT' },
                    { icon: '🌿', label: 'ANATO' },
                  ].map((b) => (
                    <div key={b.label} className="text-center">
                      <p className="text-xl mb-1">{b.icon}</p>
                      <p className="font-label text-mist/60 text-[10px] uppercase tracking-wider">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
