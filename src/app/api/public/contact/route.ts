import { NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/send-form-email";
import { CONTACT_ROLE_LABELS, contactFormSchema } from "@/lib/validation/public-forms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const data = parsed.data;
  const result = await sendContactFormEmail({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email.toLowerCase(),
    role: data.role,
    roleLabel: CONTACT_ROLE_LABELS[data.role],
    message: data.message,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
