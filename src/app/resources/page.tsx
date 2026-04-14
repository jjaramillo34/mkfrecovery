import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resources",
  description:
    "Prevention resources for families, schools, and youth—conversation guides, classroom supports, and help-seeking pathways.",
  path: "/resources",
});

const hubs = [
  {
    id: "families",
    title: "For families & caregivers",
    copy: "Start with warmth. These placeholder resources are designed to help adults open conversations, set boundaries with care, and recognize when professional support is the right next step.",
    links: ["Conversation prompts (PDF)", "What to say when you’re worried (PDF)", "Local help checklist (PDF)"],
  },
  {
    id: "schools",
    title: "For schools & educators",
    copy: "Practical supports for busy school communities—short lesson sparks, staff learning modules, and referral language that aligns with student support teams.",
    links: ["Staff learning module outline (PDF)", "Classroom coping skills micro-lesson (PDF)", "Referral pathway template (PDF)"],
  },
  {
    id: "youth",
    title: "For youth & peer leaders",
    copy: "Youth leadership works when it’s authentic. These starter prompts help teens practice peer support boundaries and connect friends to trusted adults.",
    links: ["Peer support boundaries (PDF)", "Healthy coping menu (PDF)", "How to help a friend (PDF)"],
  },
];

export default function ResourcesPage() {
  return (
    <Section
      eyebrow="Resources"
      title="Credible tools for real conversations"
      intro="Replace placeholder PDF links with your finalized documents. Prioritize accessibility: readable fonts, high contrast, and translations your community needs."
    >
      <div className="space-y-12">
        {hubs.map((h) => (
          <article key={h.id} id={h.id} className="scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold text-mkf-ink">{h.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-mkf-muted">{h.copy}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {h.links.map((label) => (
                <Card key={label} className="p-5">
                  <p className="text-sm font-medium text-mkf-fg">{label}</p>
                  <Link
                    href="#"
                    className="mt-3 inline-flex text-sm font-semibold text-mkf-primary hover:underline"
                  >
                    Download (sample)
                  </Link>
                </Card>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
