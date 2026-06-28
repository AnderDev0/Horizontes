export interface DayItinerary {
  day: number
  title: string
  description: string
}

export interface Destination {
  slug: string
  nameEs: string
  nameEn: string
  subtitleEs: string
  subtitleEn: string
  taglineEs: string
  taglineEn: string
  location: string
  country: string
  flag: string
  duration: string
  durationEn: string
  category: 'eco' | 'luxury' | 'adventure'
  lat: number
  lon: number
  coverImage: string
  includes: string[]
  includesEn: string[]
  gastronomy: string[]
  itineraryEs: DayItinerary[]
  itineraryEn: DayItinerary[]
  sustainability: string
  sustainabilityEn: string
}

export const destinations: Destination[] = [
  {
    slug: 'cano-cristales',
    nameEs: 'Caño Cristales',
    nameEn: 'Caño Cristales',
    subtitleEs: 'El Río de los Cinco Colores y el Cielo de las Mil Estrellas',
    subtitleEn: 'The River of Five Colors and the Sky of a Thousand Stars',
    taglineEs: 'Desconexión total en el paraíso natural de Colombia',
    taglineEn: 'Total disconnection in Colombia\'s natural paradise',
    location: 'Sierra de La Macarena, Meta',
    country: 'Colombia',
    flag: '🇨🇴',
    duration: '4 días / 3 noches',
    durationEn: '4 days / 3 nights',
    category: 'eco',
    lat: 2.18,
    lon: -73.78,
    coverImage: '/assets/cano-cristales-cover.jpg',
    includes: [
      'Tiquetes aéreos Bogotá ↔ La Macarena',
      'Alojamiento 3 noches en lodge boutique',
      'Guía local certificado',
      'Alimentación completa (desayuno, almuerzo, cena)',
      'Traslados terrestres y fluviales',
      'Seguro de viaje',
      'Actividades incluidas en itinerario',
      'Pasaporte de los 7 Colores (recuerdo)',
    ],
    includesEn: [
      'Round-trip flights Bogotá ↔ La Macarena',
      '3-night boutique lodge accommodation',
      'Certified local guide',
      'Full board (breakfast, lunch, dinner)',
      'Land and river transfers',
      'Travel insurance',
      'All activities in itinerary',
      '"Passport of 7 Colors" souvenir',
    ],
    gastronomy: [
      'Plato Macarenense',
      'Fiambre Macarenense',
      'Mamona (Ternera a la llanera)',
      'Plátano con melao',
    ],
    sustainability: 'Parte de tu reserva apoya la conservación del Parque Nacional Natural Serranía de la Macarena y las comunidades locales que habitan este territorio sagrado.',
    sustainabilityEn: 'Part of your booking supports the conservation of the Serranía de la Macarena National Park and the local communities that inhabit this sacred territory.',
    itineraryEs: [
      {
        day: 1,
        title: 'Bienvenida al Llano',
        description: 'Vuelo desde Bogotá a La Macarena. Recepción y check-in en lodge boutique. Bebida temática de bienvenida. Tarde: Charla local "Historias del Territorio" con guía nativo. Atardecer llanero en mirador panorámico, degustación de gastronomía típica y cena temática bajo las estrellas.',
      },
      {
        day: 2,
        title: 'El Río de los Cinco Colores',
        description: 'Desayuno energético. Navegación por el Río Guayabero. Acceso al parque y recorrido por los puntos icónicos: "Los Ochos", "Piscina del Turista", "Tapete Rojo" y cascadas. Almuerzo campestre en orilla del río. Reto fotográfico grupal. Actividad "Carta del Futuro": escribe a quien serás en 5 años.',
      },
      {
        day: 3,
        title: 'Biodiversidad & Estrellas',
        description: 'Senderismo de observación de flora endémica y avistamiento de aves (más de 400 especies). Almuerzo con Mamona llanera. Tarde libre para fotografía y baños en pozos naturales. Noche mágica: Actividad "Cielo de las Mil Estrellas" — fogata, bebida caliente, astronomía guiada, cena de despedida y entrega del "Pasaporte de los 7 Colores".',
      },
      {
        day: 4,
        title: 'Retorno con el Alma Llena',
        description: 'Meditación matutina al amanecer. Desayuno. Tiempo libre para últimas fotos. Traslado al aeropuerto. Vuelo de regreso a Bogotá.',
      },
    ],
    itineraryEn: [
      {
        day: 1,
        title: 'Welcome to the Plains',
        description: 'Flight from Bogotá to La Macarena. Reception and check-in at boutique lodge. Welcome themed drink. Afternoon: "Territorial Stories" local talk with native guide. Llanos sunset at panoramic viewpoint, tasting of traditional cuisine and themed dinner under the stars.',
      },
      {
        day: 2,
        title: 'The River of Five Colors',
        description: 'Energizing breakfast. Navigation along the Guayabero River. Park access and tour of iconic spots: "Los Ochos", "Piscina del Turista", "Red Carpet" and waterfalls. Riverside camp lunch. Group photo challenge. "Letter to the Future" activity: write to the person you\'ll be in 5 years.',
      },
      {
        day: 3,
        title: 'Biodiversity & Stars',
        description: 'Trekking to observe endemic flora and birdwatching (over 400 species). Lunch with Llanos-style beef. Free time for photography and natural pool swimming. Magical night: "Sky of a Thousand Stars" activity — bonfire, hot drink, guided astronomy, farewell dinner and "Passport of 7 Colors" delivery.',
      },
      {
        day: 4,
        title: 'Return with a Full Soul',
        description: 'Morning meditation at sunrise. Breakfast. Free time for last photos. Transfer to airport. Return flight to Bogotá.',
      },
    ],
  },
  {
    slug: 'roma-italia',
    nameEs: 'Roma Infinita',
    nameEn: 'Roma Infinita',
    subtitleEs: 'El Gran Tour de Lujo por Italia',
    subtitleEn: 'The Grand Luxury Tour of Italy',
    taglineEs: 'Historia, arte, gastronomía de gama alta, moda y romance',
    taglineEn: 'History, art, fine dining, fashion and romance',
    location: 'Roma, Costa Amalfitana & Maranello',
    country: 'Italia',
    flag: '🇮🇹',
    duration: '8 días / 7 noches',
    durationEn: '8 days / 7 nights',
    category: 'luxury',
    lat: 41.9028,
    lon: 12.4964,
    coverImage: '/assets/roma-cover.jpg',
    includes: [
      'Tiquetes aéreos internacionales Bogotá ↔ Roma',
      'Alojamiento 7 noches en hoteles boutique 4★',
      'Guía especializado en historia italiana',
      'Alimentación según itinerario',
      'Traslados VIP en todo el recorrido',
      'Seguro de viaje internacional',
      'Entradas a todos los sitios del itinerario',
      'Experiencias exclusivas incluidas',
    ],
    includesEn: [
      'International round-trip flights Bogotá ↔ Rome',
      '7-night accommodation in 4★ boutique hotels',
      'Specialized Italian history guide',
      'Meals as per itinerary',
      'VIP transfers throughout',
      'International travel insurance',
      'All venue entry fees',
      'All exclusive experiences included',
    ],
    gastronomy: [
      'Pizza Napolitana artesanal',
      'Carbonara clásica romana',
      'Lasagna al Forno',
      'Tiramisú casero',
      'Cata de vinos en bodega histórica',
    ],
    sustainability: 'Incluimos voluntariado solidario con comunidades locales romanas, fomentando un turismo que da, no solo que recibe.',
    sustainabilityEn: 'We include solidarity volunteering with local Roman communities, fostering tourism that gives, not just receives.',
    itineraryEs: [
      {
        day: 1,
        title: 'Llegada a la Ciudad Eterna',
        description: 'Vuelo Bogotá → Roma (FCO). Recepción VIP en el aeropuerto. Check-in en hotel boutique céntrico. Cena de bienvenida con música italiana en vivo. Tour nocturno iluminado: Panteón de Agripa y Piazza Navona.',
      },
      {
        day: 2,
        title: 'Roma Imperial',
        description: 'Ingreso exclusivo al Coliseo Romano con guía especializado. Recreación de gladiadores y taller interactivo de vida romana antigua. Sesión de fotos estilo guerreros romanos. Almuerzo con recetas imperiales. Tarde: Foro Romano y Palatino.',
      },
      {
        day: 3,
        title: 'Sabores & Arte',
        description: 'Taller privado de cocina italiana: preparación de pizza y pasta artesanal con concurso de chefs. Visita a la Fontana di Trevi. Tarde: traslado VIP a bodega histórica de la Toscana. Cata de 5 vinos premium con maridaje gourmet y sesión de fotos al atardecer.',
      },
      {
        day: 4,
        title: 'La Roma Auténtica',
        description: 'Tour en Vespa por miradores y curvas panorámicas de Roma. Visita y voluntariado solidario con comunidad local (donación de alimentos y útiles escolares). Parada en café tradicional: ritual del espresso italiano y dulce típico.',
      },
      {
        day: 5,
        title: 'Costa Amalfitana',
        description: 'Traslado VIP a la Costa Amalfitana. Navegación privada en yate por Positano, Fiordo de Furore y Amalfi. Nado en cuevas marinas. Sesión de fotos al atardecer sobre el Mediterráneo. Almuerzo frente al mar. Regalos: retrato profesional, Limoncello artesanal y souvenir de Amalfi.',
      },
      {
        day: 6,
        title: 'Ferrari & Emilia-Romaña',
        description: 'Visita al Museo Ferrari en Maranello con acceso al simulador de F1. Conducción en carretera de un Ferrari con instructor profesional. Almuerzo premium con gastronomía de Emilia-Romaña. Tiempo libre en la tienda oficial Ferrari.',
      },
      {
        day: 7,
        title: 'Despedida con Clase',
        description: 'Vuelo panorámico en helicóptero sobre Roma al amanecer. Brindis de despedida con Prosecco. Entrega de recuerdos personalizados y álbum fotográfico del viaje. Cena de gala en restaurante exclusivo con música italiana en vivo.',
      },
      {
        day: 8,
        title: 'Arrivederci Roma',
        description: 'Desayuno en el hotel. Transfer VIP al aeropuerto FCO. Vuelo de regreso Roma → Bogotá con las mejores memorias de Italia.',
      },
    ],
    itineraryEn: [
      {
        day: 1,
        title: 'Arrival to the Eternal City',
        description: 'Flight Bogotá → Rome (FCO). VIP airport reception. Check-in at central boutique hotel. Welcome dinner with live Italian music. Illuminated night tour: Pantheon of Agrippa and Piazza Navona.',
      },
      {
        day: 2,
        title: 'Imperial Rome',
        description: 'Exclusive entry to the Roman Colosseum with specialized guide. Gladiator reenactment and interactive ancient Roman life workshop. Roman warrior photo session. Lunch with imperial recipes. Afternoon: Roman Forum and Palatine Hill.',
      },
      {
        day: 3,
        title: 'Flavors & Art',
        description: 'Private Italian cooking workshop: handmade pizza and pasta with chef competition. Visit to the Trevi Fountain. Afternoon: VIP transfer to a historic Tuscan winery. Tasting of 5 premium wines with gourmet pairing and sunset photo session.',
      },
      {
        day: 4,
        title: 'Authentic Rome',
        description: 'Vespa tour through Rome\'s panoramic viewpoints. Solidarity volunteering with local community (food and school supplies donation). Stop at a traditional café: Italian espresso ritual and traditional sweet.',
      },
      {
        day: 5,
        title: 'Amalfi Coast',
        description: 'VIP transfer to the Amalfi Coast. Private yacht navigation through Positano, Fiordo di Furore, and Amalfi. Swimming in sea caves. Sunset photo session over the Mediterranean. Seafront lunch. Gifts: professional portrait, artisan Limoncello, and Amalfi souvenir.',
      },
      {
        day: 6,
        title: 'Ferrari & Emilia-Romagna',
        description: 'Visit to the Ferrari Museum in Maranello with F1 simulator access. Road drive in a Ferrari with professional instructor. Premium lunch with Emilia-Romagna gastronomy. Free time at the official Ferrari store.',
      },
      {
        day: 7,
        title: 'A Classy Farewell',
        description: 'Panoramic helicopter flight over Rome at dawn. Farewell toast with Prosecco. Personalized souvenirs and travel photo album. Gala dinner at an exclusive restaurant with live Italian music.',
      },
      {
        day: 8,
        title: 'Arrivederci Roma',
        description: 'Hotel breakfast. VIP transfer to FCO airport. Return flight Rome → Bogotá with the best memories of Italy.',
      },
    ],
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}
