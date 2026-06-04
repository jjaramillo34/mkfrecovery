import type { Metadata } from "next";
import {
  type LucideIcon,
  CalendarRange,
  Check,
  Home,
  LayoutGrid,
  Network,
  Stethoscope,
  Users,
  UsersRound,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Programs",
  description:
    "MKF programs: therapist involvement, group routines, and 30-, 60-, and 90-day options for people in recovery—plus family and community support.",
  path: "/programs",
});

const blocks: {
  id: string;
  title: string;
  body: string;
  bullets: string[];
  kicker: string;
  barClass: string;
  glow: "tl" | "br" | "tr";
  icon: LucideIcon;
}[] = [
  {
    id: "organizations",
    title: "Community programs & groups",
    body: "Recovery takes structure: facilitated groups, skills practice, and routines you can count on. MKF works with your team to design programs for adults and people of all ages—grounded in practical, evidence-based care where therapists are part of the plan, not a bolt-on afterthought.",
    bullets: [
      "Therapist-informed group themes and process groups where appropriate",
      "Recurring meeting rhythms and peer accountability in community settings",
      "Training for staff so language stays compassionate and consistent",
    ],
    kicker: "Field & groups",
    barClass: "from-mkf-teal via-mkf-gold to-mkf-accent",
    glow: "tl",
    icon: Users,
  },
  {
    id: "families",
    title: "Family & caregiver support",
    body: "Caregivers need plain language, clear next steps, and a sense of what a week in recovery can look like. MKF offers guided conversations and support materials—not a generic “resource library,” but help that tracks with real care plans.",
    bullets: [
      "Guided conversations with room for questions and grief",
      "Help navigating care levels and what to expect after treatment days",
      "Touchpoints so families are not left alone when intensity shifts",
    ],
    kicker: "Home & caregivers",
    barClass: "from-mkf-gold to-mkf-accent",
    glow: "br",
    icon: Home,
  },
  {
    id: "community",
    title: "Community partnerships",
    body: "Hospitals, faith communities, employers, and nonprofits can all extend the handoff into lasting recovery. MKF supports planning, communication, and follow-up that respects your capacity—and your participants’ privacy.",
    bullets: [
      "Joint program design, including realistic staffing and time horizons",
      "Handoff templates for transitions between 30/60/90 levels of care, where you co-host with us",
      "Evaluation that protects dignity and participant privacy",
    ],
    kicker: "Coalitions & systems",
    barClass: "from-mkf-teal to-mkf-primary",
    glow: "tr",
    icon: Network,
  },
];

const glowClass: Record<
  (typeof blocks)[number]["glow"],
  { outer: string; inner: string }
> = {
  tl: {
    outer: "absolute -right-6 -top-6 h-36 w-36 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_16%,transparent)] opacity-50 blur-3xl",
    inner: "absolute -bottom-6 -left-4 h-24 w-24 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_10%,transparent)] opacity-40 blur-2xl",
  },
  br: {
    outer: "absolute -left-4 -top-4 h-28 w-28 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_18%,transparent)] opacity-45 blur-2xl",
    inner: "absolute -right-2 bottom-0 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_12%,transparent)] opacity-40 blur-2xl",
  },
  tr: {
    outer: "absolute -bottom-2 -left-2 h-28 w-28 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_12%,transparent)] opacity-40 blur-2xl",
    inner: "absolute -right-8 -top-4 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--mkf-primary)_10%,transparent)] opacity-40 blur-2xl",
  },
};

const lengthTiers: { days: 30 | 60 | 90; title: string; blurb: string; stripe: string }[] = [
  {
    days: 30,
    title: "30 days",
    blurb: "Stabilization, intake clarity, and early group rhythm—so people know they can show up the next day.",
    stripe: "from-mkf-teal to-mkf-gold",
  },
  {
    days: 60,
    title: "60 days",
    blurb: "Deeper group routine, more therapist time where clinically indicated, and patterns that can hold in real life.",
    stripe: "from-mkf-gold to-mkf-accent",
  },
  {
    days: 90,
    title: "90 days",
    blurb: "Stronger practice runway before transition—same expectations, more reps, and firmer aftercare handoffs.",
    stripe: "from-mkf-accent to-mkf-primary/90",
  },
];

export default function ProgramsPage() {
  return (
    <Section
      id="programs"
      className="border-b border-mkf-border bg-mkf-hero-tint"
      wideHeader
      eyebrow="Programs"
      eyebrowIcon={LayoutGrid}
      title="Care you can plan around—groups, therapy touchpoints, and clear time horizons"
      intro="MKF helps build recovery that is more than a brochure: therapist involvement where it belongs, group routines you can show up to, and program options at 30, 60, and 90 days so the arc matches how healing actually works."
    >
      <div className="space-y-20 sm:space-y-24">
        <article
          id="how-mkf-cares"
          className="scroll-mt-28"
        >
          <div className="relative overflow-hidden rounded-2xl border border-mkf-border bg-mkf-surface p-7 shadow-[0_1px_0_rgba(15,23,42,0.05),0_8px_28px_-6px_rgba(12,44,64,0.1)] sm:p-9 dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_8px_32px_-6px_rgba(0,0,0,0.35)]">
            <div
              className="pointer-events-none absolute -right-6 top-0 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_10%,transparent)] opacity-50 blur-3xl"
              aria-hidden
            />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <Stethoscope
                    className="h-5 w-5 shrink-0 text-mkf-teal sm:h-6 sm:w-6"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">How MKF shows up</p>
                </div>
                <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-mkf-ink sm:text-3xl">
                  Therapists, groups, and routines that hold
                </h2>
                <p className="mt-4 text-base leading-relaxed text-mkf-muted sm:text-lg sm:leading-relaxed">
                  We are not a PDF warehouse. We help put real people in the room: licensed or affiliated{" "}
                  <strong className="font-semibold text-mkf-fg">therapists and clinicians</strong> where
                  your plan calls for it, structured <strong className="font-semibold text-mkf-fg">group
                  work</strong> you can return to, and a weekly <strong className="font-semibold text-mkf-fg">
                  routine</strong> you can name on a calendar—so recovery does not feel like a secret you keep alone.
                </p>
              </div>
              <ul className="m-0 flex-1 list-none space-y-0 divide-y divide-mkf-border/80 p-0">
                {[
                  {
                    icon: UsersRound,
                    t: "Group as backbone",
                    d: "Recurring times, clear expectations, and support that can survive a bad day.",
                  },
                  {
                    icon: Stethoscope,
                    t: "Therapy that fits the chapter",
                    d: "When assessment calls for it, therapist-led work sits alongside group—not instead of it.",
                  },
                ].map((x) => {
                  const I = x.icon;
                  return (
                    <li key={x.t} className="flex gap-3.5 py-4 first:pt-0 sm:py-5">
                      <I className="mt-0.5 h-5 w-5 flex-shrink-0 text-mkf-gold" strokeWidth={1.75} aria-hidden />
                      <p className="m-0 text-sm leading-relaxed text-mkf-muted sm:text-base">
                        <span className="block font-display font-semibold text-mkf-ink">{x.t}</span>
                        <span className="mt-0.5 block text-mkf-muted">{x.d}</span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </article>

        <article id="program-lengths" className="scroll-mt-28">
          <div className="mb-5 flex items-center gap-2.5 sm:mb-6">
            <CalendarRange
              className="h-5 w-5 shrink-0 text-mkf-teal"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">Time horizons</p>
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-mkf-ink sm:text-3xl">
            30, 60, and 90-day program options
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-mkf-muted sm:mt-4 sm:text-lg sm:leading-relaxed">
            Length is not a verdict—it is a match. We help people and partners think in{" "}
            <strong className="font-medium text-mkf-fg">30, 60, and 90-day</strong> increments so
            treatment intensity, group attendance, and therapist check-ins can line up with the life in front
            of them, not a calendar you outgrow on day one.
          </p>
          <ul className="m-0 mt-7 grid list-none grid-cols-1 gap-4 p-0 sm:mt-8 sm:grid-cols-3 sm:gap-5">
            {lengthTiers.map((tier) => (
              <li key={tier.days}>
                <div className="h-full overflow-hidden rounded-2xl border border-mkf-border/80 bg-mkf-surface/90 shadow-sm dark:border-mkf-border/50">
                  <div
                    className={`h-1 w-full bg-gradient-to-r ${tier.stripe}`}
                    aria-hidden
                  />
                  <div className="p-5 sm:p-6">
                    <p className="font-display text-2xl font-semibold tabular-nums text-mkf-teal sm:text-3xl">
                      {tier.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-mkf-muted sm:text-base">{tier.blurb}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </article>

        {blocks.map((b) => {
          const BlockIcon = b.icon;
          return (
            <article key={b.id} id={b.id} className="scroll-mt-28">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
                <div className="relative overflow-hidden rounded-2xl border border-mkf-border bg-mkf-surface p-8 shadow-[0_1px_0_rgba(15,23,42,0.05),0_8px_28px_-6px_rgba(12,44,64,0.1)] sm:p-10 dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_8px_32px_-6px_rgba(0,0,0,0.35)]">
                  <div
                    className={`pointer-events-none ${glowClass[b.glow].outer}`}
                    aria-hidden
                  />
                  <div
                    className={`pointer-events-none ${glowClass[b.glow].inner}`}
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-1 w-10 rounded-full bg-gradient-to-r sm:w-12 ${b.barClass}`}
                        aria-hidden
                      />
                      <BlockIcon
                        className="h-4 w-4 shrink-0 text-mkf-teal sm:h-5 sm:w-5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">
                        {b.kicker}
                      </p>
                    </div>
                    <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-mkf-ink sm:text-3xl">
                      {b.title}
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-mkf-muted sm:text-lg sm:leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </div>

                <Card
                  className="relative h-full overflow-hidden border-mkf-border shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-8px_rgba(12,44,64,0.1)]"
                  padded
                >
                  <div
                    className="pointer-events-none absolute right-0 top-0 h-20 w-20 translate-x-1/4 -translate-y-1/4 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_8%,transparent)] opacity-60 blur-2xl"
                    aria-hidden
                  />
                  <div className="relative">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-mkf-teal">
                      What it can include
                    </h3>
                    <ul className="mt-5 list-none space-y-4 p-0">
                      {b.bullets.map((x) => (
                        <li key={x} className="flex gap-3 text-sm leading-relaxed text-mkf-muted sm:text-base">
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-mkf-accent"
                            strokeWidth={2.25}
                            aria-hidden="true"
                          />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
