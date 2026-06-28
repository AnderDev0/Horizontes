import { Metadata } from 'next'
import IntermediacionSection from '@/components/sections/IntermediacionSection'

export const metadata: Metadata = {
  title: 'Intermediación Turística',
  description:
    'Horizontes Agencia de Viajes S.A.S. — Marco normativo, certificaciones y cumplimiento legal como agencia intermediaria registrada ante el MinCIT. NTS-AV 001-004, RNT, ANATO.',
  keywords: ['intermediación turística', 'NTS-AV', 'RNT', 'agencia de viajes Colombia', 'ANATO', 'Ley 300 1996'],
}

export default function IntermediacionTuristicaPage() {
  return (
    <div className="pt-[var(--nav-height)]">
      <IntermediacionSection />
    </div>
  )
}
