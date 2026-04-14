import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn about the Michael Kellermann Foundation’s origins, values, and the community-centered approach behind our prevention work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section
      eyebrow="About MKF"
      title="A foundation built on hope, honesty, and follow-through"
      intro="We believe young people deserve environments where prevention is normalized—not sensationalized—and where asking for help is seen as strength."
    >
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5 text-base leading-relaxed text-mkf-muted">
          <p>
            The Michael Kellermann Foundation exists to strengthen the protective fabric around young
            people: caring adults, clear expectations, meaningful opportunities, and access to early
            support. Our work is grounded in listening—especially to families and educators who are
            often asked to carry too much alone.
          </p>
          <p>
            MKF develops and supports programming that is culturally responsive, age-appropriate, and
            practical. We are not here to lecture. We are here to equip: with language, with tools, and
            with partnerships that last beyond a single assembly or training day.
          </p>
          <p>
            This site uses placeholder details for contact information and impact metrics. As you prepare
            for launch, replace them with verified organizational data and stories your community can trust.
          </p>
        </div>
        <aside className="border border-mkf-border bg-mkf-surface p-8">
          <h2 className="font-display text-xl font-semibold text-mkf-ink">How we work</h2>
          <ol className="mt-5 list-decimal space-y-4 pl-5 text-sm leading-relaxed text-mkf-muted">
            <li>
              <strong className="font-semibold text-mkf-fg">Start with community context.</strong> We map
              strengths, not deficits.
            </li>
            <li>
              <strong className="font-semibold text-mkf-fg">Co-design delivery.</strong> Partners help shape
              timing, tone, and follow-up.
            </li>
            <li>
              <strong className="font-semibold text-mkf-fg">Measure responsibly.</strong> We track outcomes
              that matter to families and partners—not vanity metrics.
            </li>
          </ol>
        </aside>
      </div>
    </Section>
  );
}
