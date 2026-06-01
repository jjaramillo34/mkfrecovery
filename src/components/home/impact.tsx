import { BarChart2 } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { ImpactStats } from "@/components/home/impact-stats";
import { OutcomesHighlight } from "@/components/home/outcomes-highlight";

export function Impact() {
  return (
    <section
      id="community-impact"
      className="relative scroll-mt-20 overflow-hidden border-y border-mkf-border py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_oklab,var(--mkf-teal)_12%,var(--mkf-bg))] via-mkf-bg to-[color-mix(in_oklab,var(--mkf-primary)_6%,var(--mkf-bg))] dark:from-[color-mix(in_oklab,var(--mkf-teal)_16%,var(--mkf-bg))] dark:via-mkf-bg dark:to-[color-mix(in_oklab,var(--mkf-primary)_8%,var(--mkf-bg))]" />
        <div
          className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_20%,transparent)] opacity-50 blur-3xl dark:opacity-40"
        />
        <div
          className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_16%,transparent)] opacity-40 blur-3xl dark:opacity-35"
        />
        <div
          className="absolute right-1/3 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_10%,transparent)] opacity-30 blur-2xl"
        />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          variant="wide"
          align="center"
          eyebrow="Community impact"
          eyebrowIcon={BarChart2}
          title="Progress we measure with humility"
          intro="Numbers never tell the whole story—but they help us stay accountable. These figures represent recent program activity across pilot communities and are updated as our footprint grows."
        />
        <OutcomesHighlight />
        <ImpactStats />
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-mkf-muted sm:mt-12">
          MKF is committed to transparent reporting. As we expand, we publish aggregate outcomes and
          learning—what worked, what surprised us, and what we are improving. See{" "}
          <Link
            className="font-medium text-mkf-primary underline decoration-mkf-primary/30 underline-offset-4 transition-colors hover:decoration-mkf-primary/70"
            href="/about"
          >
            our story
          </Link>{" "}
          for more on how we think about impact.
        </p>
      </Container>
    </section>
  );
}
