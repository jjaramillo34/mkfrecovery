import { Building2, MessageSquare, Quote, Users2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const quotes = [
  {
    quote:
      "MKF met our staff where we were—no jargon, no shame—just usable tools and follow-up we could actually implement.",
    attribution: "Peer recovery program lead",
  },
  {
    quote:
      "As a parent, I needed language that felt honest. The family support we got helped us talk without turning it into a lecture.",
    attribution: "Caregiver participant",
  },
] as const;

const partners = [
  // TODO: Add more partners from the setting
  "Neighborhood Network",
  "Community Center",
  "Recovery Center",
  "Recovery Network",
] as const;

const quoteStripe = (i: number) => (i === 0 ? "from-mkf-teal to-mkf-gold" : "from-mkf-gold to-mkf-accent");

export function TestimonialsPartners() {
  return (
    <Section
      id="testimonials-partners"
      className="border-y border-mkf-border bg-[color-mix(in_oklab,var(--mkf-primary)_5%,var(--mkf-bg))] dark:bg-[color-mix(in_oklab,var(--mkf-primary)_8%,var(--mkf-bg))]"
      wideHeader
      headerAlign="center"
      eyebrow="Voices & partners"
      eyebrowIcon={MessageSquare}
      title="Trusted relationships, built slowly"
      intro="We are grateful for partners who share data ethically, show up consistently, and keep the dignity of people in recovery at the center."
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-stretch">
        <div className="space-y-5 sm:space-y-6">
          {quotes.map((q, i) => (
            <Card
              key={q.attribution}
              padded={false}
              className="group overflow-hidden transition-shadow duration-200 hover:shadow-md"
            >
              <div
                className={`h-0.5 w-full bg-gradient-to-r ${quoteStripe(i)}`}
                aria-hidden
              />
              <figure className="relative p-5 sm:p-6">
                <div
                  className="pointer-events-none absolute -right-6 -top-4 h-20 w-20 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_8%,transparent)] opacity-30 blur-2xl transition-opacity group-hover:opacity-40"
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-center gap-2.5 text-mkf-accent">
                    <Quote
                      className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal/90">
                      Voice
                    </span>
                  </div>
                  <blockquote className="mt-3 m-0 border-0 p-0 text-base leading-relaxed text-mkf-fg sm:mt-4 sm:text-lg sm:leading-relaxed">
                    <span className="text-mkf-ink/90">“{q.quote}”</span>
                  </blockquote>
                  <figcaption className="mt-4 border-t border-mkf-border/80 pt-4 text-sm text-mkf-muted sm:mt-5 sm:pt-4">
                    <span className="font-medium text-mkf-ink/90">— {q.attribution}</span>
                  </figcaption>
                </div>
              </figure>
            </Card>
          ))}
        </div>

        <Card
          padded={false}
          className="relative flex h-full min-h-0 flex-col overflow-hidden"
        >
          <div
            className="h-0.5 w-full bg-gradient-to-r from-mkf-accent to-mkf-primary/90 dark:to-mkf-primary/70"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-2 right-0 h-28 w-28 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_10%,transparent)] opacity-25 blur-2xl"
            aria-hidden
          />
          <div className="relative flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-mkf-border/80 bg-mkf-bg/70 dark:bg-mkf-bg/20">
                <Users2
                  className="h-4 w-4 text-mkf-primary sm:h-5 sm:w-5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <h3 className="font-display text-lg font-semibold text-mkf-ink sm:text-[1.125rem]">
                Partner organizations
              </h3>
            </div>
            <p className="mt-1 text-sm text-mkf-muted">
              Coalitions, centers, and networks we work alongside.
            </p>
            <ul className="mt-4 grid flex-1 gap-2.5 sm:mt-5 sm:grid-cols-2 sm:gap-3">
              {partners.map((p) => (
                <li
                  key={p}
                  className="flex min-h-11 items-center gap-2 rounded-lg border border-mkf-border/90 bg-mkf-surface/90 px-3.5 py-2.5 text-left text-sm font-medium leading-snug text-mkf-fg shadow-sm dark:bg-mkf-bg/40"
                >
                  <span
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mkf-gold"
                    aria-hidden
                  />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg border border-dashed border-mkf-border/90 bg-mkf-bg/50 px-3.5 py-2.5 dark:bg-mkf-bg/20 sm:mt-5">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-mkf-muted">
                <Building2
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mkf-muted"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>
                  Names shown are sample placeholders. Replace with your real collaborators, agreements, and logos
                  when you have permission.
                </span>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
