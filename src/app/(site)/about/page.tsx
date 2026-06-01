import type { Metadata } from "next";
import { type LucideIcon, BarChart3, BookOpen, Info, PenLine, UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn about the Michael Kellermann Foundation’s origins, values, and the community-centered approach behind our recovery and sobriety support work.",
  path: "/about",
});

const principles: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Listen first",
    text: "We start with what communities already do well and build from trust—not a deficit checklist.",
    icon: UserRound,
  },
  {
    title: "Co-create",
    text: "Partners shape timing, tone, and follow-up so programs fit real life, not a generic script.",
    icon: PenLine,
  },
  {
    title: "Measure with care",
    text: "We track outcomes that matter to families and partners—never vanity metrics for a slide deck.",
    icon: BarChart3,
  },
];

export default function AboutPage() {
  return (
    <>
      <Section
        id="about"
        className="border-b border-mkf-border bg-mkf-hero-tint"
        wideHeader
        eyebrow="About MKF"
        eyebrowIcon={Info}
        title="A foundation built on hope, honesty, and follow-through"
        intro="We believe people and families of all ages deserve spaces where recovery and sobriety are met with respect—not shame—and where asking for help is seen as strength."
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="space-y-6 text-base leading-relaxed text-mkf-muted lg:col-span-6">
            <p className="text-lg text-mkf-fg sm:text-xl sm:leading-relaxed">
              The Michael Kellermann Foundation exists to strengthen the fabric of support around people
              of all ages who are already in the work of active use, treatment, and long-term
              recovery—alongside caring family and community. Our work is grounded in listening, especially
              to people and partners who are too often left to carry the weight alone.
            </p>
            <p>
              MKF develops and supports programming that is culturally responsive, honors lived experience, and
              is practical. We are not here to lecture. We are here to equip—with language, with tools, and
              with partnerships that last beyond a single event or training.
            </p>
          </div>

          <aside
            className="relative overflow-hidden border border-mkf-border bg-mkf-surface p-8 shadow-[0_1px_0_rgba(15,23,42,0.05),0_10px_28px_-6px_rgba(12,44,64,0.12)] sm:p-10 dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_10px_32px_-6px_rgba(0,0,0,0.35)] lg:col-span-6"
            aria-labelledby="how-we-work-heading"
          >
            <div
              className="pointer-events-none absolute -right-6 top-0 h-28 w-28 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_12%,transparent)] opacity-50 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_10%,transparent)] opacity-40 blur-2xl"
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span
                  className="h-1 w-10 rounded-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">Process</p>
              </div>
              <h2
                id="how-we-work-heading"
                className="font-display mt-4 text-2xl font-semibold tracking-tight text-mkf-ink sm:text-3xl"
              >
                How we work
              </h2>
              <ol className="mt-8 list-none space-y-0">
                {[
                  {
                    n: "1",
                    lead: "Start with community context.",
                    rest: " We map strengths, not deficits.",
                  },
                  {
                    n: "2",
                    lead: "Co-design delivery.",
                    rest: " Partners help shape timing, tone, and follow-up.",
                  },
                  {
                    n: "3",
                    lead: "Measure responsibly.",
                    rest: " We report on outcomes that matter to families and partners.",
                  },
                ].map((step) => (
                  <li
                    key={step.n}
                    className="flex gap-4 border-b border-mkf-border py-5 first:pt-0 last:border-0 last:pb-0"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mkf-border bg-mkf-bg font-display text-sm font-bold text-mkf-primary"
                      aria-hidden
                    >
                      {step.n}
                    </span>
                    <p className="text-sm leading-relaxed text-mkf-muted sm:text-base">
                      <strong className="font-semibold text-mkf-fg">{step.lead}</strong>
                      {step.rest}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>

        <div
          className="mt-14 max-w-3xl rounded-lg border border-dashed border-mkf-border bg-mkf-bg/80 px-5 py-4 text-sm leading-relaxed text-mkf-muted dark:bg-mkf-surface/40"
        >
          <p className="m-0">
            <span className="font-semibold text-mkf-fg">Note for launch: </span>
            This site may still list placeholder contact details and impact numbers in places. Replace
            them with your verified information and stories your community can trust.
          </p>
        </div>
      </Section>

      <Section
        className="bg-mkf-surface"
        eyebrow="In practice"
        eyebrowIcon={BookOpen}
        title="Principles in practice"
        intro="What you can expect when you work alongside MKF—whether you are a caregiver, a peer leader, or part of another organization."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((p) => {
            const I = p.icon;
            return (
              <Card key={p.title} className="h-full">
                <div className="flex items-start gap-2.5">
                  <I
                    className="h-5 w-5 shrink-0 text-mkf-teal"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-mkf-ink">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mkf-muted">{p.text}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}
