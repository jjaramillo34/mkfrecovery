import { site } from "@/lib/site";
import { getDb } from "@/lib/mongodb";

export type ActiveGivebutter = {
  givebutterUrl: string;
  eventTitle: string | null;
  eventId: string | null;
};

/** Prefer DB event with useForDonate; else env / site defaults. */
export async function getActiveGivebutter(): Promise<ActiveGivebutter> {
  const envUrl = (process.env.NEXT_PUBLIC_GIVEBUTTER_URL ?? site.givebutterCampaignUrl ?? "").trim();
  if (!process.env.MONGODB_URI) {
    return { givebutterUrl: envUrl, eventTitle: null, eventId: null };
  }
  try {
    const db = await getDb();
    const ev = await db
      .collection("events")
      .findOne({ useForDonate: true, isActive: { $ne: false } } as never);
    if (ev && typeof ev === "object" && "givebutterUrl" in ev) {
      const g = (ev as { givebutterUrl?: string; title?: string; _id: { toString: () => string } }).givebutterUrl
        ?.toString()
        .trim() ?? "";
      if (g.length > 0) {
        return {
          givebutterUrl: g,
          eventTitle: (ev as { title?: string }).title ?? null,
          eventId: (ev as { _id: { toString: () => string } })._id.toString(),
        };
      }
    }
  } catch {
    /* Mongo unavailable */
  }
  return { givebutterUrl: envUrl, eventTitle: null, eventId: null };
}
