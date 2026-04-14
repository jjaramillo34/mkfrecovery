import { Section } from "@/components/ui/section";

export function Overview() {
  return (
    <Section
      id="overview"
      eyebrow="Foundation overview"
      title="Who we are"
      intro="The Michael Kellermann Foundation (MKF) is a nonprofit organization dedicated to drug prevention education and community-based support. We help people take the next right step—whether that means finding resources, strengthening school programs, or volunteering time and skills."
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4 text-base leading-relaxed text-mkf-muted">
          <p>
            MKF was founded to honor a simple belief: prevention works best when it is hopeful, honest,
            and deeply connected to community. We focus on building skills and protective factors—not
            fear—to help young people make healthy choices and know where to turn when life gets
            complicated.
          </p>
          <p>
            Our team collaborates with educators, counselors, and family-serving organizations to deliver
            age-appropriate programming, training, and materials that respect lived experience and
            cultural context.
          </p>
        </div>
        <blockquote className="border-l-4 border-mkf-teal pl-6 font-display text-xl font-medium leading-snug text-mkf-ink">
          “When neighbors, schools, and families align around young people, change becomes sustainable.”
          <footer className="mt-4 text-sm font-sans font-normal text-mkf-muted">
            — MKF community partnership model
          </footer>
        </blockquote>
      </div>
    </Section>
  );
}
