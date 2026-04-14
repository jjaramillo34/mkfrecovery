import { Section } from "@/components/ui/section";
import { ImpactStats } from "@/components/home/impact-stats";

export function Impact() {
  return (
    <Section
      className="border-y border-mkf-border bg-[color-mix(in_oklab,var(--mkf-teal)_8%,var(--mkf-bg))]"
      eyebrow="Community impact"
      title="Progress we measure with humility"
      intro="Numbers never tell the whole story—but they help us stay accountable. These figures represent recent program activity across pilot communities and are updated as our footprint grows."
    >
      <ImpactStats />
      <p className="mt-10 max-w-3xl text-sm text-mkf-muted">
        MKF is committed to transparent reporting. As we expand, we publish aggregate outcomes and
        learning—what worked, what surprised us, and what we are improving.
      </p>
    </Section>
  );
}
