import { Resend } from "resend";

let client: Resend | null = null;

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}

export function getNewsletterFromAddress(): string {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (from) return from;
  return "Michael Kellermann Foundation <onboarding@resend.dev>";
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.RESEND_FROM_EMAIL?.trim());
}
