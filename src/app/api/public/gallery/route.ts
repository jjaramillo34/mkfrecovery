import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

function serialize(
  d: { _id: ObjectId; categoryId: ObjectId; eventId?: ObjectId | null; [k: string]: unknown },
) {
  return { ...d, _id: String(d._id), categoryId: String(d.categoryId), eventId: d.eventId ? String(d.eventId) : null };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const eventId = searchParams.get("eventId");
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (categoryId) {
    if (!ObjectId.isValid(categoryId)) {
      return NextResponse.json({ error: "Invalid categoryId" }, { status: 400 });
    }
    filter.categoryId = new ObjectId(categoryId);
  }
  if (eventId) {
    if (!ObjectId.isValid(eventId)) {
      return NextResponse.json({ error: "Invalid eventId" }, { status: 400 });
    }
    filter.$or = [{ eventId: new ObjectId(eventId) }, { eventId: null }];
  }
  const list = await db
    .collection("gallery_items")
    .find(filter)
    .sort({ order: 1, createdAt: 1 })
    .limit(200)
    .toArray();
  return NextResponse.json(list.map((x) => serialize(x as never)));
}
