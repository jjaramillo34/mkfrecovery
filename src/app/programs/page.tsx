import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Programs",
  description:
    "Explore MKF programs for families, youth, and other organizations—education, training, and collaborative prevention initiatives.",
  path: "/programs",
});

const blocks = [
  {
    id: "organizations",
    title: "Community & youth programs",
    body: "Interactive workshops, youth leadership development, and supports designed with your team—not imposed on you. Content is scaffolded by age and aligned to your policies, culture, and referral systems.",
    bullets: [
      "Training on early identification and compassionate response",
      "Youth-facing sessions focused on coping, belonging, and healthy norms",
      "Materials that reinforce help-seeking as a strength",
    ],
  },
  {
    id: "families",
    title: "Family & caregiver support",
    body: "Caregivers deserve clear language and credible next steps. MKF offers facilitated sessions and take-home resources that reduce shame and increase confidence—especially when families feel unsure where to begin.",
    bullets: [
      "Guided conversations with room for questions",
      "Referral navigation with vetted local partners (placeholders here)",
      "Follow-up touchpoints so families are not left alone after one event",
    ],
  },
  {
    id: "community",
    title: "Community partnerships",
    body: "Prevention holds when institutions align. MKF supports coalitions, faith communities, and nonprofits with planning tools, shared metrics, and training that respects each partner’s role.",
    bullets: [
      "Joint program design and realistic timelines",
      "Cross-sector communication templates",
      "Evaluation support that protects participant privacy",
    ],
  },
];

export default function ProgramsPage() {
  return (
    <Section
      eyebrow="Programs"
      title="Programs that meet people where they already gather"
      intro="Each initiative is built to be adapted. The goal is sustainable practice—not a one-time splash."
    >
      <div className="space-y-16">
        {blocks.map((b) => (
          <article key={b.id} id={b.id} className="scroll-mt-28">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div>
                <h2 className="font-display text-2xl font-semibold text-mkf-ink">{b.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-mkf-muted">{b.body}</p>
              </div>
              <Card>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-mkf-teal">
                  What it can include
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-mkf-muted">
                  {b.bullets.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
