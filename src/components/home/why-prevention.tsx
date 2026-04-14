import { Section } from "@/components/ui/section";

const points = [
  {
    title: "Early conversations matter",
    text: "Open, age-appropriate dialogue reduces secrecy and builds trust—two of the strongest protective factors we can offer young people.",
  },
  {
    title: "Other organizations meet people where they are",
    text: "Community partners see people every day. Practical training and shared resources help teams respond with clarity and care.",
  },
  {
    title: "Families deserve support",
    text: "Caregivers often carry the heaviest worry. We connect families to credible guidance and peer-informed tools.",
  },
];

export function WhyPrevention() {
  return (
    <Section
      className="bg-mkf-surface"
      eyebrow="Why it matters"
      title="Drug prevention is community care"
      intro="Prevention is not about scare tactics—it is about building environments where healthy choices are easier and help is visible. MKF focuses on education, connection, and early support."
    >
      <div className="grid gap-8 md:grid-cols-3">
        {points.map((p) => (
          <article key={p.title} className="border-t-2 border-mkf-primary pt-6">
            <h3 className="font-display text-lg font-semibold text-mkf-ink">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mkf-muted">{p.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
