import type { Metadata } from "next";
import Image from "next/image";
import { type LucideIcon, BadgeCheck, Eye, Flame, Handshake, Heart, Scale, ShieldCheck, Target } from "lucide-react";
import { MichaelMemorialSection } from "@/components/memorial/michael-memorial";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Mission & Vision",
  description:
    "MKF’s mission and vision: compassionate support for addiction recovery, sobriety, and healthier life, plus community partnership for people and families of all ages.",
  path: "/mission",
});

const values: {
  title: string;
  text: string;
  accent: "teal" | "gold" | "accent" | "primary";
  icon: LucideIcon;
}[] = [
  {
    title: "Integrity",
    text: "We cite sources, admit limits, and correct course when new evidence emerges.",
    accent: "teal",
    icon: Scale,
  },
  {
    title: "Compassion",
    text: "We lead with empathy for people in active use, people in recovery, and everyone who shows up for them—any age, any chapter.",
    accent: "gold",
    icon: Heart,
  },
  {
    title: "Courage",
    text: "We name hard topics plainly—without relying on fear as a shortcut.",
    accent: "accent",
    icon: Flame,
  },
  {
    title: "Partnership",
    text: "We share ownership with communities; MKF is a collaborator, not a savior.",
    accent: "primary",
    icon: Handshake,
  },
  {
    title: "Honesty",
    text: "We are honest about our limitations and the challenges we face.",
    accent: "accent",
    icon: ShieldCheck,
  },
  {
    title: "Transparency",
    text: "We are transparent about our goals and our progress.",
    accent: "primary",
    icon: Eye,
  },
];

const valueTopAccent: Record<(typeof values)[number]["accent"], string> = {
  teal: "border-t-2 border-t-mkf-teal",
  gold: "border-t-2 border-t-mkf-gold",
  accent: "border-t-2 border-t-mkf-accent",
  primary: "border-t-2 border-t-mkf-primary",
};

export default function MissionPage() {
  return (
    <>
      <Section
        id="mission"
        className="border-b border-mkf-border bg-mkf-hero-tint"
        wideHeader
        eyebrow="Mission & vision"
        eyebrowIcon={Target}
        title="Break the Chain—rooted in dignity, recovery, and new life"
      >
        <article className="rounded-2xl border border-mkf-border bg-mkf-surface/90 px-6 py-8 shadow-sm sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="space-y-6 text-lg leading-relaxed text-mkf-fg sm:space-y-7 sm:text-xl sm:leading-relaxed lg:space-y-8 lg:text-[1.35rem] lg:leading-[1.75] xl:text-2xl xl:leading-relaxed">
            <p>
              The goal of the foundation is to make sure that addicts without sufficient funds or insurance are
              still capable of getting into a paid facility with a higher rate of success in sobriety—and to be
              sure they&apos;re not lost within the system of a free state, revolving-door clinic. They have the
              option of an aftercare outpatient facility as well to continue the journey of sobriety and
              implement sobriety as a way of life rather than a 30-day detox.
            </p>
            <p>
              We pay for treatment, and any other cost associated with getting them to the facility. It&apos;s{" "}
              <strong className="font-semibold text-mkf-ink">not</strong> a state-funded facility. It&apos;s a{" "}
              <strong className="font-semibold text-mkf-ink">private</strong> facility in Florida with adequate
              staff, doctors, therapists, and all the help and tools needed for sobriety. I work directly with
              the addicts and the families. The success rate thus far has been beautiful. The facility is
              beautiful, and the care is top notch.
            </p>
            <p>
              I named the foundation after a friend of mine who passed away from drug abuse. Unfortunately he
              wasn&apos;t able to get the proper care he needed, nor did he know he needed it. Had he gotten the
              chance—the right help—he might still be here today.
            </p>
          </div>
        </article>

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-10">
          <article
            className="relative overflow-hidden border border-mkf-border bg-mkf-surface p-8 shadow-[0_1px_0_rgba(15,23,42,0.05),0_10px_28px_-6px_rgba(12,44,64,0.12)] sm:p-10 dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_10px_32px_-6px_rgba(0,0,0,0.35)]"
            aria-labelledby="mission-card-title"
          >
            <div
              className="pointer-events-none absolute -right-4 top-0 h-24 w-24 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_18%,transparent)] opacity-50 blur-2xl"
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span
                  className="h-1 w-9 rounded-full bg-gradient-to-r from-mkf-teal to-mkf-gold"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">North star</p>
              </div>
              <h2
                id="mission-card-title"
                className="font-display mt-4 text-2xl font-semibold tracking-tight text-mkf-ink sm:text-3xl"
              >
                Mission
              </h2>
              <p className="mt-5 text-base leading-relaxed text-mkf-muted sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
                We advance hope-centered recovery support by partnering with families, other organizations, and
                neighbors to deliver credible education, practical tools, and compassionate navigation to
                help—without stigma.
              </p>
            </div>
          </article>

          <article
            className="relative overflow-hidden border border-mkf-border bg-mkf-surface p-8 shadow-[0_1px_0_rgba(15,23,42,0.05),0_10px_28px_-6px_rgba(12,44,64,0.12)] sm:p-10 dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_10px_32px_-6px_rgba(0,0,0,0.35)]"
            aria-labelledby="vision-card-title"
          >
            <div
              className="pointer-events-none absolute -bottom-4 -left-2 h-28 w-28 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_14%,transparent)] opacity-45 blur-2xl"
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span
                  className="h-1 w-9 rounded-full bg-gradient-to-r from-mkf-gold to-mkf-accent"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-gold">Horizon</p>
              </div>
              <h2
                id="vision-card-title"
                className="font-display mt-4 text-2xl font-semibold tracking-tight text-mkf-ink sm:text-3xl"
              >
                Vision
              </h2>
              <p className="mt-5 text-base leading-relaxed text-mkf-muted sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
                We envision communities where people in recovery are known, supported, and met with respect—where
                shared responsibility for recovery, sobriety, and wellbeing is expressed through policy, practice, and everyday care.
              </p>
            </div>
          </article>
        </div>
      </Section>

      <MichaelMemorialSection />

      <Section
        className="bg-mkf-surface"
        eyebrow="Values"
        eyebrowIcon={BadgeCheck}
        title="Values we try to practice out loud"
        intro="These are not slogans on a wall—they shape who we hire, how we train, and how we respond when things get hard."
      >
        <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2">
          {values.map((v) => {
            const I = v.icon;
            return (
              <li key={v.title}>
                <Card className={`h-full ${valueTopAccent[v.accent]}`} padded={true}>
                  <div className="flex items-start gap-2.5">
                    <I
                      className="h-5 w-5 shrink-0 text-mkf-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-mkf-ink">{v.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-mkf-muted">{v.text}</p>
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
