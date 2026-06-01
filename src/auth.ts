import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import {
  findAdminUserByEmail,
  normalizeAdminEmail,
  verifyAdminUserPassword,
  verifyAdminUserTotp,
} from "@/lib/admin-users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "credentials",
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        totp: { label: "Authenticator code", type: "text" },
      },
      async authorize(credentials) {
        const email = normalizeAdminEmail(String(credentials?.email ?? ""));
        const password = String(credentials?.password ?? "");
        const totp = String(credentials?.totp ?? "").trim();

        if (!email || !password) return null;

        const user = await findAdminUserByEmail(email);
        if (!user || user.role !== "admin") return null;
        if (!(await verifyAdminUserPassword(user, password))) return null;

        if (user.totpEnabled) {
          if (!totp) return null;
          if (!(await verifyAdminUserTotp(user, totp))) return null;
        }

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
