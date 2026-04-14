import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact the Michael Kellermann Foundation for partnerships, programming questions, or media inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="We read every message with care"
      intro="Share a little context so we can route you to the right person. If you or someone you know is in immediate danger, please contact local emergency services or a crisis line in your area."
    >
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <aside className="border border-mkf-border bg-mkf-surface p-8">
          <h2 className="font-display text-lg font-semibold text-mkf-ink">Direct lines</h2>
          <ul className="mt-5 space-y-3 text-sm text-mkf-muted">
            <li>
              <span className="block font-medium text-mkf-fg">Email</span>
              <a className="hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <span className="block font-medium text-mkf-fg">Phone</span>
              <a className="hover:underline" href={`tel:${site.phone.replace(/\D/g, "")}`}>
                {site.phone}
              </a>
            </li>
            <li>
              <span className="block font-medium text-mkf-fg">Mailing address</span>
              <span className="whitespace-pre-line">{site.address}</span>
            </li>
          </ul>
          <p className="mt-6 text-xs text-mkf-muted">
            Replace placeholder contact values in <code className="font-mono text-mkf-fg">src/lib/site.ts</code>{" "}
            before going live.
          </p>
        </aside>
        <div className="border border-mkf-border bg-mkf-surface p-8 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
