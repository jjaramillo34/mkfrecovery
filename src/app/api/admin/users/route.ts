import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminUser, listAdminUsers } from "@/lib/admin-users";
import { requireAdminSession } from "@/lib/require-admin";

export const runtime = "nodejs";

const createSchema = z.object({
  email: z.string().email().max(320),
  name: z.string().min(1).max(120),
  password: z.string().min(12).max(200),
});

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = await listAdminUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  try {
    const created = await createAdminUser(parsed.data);
    return NextResponse.json(created);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not create user";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
