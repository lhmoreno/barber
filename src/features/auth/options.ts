import { DefaultSession, type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'

import { PrismaAdapter } from './prisma-adapter'

export type UserNextAuth = {
  id: string
  name: string
  email: string
  image: string | null
  barberShopId: string
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: UserNextAuth
  }

  interface User extends UserNextAuth {}
}

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: '/login',
    signIn: '/login',
  },
}
