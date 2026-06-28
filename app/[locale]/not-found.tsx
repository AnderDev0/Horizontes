import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-night flex items-center justify-center text-center px-6">
      <div>
        <p className="font-label text-leaf text-8xl font-bold mb-4">404</p>
        <h1 className="font-serif font-bold text-3xl text-white mb-4">
          Página no encontrada
        </h1>
        <p className="font-sans text-mist text-lg mb-8">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 rounded-full bg-leaf text-night font-semibold font-sans hover:bg-forest transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
