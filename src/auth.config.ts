import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config (middleware). Credentials + MongoDB live in `auth.ts`.
 */
export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  providers: [],
  callbacks: {
    authorized() {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = String(token.role ?? "admin");
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
