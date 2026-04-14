import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const blocks = [
  {
    title: "For families",
    text: "Conversation guides, boundary-setting scripts, and where to seek help—written with warmth, not judgment.",
    href: "/resources#families",
  },
  {
    title: "For other organizations",
    text: "Facilitator sparks, training outlines, and referral pathways you can adapt to your team’s policies.",
    href: "/resources#organizations",
  },
  {
    title: "For youth",
    text: "Peer-to-peer framing, leadership prompts, and healthy coping ideas teens can actually use.",
    href: "/resources#youth",
  },
];

export function ResourcesPreview() {
  return (
    <Section
      id="resources-preview"
      eyebrow="Resources"
      title="Tools you can use this week"
      intro="These previews link to deeper resource hubs—downloadable PDFs, facilitator notes, and vetted referrals (placeholders for now, ready for your real content)."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {blocks.map((b) => (
          <Card key={b.title}>
            <h3 className="font-display text-lg font-semibold text-mkf-ink">{b.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mkf-muted">{b.text}</p>
            <Link
              href={b.href}
              className="mt-5 inline-flex text-sm font-semibold text-mkf-primary hover:underline"
            >
              Browse resources
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
