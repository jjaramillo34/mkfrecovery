import type { Metadata } from "next";
import { MichaelMemorialSection } from "@/components/memorial/michael-memorial";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Mission & Vision",
  description:
    "MKF’s mission and vision: compassionate drug prevention, community partnership, and sustainable support for youth and families.",
  path: "/mission",
});

export default function MissionPage() {
  return (
    <>
      <Section
        eyebrow="Mission & vision"
        title="Break the Chain—through prevention rooted in dignity"
        intro="Our mission is to reduce substance-related harm by strengthening education, early support, and community connection—especially for young people navigating complex environments."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <article className="border border-mkf-border bg-mkf-surface p-8">
            <h2 className="font-display text-2xl font-semibold text-mkf-ink">Mission</h2>
            <p className="mt-4 text-base leading-relaxed text-mkf-muted">
              We advance hope-centered drug prevention by partnering with families, other organizations, and neighbors
              to deliver credible education, practical tools, and compassionate navigation to
              help—without stigma.
            </p>
          </article>
          <article className="border border-mkf-border bg-mkf-surface p-8">
            <h2 className="font-display text-2xl font-semibold text-mkf-ink">Vision</h2>
            <p className="mt-4 text-base leading-relaxed text-mkf-muted">
              We envision communities where young people are known, supported, and safe to grow—where
              prevention is a shared responsibility expressed through policy, practice, and everyday care.
            </p>
          </article>
        </div>
      </Section>

      <MichaelMemorialSection />

      <Section
        className="bg-mkf-surface"
        title="Values we try to practice out loud"
        intro="These are not slogans on a wall—they shape who we hire, how we train, and how we respond when things get hard."
      >
        <ul className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Integrity",
              text: "We cite sources, admit limits, and correct course when new evidence emerges.",
            },
            {
              title: "Compassion",
              text: "We lead with empathy for young people and the adults who care for them.",
            },
            {
              title: "Courage",
              text: "We name hard topics plainly—without relying on fear as a shortcut.",
            },
            {
              title: "Partnership",
              text: "We share ownership with communities; MKF is a collaborator, not a savior.",
            },
          ].map((v) => (
            <li key={v.title} className="border-l-2 border-mkf-teal pl-6">
              <h3 className="font-display text-lg font-semibold text-mkf-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mkf-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
