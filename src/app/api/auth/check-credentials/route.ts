import { NextResponse } from "next/server";
import { checkCredentialsForLogin } from "@/lib/admin-users";

export const runtime = "nodejs";

/** Pre-check email/password before MFA step (does not create a session). */
export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const result = await checkCredentialsForLogin(email, password);
  if (!result.ok) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
  return NextResponse.json({ requiresMfa: result.requiresMfa });
}
