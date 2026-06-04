import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { reorderTestimonialsSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function PUT(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = reorderTestimonialsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const now = new Date();
  const ops = parsed.data.items.map(({ _id, order }) => ({
    updateOne: {
      filter: { _id: new ObjectId(_id) },
      update: { $set: { order, updatedAt: now } },
    },
  }));

  await (await getDb()).collection("testimonials").bulkWrite(ops);
  return NextResponse.json({ ok: true });
}
