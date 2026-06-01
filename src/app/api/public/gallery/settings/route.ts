import { NextResponse } from "next/server";
import { getGallerySettings } from "@/lib/gallery-settings";

export const runtime = "nodejs";

export async function GET() {
  const settings = await getGallerySettings();
  return NextResponse.json(settings);
}
