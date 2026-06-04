import { NextResponse } from "next/server";
import { fetchPublicTestimonials } from "@/lib/public-testimonials";

export const runtime = "nodejs";

export async function GET() {
  const items = await fetchPublicTestimonials();
  return NextResponse.json(items);
}
