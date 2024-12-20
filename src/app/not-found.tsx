import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 | Barber',
}

export default async function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <h2 className="text-center text-4xl font-bold">404</h2>
        <p className="mt-2 text-lg">Página não encontrada!</p>
      </div>
    </div>
  )
}
