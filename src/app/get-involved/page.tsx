import type { Metadata } from "next";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Get Involved",
  description:
    "Volunteer, partner, advocate, or explore giving opportunities with the Michael Kellermann Foundation.",
  path: "/get-involved",
});

export default function GetInvolvedPage() {
  return (
    <>
      <Section
        eyebrow="Get involved"
        title="Bring your strengths—prevention is a community project"
        intro="Whether you can offer time, expertise, connections, or financial support, there is a meaningful role to play. We are especially looking for partners who want steady collaboration, not one-off heroics."
      >
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "Volunteer",
              text: "Help with events, trainings, translation, logistics, and family nights.",
            },
            {
              title: "Partner",
              text: "Invite MKF into your nonprofit, coalition, or community with shared goals.",
            },
            {
              title: "Advocate",
              text: "Champion prevention funding and policies that protect young people equitably.",
            },
          ].map((x) => (
            <Card key={x.title}>
              <h2 className="font-display text-lg font-semibold text-mkf-ink">{x.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mkf-muted">{x.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="volunteer" className="bg-mkf-surface" title="Volunteer interest form" intro="Tell us a little about yourself—we will follow up with realistic opportunities.">
        <div className="max-w-2xl">
          <VolunteerForm />
        </div>
      </Section>

      <Section
        id="giving"
        title="Giving that sustains programs"
        intro="Monthly donations help us plan trainings, keep materials free for under-resourced communities, and respond when partners need urgent support."
      >
        <Card className="max-w-2xl p-8">
          <p className="text-base leading-relaxed text-mkf-muted">
            Workplace giving, donor-advised funds, and sponsorships can all strengthen prevention work. For
            major gifts or sponsorship inquiries, reach out through the contact page with “Partnerships” in
            your message.
          </p>
          <p className="mt-4 text-sm text-mkf-muted">
            Looking to donate now?{" "}
            <a className="font-semibold text-mkf-primary hover:underline" href="/donate">
              Visit the donate page
            </a>
            .
          </p>
        </Card>
      </Section>
    </>
  );
}
