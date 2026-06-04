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
          <p className="text-balance text-lg font-medium text-mkf-fg sm:text-xl sm:leading-snug">
            The Michael Kellermann Foundation (MKF) is a nonprofit organization dedicated to addiction recovery,
            sobriety, and community-based support for people of all ages. We help people who are already
            in the work of active use, treatment, and recovery take the next step, whether that
            means finding care, partnering with other organizations, or volunteering time and skills.
          </p>
          <p>
            MKF was founded to honor a simple belief: people heal best when support is structured, honest,
            and deeply connected to community. We focus on building skills, dignity, and connection—not
            fear—to help people of all ages, families, and support networks, build a healthier life in recovery
            and know where to turn when life gets complicated.
          </p>
          <p>
            Our team collaborates with counselors, peer leaders, and family-serving organizations to deliver
            programming, training, and materials that respect lived experience and cultural context.
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
