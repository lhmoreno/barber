'use client'

import { SessionProvider as NextAuthSesssionProvider } from 'next-auth/react'

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSesssionProvider>{children}</NextAuthSesssionProvider>
}
