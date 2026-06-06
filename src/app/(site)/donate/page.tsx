import type { Metadata } from "next";
import { Clock, HandCoins, Heart, Hospital } from "lucide-react";
import { FacilityGallery } from "@/components/facility/facility-gallery";
// import { DonateForm } from "@/components/forms/donate-form";
import { MichaelMemorialSection } from "@/components/memorial/michael-memorial";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
// import { getActiveGivebutter } from "@/lib/donate-config";
import { createMetadata } from "@/lib/metadata";
import { fetchPublicGalleryItems } from "@/lib/public-gallery";

const glowPair = {
  a: "pointer-events-none absolute -right-5 -top-4 h-28 w-28 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_16%,transparent)] opacity-50 blur-3xl",
  b: "pointer-events-none absolute -bottom-3 -left-4 h-24 w-24 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_10%,transparent)] opacity-40 blur-2xl",
} as const;

export const metadata: Metadata = createMetadata({
  title: "Donate",
  description:
    "Support the Michael Kellermann Foundation with a gift to strengthen recovery education, sobriety support, and community care. Online giving is coming soon.",
  path: "/donate",
});

export default async function DonatePage() {
  // const give = await getActiveGivebutter();
  // const { givebutterCampaignUrl } = site;
  // const givebutterUrl = give.givebutterUrl || givebutterCampaignUrl;
  const galleryItems = await fetchPublicGalleryItems();
  const initialFacilityImages = galleryItems.map((g) => ({
    url: g.url,
    alt: g.alt,
    title: g.title,
  }));

  return (
    <>
      <Section
        id="donate"
        className="scroll-mt-28 border-b border-mkf-border bg-mkf-hero-tint"
        wideHeader
        eyebrow="Donate"
        eyebrowIcon={HandCoins}
        title="Invest in recovery support that lasts beyond a single moment"
        intro="Your contribution helps keep programs accessible and credible—especially for neighborhoods and communities that shouldn’t have to choose between basic needs and wellbeing on the path to sobriety and healing."
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-14">
          <div className="space-y-8">
            <div className="text-base leading-relaxed text-mkf-muted">
              <p>
                Donations back MKF&rsquo;s work to train staff and volunteers, develop family-facing education and
                support materials, and help community partners with planning and evaluation for recovery and sobriety
                outcomes. As the foundation grows, we aim to publish a simple, readable summary of how gifts translate
                into impact.
              </p>
            </div>

            <ul className="space-y-2.5 text-sm text-mkf-muted sm:text-base">
              <li className="flex gap-2.5">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mkf-gold"
                  aria-hidden
                />
                <span>Community, workplace, and peer group programs, plus support for families</span>
              </li>
              <li className="flex gap-2.5">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mkf-teal"
                  aria-hidden
                />
                <span>Partner support that respects local context and real-world constraints</span>
              </li>
              <li className="flex gap-2.5">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mkf-accent"
                  aria-hidden
                />
                <span>Capacity to respond when under-resourced communities need training or help first</span>
              </li>
            </ul>
          </div>

          <div>
            <Card padded={false} className="overflow-hidden">
              <div
                className="h-0.5 w-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
                aria-hidden
              />
              <div className="relative p-6 sm:p-8">
                <div className={glowPair.a} aria-hidden />
                <div className={glowPair.b} aria-hidden />
                <div className="relative text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_18%,var(--mkf-bg))]">
                    <Clock className="h-7 w-7 text-mkf-gold" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-mkf-ink sm:text-2xl">
                    Online giving coming soon
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mkf-muted sm:text-base">
                    We&rsquo;re setting up secure online donations. In the meantime, reach out and we&rsquo;ll help you
                    support MKF another way.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button href="/contact" variant="primary" className="justify-center">
                      <Heart className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                      Contact us to give
                    </Button>
                    <Button href="/get-involved" variant="secondary" className="justify-center">
                      Get involved
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/*
            Givebutter checkout — restore when the live campaign is ready:
            <DonateForm givebutterUrl={givebutterUrl} eventLabel={give.eventTitle} />
            */}
          </div>
        </div>
      </Section>

      <MichaelMemorialSection />

      <Section
        className="border-b border-mkf-border bg-mkf-surface"
        wideHeader
        eyebrow="Partnerships"
        eyebrowIcon={Hospital}
        title="Affiliated treatment & recovery pathways"
        intro="The overview below describes the inpatient and clinical facilities we work with directly—alongside the broader community recovery and support programming MKF also provides."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <h3 className="font-display text-lg font-semibold text-mkf-ink">Facilities we partner with</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-mkf-muted">
              <li>
                <span className="font-medium text-mkf-fg">The Recovery Team (TRT)</span> in Delray Beach, Florida
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

        <FacilityGallery initialImages={initialFacilityImages} />
      </Section>
    </>
  );
}
