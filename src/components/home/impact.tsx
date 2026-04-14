import { Section } from "@/components/ui/section";

const stats = [
  { label: "Students reached annually (pilot regions)", value: "12,400+" },
  { label: "Educators trained in prevention fundamentals", value: "860+" },
  { label: "Community partners & school districts", value: "54" },
];

export function Impact() {
  return (
    <Section
      className="border-y border-mkf-border bg-[color-mix(in_oklab,var(--mkf-teal)_8%,var(--mkf-bg))]"
      eyebrow="Community impact"
      title="Progress we measure with humility"
      intro="Numbers never tell the whole story—but they help us stay accountable. These figures represent recent program activity across pilot communities and are updated as our footprint grows."
    >
      <dl className="grid gap-8 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="border-l border-mkf-border pl-6">
            <dt className="text-sm font-medium text-mkf-muted">{s.label}</dt>
            <dd className="font-display mt-2 text-3xl font-semibold tracking-tight text-mkf-ink">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 max-w-3xl text-sm text-mkf-muted">
        MKF is committed to transparent reporting. As we expand, we publish aggregate outcomes and
        learning—what worked, what surprised us, and what we are improving.
      </p>
    </Section>
  );
}
