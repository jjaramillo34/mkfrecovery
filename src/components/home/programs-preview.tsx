import type { LucideIcon } from "lucide-react";
import { ArrowRight, BookOpen, CalendarRange, Home, Network, Stethoscope, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";

const programs: {
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
  topBar: string;
  iconRing: string;
}[] = [
  {
    title: "Community programs",
    text: "Therapist-informed groups, meeting rhythms, and community support for people in active recovery.",
    href: "/programs#organizations",
    icon: Users,
    topBar: "from-mkf-teal via-mkf-gold to-mkf-accent",
    iconRing: "bg-mkf-teal/12 text-mkf-teal",
  },
  {
    title: "Family & caregiver support",
    text: "Guided discussions, care navigation, and next steps for families walking alongside someone in treatment.",
    href: "/programs#families",
    icon: Home,
    topBar: "from-mkf-gold via-mkf-accent/60 to-mkf-teal/50",
    iconRing: "bg-mkf-gold/12 text-mkf-gold",
  },
  {
    title: "Community partnerships",
    text: "Coalition building, training, and planning so handoffs into recovery hold after the first weeks.",
    href: "/programs#community",
    icon: Network,
    topBar: "from-mkf-teal via-mkf-primary/50 to-mkf-accent/50",
    iconRing: "bg-mkf-accent/10 text-mkf-accent",
  },
];

const lengthOptions: { label: string; sub: string }[] = [
  { label: "30 days", sub: "Stabilize and set the first routine." },
  { label: "60 days", sub: "Build depth in group and individual work." },
  { label: "90 days", sub: "Strengthen practice before the next step." },
];

export function ProgramsPreview() {
  return (
    <section
      id="programs-preview"
      className="relative scroll-mt-20 overflow-hidden border-b border-mkf-border py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_oklab,var(--mkf-teal)_7%,var(--mkf-bg))] via-mkf-bg to-mkf-surface dark:from-[color-mix(in_oklab,var(--mkf-teal)_12%,var(--mkf-bg))] dark:via-mkf-bg dark:to-mkf-surface" />
        <div
          className="absolute -right-12 top-1/4 h-52 w-52 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_12%,transparent)] opacity-40 blur-3xl"
        />
        <div
          className="absolute -left-4 bottom-0 h-40 w-40 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_15%,transparent)] opacity-35 blur-3xl dark:opacity-28"
        />
        <div
          className="absolute right-1/4 top-8 h-20 w-56 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_10%,transparent)] opacity-20 blur-2xl"
        />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          variant="wide"
          align="center"
          eyebrow="Programs"
          eyebrowIcon={BookOpen}
          title="Real care, not a link list"
          intro="MKF can include therapist involvement, structured group routines, and program timeframes you can plan for—so recovery has a face, a place, and a week you can see on the calendar."
        />

        <div className="mb-8 overflow-hidden rounded-2xl border border-mkf-border/80 bg-mkf-surface/90 p-5 shadow-sm sm:mb-10 sm:p-6 dark:border-mkf-border/50 dark:bg-mkf-surface/85">
          <div
            className="h-0.5 w-full max-w-sm rounded-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
            aria-hidden
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <Stethoscope
              className="h-5 w-5 flex-shrink-0 text-mkf-teal sm:mt-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <div>
              <h3 className="font-display text-base font-semibold text-mkf-ink sm:text-lg">Therapists, groups, routines</h3>
              <p className="mt-1 text-sm leading-relaxed text-mkf-muted sm:text-base">
                We help assemble what people in substance use need most: <strong className="font-medium text-mkf-fg">clinical and therapist
                touchpoints</strong> where the plan requires them, <strong className="font-medium text-mkf-fg">group work</strong> that shows up
                on the same days each week, and a <strong className="font-medium text-mkf-fg">care rhythm</strong> you can name without guesswork.
              </p>
            </div>
          </div>
        </div>

        <div
          className="mb-8 sm:mb-10"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">
            <span className="inline-flex items-center justify-center gap-2">
              <CalendarRange className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Program length options
            </span>
          </p>
          <ul className="mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3 sm:gap-4">
            {lengthOptions.map((L) => (
              <li key={L.label}>
                <div className="h-full rounded-xl border border-mkf-border/70 bg-mkf-surface/80 p-4 text-center dark:border-mkf-border/50 dark:bg-mkf-surface/70 sm:p-5">
                  <p className="font-display text-lg font-semibold text-mkf-teal sm:text-xl">{L.label}</p>
                  <p className="mt-1 text-xs text-mkf-muted sm:text-sm">{L.sub}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-mkf-muted">
            Details, eligibility, and medical decisions live with your care team—we help align the schedule and
            the community layer around 30, 60, and 90-day options when that is the right fit.{" "}
            <Link className="font-medium text-mkf-primary underline decoration-mkf-primary/30 underline-offset-4 hover:decoration-mkf-primary/60" href="/programs#program-lengths">
              Read more
            </Link>
          </p>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {programs.map((p) => {
            const I = p.icon;
            return (
              <li key={p.title} className="min-h-0">
                <article
                  className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-mkf-border/80 bg-mkf-surface/95 shadow-[0_1px_0_0_rgba(15,23,42,0.04),0_16px_40px_-20px_rgba(12,44,64,0.16)] dark:border-mkf-border/50 dark:bg-mkf-surface/90 dark:shadow-[0_1px_0_0_rgba(0,0,0,0.2),0_20px_45px_-22px_rgba(0,0,0,0.4)]"
                >
                  <div
                    className={`h-0.5 w-full bg-gradient-to-r ${p.topBar}`}
                    aria-hidden
                  />
                  <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
                    <div className="flex min-w-0 items-start gap-3">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${p.iconRing}`}
                      >
                        <I className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <h3 className="font-display text-lg font-semibold leading-snug text-mkf-ink">
                        {p.title}
                      </h3>
                    </div>
                    <p className="mt-3 min-h-0 flex-1 text-sm leading-relaxed text-mkf-muted sm:mt-3.5">
                      {p.text}
                    </p>
                    <Link
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-mkf-primary"
                      href={p.href}
                    >
                      <span className="border-b border-transparent pb-0.5 transition-[border-color] group-hover:border-mkf-primary/40">
                        View details
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Button href="/programs#how-mkf-cares" variant="primary" className="inline-flex items-center gap-2">
            See the full programs overview
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
