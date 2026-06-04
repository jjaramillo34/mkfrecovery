import type { LucideIcon } from "lucide-react";
import { Building2, Heart, MessageCircle, Shield } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";

const points: {
  title: string;
  text: string;
  icon: LucideIcon;
  topBar: string;
  iconRing: string;
}[] = [
  {
    title: "Honest conversation opens the door",
    text: "Naming use and relapse without shame makes room for help—at any age. We encourage open dialogue, peer connection, and clear next steps for people already facing addiction problems and the people who love them.",
    icon: MessageCircle,
    topBar: "from-mkf-teal via-mkf-gold/50 to-mkf-accent/50",
    iconRing: "bg-mkf-teal/12 text-mkf-teal",
  },
  {
    title: "Partners meet people where they are",
    text: "Clinics, community groups, and other organizations see people every day. Shared training, language, and practical tools help every team show up for recovery with consistency and care.",
    icon: Building2,
    topBar: "from-mkf-gold via-mkf-teal/45 to-mkf-accent/45",
    iconRing: "bg-mkf-gold/12 text-mkf-gold",
  },
  {
    title: "Families need backup, not blame",
    text: "The people we love in recovery should not be alone—and neither should those who support them. We point families to credible tools, guidance, and hope for the long work of healing together.",
    icon: Heart,
    topBar: "from-mkf-accent via-mkf-teal/40 to-mkf-gold/50",
    iconRing: "bg-mkf-accent/10 text-mkf-accent",
  },
];

export function WhyRecovery() {
  return (
    <section
      id="why-recovery"
      className="relative scroll-mt-20 overflow-hidden border-y border-mkf-border py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-mkf-surface via-[color-mix(in_oklab,var(--mkf-primary)_4%,var(--mkf-surface))] to-mkf-bg dark:from-mkf-surface dark:via-[color-mix(in_oklab,var(--mkf-primary)_8%,var(--mkf-surface))] dark:to-mkf-bg" />
        <div
          className="absolute -left-6 top-0 h-48 w-48 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_18%,transparent)] opacity-40 blur-3xl dark:opacity-30"
        />
        <div
          className="absolute -right-8 bottom-0 h-44 w-44 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_14%,transparent)] opacity-35 blur-3xl"
        />
        <div
          className="absolute left-1/2 top-1/3 h-24 w-72 -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_8%,transparent)] opacity-25 blur-2xl"
        />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          variant="wide"
          align="center"
          eyebrow="Recovery & life"
          eyebrowIcon={Shield}
          title="Sobriety, healing, and community go together"
          intro="Sustainable recovery is not built on fear—it is built on support, connection, and environments where asking for help is met with respect. MKF centers people of all ages who are living with addiction, dependency, and the daily struggle to heal."
        />

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {points.map((p) => {
            const I = p.icon;
            return (
              <li key={p.title}>
                <article
                  className="h-full overflow-hidden rounded-2xl border border-mkf-border/80 bg-mkf-surface/95 shadow-[0_1px_0_0_rgba(15,23,42,0.04),0_16px_40px_-20px_rgba(12,44,64,0.16)] dark:border-mkf-border/50 dark:bg-mkf-surface/90 dark:shadow-[0_1px_0_0_rgba(0,0,0,0.2),0_20px_45px_-22px_rgba(0,0,0,0.4)]"
                >
                  <div
                    className={`h-0.5 w-full bg-gradient-to-r ${p.topBar}`}
                    aria-hidden
                  />
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${p.iconRing}`}
                      >
                        <I className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold leading-snug text-mkf-ink">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-mkf-muted">{p.text}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-mkf-muted sm:mt-12">
          Read more about our direction and values on the{" "}
          <Link
            className="font-medium text-mkf-primary underline decoration-mkf-primary/30 underline-offset-4 transition-colors hover:decoration-mkf-primary/70"
            href="/mission"
          >
            Mission
          </Link>{" "}
          page.
        </p>
      </Container>
    </section>
  );
}
