import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const r = await (await getDb()).collection("gallery_items").deleteOne({ _id: new ObjectId(id) });
  if (r.deletedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
