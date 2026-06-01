import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

function encryptionKey(): Buffer {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) {
    throw new Error("AUTH_SECRET must be set to at least 32 characters");
  }
  return createHash("sha256").update(s).digest();
}

/** Encrypt TOTP secret for storage in MongoDB. */
export function encryptTotpSecret(plain: string): string {
  const key = encryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString("base64");
}

export function decryptTotpSecret(encoded: string): string {
  const buf = Buffer.from(encoded, "base64");
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const data = buf.subarray(28);
  const key = encryptionKey();
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}
