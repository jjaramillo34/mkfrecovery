import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export function GetInvolvedPreview() {
  return (
    <Section
      eyebrow="Get involved"
      title="Your time and voice can change a young person’s trajectory"
      intro="Whether you mentor, organize events, or help another organization host a workshop, MKF welcomes partners who believe prevention should be practical—and human."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <ul className="space-y-4 text-sm leading-relaxed text-mkf-muted">
          <li>
            <strong className="text-mkf-fg">Volunteer:</strong> support community events, trainings, and
            family nights.
          </li>
          <li>
            <strong className="text-mkf-fg">Partner:</strong> bring MKF programming into your organization,
            faith community, or nonprofit.
          </li>
          <li>
            <strong className="text-mkf-fg">Advocate:</strong> help elevate prevention as a funding and
            policy priority locally.
          </li>
        </ul>
        <div className="flex flex-col gap-3 border border-mkf-border bg-mkf-surface p-8">
          <p className="font-display text-lg font-semibold text-mkf-ink">Start with a conversation</p>
          <p className="text-sm text-mkf-muted">
            Tell us what you care about—we will match you to a realistic next step.
          </p>
          <Button href="/get-involved" variant="primary">
            Explore opportunities
          </Button>
          <Button href="/contact" variant="secondary">
            Contact our team
          </Button>
        </div>
      </div>
    </Section>
  );
}
