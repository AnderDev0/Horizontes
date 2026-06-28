'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { getWhatsAppDirectUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: `/${locale}/destinos`, label: t('destinations') },
    { href: `/${locale}/intermediacion-turistica`, label: locale === 'es' ? 'Intermediación' : 'About Agency' },
    { href: `/${locale}/nosotros`, label: t('about') },
    { href: `/${locale}/contacto`, label: t('contact') },
  ]

  const otherLocale = locale === 'es' ? 'en' : 'es'
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Pill container */}
        <div
          className={cn(
            'w-full max-w-5xl flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500',
            scrolled
              ? 'bg-night/90 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30'
              : 'bg-white/60 backdrop-blur-md border border-black/6 shadow-sm shadow-black/5'
          )}
          style={{ height: '60px' }}
        >
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
            <div className="relative w-8 h-8">
              <Image
                src="/LogoHorizontes.svg"
                alt="Horizontes Agencia de Viajes"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className={cn(
                'font-serif font-bold text-base leading-tight tracking-tight transition-colors duration-300',
                scrolled ? 'text-white' : 'text-[#0F172A]'
              )}>
                Horizontes
              </p>
              <p className="font-label text-[8px] text-leaf uppercase tracking-[0.16em] leading-none">
                Agencia de Viajes
              </p>
            </div>
          </Link>

          {/* Desktop nav — center */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
              'font-sans text-xs uppercase tracking-widest relative group transition-colors duration-200',
              scrolled ? 'text-mist/70 hover:text-white' : 'text-[#475569] hover:text-[#0F172A]'
            )}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-leaf transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* RNT pill */}
            <span className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-leaf/25 bg-leaf/8 text-leaf font-label text-[9px] uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-leaf animate-pulse" />
              RNT
            </span>

            {/* Language */}
            <Link
              href={otherPath}
              className="flex items-center gap-1 text-mist/50 hover:text-white text-xs transition-colors uppercase font-label tracking-wider"
            >
              <Globe2 size={12} />
              {otherLocale}
            </Link>

            {/* CTA */}
            <a
              href={getWhatsAppDirectUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-leaf text-night font-sans font-semibold text-xs uppercase tracking-wider hover:bg-forest transition-colors duration-200"
            >
              {t('quote')}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white p-1.5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-night/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-mist/60 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X size={22} />
            </button>

            {/* Logo */}
            <div className="absolute top-6 left-6 flex items-center gap-2.5">
              <div className="relative w-7 h-7">
                <Image src="/LogoHorizontes.svg" alt="Horizontes" fill className="object-contain" />
              </div>
              <span className="font-serif text-white font-bold text-base">Horizontes</span>
            </div>

            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-4xl font-bold text-white hover:text-leaf transition-colors"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}

            <motion.a
              href={getWhatsAppDirectUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.28 }}
              className="mt-4 px-10 py-4 rounded-full bg-leaf text-night font-semibold font-sans text-sm uppercase tracking-wider"
            >
              {t('quote')}
            </motion.a>

            <Link
              href={otherPath}
              onClick={() => setMobileOpen(false)}
              className="font-label text-mist/40 text-xs uppercase tracking-widest"
            >
              {otherLocale === 'en' ? 'English' : 'Español'}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
