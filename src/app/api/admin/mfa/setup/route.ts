import { generateSecret, generateURI } from "otplib";
import QRCode from "qrcode";
import { NextResponse } from "next/server";
import { findAdminUserById, setTotpPendingSecret } from "@/lib/admin-users";
import { requireAdminSession } from "@/lib/require-admin";

export const runtime = "nodejs";

/** Start MFA enrollment — returns QR for authenticator app. */
export async function POST() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await findAdminUserById(session.user.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (user.totpEnabled) {
    return NextResponse.json({ error: "MFA is already enabled" }, { status: 400 });
  }

  const secret = generateSecret();
  await setTotpPendingSecret(session.user.id, secret);

  const uri = generateURI({
    issuer: "MKF Foundation Admin",
    label: user.email,
    secret,
  });
  const qrDataUrl = await QRCode.toDataURL(uri);

  return NextResponse.json({ qrDataUrl, secret });
}
