import { getResendClient, isResendConfigured } from "@/lib/resend-client";
import { getDb } from "@/lib/mongodb";

export async function unsubscribeFromNewsletter(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase();
  const db = await getDb();
  const r = await db.collection("newsletter_subscribers").updateOne(
    { email: normalizedEmail, subscribed: true },
    { $set: { subscribed: false, updatedAt: new Date() } },
  );

  const wasActive = r.matchedCount > 0;

  if (isResendConfigured()) {
    try {
      const resend = getResendClient();
      await resend.contacts.update({ email: normalizedEmail, unsubscribed: true });
    } catch (err) {
      console.warn("Resend unsubscribe sync error:", err);
    }
  }

  return wasActive;
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const visible = local.length <= 2 ? local[0] ?? "*" : `${local.slice(0, 2)}…`;
  return `${visible}@${domain}`;
}
