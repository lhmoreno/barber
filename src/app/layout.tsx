import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from '@/features/auth/components/session-provider'
import { TRPCReactProvider } from '@/lib/trpc/api-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Barber',
  description: 'Faça seu agendamento em nossa barbearia',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProvider>

        <Toaster />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
