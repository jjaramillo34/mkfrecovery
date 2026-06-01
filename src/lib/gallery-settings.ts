import type { PublicGallerySettings } from "@/lib/gallery-settings-types";
import { DEFAULT_GALLERY_SETTINGS } from "@/lib/gallery-settings-types";
import { getDb } from "@/lib/mongodb";

const SETTINGS_KEY = "global";

function mergeSettings(raw: Record<string, unknown> | null | undefined): PublicGallerySettings {
  if (!raw) return { ...DEFAULT_GALLERY_SETTINGS };
  return {
    maxImages:
      typeof raw.maxImages === "number" && raw.maxImages > 0
        ? Math.min(raw.maxImages, 200)
        : DEFAULT_GALLERY_SETTINGS.maxImages,
    layout:
      raw.layout === "compact" || raw.layout === "standard" || raw.layout === "wide"
        ? raw.layout
        : DEFAULT_GALLERY_SETTINGS.layout,
    aspectRatio:
      raw.aspectRatio === "4/3" || raw.aspectRatio === "1/1" || raw.aspectRatio === "16/9"
        ? raw.aspectRatio
        : DEFAULT_GALLERY_SETTINGS.aspectRatio,
    showEventFilters:
      typeof raw.showEventFilters === "boolean"
        ? raw.showEventFilters
        : DEFAULT_GALLERY_SETTINGS.showEventFilters,
    showCategoryFilters:
      typeof raw.showCategoryFilters === "boolean"
        ? raw.showCategoryFilters
        : DEFAULT_GALLERY_SETTINGS.showCategoryFilters,
    intro: typeof raw.intro === "string" ? raw.intro.slice(0, 500) : DEFAULT_GALLERY_SETTINGS.intro,
  };
}

export async function getGallerySettings(): Promise<PublicGallerySettings> {
  const db = await getDb();
  const doc = await db.collection("gallery_settings").findOne({ key: SETTINGS_KEY });
  if (!doc) return { ...DEFAULT_GALLERY_SETTINGS };
  const { _id: _, key: __, ...rest } = doc as { _id: unknown; key?: string; [k: string]: unknown };
  return mergeSettings(rest);
}

export async function saveGallerySettings(settings: PublicGallerySettings): Promise<void> {
  const db = await getDb();
  const merged = mergeSettings(settings);
  await db.collection("gallery_settings").updateOne(
    { key: SETTINGS_KEY },
    {
      $set: {
        key: SETTINGS_KEY,
        ...merged,
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );
}

export { DEFAULT_GALLERY_SETTINGS };
