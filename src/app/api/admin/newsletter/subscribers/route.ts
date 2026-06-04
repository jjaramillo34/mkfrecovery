import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import {
  createNewsletterSubscriberSchema,
  updateNewsletterSubscriberSchema,
} from "@/lib/validation/admin";

export const runtime = "nodejs";

type SubscriberDoc = {
  _id: ObjectId;
  email: string;
  subscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function serialize(d: SubscriberDoc) {
  return {
    _id: String(d._id),
    email: d.email,
    subscribed: d.subscribed,
    createdAt: d.createdAt.toISOString(),
    updatedAt: d.updatedAt.toISOString(),
  };
}

export async function GET() {
  const db = await getDb();
  const list = await db
    .collection<SubscriberDoc>("newsletter_subscribers")
    .find()
    .sort({ updatedAt: -1 })
    .limit(500)
    .toArray();

  const active = list.filter((d) => d.subscribed).length;
  return NextResponse.json({
    subscribers: list.map(serialize),
    stats: { total: list.length, active, unsubscribed: list.length - active },
  });
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = createNewsletterSubscriberSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const now = new Date();
  const db = await getDb();
  const r = await db.collection("newsletter_subscribers").updateOne(
    { email },
    {
      $set: { email, subscribed: true, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );

  return NextResponse.json({
    _id: r.upsertedId ? String(r.upsertedId) : undefined,
    ok: true,
  });
}

export async function PATCH(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = updateNewsletterSubscriberSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { _id, subscribed } = parsed.data;
  const db = await getDb();
  const r = await db.collection("newsletter_subscribers").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { subscribed, updatedAt: new Date() } },
  );

  if (r.matchedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
