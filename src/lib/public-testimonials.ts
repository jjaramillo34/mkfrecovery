import { getDb } from "@/lib/mongodb";
import { recoveryTestimonialsFallback } from "@/lib/recovery-testimonials-fallback";
import type { RecoveryTestimonial } from "@/lib/recovery-testimonial-types";

type TestimonialDoc = {
  slug: string;
  heading: string;
  paragraphs: string[];
  name: string;
  location: string;
  published?: boolean;
  order?: number;
};

function serialize(doc: TestimonialDoc): RecoveryTestimonial {
  return {
    id: doc.slug,
    heading: doc.heading,
    paragraphs: doc.paragraphs,
    name: doc.name,
    location: doc.location,
  };
}

export async function fetchPublicTestimonials(): Promise<RecoveryTestimonial[]> {
  const db = await getDb();
  const list = await db
    .collection<TestimonialDoc>("testimonials")
    .find({ published: true })
    .sort({ order: 1, updatedAt: 1 })
    .limit(50)
    .toArray();

  if (list.length === 0) {
    return recoveryTestimonialsFallback;
  }

  return list.map(serialize);
}
