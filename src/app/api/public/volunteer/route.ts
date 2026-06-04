import { NextResponse } from "next/server";
import { sendVolunteerFormEmail } from "@/lib/send-form-email";
import { volunteerFormSchema } from "@/lib/validation/public-forms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = volunteerFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const data = parsed.data;
  const result = await sendVolunteerFormEmail({
    name: data.name,
    email: data.email.toLowerCase(),
    interests: data.interests,
    availability: data.availability,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
