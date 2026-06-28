import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { getWhatsAppDirectUrl } from '@/lib/whatsapp'

export default function Footer() {
  const t = useTranslations('footer')
  const tc = useTranslations('contact')
  const locale = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-night border-t border-slate-border/40">

      {/* Main footer content */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/logo.svg" alt="Horizontes" fill className="object-contain" />
              </div>
              <div>
                <p className="font-serif font-bold text-xl text-white">Horizontes</p>
                <p className="font-label text-[10px] text-leaf uppercase tracking-wider">Agencia de Viajes</p>
              </div>
            </Link>
            <p className="text-mist text-sm leading-relaxed mb-5 font-sans italic">
              "{t('slogan')}"
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-slate-border/60 flex items-center justify-center text-mist hover:text-leaf hover:border-leaf/50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-slate-border/60 flex items-center justify-center text-mist hover:text-leaf hover:border-leaf/50 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={getWhatsAppDirectUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-leaf/40 flex items-center justify-center text-leaf hover:bg-leaf hover:text-night transition-all"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-label text-xs uppercase tracking-widest text-mist mb-5">
              {t('destinations')}
            </h3>
            <ul className="space-y-3">
              {[
                { href: `/${locale}/destinos/cano-cristales`, label: 'Caño Cristales' },
                { href: `/${locale}/destinos/roma-italia`, label: 'Roma, Italia' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-mist hover:text-leaf text-sm font-sans transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-label text-xs uppercase tracking-widest text-mist mb-5">
              {t('company')}
            </h3>
            <ul className="space-y-3">
              {[
                { href: `/${locale}/nosotros`,                 label: t('about') },
                { href: `/${locale}/intermediacion-turistica`, label: locale === 'es' ? 'Intermediación Turística' : 'Tourism Intermediation' },
                { href: `/${locale}/proveedores`,              label: locale === 'es' ? 'Proveedores' : 'Partners' },
                { href: `/${locale}/contacto`,                 label: t('contact_footer') },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-mist hover:text-leaf text-sm font-sans transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={getWhatsAppDirectUrl(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist hover:text-leaf text-sm font-sans transition-colors"
                >
                  {t('whatsapp')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-label text-xs uppercase tracking-widest text-mist mb-5">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-mist">
                <MapPin size={14} className="text-leaf mt-0.5 shrink-0" />
                {tc('info.address')}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-mist">
                <Phone size={14} className="text-leaf mt-0.5 shrink-0" />
                +57 304 600 9206
              </li>
              <li className="flex items-start gap-2.5 text-sm text-mist">
                <Mail size={14} className="text-leaf mt-0.5 shrink-0" />
                {tc('info.email')}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-mist">
                <Clock size={14} className="text-leaf mt-0.5 shrink-0" />
                {tc('info.hours')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Compliance bar */}
      <div className="border-t border-slate-border/30">
        <div className="container-wide py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center md:justify-start">
              <span className="font-label text-xs text-mist/70">
                NIT: 901543175-9
              </span>
              <span className="text-slate-border/40">·</span>
              <span className="font-label text-xs text-mist/70">
                RNT No. <span className="text-leaf/80">[PENDIENTE]</span>
              </span>
              <span className="text-slate-border/40">·</span>
              <span className="font-label text-xs text-leaf/80 uppercase tracking-wider">
                Miembro ANATO
              </span>
              <span className="text-slate-border/40">·</span>
              <span className="font-label text-xs text-mist/70 uppercase tracking-wider">
                NTS-AV 001-004
              </span>
            </div>

            {/* Legal pages */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center">
              {[
                { href: `/${locale}/legal/terminos-condiciones`, label: t('terms') },
                { href: `/${locale}/legal/habeas-data`, label: t('habeas') },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-mist/60 hover:text-leaf text-xs font-sans transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-mist/40 text-xs font-sans mt-4">
            © {year} Horizontes Agencia de Viajes S.A.S. — {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
