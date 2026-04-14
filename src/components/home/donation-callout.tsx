import { CtaBand } from "@/components/ui/cta";

export function DonationCallout() {
  return (
    <CtaBand
      title="Fuel hope-centered prevention"
      body="Your donation helps keep programs accessible—especially in under-resourced schools and neighborhoods. Monthly gifts sustain planning, training, and materials families can trust."
      primary={{ label: "Donate now", href: "/donate" }}
      secondary={{ label: "Other ways to give", href: "/get-involved#giving" }}
    />
  );
}
