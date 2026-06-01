import { NextResponse } from "next/server";
import { getImageKit, getImageKitConfig } from "@/lib/imagekit-server";

export const runtime = "nodejs";

/** Client-side upload (ImageKit) auth parameters — requires admin session. */
export async function GET() {
  try {
    getImageKitConfig();
    const ik = getImageKit();
    // Unix seconds, max ~30 min ahead (ImageKit requires < 1 hour).
    const expire = Math.floor(Date.now() / 1000) + 60 * 30;
    // Each upload needs a unique token (ImageKit rejects reused tokens).
    const token = crypto.randomUUID();
    const auth = ik.getAuthenticationParameters(token, expire);
    return NextResponse.json({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
      ...auth,
      expire: Number(auth.expire),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "ImageKit not configured";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
