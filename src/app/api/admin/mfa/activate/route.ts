import { NextResponse } from "next/server";
import { activateTotp, findAdminUserById, verifyPendingTotp } from "@/lib/admin-users";
import { requireAdminSession } from "@/lib/require-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const code = typeof body.code === "string" ? body.code : "";
  if (!code) {
    return NextResponse.json({ error: "Code required" }, { status: 400 });
  }

  const user = await findAdminUserById(session.user.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (!(await verifyPendingTotp(user, code))) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  await activateTotp(session.user.id);
  return NextResponse.json({ ok: true });
}
