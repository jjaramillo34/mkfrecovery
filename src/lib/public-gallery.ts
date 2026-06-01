import { ObjectId } from "mongodb";
import type {
  PublicGalleryCategory,
  PublicGalleryEvent,
  PublicGalleryItem,
} from "@/lib/gallery-types";
import { getDb } from "@/lib/mongodb";

export type { PublicGalleryCategory, PublicGalleryEvent, PublicGalleryItem } from "@/lib/gallery-types";

function serializeItem(
  d: { _id: ObjectId; categoryId: ObjectId; eventId?: ObjectId | null; [k: string]: unknown },
): PublicGalleryItem {
  const row = d as Record<string, unknown>;
  return {
    _id: String(d._id),
    url: String(row.url ?? ""),
    thumbnailUrl: typeof row.thumbnailUrl === "string" ? row.thumbnailUrl : undefined,
    title: String(row.title ?? ""),
    alt: String(row.alt ?? ""),
    categoryId: String(d.categoryId),
    eventId: d.eventId ? String(d.eventId) : null,
    order: typeof row.order === "number" ? row.order : undefined,
  };
}

export async function fetchPublicGalleryItems(filters?: {
  categoryId?: string;
  eventId?: string;
}): Promise<PublicGalleryItem[]> {
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (filters?.categoryId) {
    if (!ObjectId.isValid(filters.categoryId)) return [];
    filter.categoryId = new ObjectId(filters.categoryId);
  }
  if (filters?.eventId) {
    if (!ObjectId.isValid(filters.eventId)) return [];
    filter.$or = [{ eventId: new ObjectId(filters.eventId) }, { eventId: null }];
  }
  const list = await db
    .collection("gallery_items")
    .find(filter)
    .sort({ order: 1, createdAt: 1 })
    .limit(200)
    .toArray();
  return list.map((x) => serializeItem(x as never));
}

export async function fetchPublicGalleryEvents(): Promise<PublicGalleryEvent[]> {
  const db = await getDb();
  const list = await db
    .collection("events")
    .find({ isActive: true })
    .project({ title: 1, slug: 1 })
    .sort({ startDate: -1, title: 1 })
    .limit(100)
    .toArray();
  return list.map((d) => ({
    _id: String((d as { _id: ObjectId })._id),
    title: (d as { title?: string }).title ?? "Event",
    slug: (d as { slug?: string }).slug ?? "",
  }));
}

export async function fetchPublicGalleryCategories(eventId?: string): Promise<PublicGalleryCategory[]> {
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (eventId) {
    if (!ObjectId.isValid(eventId)) return [];
    filter.$or = [{ eventId: new ObjectId(eventId) }, { eventId: null }];
  }
  const list = await db
    .collection("categories")
    .find(filter)
    .sort({ order: 1, name: 1 })
    .limit(200)
    .toArray();
  return list.map((d) => ({
    _id: String((d as { _id: ObjectId })._id),
    name: String((d as { name?: string }).name ?? ""),
    slug: String((d as { slug?: string }).slug ?? ""),
  }));
}
