'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { ShinyButton } from '@/components/ui/ShinyButton'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { getWhatsAppDirectUrl } from '@/lib/whatsapp'

export default function CTASection() {
  const t = useTranslations('cta')
  const locale = useLocale()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative bg-night overflow-hidden">
      <AuroraBackground className="absolute inset-0" intensity={0.6} />

      <div className="relative z-10 container-wide section-py text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <span className="flex items-center justify-center gap-2 font-label text-leaf/70 text-[10px] uppercase tracking-[0.2em] mb-6">
            <span className="w-4 h-px bg-leaf/50" />
            Viajemos juntos
            <span className="w-4 h-px bg-leaf/50" />
          </span>

          <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-tight">
            {t('title')}
          </h2>

          <p className="font-sans text-mist/60 text-lg mb-10 leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShinyButton
              as="a"
              href={getWhatsAppDirectUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('whatsapp')}
            </ShinyButton>

            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/12 text-mist/70 font-sans text-sm tracking-wide hover:border-leaf/40 hover:text-white transition-all duration-300"
            >
              {t('quote')}
            </Link>
          </div>

          {/* Compliance micro-row */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-12">
            {[
              'NIT: 901543175-9',
              'RNT: [PENDIENTE]',
              'ANATO',
              'Ley 1581/2012',
            ].map((item, i) => (
              <span key={i} className="font-label text-[9px] text-mist/25 uppercase tracking-wider">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
