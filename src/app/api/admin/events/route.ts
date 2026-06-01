import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { createEventSchema, updateEventSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function GET() {
  const db = await getDb();
  const list = await db
    .collection("events")
    .find()
    .sort({ startDate: -1, updatedAt: -1 })
    .limit(200)
    .toArray();
  return NextResponse.json(
    list.map((d) => ({ ...d, _id: String(d._id) })),
  );
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = createEventSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  const now = new Date();
  const db = await getDb();
  if (data.useForDonate) {
    await db.collection("events").updateMany({}, { $set: { useForDonate: false } });
  }
  const doc = {
    title: data.title,
    slug: data.slug,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    givebutterUrl: data.givebutterUrl,
    isActive: data.isActive,
    useForDonate: data.useForDonate,
    createdAt: now,
    updatedAt: now,
  };
  const r = await db.collection("events").insertOne(doc);
  return NextResponse.json({ _id: String(r.insertedId) });
}

export async function PATCH(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = updateEventSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { _id, ...rest } = parsed.data;
  const id = new ObjectId(_id);
  const db = await getDb();
  if (rest.useForDonate) {
    await db.collection("events").updateMany({ _id: { $ne: id } }, { $set: { useForDonate: false } });
  }
  const update = { ...rest, updatedAt: new Date() } as Record<string, unknown>;
  for (const k of Object.keys(update)) {
    if (update[k] === undefined) delete update[k];
  }
  const r = await db.collection("events").updateOne({ _id: id }, { $set: update });
  if (r.matchedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
