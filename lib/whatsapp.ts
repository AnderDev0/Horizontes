const WA_NUMBER = '573046009206'
const WA_BASE = 'https://wa.me/'

export interface QuoteData {
  name: string
  phone: string
  destination: string
  travelers: string
  date: string
  budget: string
  experiences: string[]
  message?: string
  locale?: string
}

export function buildQuoteMessage(data: QuoteData, locale = 'es'): string {
  const isEs = locale === 'es'

  const intro = isEs
    ? `Hola Horizontes Agencia de Viajes! 👋\n\nSoy *${data.name}* y me interesa cotizar un viaje.\n\n`
    : `Hello Horizontes Travel Agency! 👋\n\nI'm *${data.name}* and I'd like to get a quote.\n\n`

  const details = isEs
    ? [
        `📍 *Destino:* ${data.destination}`,
        `👥 *Viajeros:* ${data.travelers}`,
        `📅 *Fecha aproximada:* ${data.date}`,
        `💰 *Presupuesto:* ${data.budget}`,
        data.experiences.length ? `✨ *Tipo de experiencia:* ${data.experiences.join(', ')}` : '',
        data.message ? `💬 *Mensaje:* ${data.message}` : '',
      ]
    : [
        `📍 *Destination:* ${data.destination}`,
        `👥 *Travelers:* ${data.travelers}`,
        `📅 *Approximate date:* ${data.date}`,
        `💰 *Budget:* ${data.budget}`,
        data.experiences.length ? `✨ *Experience type:* ${data.experiences.join(', ')}` : '',
        data.message ? `💬 *Message:* ${data.message}` : '',
      ]

  const closing = isEs
    ? `\n\nQuedo atento a su respuesta. ¡Gracias! 🌿`
    : `\n\nLooking forward to your reply. Thank you! 🌿`

  const body = details.filter(Boolean).join('\n')
  return encodeURIComponent(intro + body + closing)
}

export function getWhatsAppQuoteUrl(data: QuoteData, locale = 'es'): string {
  const message = buildQuoteMessage(data, locale)
  return `${WA_BASE}${WA_NUMBER}?text=${message}`
}

export function getWhatsAppDirectUrl(locale = 'es'): string {
  const msg = locale === 'es'
    ? encodeURIComponent('Hola Horizontes Agencia de Viajes! Me gustaría obtener más información sobre sus paquetes turísticos. 🌿')
    : encodeURIComponent('Hello Horizontes Travel Agency! I would like to get more information about your travel packages. 🌿')
  return `${WA_BASE}${WA_NUMBER}?text=${msg}`
}
