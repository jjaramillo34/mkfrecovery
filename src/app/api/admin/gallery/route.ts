import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { createGalleryItemSchema, updateGalleryItemSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

function serialize(d: { _id: ObjectId; categoryId: ObjectId; eventId?: ObjectId | null; [k: string]: unknown }) {
  return {
    ...d,
    _id: String(d._id),
    categoryId: String(d.categoryId),
    eventId: d.eventId ? String(d.eventId) : null,
  };
}

export async function GET() {
  const db = await getDb();
  const list = await db
    .collection("gallery_items")
    .find()
    .sort({ order: 1, createdAt: 1 })
    .limit(500)
    .toArray();
  return NextResponse.json(list.map((x) => serialize(x as never)));
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = createGalleryItemSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  const now = new Date();
  const doc: Record<string, unknown> = {
    fileId: data.fileId,
    filePath: data.filePath || "",
    url: data.url,
    thumbnailUrl: data.thumbnailUrl && data.thumbnailUrl.length > 0 ? data.thumbnailUrl : undefined,
    width: data.width,
    height: data.height,
    title: data.title,
    alt: data.alt,
    categoryId: new ObjectId(data.categoryId),
    order: data.order,
    createdAt: now,
    updatedAt: now,
  };
  if (data.eventId) {
    doc.eventId = new ObjectId(data.eventId);
  } else {
    doc.eventId = null;
  }
  const r = await (await getDb()).collection("gallery_items").insertOne(doc);
  return NextResponse.json({ _id: String(r.insertedId) });
}

export async function PATCH(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = updateGalleryItemSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { _id, eventId, categoryId, ...rest } = parsed.data;
  const set: Record<string, unknown> = { updatedAt: new Date() };
  if (eventId === null) set.eventId = null;
  else if (eventId) set.eventId = new ObjectId(eventId);
  if (categoryId) set.categoryId = new ObjectId(categoryId);
  if (rest.title !== undefined) set.title = rest.title;
  if (rest.alt !== undefined) set.alt = rest.alt;
  if (rest.order !== undefined) set.order = rest.order;
  const r = await (await getDb())
    .collection("gallery_items")
    .updateOne({ _id: new ObjectId(_id) }, { $set: set });
  if (r.matchedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
