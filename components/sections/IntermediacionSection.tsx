'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowUpRight, CheckCircle2, ShieldCheck, FileText, Users, Building2, Star } from 'lucide-react'

const BorderGlow = dynamic(() => import('@/components/ui/BorderGlow'), { ssr: false })

/* ─── Fade-up wrapper ────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Stagger children ───────────────────────────────────────────────────────── */
function StaggerGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─── NTS-AV norm card ───────────────────────────────────────────────────────── */
const NTS_NORMS = [
  {
    code: 'NTS-AV 001',
    title: 'Reservas en Agencias de Viajes',
    desc: 'Regula los procesos de reserva de servicios turísticos — condiciones, confirmaciones y obligaciones del agente ante el viajero.',
    icon: FileText,
    glowColor: '142 71 45',
    colors: ['#22C55E', '#4ade80', '#15803D'],
  },
  {
    code: 'NTS-AV 002',
    title: 'Atención al Cliente',
    desc: 'Establece los estándares mínimos de calidad en el servicio al cliente: tiempos de respuesta, canales de comunicación y protocolos de atención.',
    icon: Users,
    glowColor: '38 92 50',
    colors: ['#F59E0B', '#FCD34D', '#D97706'],
  },
  {
    code: 'NTS-AV 003',
    title: 'Infraestructura',
    desc: 'Define los requisitos físicos y tecnológicos de la agencia: instalaciones, equipos y condiciones operativas para prestar el servicio turístico.',
    icon: Building2,
    glowColor: '217 91 60',
    colors: ['#60a5fa', '#93c5fd', '#3b82f6'],
  },
  {
    code: 'NTS-AV 004',
    title: 'Diseño de Paquetes Turísticos',
    desc: 'Norma el diseño, estructuración y oferta de paquetes: itinerarios, precios, inclusiones, condiciones de cancelación y responsabilidades.',
    icon: Star,
    glowColor: '270 70 65',
    colors: ['#a78bfa', '#c4b5fd', '#7c3aed'],
  },
]

const CERTIFICATIONS = [
  { label: 'RNT', sub: 'Registro Nacional de Turismo', desc: 'Habilitación oficial del MinCIT para operar como agencia de viajes intermediaria en Colombia.', value: '[PENDIENTE]', accent: '#22C55E' },
  { label: 'NIT', sub: 'Número de Identificación Tributaria', desc: 'Identificación fiscal ante la DIAN que garantiza la legalidad tributaria de nuestras operaciones.', value: '901543175-9', accent: '#F59E0B' },
  { label: 'ANATO', sub: 'Asociación Colombiana de Agencias', desc: 'Membresía activa en el gremio que agrupa y representa a las agencias de viajes colombianas.', value: 'Miembro Activo', accent: '#60a5fa' },
]

const LAWS = [
  { law: 'Ley 300 de 1996', title: 'Ley General de Turismo', desc: 'Marco jurídico que regula el ejercicio del turismo en Colombia y define los tipos de agencias y sus obligaciones.' },
  { law: 'Ley 1480 de 2011', title: 'Estatuto del Consumidor', desc: 'Garantiza los derechos del viajero: información veraz, garantías, reversión de pagos y acceso a PQR.' },
  { law: 'Ley 1581 de 2012', title: 'Protección de Datos', desc: 'Habeas Data: regula el tratamiento de sus datos personales. Consulte nuestra política completa.' },
  { law: 'NTS-AV 001–004', title: 'Normas Técnicas Sectoriales', desc: 'Estándares de calidad específicos para agencias de viajes intermediarias en Colombia.' },
]

/* ─── Main export ────────────────────────────────────────────────────────────── */
export default function IntermediacionSection() {
  const locale = useLocale()
  const isEs = locale === 'es'

  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* ── HERO ────────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-white pt-28 pb-20">
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(15,23,42,0.055) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* Green glow blob */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: '-10%', right: '0%', width: '50%', height: '80%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
          animate={{ x: [0, 20, -10, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container-wide relative z-10">
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-label text-[10px] text-[#22C55E]/70 uppercase tracking-[0.24em] mb-5"
          >
            <span className="w-5 h-px bg-[#22C55E]/40" />
            {isEs ? 'Marco legal · Colombia' : 'Legal framework · Colombia'}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-bold text-5xl sm:text-6xl lg:text-7xl text-[#0F172A] leading-[0.92] tracking-tight mb-6"
          >
            Intermediación<br />
            <span className="text-gradient-green">Turística</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="font-sans text-[#475569] text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
          >
            {isEs
              ? 'Horizontes Agencia de Viajes S.A.S. opera como agencia intermediaria legalmente habilitada por el Ministerio de Comercio, Industria y Turismo de Colombia, cumpliendo las Normas Técnicas Sectoriales NTS-AV vigentes.'
              : 'Horizontes Agencia de Viajes S.A.S. operates as a legally authorized intermediary agency by the Colombian Ministry of Commerce, Industry and Tourism, complying with current NTS-AV Technical Standards.'}
          </motion.p>

          {/* Trust pills row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-3"
          >
            {['🏅 RNT Certificado', '🌿 Miembro ANATO', '📋 NTS-AV 001–004', '⚖️ Ley 300/1996'].map((item, i) => (
              <span key={i}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full font-label text-[10px] uppercase tracking-wider border border-[#22C55E]/20 bg-[#22C55E]/6 text-[#475569]">
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── ¿QUÉ ES? ────────────────────────────────────────────────────────────── */}
      <div className="container-wide section-py">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          <FadeUp>
            <span className="flex items-center gap-2 font-label text-[10px] text-[#22C55E]/70 uppercase tracking-[0.22em] mb-4">
              <span className="w-5 h-px bg-[#22C55E]/40" /> {isEs ? 'Definición' : 'Definition'}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#0F172A] leading-tight mb-6">
              {isEs ? '¿Qué hace una agencia intermediaria?' : 'What does an intermediary agency do?'}
            </h2>
            <p className="font-sans text-[#475569] text-base leading-relaxed mb-5">
              {isEs
                ? 'Una agencia de viajes intermediaria actúa como puente entre el viajero y los prestadores directos de servicios turísticos — aerolíneas, hoteles, operadores locales y aseguradoras — gestionando la planificación, reserva y seguimiento de cada experiencia.'
                : 'A travel intermediary agency acts as a bridge between the traveler and direct tourism service providers — airlines, hotels, local operators, and insurers — managing the planning, booking, and follow-up of each experience.'}
            </p>
            <p className="font-sans text-[#475569] text-base leading-relaxed mb-8">
              {isEs
                ? 'En Colombia, esta actividad está regulada por la Ley 300 de 1996 (Ley General de Turismo) y debe estar inscrita ante el Registro Nacional de Turismo (RNT) del MinCIT, garantizando al viajero un servicio formal, seguro y con respaldo legal.'
                : 'In Colombia, this activity is regulated by Law 300 of 1996 (General Tourism Law) and must be registered with the National Tourism Registry (RNT) of MinCIT, guaranteeing the traveler a formal, safe service with legal backing.'}
            </p>
            <div className="space-y-3">
              {[
                isEs ? 'Negociamos tarifas preferenciales con proveedores certificados' : 'We negotiate preferential rates with certified providers',
                isEs ? 'Coordinamos logística completa: vuelos, hospedaje y traslados' : 'We coordinate full logistics: flights, accommodation and transfers',
                isEs ? 'Respondemos ante el viajero por el cumplimiento del paquete' : 'We are accountable to the traveler for package fulfillment',
                isEs ? 'Ofrecemos asesoría personalizada sin costo adicional' : 'We offer personalized advice at no extra cost',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#22C55E] mt-0.5 shrink-0" />
                  <span className="font-sans text-sm text-[#475569]">{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Right: visual */}
          <FadeUp delay={0.15}>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border border-[#22C55E]/15 p-8">
              <div className="absolute top-4 right-4 text-6xl opacity-10 pointer-events-none">⚖️</div>
              <div className="space-y-6">
                {[
                  { icon: '📋', title: isEs ? 'Registro Habilitante' : 'Enabling Registry', desc: isEs ? 'Inscripción ante el RNT del MinCIT' : 'Registered with MinCIT\'s RNT' },
                  { icon: '🤝', title: isEs ? 'Responsabilidad Intermediaria' : 'Intermediary Liability', desc: isEs ? 'Respondemos por los servicios pactados' : 'We are responsible for agreed services' },
                  { icon: '🛡️', title: isEs ? 'Protección al Consumidor' : 'Consumer Protection', desc: isEs ? 'Amparados bajo Ley 1480 de 2011' : 'Protected under Law 1480 of 2011' },
                  { icon: '🌿', title: isEs ? 'Turismo Sostenible' : 'Sustainable Tourism', desc: isEs ? 'Comprometidos con el medio ambiente' : 'Committed to the environment' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-[#22C55E]/15 flex items-center justify-center text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-sm text-[#0F172A] mb-0.5">{item.title}</p>
                      <p className="font-sans text-xs text-[#475569]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── NTS-AV NORMS ────────────────────────────────────────────────────────── */}
      <div className="bg-white">
        <div className="container-wide section-py">
          <FadeUp className="text-center mb-14">
            <span className="flex items-center justify-center gap-2 font-label text-[10px] text-[#22C55E]/70 uppercase tracking-[0.22em] mb-4">
              <span className="w-5 h-px bg-[#22C55E]/40" />
              {isEs ? 'Cumplimiento normativo' : 'Regulatory compliance'}
              <span className="w-5 h-px bg-[#22C55E]/40" />
            </span>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#0F172A] leading-tight mb-4">
              {isEs ? 'Normas Técnicas Sectoriales' : 'Sector Technical Standards'}
            </h2>
            <p className="font-sans text-[#475569] text-lg max-w-xl mx-auto">
              {isEs
                ? 'Las NTS-AV son la hoja de ruta de calidad que seguimos para garantizar una experiencia de primer nivel.'
                : 'NTS-AV standards are the quality roadmap we follow to guarantee a world-class experience.'}
            </p>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {NTS_NORMS.map((norm) => {
              const Icon = norm.icon
              return (
                <StaggerItem key={norm.code}>
                  <BorderGlow
                    glowColor={norm.glowColor}
                    backgroundColor="#ffffff"
                    colors={[...norm.colors]}
                    borderRadius={20}
                    glowRadius={28}
                    glowIntensity={1.0}
                    edgeSensitivity={25}
                    coneSpread={28}
                    animated
                    className="h-full"
                  >
                    <div className="p-6 flex flex-col gap-4 h-full min-h-[260px]">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${norm.colors[0]}18`, border: `1px solid ${norm.colors[0]}30` }}>
                          <Icon size={18} style={{ color: norm.colors[0] }} />
                        </div>
                        <span className="font-label text-[9px] uppercase tracking-widest px-2 py-1 rounded-full"
                          style={{ background: `${norm.colors[0]}12`, color: norm.colors[0], border: `1px solid ${norm.colors[0]}25` }}>
                          {norm.code}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#0F172A] leading-snug">
                        {norm.title}
                      </h3>
                      <p className="font-sans text-xs text-[#475569] leading-relaxed flex-1">
                        {norm.desc}
                      </p>
                    </div>
                  </BorderGlow>
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        </div>
      </div>

      {/* ── CERTIFICATIONS ──────────────────────────────────────────────────────── */}
      <div className="container-wide section-py">
        <FadeUp className="mb-12">
          <span className="flex items-center gap-2 font-label text-[10px] text-[#22C55E]/70 uppercase tracking-[0.22em] mb-4">
            <span className="w-5 h-px bg-[#22C55E]/40" />
            {isEs ? 'Registros oficiales' : 'Official registrations'}
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#0F172A] leading-tight">
            {isEs ? 'Certificaciones y Registros' : 'Certifications & Registrations'}
          </h2>
        </FadeUp>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <StaggerItem key={cert.label}>
              <div className="relative rounded-2xl p-7 border overflow-hidden"
                style={{ background: '#fff', borderColor: `${cert.accent}20` }}>
                {/* Accent blob */}
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10 pointer-events-none"
                  style={{ background: cert.accent }} />

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label font-bold text-2xl" style={{ color: cert.accent }}>
                      {cert.label}
                    </span>
                    <ShieldCheck size={20} style={{ color: cert.accent }} />
                  </div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">
                    {cert.sub}
                  </p>
                  <p className="font-sans text-xs text-[#475569] leading-relaxed mb-4">
                    {cert.desc}
                  </p>
                  <div className="font-label text-sm font-semibold" style={{ color: cert.accent }}>
                    {cert.value}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      {/* ── LEGAL FRAMEWORK ─────────────────────────────────────────────────────── */}
      <div className="bg-white">
        <div className="container-wide section-py">
          <FadeUp className="mb-12">
            <span className="flex items-center gap-2 font-label text-[10px] text-[#22C55E]/70 uppercase tracking-[0.22em] mb-4">
              <span className="w-5 h-px bg-[#22C55E]/40" />
              {isEs ? 'Marco jurídico' : 'Legal framework'}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#0F172A] leading-tight mb-3">
              {isEs ? 'Leyes que nos regulan' : 'Laws that regulate us'}
            </h2>
            <p className="font-sans text-[#475569] text-base max-w-xl">
              {isEs
                ? 'Como agencia intermediaria, operamos bajo un marco jurídico que protege tanto al viajero como a la empresa.'
                : 'As an intermediary agency, we operate under a legal framework that protects both the traveler and the company.'}
            </p>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LAWS.map((law, i) => (
              <StaggerItem key={law.law}>
                <motion.div
                  className="group relative p-7 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#22C55E]/30 hover:bg-white transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center shrink-0 text-xl">
                      {['⚖️', '🛡️', '🔒', '📋'][i]}
                    </div>
                    <div>
                      <span className="font-label text-[9px] uppercase tracking-widest text-[#22C55E] block mb-1">
                        {law.law}
                      </span>
                      <h3 className="font-serif font-semibold text-lg text-[#0F172A] mb-2">
                        {law.title}
                      </h3>
                      <p className="font-sans text-xs text-[#475569] leading-relaxed">
                        {law.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────────────────────── */}
      <div className="container-wide section-py">
        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-10 sm:p-14 text-center">
            {/* Green glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full bg-[#22C55E]/12 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <p className="font-label text-[10px] text-[#22C55E]/70 uppercase tracking-[0.22em] mb-4">
                {isEs ? 'Viaja con confianza' : 'Travel with confidence'}
              </p>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-4">
                {isEs ? '¿Tienes dudas sobre nuestros servicios?' : 'Questions about our services?'}
              </h2>
              <p className="font-sans text-[#94A3B8] text-base mb-8 max-w-lg mx-auto">
                {isEs
                  ? 'Nuestros asesores especializados te explican el proceso completo y resuelven tus inquietudes sin compromiso.'
                  : 'Our specialized advisors explain the full process and resolve your concerns with no commitment.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#22C55E] text-[#0F172A] font-sans font-semibold text-sm hover:bg-[#15803D] transition-colors">
                  {isEs ? 'Solicitar Asesoría' : 'Request Advice'} <ArrowUpRight size={14} />
                </Link>
                <Link href={`/${locale}/legal/terminos-condiciones`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-sans text-sm hover:border-[#22C55E]/40 hover:text-white transition-all">
                  {isEs ? 'Ver Términos' : 'View Terms'}
                </Link>
              </div>
              {/* Compliance strip */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10">
                {['NIT: 901543175-9', 'RNT: [PENDIENTE]', 'ANATO', 'NTS-AV 001–004'].map((item, i) => (
                  <span key={i} className="font-label text-[9px] text-white/25 uppercase tracking-wider">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
