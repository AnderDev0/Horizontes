import { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import StorytellingSection from '@/components/sections/StorytellingSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Horizontes Agencia de Viajes — Experiencias que transforman',
  description:
    'Agencia de viajes premium en Colombia. Paquetes de ecoturismo y lujo a Caño Cristales, Italia y más. RNT certificado. Miembro ANATO.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StorytellingSection />
      <WhyUsSection />
      <CTASection />
    </>
  )
}
