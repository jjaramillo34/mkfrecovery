import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

/**
 * Active events (for public gallery / filters).
 */
export async function GET() {
  const db = await getDb();
  const list = await db
    .collection("events")
    .find({ isActive: true })
    .project({ title: 1, slug: 1 })
    .sort({ startDate: -1, title: 1 })
    .limit(100)
    .toArray();
  return NextResponse.json(
    list.map((d) => ({
      _id: String((d as { _id: ObjectId })._id),
      title: (d as { title?: string }).title ?? "Event",
      slug: (d as { slug?: string }).slug ?? "",
    })),
  );
}
