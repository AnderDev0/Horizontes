import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales',
  description:
    'Política de Habeas Data de Horizontes Agencia de Viajes S.A.S. — Ley 1581 de 2012.',
  robots: { index: false },
}

interface Props {
  params: Promise<{ locale: string }>
}

const LAST_UPDATED = '26 de junio de 2026'

export default async function HabeasDataPage({ params }: Props) {
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
            Legal · Cumplimiento Ley 1581 de 2012
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-2">
            Política de Tratamiento de Datos Personales
          </h1>
          <p className="font-sans text-mist/60 text-sm">
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none font-sans text-mist/80 space-y-8">

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">1. Responsable del Tratamiento</h2>
            <p className="leading-relaxed">
              <strong className="text-white">HORIZONTES AGENCIA DE VIAJES S.A.S.</strong><br />
              NIT: 901543175-9<br />
              Domicilio: Bogotá D.C., Colombia<br />
              Correo electrónico: info@horizontesviajes.com.co<br />
              Teléfono: +57 304 600 9206
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">2. Marco Legal</h2>
            <p className="leading-relaxed">
              La presente Política se expide en cumplimiento de la <strong className="text-white">Ley Estatutaria 1581 de 2012</strong> sobre Protección de Datos Personales, el <strong className="text-white">Decreto 1377 de 2013</strong> y la Circular Externa 002 de 2015 de la Superintendencia de Industria y Comercio (SIC), y las normas que los modifiquen o sustituyan.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">3. Datos Personales que se Recopilan</h2>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Nombre completo y número de documento de identidad</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono o WhatsApp</li>
              <li>Información sobre preferencias de viaje, destino, fechas, número de viajeros y presupuesto</li>
              <li>Cualquier otro dato suministrado voluntariamente a través de los formularios del sitio web o canales de atención</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">4. Finalidades del Tratamiento</h2>
            <p className="leading-relaxed mb-3">Los datos personales recopilados serán utilizados para:</p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Gestionar solicitudes de cotización y diseño de paquetes turísticos personalizados</li>
              <li>Contactar al titular para el envío de propuestas, confirmaciones y actualizaciones</li>
              <li>Atender solicitudes, peticiones, quejas y reclamos (PQR)</li>
              <li>Cumplir con obligaciones contractuales derivadas de la prestación de servicios turísticos</li>
              <li>Enviar información comercial sobre destinos, promociones y servicios (solo con autorización expresa)</li>
              <li>Dar cumplimiento a obligaciones legales ante autoridades competentes (MinCIT, ANATO, DIAN)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">5. Derechos del Titular</h2>
            <p className="leading-relaxed mb-3">El titular de los datos personales tiene los siguientes derechos:</p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li><strong className="text-white">Conocer, actualizar y rectificar</strong> sus datos personales</li>
              <li><strong className="text-white">Solicitar prueba</strong> de la autorización otorgada para el tratamiento</li>
              <li><strong className="text-white">Ser informado</strong> sobre el uso que se ha dado a sus datos</li>
              <li><strong className="text-white">Revocar la autorización</strong> y/o solicitar la supresión de sus datos cuando no exista obligación legal de conservarlos</li>
              <li><strong className="text-white">Acceder gratuitamente</strong> a sus datos que hayan sido objeto de tratamiento</li>
              <li><strong className="text-white">Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">6. Mecanismos para Ejercer los Derechos</h2>
            <p className="leading-relaxed">
              Para ejercer sus derechos, el titular o sus causahabientes podrán dirigir comunicación escrita al correo electrónico{' '}
              <strong className="text-white">info@horizontesviajes.com.co</strong> indicando: nombre completo, número de documento de identidad, descripción detallada de la solicitud y datos de contacto para respuesta.
            </p>
            <p className="leading-relaxed mt-3">
              HORIZONTES AGENCIA DE VIAJES S.A.S. atenderá la solicitud dentro de los plazos establecidos por la ley:{' '}
              <strong className="text-white">10 días hábiles para consultas</strong> y{' '}
              <strong className="text-white">15 días hábiles para reclamos</strong> (prorrogables por 8 días hábiles más).
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">7. Transferencia y Transmisión de Datos</h2>
            <p className="leading-relaxed">
              Los datos personales no serán vendidos ni cedidos a terceros sin autorización expresa del titular, salvo cuando sea estrictamente necesario para la prestación del servicio contratado (aerolíneas, hoteles, operadores turísticos locales, aseguradoras de viaje) o cuando exista una obligación legal que lo requiera.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">8. Medidas de Seguridad</h2>
            <p className="leading-relaxed">
              HORIZONTES AGENCIA DE VIAJES S.A.S. adopta las medidas técnicas, humanas y administrativas necesarias para garantizar la seguridad de los datos personales recopilados, evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">9. Vigencia</h2>
            <p className="leading-relaxed">
              La presente política rige a partir de su fecha de publicación. Los datos personales serán conservados durante el tiempo necesario para cumplir con las finalidades del tratamiento y las obligaciones legales aplicables, con un <strong className="text-white">mínimo de cinco (5) años</strong> contados desde la última interacción con el titular, salvo disposición legal en contrario.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">10. Cambios a la Política</h2>
            <p className="leading-relaxed">
              HORIZONTES AGENCIA DE VIAJES S.A.S. se reserva el derecho de modificar la presente política en cualquier momento. Cualquier cambio sustancial será notificado a los titulares a través del sitio web oficial con al menos <strong className="text-white">quince (15) días calendarios</strong> de antelación a su entrada en vigencia.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-xl text-white mb-3">11. Autoridad de Control</h2>
            <p className="leading-relaxed">
              La Superintendencia de Industria y Comercio (SIC) es la autoridad de protección de datos en Colombia. Para más información, visite{' '}
              <a
                href="https://www.sic.gov.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-leaf underline hover:no-underline"
              >
                www.sic.gov.co
              </a>.
            </p>
          </section>

          <div className="mt-10 p-5 rounded-card border border-leaf/20 bg-leaf/5">
            <p className="font-label text-leaf text-xs uppercase tracking-wider mb-2">
              Cumplimiento normativo
            </p>
            <p className="font-sans text-mist/70 text-xs leading-relaxed">
              NIT: 901543175-9 · Miembro ANATO · RNT No. [PENDIENTE] ·
              Normas NTS-AV 001 · 002 · 003 · 004 ·
              Ley 1480 de 2011 (Estatuto del Consumidor) · Ley 300 de 1996 (Ley General de Turismo)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
