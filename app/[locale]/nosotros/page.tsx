import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conoce a Horizontes Agencia de Viajes: nuestra misión, visión, valores y compromiso con el turismo sostenible en Colombia.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function NosotrosPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('about')
  const tw = await getTranslations('why')

  const values = [
    { icon: '❤️', key: 'service' as const },
    { icon: '⭐', key: 'quality' as const },
    { icon: '🌿', key: 'sustainability' as const },
    { icon: '💡', key: 'innovation' as const },
  ]

  return (
    <div className="bg-night min-h-screen pt-[var(--nav-height)]">

      {/* Hero */}
      <div className="section-py bg-dusk/40 border-b border-slate-border/30">
        <div className="container-wide text-center">
          <span className="font-label text-leaf text-xs uppercase tracking-[0.16em] mb-3 block">
            Horizontes Agencia de Viajes S.A.S.
          </span>
          <h1 className="font-serif font-bold text-5xl sm:text-6xl text-white mb-4">
            {t('title')}
          </h1>
          <p className="font-sans text-mist text-xl italic">
            "{t('slogan')}"
          </p>
        </div>
      </div>

      <div className="container-wide section-py">

        {/* Mission / Vision / Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: '🎯', title: t('mission_title'), body: t('mission') },
            { icon: '🔭', title: t('vision_title'), body: t('vision') },
            { icon: '🌱', title: t('purpose_title'), body: t('purpose') },
          ].map(({ icon, title, body }) => (
            <div key={title} className="p-8 rounded-card border border-slate-border/50 bg-dusk">
              <span className="text-4xl mb-5 block">{icon}</span>
              <h2 className="font-serif font-bold text-xl text-white mb-3 heading-underline">
                {title}
              </h2>
              <p className="font-sans text-mist text-sm leading-relaxed mt-5">{body}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
              {tw('title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, key }) => (
              <div
                key={key}
                className="p-6 rounded-card border border-slate-border/50 bg-dusk/50 hover:border-leaf/40 transition-colors"
              >
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-serif font-semibold text-lg text-white mb-2">
                  {tw(`values.${key}.title`)}
                </h3>
                <p className="font-sans text-mist text-sm leading-relaxed">
                  {tw(`values.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal info */}
        <div className="rounded-card border border-leaf/20 bg-leaf/5 p-8">
          <h2 className="font-serif font-bold text-2xl text-white mb-6 heading-underline">
            {locale === 'es' ? 'Información legal' : 'Legal information'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Razón Social', value: 'Horizontes Agencia de Viajes S.A.S.' },
              { label: 'NIT', value: '901543175-9' },
              { label: 'RNT', value: '[PENDIENTE — MinCIT]' },
              { label: 'Membresía', value: 'ANATO • NTS-AV 001-004' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-label text-leaf text-xs uppercase tracking-wider mb-1">{label}</p>
                <p className="font-sans text-white text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  )
}
