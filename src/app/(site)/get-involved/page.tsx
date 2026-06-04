import type { Metadata } from "next";
import { type LucideIcon, ClipboardList, HandHelping, Heart, Megaphone, Network, UserPlus } from "lucide-react";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Get Involved",
  description:
    "Volunteer, partner, advocate, or explore giving opportunities with the Michael Kellermann Foundation.",
  path: "/get-involved",
});

const glowPair = {
  a: "pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_14%,transparent)] opacity-50 blur-3xl",
  b: "pointer-events-none absolute -bottom-4 -left-2 h-24 w-24 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_12%,transparent)] opacity-40 blur-2xl",
} as const;

const pathways: {
  title: string;
  text: string;
  kicker: string;
  barClass: string;
  cta: { href: string; label: string };
  icon: LucideIcon;
}[] = [
  {
    kicker: "Time & people",
    title: "Volunteer",
    text: "Help with events, trainings, translation, logistics, and family nights. We will match you to work that fits your schedule.",
    barClass: "from-mkf-teal via-mkf-gold to-mkf-accent",
    cta: { href: "#volunteer", label: "Open interest form" },
    icon: HandHelping,
  },
  {
    kicker: "Shared goals",
    title: "Partner",
    text: "Invite MKF into your nonprofit, coalition, or community when your recovery, education, and support goals line up. We value steady collaboration over one-off heroics.",
    barClass: "from-mkf-gold to-mkf-accent",
    cta: { href: "/contact", label: "Start a conversation" },
    icon: Network,
  },
  {
    kicker: "Policy & voice",
    title: "Advocate",
    text: "Champion funding and policies that make treatment, recovery, and long-term support easier to find in every community—local, regional, and state tables where your voice can carry.",
    barClass: "from-mkf-teal to-mkf-primary",
    cta: { href: "/contact", label: "Reach the team" },
    icon: Megaphone,
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <Section
        id="get-involved"
        className="border-b border-mkf-border bg-mkf-hero-tint"
        wideHeader
        headerAlign="center"
        eyebrow="Get involved"
        eyebrowIcon={UserPlus}
        title="Bring your strengths—recovery is a community project"
        intro="Whether you can offer time, expertise, connections, or financial support, there is a meaningful role to play. We are especially looking for partners who want steady collaboration, not one-off heroics."
      >
        <div className="mx-auto w-full max-w-6xl">
        <article
          className="relative mx-auto overflow-hidden scroll-mt-28 rounded-2xl border border-mkf-border bg-mkf-surface p-8 text-center shadow-[0_1px_0_rgba(15,23,42,0.05),0_8px_28px_-6px_rgba(12,44,64,0.1)] sm:p-10 dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_8px_32px_-6px_rgba(0,0,0,0.35)]"
          aria-labelledby="pathways-heading"
        >
          <div className={glowPair.a} aria-hidden />
          <div className={glowPair.b} aria-hidden />
          <div className="relative">
            <div className="flex items-center justify-center gap-3">
              <span
                className="h-1 w-10 rounded-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent sm:w-12"
                aria-hidden
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">Three ways in</p>
            </div>
            <h2
              id="pathways-heading"
              className="font-display mt-4 text-2xl font-semibold tracking-tight text-mkf-ink sm:text-3xl"
            >
              Pick the door that matches how you want to help
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-mkf-muted sm:text-lg sm:leading-relaxed">
              Each path stays connected to the others—partners show up as volunteers, volunteers become advocates, and
              funders make programs possible. Start anywhere.
            </p>
          </div>
        </article>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {pathways.map((p, i) => {
          const PIcon = p.icon;
          return (
            <Card
              key={p.title}
              padded={false}
              className="relative flex h-full flex-col overflow-hidden transition-shadow duration-200 hover:shadow-md"
            >
              <div
                className={`h-0.5 w-full bg-gradient-to-r ${
                  i === 0
                    ? "from-mkf-teal to-mkf-gold"
                    : i === 1
                      ? "from-mkf-gold to-mkf-accent"
                      : "from-mkf-accent to-mkf-primary"
                }`}
                aria-hidden
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-1 w-8 flex-shrink-0 rounded-full bg-gradient-to-r sm:w-9 ${p.barClass}`}
                    aria-hidden
                  />
                  <PIcon
                    className="h-3.5 w-3.5 flex-shrink-0 text-mkf-teal sm:h-4 sm:w-4"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mkf-muted">{p.kicker}</p>
                </div>
                <h3 className="font-display mt-3 text-lg font-semibold text-mkf-ink sm:text-xl">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mkf-muted sm:text-base sm:leading-relaxed">
                  {p.text}
                </p>
                <Button
                  href={p.cta.href}
                  variant="secondary"
                  className="mt-5 w-full justify-center"
                >
                  {p.cta.label}
                </Button>
              </div>
            </Card>
          );
        })}
        </div>
        </div>
      </Section>

      <Section
        id="volunteer"
        className="scroll-mt-28 border-b border-mkf-border bg-mkf-surface"
        wideHeader
        headerAlign="center"
        eyebrow="Volunteer"
        eyebrowIcon={ClipboardList}
        title="Volunteer interest form"
        intro="Tell us a little about yourself—we will follow up with realistic opportunities, not a generic mailing list."
      >
        <article
          className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-mkf-border bg-mkf-bg/80 p-6 shadow-[0_1px_0_rgba(15,23,42,0.04),0_6px_24px_-4px_rgba(12,44,64,0.08)] sm:p-8 dark:bg-mkf-surface/80 dark:shadow-[0_1px_0_rgba(0,0,0,0.15),0_6px_24px_-4px_rgba(0,0,0,0.2)]"
          aria-label="Volunteer sign-up"
        >
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_12%,transparent)] opacity-50 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-4 -left-3 h-24 w-24 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_10%,transparent)] opacity-40 blur-2xl"
            aria-hidden
          />
          <div className="relative">
            <div className="mb-6 flex items-center justify-center gap-2">
              <span className="h-1 w-9 rounded-full bg-gradient-to-r from-mkf-gold to-mkf-accent" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-gold">We read every message</span>
            </div>
            <VolunteerForm />
          </div>
        </article>
      </Section>

      <Section
        id="giving"
        className="border-b border-mkf-border bg-mkf-hero-tint"
        wideHeader
        headerAlign="center"
        eyebrow="Support"
        eyebrowIcon={Heart}
        title="Giving that sustains programs"
        intro="Monthly donations help us plan trainings, keep materials free for under-resourced communities, and respond when partners need urgent support."
      >
        <div className="mx-auto max-w-2xl text-center">
          <Card padded={false} className="relative flex flex-col overflow-hidden">
            <div
              className="h-0.5 w-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
              aria-hidden
            />
            <div className="relative p-6 sm:p-8">
              <p className="text-base leading-relaxed text-mkf-muted">
                Workplace giving, donor-advised funds, and sponsorships can all strengthen recovery and support work. For
                major gifts or sponsorship inquiries, reach out through the contact page with “Partnerships” in
                your message.
              </p>
              <p className="mt-4 text-sm text-mkf-muted">
                Looking to donate now? You can go straight to our donate flow.
              </p>
              <div className="mt-5 flex justify-center">
                <Button href="/donate" variant="primary">
                  Donate
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
