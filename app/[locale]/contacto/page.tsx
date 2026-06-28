'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Shield } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { getWhatsAppQuoteUrl } from '@/lib/whatsapp'
import { destinations } from '@/content/destinations'

const schema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(7, 'Teléfono requerido'),
  destination: z.string().min(1, 'Selecciona un destino'),
  travelers: z.string().min(1, 'Requerido'),
  date: z.string().min(1, 'Fecha requerida'),
  budget: z.string().min(1, 'Selecciona un presupuesto'),
  experiences: z.array(z.string()).min(1, 'Selecciona al menos un tipo'),
  message: z.string().optional(),
  habeasData: z.boolean().refine((v) => v === true, {
    message: 'Debes aceptar el tratamiento de datos',
  }),
})

type FormData = z.infer<typeof schema>

const EXPERIENCE_TYPES = ['eco', 'adventure', 'luxury', 'corporate', 'family', 'romantic'] as const

export default function ContactoPage() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { experiences: [] },
  })

  const experiences = watch('experiences') ?? []

  function toggleExp(val: string) {
    const current = experiences
    if (current.includes(val)) {
      setValue('experiences', current.filter((e) => e !== val))
    } else {
      setValue('experiences', [...current, val])
    }
  }

  function onSubmit(data: FormData) {
    const destName = destinations.find((d) => d.slug === data.destination)?.[
      locale === 'es' ? 'nameEs' : 'nameEn'
    ] ?? data.destination

    const expLabels = data.experiences.map((e) => t(`form.${e}` as any))

    const url = getWhatsAppQuoteUrl(
      {
        name: data.name,
        phone: data.phone,
        destination: destName,
        travelers: data.travelers,
        date: data.date,
        budget: data.budget,
        experiences: expLabels,
        message: data.message,
      },
      locale
    )

    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <div className="bg-night min-h-screen pt-[var(--nav-height)]">

      {/* Hero */}
      <div className="bg-dusk/40 border-b border-slate-border/30 section-py">
        <div className="container-wide text-center">
          <span className="font-label text-leaf text-xs uppercase tracking-[0.16em] mb-3 block">
            Hablemos
          </span>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white mb-4">
            {t('title')}
          </h1>
          <p className="font-sans text-mist text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-card border border-slate-border/50 bg-dusk p-8">
              <h2 className="font-serif font-bold text-2xl text-white mb-8 heading-underline">
                {t('form.submit')}
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-5xl mb-4">🎉</p>
                  <h3 className="font-serif font-bold text-2xl text-white mb-3">
                    {locale === 'es' ? '¡Listo! WhatsApp abierto' : 'Done! WhatsApp opened'}
                  </h3>
                  <p className="font-sans text-mist">
                    {locale === 'es'
                      ? 'Tu solicitud fue enviada. Pronto te contactaremos.'
                      : 'Your request was sent. We will contact you soon.'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-label text-xs text-mist/70 uppercase tracking-wider block mb-1.5">
                        {t('form.name')} *
                      </label>
                      <input
                        {...register('name')}
                        placeholder="María García"
                        className="w-full px-4 py-3 rounded-xl bg-night border border-slate-border/60 text-white font-sans text-sm placeholder:text-mist/40 focus:outline-none focus:border-leaf/60 transition-colors"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="font-label text-xs text-mist/70 uppercase tracking-wider block mb-1.5">
                        {t('form.email')} *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="maria@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-night border border-slate-border/60 text-white font-sans text-sm placeholder:text-mist/40 focus:outline-none focus:border-leaf/60 transition-colors"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Phone + Travelers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-label text-xs text-mist/70 uppercase tracking-wider block mb-1.5">
                        {t('form.phone')} *
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+57 300 000 0000"
                        className="w-full px-4 py-3 rounded-xl bg-night border border-slate-border/60 text-white font-sans text-sm placeholder:text-mist/40 focus:outline-none focus:border-leaf/60 transition-colors"
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="font-label text-xs text-mist/70 uppercase tracking-wider block mb-1.5">
                        {t('form.travelers')} *
                      </label>
                      <input
                        {...register('travelers')}
                        type="number"
                        min={1}
                        placeholder="2"
                        className="w-full px-4 py-3 rounded-xl bg-night border border-slate-border/60 text-white font-sans text-sm placeholder:text-mist/40 focus:outline-none focus:border-leaf/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="font-label text-xs text-mist/70 uppercase tracking-wider block mb-1.5">
                      {t('form.destination')} *
                    </label>
                    <select
                      {...register('destination')}
                      className="w-full px-4 py-3 rounded-xl bg-night border border-slate-border/60 text-white font-sans text-sm focus:outline-none focus:border-leaf/60 transition-colors"
                    >
                      <option value="" className="text-mist/50">{t('form.destination_placeholder')}</option>
                      {destinations.map((d) => (
                        <option key={d.slug} value={d.slug} className="bg-night">
                          {locale === 'es' ? d.nameEs : d.nameEn} — {d.flag} {d.country}
                        </option>
                      ))}
                    </select>
                    {errors.destination && <p className="text-red-400 text-xs mt-1">{errors.destination.message}</p>}
                  </div>

                  {/* Date + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-label text-xs text-mist/70 uppercase tracking-wider block mb-1.5">
                        {t('form.date')} *
                      </label>
                      <input
                        {...register('date')}
                        type="month"
                        className="w-full px-4 py-3 rounded-xl bg-night border border-slate-border/60 text-white font-sans text-sm focus:outline-none focus:border-leaf/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-label text-xs text-mist/70 uppercase tracking-wider block mb-1.5">
                        {t('form.budget')} *
                      </label>
                      <select
                        {...register('budget')}
                        className="w-full px-4 py-3 rounded-xl bg-night border border-slate-border/60 text-white font-sans text-sm focus:outline-none focus:border-leaf/60 transition-colors"
                      >
                        <option value="" className="text-mist/50">{t('form.budget_placeholder')}</option>
                        {['budget_1', 'budget_2', 'budget_3'].map((k) => (
                          <option key={k} value={t(`form.${k}` as any)} className="bg-night">
                            {t(`form.${k}` as any)}
                          </option>
                        ))}
                      </select>
                      {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget.message}</p>}
                    </div>
                  </div>

                  {/* Experience type */}
                  <div>
                    <label className="font-label text-xs text-mist/70 uppercase tracking-wider block mb-3">
                      {t('form.experience_type')} *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EXPERIENCE_TYPES.map((exp) => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => toggleExp(exp)}
                          className={`px-4 py-2 rounded-full text-sm font-sans border transition-all ${
                            experiences.includes(exp)
                              ? 'bg-leaf border-leaf text-night font-semibold'
                              : 'border-slate-border/50 text-mist hover:border-leaf/40 hover:text-white'
                          }`}
                        >
                          {t(`form.${exp}` as any)}
                        </button>
                      ))}
                    </div>
                    {errors.experiences && (
                      <p className="text-red-400 text-xs mt-1">{errors.experiences.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-label text-xs text-mist/70 uppercase tracking-wider block mb-1.5">
                      {t('form.message')}
                    </label>
                    <textarea
                      {...register('message')}
                      rows={3}
                      placeholder={locale === 'es' ? 'Cuéntanos más sobre lo que sueñas...' : 'Tell us more about what you dream...'}
                      className="w-full px-4 py-3 rounded-xl bg-night border border-slate-border/60 text-white font-sans text-sm placeholder:text-mist/40 focus:outline-none focus:border-leaf/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Habeas Data */}
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-border/40 bg-night">
                    <input
                      {...register('habeasData')}
                      type="checkbox"
                      id="habeasData"
                      className="mt-0.5 w-4 h-4 accent-leaf shrink-0"
                    />
                    <label htmlFor="habeasData" className="font-sans text-mist/80 text-xs leading-relaxed cursor-pointer">
                      {t('form.habeas_data')}{' '}
                      <Link href={`/${locale}/legal/habeas-data`} className="text-leaf underline hover:no-underline">
                        Leer política
                      </Link>
                    </label>
                  </div>
                  {errors.habeasData && (
                    <p className="text-red-400 text-xs">{errors.habeasData.message}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-leaf text-night font-semibold font-sans text-base hover:bg-forest transition-colors hover-glow"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t('form.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2 space-y-6">

            {/* Contact info */}
            <div className="rounded-card border border-slate-border/50 bg-dusk p-6">
              <h3 className="font-serif font-bold text-xl text-white mb-5">
                {locale === 'es' ? 'Información de contacto' : 'Contact information'}
              </h3>
              <ul className="space-y-4">
                {[
                  { Icon: MapPin, text: t('info.address') },
                  { Icon: Phone, text: '+57 304 600 9206' },
                  { Icon: Mail, text: t('info.email') },
                  { Icon: Clock, text: t('info.hours') },
                ].map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-mist text-sm font-sans">
                    <Icon size={15} className="text-leaf mt-0.5 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust badges */}
            <div className="rounded-card border border-leaf/20 bg-leaf/5 p-6">
              <h3 className="font-label text-xs text-leaf uppercase tracking-widest mb-4">
                {locale === 'es' ? 'Agencia certificada' : 'Certified agency'}
              </h3>
              <div className="space-y-3">
                {[
                  { icon: '📋', label: 'NIT: 901543175-9' },
                  { icon: '🏅', label: 'RNT No. [PENDIENTE]' },
                  { icon: '🌿', label: locale === 'es' ? 'Miembro ANATO' : 'ANATO Member' },
                  { icon: '📜', label: 'NTS-AV 001 • 002 • 003 • 004' },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-3 text-mist/80 text-sm font-sans">
                    <span className="text-lg shrink-0">{b.icon}</span>
                    {b.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Habeas data notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-border/30 bg-night">
              <Shield size={16} className="text-mist/50 mt-0.5 shrink-0" />
              <p className="font-sans text-mist/60 text-xs leading-relaxed">
                {locale === 'es'
                  ? 'Tus datos son tratados conforme a la Ley 1581 de 2012. Consulta nuestra '
                  : 'Your data is handled in compliance with Law 1581 of 2012. See our '}
                <Link
                  href={`/${locale}/legal/habeas-data`}
                  className="text-leaf/80 underline hover:no-underline"
                >
                  {locale === 'es' ? 'Política de Habeas Data' : 'Habeas Data Policy'}
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
