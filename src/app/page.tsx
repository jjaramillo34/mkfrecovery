import type { Metadata } from "next";
import { DonationCallout } from "@/components/home/donation-callout";
import { DownloadsNewsletter } from "@/components/home/downloads-newsletter";
import { GetInvolvedPreview } from "@/components/home/get-involved-preview";
import { PhoenixBanner } from "@/components/home/phoenix-banner";
import { Impact } from "@/components/home/impact";
import { Overview } from "@/components/home/overview";
import { ProgramsPreview } from "@/components/home/programs-preview";
import { ResourcesPreview } from "@/components/home/resources-preview";
import { TestimonialsPartners } from "@/components/home/testimonials-partners";
import { WhyPrevention } from "@/components/home/why-prevention";
import { MichaelMemorialSection } from "@/components/memorial/michael-memorial";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description:
    "The Michael Kellermann Foundation advances prevention through education, partnership, and support for families, youth, and other organizations.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <PhoenixBanner />
      <Overview />
      <MichaelMemorialSection />
      <WhyPrevention />
      <ProgramsPreview />
      <Impact />
      <ResourcesPreview />
      <GetInvolvedPreview />
      <TestimonialsPartners />
      <DownloadsNewsletter />
      <DonationCallout />
    </>
  );
}
