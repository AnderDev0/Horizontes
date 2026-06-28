import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Proveedores',
  description:
    'Conoce los proveedores certificados de Horizontes Agencia de Viajes: alojamiento, transporte, guías y asistencia para Colombia e Italia.',
}

interface Props {
  params: Promise<{ locale: string }>
}

// ── Datos ──────────────────────────────────────────────────────────────────

const DOCS = [
  {
    href: 'https://drive.google.com/file/d/1rQbeM8k6QU6uxdAMQnhr6IwxEHv60Ful/view?usp=sharing',
    title: 'Política de Cancelación',
    cta: 'Leer documento ↗',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    href: 'https://docs.google.com/spreadsheets/d/1dR5zJEs4Vm7LBdHqnCxQasnbaCn9UCGG/edit?usp=sharing&rtpof=true&sd=true',
    title: 'Costos Nacionales',
    cta: 'Ver planilla ↗',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18" />
      </svg>
    ),
  },
  {
    href: 'https://docs.google.com/spreadsheets/d/1sDmhgMpx4A1sv9vpqItDVBFfW3NVy4Qk/edit?usp=sharing&rtpof=true&sd=true',
    title: 'Costos Internacionales',
    cta: 'Ver planilla ↗',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
]

const LOGOS = [
  { src: 'https://colombia.co/sites/default/files/default_images/logo_CO.webp',                                                           alt: 'Colombia — Marca País' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/ProColombia_Logo_Vertical.png',                                             alt: 'ProColombia' },
  { src: 'https://images.booking-channel.com/templates/cadenas/air/images/hotels/SYN3320/480/logo%20certificacion%20calidad%20turistica%20(1).png', alt: 'Certificado de Calidad Turística Colombia' },
  { src: 'https://anato.org/wp-content/uploads/2019/11/logo-web-anato-1-1.png',                                                           alt: 'ANATO' },
  { src: 'https://es.investinbogota.org/wp-content/uploads/2024/12/iiblogo.png',                                                          alt: 'Greater Bogota Convention Bureau' },
  { src: 'https://www.usaid.gov/logo.png',                                                                                                 alt: 'USAID' },
  { src: 'https://www.acotur.co/acotur/assets/images/logo2.png',                                                                          alt: 'ACOTUR' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/LOGO_PLAN_DE_DESARROLLO_COLOMBIA_POTENCIA_DE_LA_VIDA_2022-2026.png',        alt: 'Colombia Potencia de la Vida' },
]

const PAYMENT_METHODS = [
  { label: 'Tarjeta de Crédito', badge: 'Crédito', color: 'bg-blue-700' },
  { label: 'Tarjeta Débito',     badge: 'Débito',  color: 'bg-indigo-700' },
  { label: 'PSE',                badge: 'PSE',      color: 'bg-[#004B87]' },
  { label: 'Ahorro con ADDI',    badge: 'ADDI',     color: 'bg-[#00C08B]' },
  { label: 'SITECREDITO',        badge: 'SITE',     color: 'bg-[#c0392b]' },
]

// ── Componente ──────────────────────────────────────────────────────────────

export default async function ProveedoresPage({ params }: Props) {
  const { locale } = await params

  return (
    <div className="bg-night min-h-screen pt-[var(--nav-height)]">

      {/* Hero */}
      <div className="section-py bg-dusk/40 border-b border-slate-border/30">
        <div className="container-wide text-center">
          <span className="font-label text-leaf text-xs uppercase tracking-[0.16em] mb-3 block">
            Horizontes Agencia de Viajes
          </span>
          <h1 className="font-serif font-bold text-5xl sm:text-6xl text-white mb-4">
            {locale === 'es' ? 'Nuestros aliados' : 'Our partners'}
          </h1>
          <p className="font-sans text-mist text-xl max-w-2xl mx-auto">
            {locale === 'es'
              ? 'Trabajamos con los mejores proveedores nacionales e internacionales para garantizarte experiencias de alta calidad en cada destino.'
              : 'We work with the best national and international providers to guarantee high-quality experiences at every destination.'}
          </p>
        </div>
      </div>

      <div className="container-wide section-py space-y-16">

        {/* Documentos clave */}
        <div>
          <h2 className="font-serif font-bold text-2xl text-white mb-6 heading-underline">
            {locale === 'es' ? 'Documentos para el cliente' : 'Client documents'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DOCS.map((doc) => (
              <Link
                key={doc.title}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-card border border-slate-border/50 bg-dusk hover:border-leaf/50 hover:bg-leaf/5 transition-all group"
              >
                <span className="p-2.5 rounded-xl bg-leaf/10 border border-leaf/20 text-leaf shrink-0 group-hover:bg-leaf/20 transition-colors">
                  {doc.icon}
                </span>
                <div>
                  <p className="font-serif font-semibold text-white text-sm">{doc.title}</p>
                  <p className="font-sans text-leaf text-xs mt-0.5">{doc.cta}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categorías */}
        <div>
          <h2 className="font-serif font-bold text-2xl text-white mb-6 heading-underline">
            {locale === 'es' ? 'Nuestros proveedores' : 'Our providers'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Alojamiento Nacional */}
            <div className="rounded-card border border-slate-border/50 bg-dusk p-7">
              <div className="flex items-start gap-3 mb-5 pb-5 border-b border-slate-border/30">
                <span className="p-2 rounded-xl bg-leaf/10 border border-leaf/20 text-leaf shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-5 h-5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {locale === 'es' ? 'Alojamiento Nacional' : 'National Accommodation'}
                  </h3>
                  <p className="font-label text-leaf text-xs uppercase tracking-wider mt-0.5">
                    Colombia · La Macarena
                  </p>
                </div>
              </div>
              <ul className="space-y-0 divide-y divide-slate-border/20">
                {[
                  { name: 'Hotel Real',       desc: locale === 'es' ? 'Centro de La Macarena. Habitaciones individuales, dobles y triples con ventilador o A/C y baño privado.' : 'Downtown La Macarena. Single, double, and triple rooms with fan or A/C and private bathroom.' },
                  { name: 'Hotel La Fuente',  desc: locale === 'es' ? 'Centro de La Macarena. Habitaciones individuales, dobles y triples con ventilador o A/C y baño privado.' : 'Downtown La Macarena. Single, double, and triple rooms with fan or A/C and private bathroom.' },
                  { name: 'Hotel Makolombia', desc: locale === 'es' ? 'A 10 min del casco urbano. Espacio natural con cabañas y domo geodésico.' : '10 min from downtown. Natural setting with cabins and geodesic dome.' },
                ].map((h) => (
                  <li key={h.name} className="py-4 first:pt-0 last:pb-0">
                    <p className="font-sans font-semibold text-white text-sm mb-1">{h.name}</p>
                    <p className="font-sans text-mist text-sm leading-relaxed">{h.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alojamiento Internacional */}
            <div className="rounded-card border border-slate-border/50 bg-dusk p-7">
              <div className="flex items-start gap-3 mb-5 pb-5 border-b border-slate-border/30">
                <span className="p-2 rounded-xl bg-leaf/10 border border-leaf/20 text-leaf shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-5 h-5">
                    <path d="M2 20h20M4 20V10l8-6 8 6v10" /><path d="M10 14h4v6h-4z" /><path d="M10 10h4" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {locale === 'es' ? 'Alojamiento Internacional' : 'International Accommodation'}
                  </h3>
                  <p className="font-label text-leaf text-xs uppercase tracking-wider mt-0.5">
                    Italia · Roma
                  </p>
                </div>
              </div>
              <div className="py-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-sans font-semibold text-white text-sm">Anantara Hotel</p>
                  <span className="text-amber-400 text-xs tracking-widest" aria-label="5 estrellas">★★★★★</span>
                </div>
                <p className="font-sans text-mist text-sm leading-relaxed">
                  {locale === 'es'
                    ? '232 habitaciones y suites. Arquitectura histórica en el centro de Roma, cerca de la Plaza de España. Terraza y piscina en la azotea. Equipos Technogym.'
                    : '232 rooms and suites. Historic architecture in the heart of Rome, near the Spanish Steps. Rooftop terrace and pool. Technogym equipment.'}
                </p>
              </div>
            </div>

            {/* Transporte */}
            <div className="rounded-card border border-slate-border/50 bg-dusk p-7">
              <div className="flex items-start gap-3 mb-5 pb-5 border-b border-slate-border/30">
                <span className="p-2 rounded-xl bg-leaf/10 border border-leaf/20 text-leaf shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-5 h-5">
                    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S15 1 13.5 2.5L10 6 1.8 4.2C.9 4 .1 4.9.4 5.8l2 6.3a1 1 0 0 0 .8.6l3.5.5-2 3.2A1 1 0 0 0 5 17h1.8l1.2 3.4c.2.5.9.7 1.4.5l5.9-2.8a1 1 0 0 0 .5-1.4l-1.3-2.3 3-.5a1 1 0 0 0 .8-.7z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {locale === 'es' ? 'Transporte' : 'Transport'}
                  </h3>
                  <p className="font-label text-leaf text-xs uppercase tracking-wider mt-0.5">
                    {locale === 'es' ? 'Aéreo & Terrestre' : 'Air & Ground'}
                  </p>
                </div>
              </div>
              <div className="mb-5">
                <p className="font-label text-xs text-mist/60 uppercase tracking-widest mb-3">
                  {locale === 'es' ? 'Aéreo' : 'Airlines'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Avianca', 'Latam', 'Wingo'].map((a) => (
                    <span key={a} className="px-3 py-1.5 rounded-full text-sm font-sans border border-slate-border/50 text-mist hover:border-leaf/40 hover:text-white transition-colors">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="space-y-0 divide-y divide-slate-border/20">
                {[
                  { name: 'Viajes Colombia Viva', desc: locale === 'es' ? 'Transporte especializado en turismo — Caño Cristales, La Macarena.' : 'Specialized tourism transport — Caño Cristales, La Macarena.' },
                  { name: 'SpiritGT',              desc: locale === 'es' ? 'Transporte premium en Roma, Italia. Flota de vehículos de alta gama.' : 'Premium transport in Rome, Italy. High-end vehicle fleet.' },
                ].map((t) => (
                  <li key={t.name} className="py-4 first:pt-0 last:pb-0">
                    <p className="font-sans font-semibold text-white text-sm mb-1">{t.name}</p>
                    <p className="font-sans text-mist text-sm leading-relaxed">{t.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guías y Asistencia */}
            <div className="rounded-card border border-slate-border/50 bg-dusk p-7">
              <div className="flex items-start gap-3 mb-5 pb-5 border-b border-slate-border/30">
                <span className="p-2 rounded-xl bg-leaf/10 border border-leaf/20 text-leaf shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-5 h-5">
                    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {locale === 'es' ? 'Guías & Asistencia' : 'Guides & Assistance'}
                  </h3>
                  <p className="font-label text-leaf text-xs uppercase tracking-wider mt-0.5">
                    {locale === 'es' ? 'Nacional e Internacional' : 'National & International'}
                  </p>
                </div>
              </div>
              <ul className="space-y-0 divide-y divide-slate-border/20">
                {[
                  { name: 'Caño Cristales Aventura Tours', badge: locale === 'es' ? 'Guía Nacional'           : 'National Guide',        desc: locale === 'es' ? 'Guía oficial — Caño Cristales, La Macarena.'               : 'Official guide — Caño Cristales, La Macarena.' },
                  { name: 'Tour Travel & More',            badge: locale === 'es' ? 'Guía Internacional'       : 'International Guide',   desc: locale === 'es' ? 'Guías privados en Italia — Roma y ciudades principales.'    : 'Private guides in Italy — Rome and major cities.' },
                  { name: 'We Care',                       badge: locale === 'es' ? 'Asistencia Nacional'      : 'National Assistance',   desc: locale === 'es' ? 'Asistencia médica y de viaje en Colombia.'                 : 'Medical and travel assistance in Colombia.' },
                  { name: 'AssistCard Internacional',      badge: locale === 'es' ? 'Asistencia Internacional' : 'International Assistance', desc: locale === 'es' ? 'Asistencia al viajero en el exterior — cobertura global.' : 'Traveler assistance abroad — global coverage.' },
                ].map((g) => (
                  <li key={g.name} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-sans font-semibold text-white text-sm">{g.name}</p>
                      <span className="shrink-0 text-[10px] font-label uppercase tracking-wider text-leaf border border-leaf/30 rounded-full px-2 py-0.5 whitespace-nowrap">
                        {g.badge}
                      </span>
                    </div>
                    <p className="font-sans text-mist text-sm leading-relaxed mt-1">{g.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Medios de pago */}
        <div className="rounded-card border border-slate-border/50 bg-dusk p-7">
          <h2 className="font-serif font-bold text-xl text-white mb-6 heading-underline">
            {locale === 'es' ? 'Medios de pago aceptados' : 'Accepted payment methods'}
          </h2>
          <div className="flex flex-wrap gap-3">
            {PAYMENT_METHODS.map((pm) => (
              <div key={pm.label} className="flex items-center gap-3">
                <span className={`${pm.color} text-white text-xs font-bold px-3 py-1.5 rounded-lg min-w-[56px] text-center`}>
                  {pm.badge}
                </span>
                <span className="font-sans text-mist text-sm">{pm.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Cinta de certificaciones */}
      <div className="bg-[#3A8C36] py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-label text-white/70 text-xs uppercase tracking-[0.2em] text-center mb-7">
            {locale === 'es' ? 'Instituciones que nos avalan' : 'Institutions that endorse us'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {LOGOS.map((logo) => (
              <figure
                key={logo.alt}
                className="m-0 flex items-center justify-center bg-white rounded-xl px-4 py-2.5 shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-10 sm:h-12 w-auto max-w-[120px] object-contain"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  )
}
