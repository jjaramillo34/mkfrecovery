import Image from "next/image";
import { Building2 } from "lucide-react";
import { Section } from "@/components/ui/section";

export function Overview() {
  return (
    <Section
      id="overview"
      className="border-b border-mkf-border bg-[color-mix(in_oklab,var(--mkf-accent)_9%,var(--mkf-bg))] dark:bg-[color-mix(in_oklab,var(--mkf-accent)_12%,var(--mkf-bg))]"
      wideHeader
      headerAlign="center"
      eyebrow="Foundation overview"
      eyebrowIcon={Building2}
      title="Who we are"
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-14">
        <div className="space-y-4 text-base leading-relaxed text-mkf-muted md:text-[1.05rem] md:leading-relaxed">
          <p className="text-pretty text-balance text-lg font-medium text-mkf-fg sm:text-xl sm:leading-snug">
            The goal of the foundation is to make sure that addicts without sufficient funds or insurance are still capable of getting into a paid facility with a higher rate of success in sobriety—and to be sure they're not lost within the system of a free state, revolving-door clinic. They have the option of an aftercare outpatient facility as well to continue the journey of sobriety and implement sobriety as a way of life rather than a 30-day detox.
          </p>
          <p>
            We pay for treatment, and any other cost associated with getting them to the facility. It's not a state-funded facility. It's a private facility in Florida with adequate staff, doctors, therapists, and all the help and tools needed for sobriety. I work directly with the addicts and the families. The success rate thus far has been beautiful. The facility is beautiful, and the care is top notch.
          </p>
          <p>
            I named the foundation after a friend of mine who passed away from drug abuse. Unfortunately he wasn't able to get the proper care he needed, nor did he know he needed it. Had he gotten the chance—the right help—he might still be here today.
          </p>
        </div>

        <figure
          className="relative m-0 w-full min-w-0 overflow-hidden rounded-2xl border border-mkf-border bg-mkf-surface shadow-[0_1px_0_rgba(15,23,42,0.05),0_8px_28px_-4px_rgba(12,44,64,0.12)] dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_8px_28px_-4px_rgba(0,0,0,0.35)]"
        >
          <div
            className="pointer-events-none absolute right-0 top-0 h-28 w-28 -translate-y-1/2 translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_10%,transparent)] opacity-50 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 -translate-x-1/3 translate-y-1/3 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_8%,transparent)] opacity-40 blur-2xl"
            aria-hidden
          />

          <div className="relative aspect-[16/10] w-full sm:aspect-[4/3]">
            <Image
              src="/images/facility10.jpg"
              alt="Exterior and signage of a partner recovery facility, representing the communities MKF serves with recovery support and care"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <figcaption className="sr-only">Recovery partner facility, aligned with our partnership model</figcaption>

          <div className="relative border-t border-mkf-border bg-mkf-surface/95 p-6 sm:p-7">
            <blockquote className="m-0 border-0 p-0">
              <p
                className="select-none font-display text-[3.5rem] leading-[0.85] text-[color-mix(in_oklab,var(--mkf-teal)_30%,var(--mkf-border))] sm:text-[4rem] dark:text-[color-mix(in_oklab,var(--mkf-teal)_26%,var(--mkf-surface))]"
                aria-hidden
              >
                “
              </p>
              <p className="-mt-0.5 font-display text-lg font-medium leading-[1.45] text-mkf-ink sm:text-xl sm:leading-snug">
                When neighbors, other organizations, and families align around people in recovery, change
                becomes sustainable.
              </p>
              <footer className="mt-6 flex items-center gap-3 border-t border-mkf-border/90 pt-5 sm:mt-6 sm:pt-5">
                <span
                  className="h-px w-9 shrink-0 bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
                  aria-hidden
                />
                <p className="m-0 text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal sm:text-sm">
                  Our partnership model
                </p>
              </footer>
            </blockquote>
          </div>
        </figure>
      </div>
    </Section>
  );
}
