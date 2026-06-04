import type { CreateContactOptions } from "resend";
import { getNewsletterFromAddress, getResendClient } from "@/lib/resend-client";
import { getDb } from "@/lib/mongodb";
import {
  buildNewsletterUnsubscribeUrl,
  createNewsletterUnsubscribeToken,
} from "@/lib/newsletter-unsubscribe-token";
import { site } from "@/lib/site";

export type NewsletterSubscribeResult =
  | { ok: true; alreadySubscribed: boolean }
  | { ok: false; message: string; status: number };

async function buildWelcomeHtml(email: string) {
  const siteUrl = site.url.replace(/\/$/, "");
  const token = await createNewsletterUnsubscribeToken(email);
  const unsubscribeUrl = buildNewsletterUnsubscribeUrl(token);

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #0f172a; max-width: 560px;">
      <p>Thank you for subscribing to updates from the ${site.name}.</p>
      <p>We will send occasional news about programs, partners, and impact—never daily clutter.</p>
      <p style="margin-top: 1.5rem;">
        <a href="${siteUrl}" style="color: #0c4c64; font-weight: 600;">Visit our website</a>
      </p>
      <p style="margin-top: 2rem; font-size: 0.875rem; color: #64748b;">
        Subscribed as ${email}. If this was not you, you can ignore this email.
      </p>
      <p style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; text-align: center;">
        <a href="${unsubscribeUrl}" style="display: inline-block; padding: 12px 24px; background: #0c4c64; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Unsubscribe</a>
      </p>
      <p style="margin-top: 1rem; text-align: center; font-size: 12px; color: #64748b;">
        Or copy this link: <a href="${unsubscribeUrl}" style="color: #0c4c64;">${unsubscribeUrl}</a>
      </p>
    </div>
  `.trim();
}

function resendErrorMessage(error: { name?: string; message: string }): string {
  const msg = error.message.toLowerCase();
  if (error.name === "restricted_api_key" || msg.includes("restricted")) {
    return "restricted_api_key";
  }
  if (msg.includes("domain is not verified") || msg.includes("not verified")) {
    return "domain_not_verified";
  }
  return error.message;
}

async function saveSubscriberToDb(
  email: string,
): Promise<{ subscribedAt: Date; alreadySubscribed: boolean }> {
  const db = await getDb();
  const existing = await db.collection("newsletter_subscribers").findOne({ email });

  if (existing?.subscribed === true) {
    const subscribedAt =
      existing.updatedAt instanceof Date
        ? existing.updatedAt
        : existing.createdAt instanceof Date
          ? existing.createdAt
          : new Date();
    return { subscribedAt, alreadySubscribed: true };
  }

  const now = new Date();
  await db.collection("newsletter_subscribers").updateOne(
    { email },
    {
      $set: { email, subscribed: true, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );
  return { subscribedAt: now, alreadySubscribed: false };
}

async function syncResendContact(email: string): Promise<void> {
  const resend = getResendClient();
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID?.trim();
  const topicId = process.env.RESEND_NEWSLETTER_TOPIC_ID?.trim();

  const contactPayload: CreateContactOptions = {
    email,
    unsubscribed: false,
  };

  if (segmentId) {
    contactPayload.segments = [{ id: segmentId }];
  }

  if (topicId) {
    contactPayload.topics = [{ id: topicId, subscription: "opt_in" }];
  }

  const created = await resend.contacts.create(contactPayload);

  if (!created.error) return;

  const kind = resendErrorMessage(created.error);
  if (kind === "restricted_api_key") {
    console.warn("Resend contacts skipped: API key is send-only. Subscribers are stored in MongoDB.");
    return;
  }

  const message = created.error.message.toLowerCase();
  const alreadyExists =
    message.includes("already") || message.includes("exist") || message.includes("duplicate");

  if (!alreadyExists) {
    console.warn("Resend contacts.create failed:", created.error.message);
    return;
  }

  const updated = await resend.contacts.update({ email, unsubscribed: false });
  if (updated.error) {
    console.warn("Resend contacts.update failed:", updated.error.message);
    return;
  }

  if (segmentId) {
    await resend.contacts.segments.add({ email, segmentId });
  }

  if (topicId) {
    await resend.contacts.topics.update({
      email,
      topics: [{ id: topicId, subscription: "opt_in" }],
    });
  }
}

export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscribeResult> {
  const normalizedEmail = email.toLowerCase();
  const { subscribedAt, alreadySubscribed } = await saveSubscriberToDb(normalizedEmail);

  if (alreadySubscribed) {
    return { ok: true, alreadySubscribed: true };
  }

  try {
    await syncResendContact(normalizedEmail);
  } catch (err) {
    console.warn("Resend contact sync error:", err);
  }

  const resend = getResendClient();
  const from = getNewsletterFromAddress();
  const welcome = await resend.emails.send(
    {
      from,
      to: [normalizedEmail],
      subject: `You're subscribed to ${site.shortName} updates`,
      html: await buildWelcomeHtml(normalizedEmail),
    },
    {
      idempotencyKey: `newsletter-welcome/${normalizedEmail}/${subscribedAt.getTime()}`,
    },
  );

  if (welcome.error) {
    const kind = resendErrorMessage(welcome.error);
    console.error("Newsletter welcome email failed:", welcome.error.message);

    if (kind === "domain_not_verified") {
      return {
        ok: false,
        status: 503,
        message:
          "Email sending is not fully set up yet. RESEND_FROM_EMAIL must use your verified Resend domain.",
      };
    }

    return {
      ok: false,
      status: 502,
      message: "We saved your email but could not send a confirmation. Please try again later.",
    };
  }

  return { ok: true, alreadySubscribed: false };
}
