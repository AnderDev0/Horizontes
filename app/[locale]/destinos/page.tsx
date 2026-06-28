import { Metadata } from 'next'
import DestinationsGrid from '@/components/sections/DestinationsGrid'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Destinos',
  description:
    'Descubre nuestros paquetes premium: Caño Cristales en Colombia y Roma Italia en Europa. Ecoturismo, aventura y lujo.',
}

export default function DestinosPage() {
  return (
    <div className="pt-[var(--nav-height)]">
      <div className="bg-night section-py">
        <div className="container-wide text-center">
          <span className="font-label text-leaf text-xs uppercase tracking-[0.16em] mb-3 block">
            Portafolio 2026
          </span>
          <h1 className="font-serif font-bold text-5xl sm:text-6xl text-white mb-4">
            Nuestros Destinos
          </h1>
          <p className="font-sans text-mist text-lg max-w-xl mx-auto">
            Paquetes cuidadosamente diseñados para que vivas experiencias que transforman.
          </p>
        </div>
      </div>
      <DestinationsGrid />
      <CTASection />
    </div>
  )
}
