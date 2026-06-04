import { SignJWT, jwtVerify } from "jose";
import { site } from "@/lib/site";

const PURPOSE = "newsletter-unsubscribe";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function createNewsletterUnsubscribeToken(email: string): Promise<string> {
  return new SignJWT({ purpose: PURPOSE })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email.toLowerCase())
    .setIssuedAt()
    .sign(getSecret());
}

export async function verifyNewsletterUnsubscribeToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.purpose !== PURPOSE || typeof payload.sub !== "string") {
      return null;
    }
    return payload.sub.toLowerCase();
  } catch {
    return null;
  }
}

export function buildNewsletterUnsubscribeUrl(token: string): string {
  const base = site.url.replace(/\/$/, "");
  return `${base}/unsubscribe?token=${encodeURIComponent(token)}`;
}
