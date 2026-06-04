import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getFormsEmailSettings } from "@/lib/send-form-email";
import type { FormSubmissionType } from "@/lib/form-submissions";

export const runtime = "nodejs";

type SubmissionDoc = {
  _id: ObjectId;
  type: FormSubmissionType;
  email: string;
  name: string;
  payload: Record<string, string>;
  emailSent: boolean;
  createdAt: Date;
};

function serialize(d: SubmissionDoc) {
  return {
    _id: String(d._id),
    type: d.type,
    email: d.email,
    name: d.name,
    payload: d.payload,
    emailSent: d.emailSent,
    createdAt: d.createdAt.toISOString(),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const filter =
    type === "contact" || type === "volunteer" ? { type: type as FormSubmissionType } : {};

  const db = await getDb();
  const list = await db
    .collection<SubmissionDoc>("form_submissions")
    .find(filter)
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();

  const contact = list.filter((d) => d.type === "contact").length;
  const volunteer = list.filter((d) => d.type === "volunteer").length;

  return NextResponse.json({
    settings: getFormsEmailSettings(),
    submissions: list.map(serialize),
    stats: {
      total: list.length,
      contact: type ? (type === "contact" ? list.length : 0) : contact,
      volunteer: type ? (type === "volunteer" ? list.length : 0) : volunteer,
    },
  });
}
