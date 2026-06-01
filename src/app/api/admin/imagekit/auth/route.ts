import { NextResponse } from "next/server";
import { getImageKit, getImageKitConfig } from "@/lib/imagekit-server";

export const runtime = "nodejs";

/** Client-side upload (ImageKit) auth parameters — requires admin session. */
export async function GET() {
  try {
    getImageKitConfig();
    const ik = getImageKit();
    const auth = ik.getAuthenticationParameters();
    return NextResponse.json({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
      ...auth,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "ImageKit not configured";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
