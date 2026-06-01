import { NextResponse } from "next/server";
import { getGallerySettings, saveGallerySettings } from "@/lib/gallery-settings";
import { DEFAULT_GALLERY_SETTINGS } from "@/lib/gallery-settings-types";
import { gallerySettingsSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function GET() {
  const settings = await getGallerySettings();
  return NextResponse.json(settings);
}

export async function PATCH(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = gallerySettingsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const current = await getGallerySettings();
  const next = { ...current, ...parsed.data };
  await saveGallerySettings(next);
  return NextResponse.json(next);
}

export async function PUT(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = gallerySettingsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const next = { ...DEFAULT_GALLERY_SETTINGS, ...parsed.data };
  await saveGallerySettings(next);
  return NextResponse.json(next);
}
