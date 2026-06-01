import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

function serialize(doc: { _id: ObjectId; name: unknown; slug: unknown; eventId?: ObjectId | null; order?: unknown }) {
  return {
    _id: String(doc._id),
    name: String(doc.name),
    slug: String(doc.slug),
    eventId: doc.eventId ? String(doc.eventId) : null,
    order: typeof doc.order === "number" ? doc.order : 0,
  };
}

/**
 * List categories (for gallery filters). Optional `eventId` includes global (no event) + that event.
 */
export async function GET(request: Request) {
  const eventId = new URL(request.url).searchParams.get("eventId");
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (eventId) {
    if (!ObjectId.isValid(eventId)) {
      return NextResponse.json({ error: "Invalid eventId" }, { status: 400 });
    }
    filter.$or = [{ eventId: new ObjectId(eventId) }, { eventId: null }];
  }
  const list = await db
    .collection("categories")
    .find(filter)
    .sort({ order: 1, name: 1 })
    .limit(200)
    .toArray();
  return NextResponse.json(list.map((x) => serialize(x as never)));
}
