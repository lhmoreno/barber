import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/lib/env";

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

        return { id: "123" };
      },
    }),
  ],
  pages: {
    error: "/admin/login",
    signIn: "/admin/login",
  },
};
