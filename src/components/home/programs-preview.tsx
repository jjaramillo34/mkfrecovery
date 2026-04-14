import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const programs = [
  {
    title: "School & youth programs",
    text: "Classroom workshops, student assemblies, and peer leadership support aligned to local needs.",
    href: "/programs#schools",
  },
  {
    title: "Family & caregiver support",
    text: "Guided discussions, resource navigation, and materials that meet families where they are.",
    href: "/programs#families",
  },
  {
    title: "Community partnerships",
    text: "Coalition building, professional training, and collaborative planning with trusted partners.",
    href: "/programs#community",
  },
];

export function ProgramsPreview() {
  return (
    <Section
      id="programs-preview"
      eyebrow="Programs"
      title="Initiatives designed for real classrooms and real homes"
      intro="Explore how MKF helps translate evidence-informed prevention into day-to-day practice—without turning people into experts overnight."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {programs.map((p) => (
          <Card key={p.title} className="flex flex-col">
            <h3 className="font-display text-lg font-semibold text-mkf-ink">{p.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-mkf-muted">{p.text}</p>
            <Link
              href={p.href}
              className="mt-6 inline-flex text-sm font-semibold text-mkf-primary hover:underline"
            >
              View details
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
