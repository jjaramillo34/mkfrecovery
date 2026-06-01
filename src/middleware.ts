import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const path = req.nextUrl.pathname;

  if (path === "/admin/login" || path.startsWith("/admin/login/")) {
    if (req.auth) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.next();
  }

  const needsAuth = path.startsWith("/admin") || path.startsWith("/api/admin");
  if (needsAuth && !req.auth) {
    if (path.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const login = new URL("/admin/login", req.nextUrl);
    login.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
