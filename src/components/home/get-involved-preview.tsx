import type { LucideIcon } from "lucide-react";
import { ArrowRight, HandHelping, Mail, MessageCircle, Megaphone, Network, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const actions: { title: string; body: string; icon: LucideIcon; iconClass: string }[] = [
  {
    title: "Volunteer",
    body: "Support community events, trainings, and family nights.",
    icon: HandHelping,
    iconClass: "text-mkf-gold",
  },
  {
    title: "Partner",
    body: "Bring MKF programming into your organization, faith community, or nonprofit.",
    icon: Network,
    iconClass: "text-mkf-teal",
  },
  {
    title: "Advocate",
    body: "Help elevate recovery, treatment access, and support as funding and policy priorities where you live.",
    icon: Megaphone,
    iconClass: "text-mkf-accent",
  },
];

export function GetInvolvedPreview() {
  return (
    <Section
      id="get-involved-preview"
      className="border-y border-mkf-border bg-[color-mix(in_oklab,var(--mkf-teal)_9%,var(--mkf-bg))] dark:bg-[color-mix(in_oklab,var(--mkf-teal)_14%,var(--mkf-bg))]"
      wideHeader
      headerAlign="center"
      eyebrow="Get involved"
      eyebrowIcon={UserPlus}
      title="Your time and voice can make recovery more possible"
      intro="Whether you mentor, organize events, or help another organization host a workshop, MKF welcomes partners who believe recovery support should be practical—and human."
    >
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        <Card
          padded={false}
          className="relative h-full overflow-hidden border-mkf-border shadow-sm lg:col-span-7"
        >
          <div
            className="h-0.5 w-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
            aria-hidden
          />
          <div className="relative p-5 sm:p-6 lg:p-7">
            <div
              className="pointer-events-none absolute -right-4 top-0 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_10%,transparent)] opacity-40 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-2 -left-2 h-24 w-24 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_8%,transparent)] opacity-30 blur-2xl"
              aria-hidden
            />
            <h3 className="font-display text-lg font-semibold text-mkf-ink sm:text-xl">Three ways to help</h3>
            <p className="mt-2 text-sm text-mkf-muted sm:text-base">
              Pick a lane to start—many people move between these over time.
            </p>
            <ul className="relative mt-5 space-y-0 divide-y divide-mkf-border/80 sm:mt-6">
              {actions.map((a) => {
                const I = a.icon;
                return (
                  <li key={a.title} className="flex gap-3.5 py-3.5 first:pt-0 sm:gap-4 sm:py-4">
                    <span
                      className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-mkf-border/80 bg-mkf-bg/80 dark:bg-mkf-bg/15"
                      aria-hidden
                    >
                      <I className={`h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem] ${a.iconClass}`} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-display text-base font-semibold text-mkf-ink sm:text-lg">{a.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-mkf-muted sm:text-base sm:leading-relaxed">
                        {a.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>

        <Card
          padded={false}
          className="relative flex h-full flex-col overflow-hidden border-mkf-border shadow-sm lg:col-span-5"
        >
          <div
            className="h-0.5 w-full bg-gradient-to-r from-mkf-gold to-mkf-accent"
            aria-hidden
          />
          <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
            <div className="mb-1 flex items-center gap-2">
              <MessageCircle
                className="h-4 w-4 shrink-0 text-mkf-primary sm:h-5 sm:w-5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <p className="font-display text-base font-semibold text-mkf-ink sm:text-lg sm:text-[1.125rem]">
                Start with a conversation
              </p>
            </div>
            <p className="text-sm leading-relaxed text-mkf-muted sm:text-base">
              Tell us what you care about—we&rsquo;ll match you to a realistic next step.
            </p>
            <div className="mt-5 flex w-full flex-col gap-2.5 sm:mt-6 sm:gap-3">
              <Button href="/get-involved" variant="primary" className="w-full justify-center gap-2">
                Explore opportunities
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              </Button>
              <Button href="/contact" variant="secondary" className="w-full justify-center gap-2">
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                Contact our team
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
