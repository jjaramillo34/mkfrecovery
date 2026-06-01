import { NextResponse } from "next/server";
import {
  disableTotp,
  findAdminUserById,
  verifyAdminUserPassword,
  verifyAdminUserTotp,
} from "@/lib/admin-users";
import { requireAdminSession } from "@/lib/require-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { password?: string; totp?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const password = typeof body.password === "string" ? body.password : "";
  const totp = typeof body.totp === "string" ? body.totp : "";
  if (!password || !totp) {
    return NextResponse.json({ error: "Password and authenticator code required" }, { status: 400 });
  }

  const user = await findAdminUserById(session.user.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (!(await verifyAdminUserPassword(user, password))) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  if (!(await verifyAdminUserTotp(user, totp))) {
    return NextResponse.json({ error: "Invalid authenticator code" }, { status: 401 });
  }

  await disableTotp(session.user.id);
  return NextResponse.json({ ok: true });
}
