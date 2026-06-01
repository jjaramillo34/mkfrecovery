import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { createCategorySchema, updateCategorySchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

function serialize(doc: unknown) {
  if (!doc || typeof doc !== "object") return doc;
  const d = doc as Record<string, unknown> & { _id: ObjectId };
  return { ...d, _id: String(d._id), eventId: d.eventId ? String(d.eventId) : null };
}

export async function GET() {
  const db = await getDb();
  const list = await db.collection("categories").find().sort({ order: 1, name: 1 }).limit(500).toArray();
  return NextResponse.json(list.map((x) => serialize(x)));
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = createCategorySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  const now = new Date();
  const doc: Record<string, unknown> = {
    name: data.name,
    slug: data.slug,
    order: data.order,
    createdAt: now,
    updatedAt: now,
  };
  if (data.eventId) {
    doc.eventId = new ObjectId(data.eventId);
  } else {
    doc.eventId = null;
  }
  const r = await (await getDb()).collection("categories").insertOne(doc);
  return NextResponse.json({ _id: String(r.insertedId) });
}

export async function PATCH(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = updateCategorySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { _id, eventId, ...rest } = parsed.data;
  const set: Record<string, unknown> = { updatedAt: new Date() };
  if (eventId === null) {
    set.eventId = null;
  } else if (eventId !== undefined) {
    set.eventId = new ObjectId(eventId);
  }
  if (rest.name !== undefined) set.name = rest.name;
  if (rest.slug !== undefined) set.slug = rest.slug;
  if (rest.order !== undefined) set.order = rest.order;
  const r = await (await getDb())
    .collection("categories")
    .updateOne({ _id: new ObjectId(_id) }, { $set: set });
  if (r.matchedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
