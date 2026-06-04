import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export type FormSubmissionType = "contact" | "volunteer";

export type FormSubmissionDoc = {
  type: FormSubmissionType;
  email: string;
  name: string;
  payload: Record<string, string>;
  emailSent: boolean;
  createdAt: Date;
};

export async function saveFormSubmission(
  doc: Omit<FormSubmissionDoc, "createdAt">,
): Promise<string> {
  const db = await getDb();
  const r = await db.collection<FormSubmissionDoc>("form_submissions").insertOne({
    ...doc,
    createdAt: new Date(),
  });
  return String(r.insertedId);
}

export async function markFormSubmissionEmailSent(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  await (await getDb())
    .collection("form_submissions")
    .updateOne({ _id: new ObjectId(id) }, { $set: { emailSent: true } });
}
