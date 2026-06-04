import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeToNewsletter } from "@/lib/newsletter-subscribe";
import { isResendConfigured } from "@/lib/resend-client";

export const runtime = "nodejs";

const subscribeSchema = z.object({
  email: z.string().trim().email().max(320),
});

export async function POST(request: Request) {
  if (!isResendConfigured()) {
    return NextResponse.json(
      {
        error:
          "Newsletter is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL to your environment, then restart the server.",
      },
      { status: 503 },
    );
  }

  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const result = await subscribeToNewsletter(parsed.data.email.toLowerCase());
    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: result.status });
    }
    return NextResponse.json({ ok: true, alreadySubscribed: result.alreadySubscribed });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
