import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de los servicios de Horizontes Agencia de Viajes S.A.S.',
  robots: { index: false },
}

interface Props {
  params: Promise<{ locale: string }>
}

const LAST_UPDATED = '26 de junio de 2026'

export default async function TerminosPage({ params }: Props) {
  const { locale } = await params

  return (
    <div className="bg-night min-h-screen pt-[var(--nav-height)]">
      <div className="container-wide max-w-3xl py-16">

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-mist/60 hover:text-leaf text-sm font-sans transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          Volver al inicio
        </Link>

        <div className="border-b border-slate-border/30 pb-8 mb-10">
          <span className="font-label text-leaf text-xs uppercase tracking-widest block mb-3">
            Legal · Servicios Turísticos
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-2">
            Términos y Condiciones
          </h1>
          <p className="font-sans text-mist/60 text-sm">
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        <div className="font-sans text-mist/80 space-y-8">

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">1. Identificación del Prestador</h2>
            <p className="leading-relaxed">
              <strong className="text-white">HORIZONTES AGENCIA DE VIAJES S.A.S.</strong>, con NIT 901543175-9, inscrita en el Registro Nacional de Turismo (RNT No. [PENDIENTE]) del Ministerio de Comercio, Industria y Turismo de la República de Colombia, miembro de la Asociación Colombiana de Agencias de Viajes y Turismo (ANATO), con domicilio en Bogotá D.C., Colombia.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">2. Objeto</h2>
            <p className="leading-relaxed">
              Los presentes Términos y Condiciones regulan la relación contractual entre HORIZONTES AGENCIA DE VIAJES S.A.S. (en adelante "la Agencia") y los usuarios o clientes (en adelante "el Viajero") que adquieran o soliciten cotización de paquetes turísticos, reservas u otros servicios ofrecidos a través del sitio web o canales de atención oficiales.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">3. Naturaleza del Servicio</h2>
            <p className="leading-relaxed">
              La Agencia actúa como <strong className="text-white">intermediaria</strong> entre el Viajero y los proveedores de servicios turísticos (aerolíneas, hoteles, operadores locales, aseguradoras). La Agencia es responsable de la coordinación y contratación de los servicios ofrecidos en los paquetes turísticos, conforme a lo acordado contractualmente y a las normas NTS-AV 001, 002, 003 y 004.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">4. Tarifas y Condiciones de Pago</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Los precios de los paquetes serán los cotizados en la propuesta enviada al Viajero.</li>
              <li>Las tarifas pueden variar según disponibilidad, temporada y número de viajeros.</li>
              <li>Los precios cotizados son en <strong className="text-white">pesos colombianos (COP)</strong>, salvo indicación expresa en otra moneda.</li>
              <li>Se requerirá un anticipo del <strong className="text-white">50%</strong> para confirmar la reserva, y el saldo restante mínimo <strong className="text-white">15 días hábiles antes</strong> de la fecha de inicio del viaje.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">5. Política de Cancelación y Reembolsos</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-white">Cancelación con más de 30 días:</strong> Reembolso del 80% del valor pagado.</li>
              <li><strong className="text-white">Cancelación entre 15 y 30 días:</strong> Reembolso del 50% del valor pagado.</li>
              <li><strong className="text-white">Cancelación entre 8 y 14 días:</strong> Reembolso del 25% del valor pagado.</li>
              <li><strong className="text-white">Cancelación con menos de 7 días o no presentación:</strong> Sin reembolso.</li>
              <li>Los valores no reembolsables de tiquetes aéreos u otros servicios con política de no reembolso del proveedor serán descontados del reembolso correspondiente.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">6. Responsabilidades</h2>
            <p className="leading-relaxed mb-3">
              <strong className="text-white">La Agencia se compromete a:</strong>
            </p>
            <ul className="space-y-1.5 list-disc list-inside mb-4">
              <li>Gestionar las reservas y servicios contratados con diligencia y profesionalismo.</li>
              <li>Informar oportunamente sobre cambios o novedades que afecten el itinerario.</li>
              <li>Cumplir con los estándares de calidad establecidos en las normas NTS-AV.</li>
            </ul>
            <p className="leading-relaxed mb-3">
              <strong className="text-white">El Viajero se compromete a:</strong>
            </p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Proporcionar información verídica al momento de la contratación.</li>
              <li>Cumplir con los requisitos de ingreso al destino (documentos, visas, vacunas).</li>
              <li>Pagar los valores acordados en los plazos establecidos.</li>
              <li>Respetar las normas de los destinos y comunidades locales visitadas.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">7. Seguros de Viaje</h2>
            <p className="leading-relaxed">
              La Agencia <strong className="text-white">recomienda ampliamente</strong> la adquisición de un seguro de viaje que cubra cancelación, asistencia médica internacional, pérdida de equipaje y responsabilidad civil. Algunos paquetes incluyen seguro básico; verifique las condiciones en cada propuesta.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">8. Fuerza Mayor y Caso Fortuito</h2>
            <p className="leading-relaxed">
              La Agencia no será responsable por incumplimientos derivados de causas de fuerza mayor o caso fortuito (desastres naturales, pandemias, huelgas, decisiones gubernamentales, conflictos armados). En estos casos, se buscará la mejor solución posible para el Viajero, incluyendo la reprogramación del viaje.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">9. Protección al Consumidor</h2>
            <p className="leading-relaxed">
              En cumplimiento de la <strong className="text-white">Ley 1480 de 2011</strong> (Estatuto del Consumidor), el Viajero tiene derecho a recibir información veraz y suficiente sobre los servicios adquiridos. Las quejas y reclamaciones podrán presentarse a través del correo electrónico info@horizontesviajes.com.co o ante la <strong className="text-white">Superintendencia de Industria y Comercio (SIC)</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">10. Sostenibilidad y Turismo Responsable</h2>
            <p className="leading-relaxed">
              HORIZONTES AGENCIA DE VIAJES S.A.S. promueve el turismo sostenible y responsable. El Viajero acepta comportarse con respeto hacia los ecosistemas, las comunidades locales y el patrimonio cultural de los destinos visitados. La Agencia se reserva el derecho de excluir de un paquete a quienes incumplan estas condiciones sin reembolso.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">11. Jurisdicción y Ley Aplicable</h2>
            <p className="leading-relaxed">
              Los presentes Términos y Condiciones se rigen por las leyes de la <strong className="text-white">República de Colombia</strong>. Para la resolución de controversias, las partes se someten a la jurisdicción de los jueces y tribunales de <strong className="text-white">Bogotá D.C.</strong>, Colombia.
            </p>
          </section>

          <div className="mt-10 p-5 rounded-card border border-leaf/20 bg-leaf/5">
            <p className="font-label text-leaf text-xs uppercase tracking-wider mb-2">Cumplimiento normativo</p>
            <p className="font-sans text-mist/70 text-xs leading-relaxed">
              NIT: 901543175-9 · Miembro ANATO · RNT No. [PENDIENTE] ·
              Ley 300 de 1996 (Ley General de Turismo) · Ley 1480 de 2011 (Estatuto del Consumidor) ·
              Ley 1581 de 2012 (Protección de Datos) · NTS-AV 001 · 002 · 003 · 004
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
