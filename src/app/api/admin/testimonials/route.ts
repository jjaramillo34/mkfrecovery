import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { createTestimonialSchema, updateTestimonialSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

type TestimonialDoc = {
  _id: ObjectId;
  slug: string;
  heading: string;
  paragraphs: string[];
  name: string;
  location: string;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

function serialize(d: TestimonialDoc) {
  return {
    _id: String(d._id),
    id: d.slug,
    slug: d.slug,
    heading: d.heading,
    paragraphs: d.paragraphs,
    name: d.name,
    location: d.location,
    published: d.published,
    order: d.order,
  };
}

export async function GET() {
  const db = await getDb();
  const list = await db
    .collection<TestimonialDoc>("testimonials")
    .find()
    .sort({ order: 1, createdAt: 1 })
    .limit(100)
    .toArray();
  return NextResponse.json(list.map(serialize));
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = createTestimonialSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  const now = new Date();
  const db = await getDb();

  const existing = await db.collection("testimonials").findOne({ slug: data.slug });
  if (existing) {
    return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
  }

  const doc = {
    slug: data.slug,
    heading: data.heading,
    paragraphs: data.paragraphs,
    name: data.name,
    location: data.location,
    published: data.published,
    order: data.order,
    createdAt: now,
    updatedAt: now,
  };
  const r = await db.collection("testimonials").insertOne(doc);
  return NextResponse.json({ _id: String(r.insertedId) });
}

export async function PATCH(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = updateTestimonialSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { _id, slug, ...rest } = parsed.data;
  const id = new ObjectId(_id);
  const db = await getDb();

  if (slug) {
    const conflict = await db.collection("testimonials").findOne({
      slug,
      _id: { $ne: id },
    });
    if (conflict) {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
  }

  const update = { ...rest, ...(slug ? { slug } : {}), updatedAt: new Date() } as Record<string, unknown>;
  for (const k of Object.keys(update)) {
    if (update[k] === undefined) delete update[k];
  }
  const r = await db.collection("testimonials").updateOne({ _id: id }, { $set: update });
  if (r.matchedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
