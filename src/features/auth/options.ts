import { DefaultSession, type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'

export type UserNextAuth = {
  id: string
  image: string | null
  name: string
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: UserNextAuth
  }

  interface User extends UserNextAuth {}
}

export const options: NextAuthOptions = {
  callbacks: {
    session: async ({ session }) => {
      const info = await prisma.barberShop.findFirst()

      if (!info) {
        return session
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: info.id,
          image: info.logoUrl
            ? 'https://pub-2933225b7c3a4e9aa8d72dee07086ad0.r2.dev/' +
              info.logoUrl
            : null,
          name: info.name,
        },
      }
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (credentials?.password !== env.ADMIN_PASSWORD) {
          return null
        }

        const info = await prisma.barberShop.findFirst()

        if (!info) {
          return null
        }

        return { id: info.id, name: info.name }
      },
    }),
  ],
  pages: {
    error: '/admin/login',
    signIn: '/admin/login',
  },
}
