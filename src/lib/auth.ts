import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "student@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Implement your own authentication logic here (e.g. check password hash)
        // This is a placeholder for the MVP
        if (credentials?.email === "student@example.com" && credentials?.password === "password") {
          return { id: "1", name: "Demo Student", email: "student@example.com" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt" // Use JWT with Credentials provider
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // @ts-expect-error adding id to session.user
        session.user.id = token.sub;
      }
      return session;
    }
  }
};
