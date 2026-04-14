import type { Metadata } from "next";
import { FacilityGallery } from "@/components/facility/facility-gallery";
import { DonateForm } from "@/components/forms/donate-form";
import { MichaelMemorialSection } from "@/components/memorial/michael-memorial";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Donate",
  description:
    "Support the Michael Kellermann Foundation with a one-time or monthly gift to strengthen prevention education and community support.",
  path: "/donate",
});

export default function DonatePage() {
  return (
    <>
    <Section
      eyebrow="Donate"
      title="Invest in prevention that lasts beyond a single moment"
      intro="Your contribution helps keep programs accessible and credible—especially for schools and neighborhoods that shouldn’t have to choose between basic needs and student wellbeing."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="space-y-5 text-base leading-relaxed text-mkf-muted">
          <p>
            MKF uses donations to train educators, develop family-facing resources, and support community
            partners with planning and evaluation. We aim for transparency: as your organization matures,
            publish a simple annual impact summary donors can understand.
          </p>
          <p>
            The form on this page is a demonstration. Connect it to your nonprofit payment processor (for
            example, Stripe, RaiseDonors, or EveryAction) before accepting real gifts.
          </p>
        </div>
        <div className="border border-mkf-border bg-mkf-surface p-8 sm:p-10">
          <DonateForm />
        </div>
      </div>
    </Section>

    <MichaelMemorialSection />

    <Section
      className="bg-mkf-surface"
      eyebrow="Partnerships"
      title="Affiliated treatment & recovery pathways"
      intro="The overview below describes the inpatient and clinical facilities we work with directly—distinct from broader MKF prevention programming where that applies."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <h3 className="font-display text-lg font-semibold text-mkf-ink">Facilities we partner with</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-mkf-muted">
            <li>
              <span className="text-mkf-fg font-medium">The Recovery Team (TRT)</span> in Delray Beach,
              Florida
            </li>
            <li>Affiliated facilities in New York and New Jersey</li>
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-mkf-muted">
            The inpatient treatment centers we are affiliated with specialize in immediate placement for
            individuals nationwide through the Michael Kellermann Foundation. They offer a wide range of
            critical recovery services, including acute medical detoxification and residential care.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-mkf-muted">
            We prioritize accessible treatment with a streamlined intake process, 24/7 support, and a
            community-based setting designed for rapid stabilization.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-mkf-muted">
            <li>24/7 withdrawal management</li>
            <li>Programs from 2 weeks to 90 days</li>
          </ul>
        </Card>

        <Card>
          <h3 className="font-display text-lg font-semibold text-mkf-ink">Clinical scope & care team</h3>
          <p className="mt-4 text-sm leading-relaxed text-mkf-muted">
            We provide professional care for substance use cases. Most commonly:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-mkf-muted">
            <li>Alcohol</li>
            <li>Opioids</li>
            <li>Stimulants</li>
            <li>Benzodiazepines</li>
            <li>Polysubstance use</li>
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-mkf-muted">
            Related mental health issues, most commonly anxiety, depression, and bipolar disorder.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-mkf-muted">
            A full staff of medical professionals is available around the clock. Medical detox, residential
            rehab, and outpatient programs are all available to MKF.
          </p>
        </Card>
      </div>

      <FacilityGallery />
    </Section>
    </>
  );
}
