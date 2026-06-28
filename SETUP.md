# Horizontes Agencia de Viajes — Setup Guide

## 1. Copiar el logo

Copia el archivo SVG del logo a la carpeta `public/`:

```
FreeSample-Vectorizer-io-Dewatermark_1781392456219.svg  →  horizontes/public/logo.svg
```

## 2. Instalar dependencias

```bash
cd "c:/Users/CrediSmart/Personal/Paginas Web/Horizontes/horizontes"
npm install
```

## 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre http://localhost:3000 — te redirige automáticamente a http://localhost:3000/es

## 4. Build de producción

```bash
npm run build
npm start
```

## 5. Deploy con Docker (servidor propio)

```bash
# Construir imagen
docker compose build

# Ejecutar
docker compose up -d

# Ver logs
docker compose logs -f horizontes
```

El sitio queda disponible en el puerto 3000. Configura nginx/traefik para apuntar tu dominio.

---

## Pendientes antes de lanzar

- [ ] **RNT**: Reemplazar `[PENDIENTE]` con el número real del MinCIT en:
  - `components/layout/Navbar.tsx`
  - `components/layout/Footer.tsx`
  - `app/[locale]/contacto/page.tsx`
  - `app/[locale]/legal/habeas-data/page.tsx`
  - `app/[locale]/legal/terminos-condiciones/page.tsx`
  - `app/[locale]/nosotros/page.tsx`
- [ ] **Email**: Reemplazar `info@horizontesviajes.com.co` con el email real
- [ ] **Imágenes**: Añadir fotos de destinos en `public/assets/`:
  - `cano-cristales-cover.jpg`
  - `roma-cover.jpg`
- [ ] **Redes sociales**: Actualizar los links de Instagram y Facebook en `Footer.tsx`
- [ ] **ANATO**: Añadir número de membresía cuando esté disponible
- [ ] **Dominio**: Actualizar `docker-compose.yml` con el dominio real

---

## Estructura del proyecto

```
horizontes/
├── app/[locale]/           # Páginas (ES + EN)
│   ├── page.tsx            # Homepage
│   ├── destinos/
│   │   ├── page.tsx        # Listado destinos
│   │   └── [slug]/page.tsx # Detalle (Caño Cristales / Roma)
│   ├── contacto/page.tsx   # Cotizador → WhatsApp
│   ├── nosotros/page.tsx   # Quiénes somos
│   └── legal/
│       ├── habeas-data/    # Política de datos (Ley 1581/2012)
│       └── terminos-condiciones/
├── components/
│   ├── animations/         # MagneticButton, TiltCard, TextReveal, etc.
│   ├── layout/             # Navbar, Footer, WhatsAppFloat
│   ├── sections/           # HeroSection, DestinationsGrid, WhyUs, CTA
│   └── three/              # GlobeScene (R3F + arcos de vuelo)
├── content/
│   └── destinations.ts     # Datos completos de Caño Cristales + Roma
├── messages/
│   ├── es.json             # Todos los textos en español
│   └── en.json             # Mirror en inglés
└── lib/
    ├── whatsapp.ts         # Helper para deep links WhatsApp
    └── utils.ts            # cn() helper

```

## WhatsApp integrado

El número configurado es: **+57 304 600 9206**

Para cambiar el número, editar `lib/whatsapp.ts`:
```typescript
const WA_NUMBER = '573046009206'  // ← Cambiar aquí
```
