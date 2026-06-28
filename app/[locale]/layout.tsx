import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Playfair_Display, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import ScrollProgress from '@/components/animations/ScrollProgress'
import CursorFollower from '@/components/ui/CursorFollower'
import '@/app/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--loaded-serif',
  display: 'swap',
})

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--loaded-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--loaded-label',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Horizontes Agencia de Viajes — Experiencias que transforman',
    template: '%s | Horizontes Agencia de Viajes',
  },
  description:
    'Agencia de viajes premium en Colombia. Paquetes de ecoturismo, aventura y lujo a Caño Cristales, Italia y más. RNT certificado. Miembro ANATO.',
  keywords: [
    'agencia de viajes Colombia',
    'turismo sostenible',
    'Caño Cristales',
    'Roma Italia',
    'ecoturismo',
    'paquetes turísticos premium',
    'ANATO',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Horizontes Agencia de Viajes',
  },
  robots: { index: true, follow: true },
}

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params

    if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${jakartaSans.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <CursorFollower />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
