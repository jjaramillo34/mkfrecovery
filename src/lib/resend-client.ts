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

/** Verified subdomain in Resend — root @mkfrecovery.org must be verified separately to use it as From. */
const DEFAULT_FORMS_FROM = "Michael Kellermann Foundation <contact@newsletter.mkfrecovery.org>";
const DEFAULT_FORMS_TO = "contact@mkfrecovery.org";

export function getFormsFromAddress(): string {
  const from = process.env.RESEND_FORMS_FROM_EMAIL?.trim();
  if (from) return from;
  const newsletterFrom = process.env.RESEND_FROM_EMAIL?.trim();
  if (newsletterFrom) {
    const match = newsletterFrom.match(/<([^>]+)>/);
    const addr = match?.[1] ?? newsletterFrom;
    const at = addr.lastIndexOf("@");
    if (at > 0) {
      const domain = addr.slice(at);
      return `Michael Kellermann Foundation <contact${domain}>`;
    }
  }
  return DEFAULT_FORMS_FROM;
}

export function getFormsNotifyEmail(): string {
  return (process.env.RESEND_FORMS_TO_EMAIL ?? DEFAULT_FORMS_TO).trim();
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.RESEND_FROM_EMAIL?.trim());
}

export function isFormsEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && getFormsFromAddress() && getFormsNotifyEmail());
}
