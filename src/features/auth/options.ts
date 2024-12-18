import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials?.password !== env.ADMIN_PASSWORD) {
          return null;
        }

        const info = await prisma.barberShop.findFirst();

        if (!info) {
          return null;
        }

        return { id: "123", name: info.name };
      },
    }),
  ],
  pages: {
    error: "/admin/login",
    signIn: "/admin/login",
  },
};
