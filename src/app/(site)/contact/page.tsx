import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const glowPair = {
  a: "pointer-events-none absolute -right-6 -top-5 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_14%,transparent)] opacity-50 blur-3xl",
  b: "pointer-events-none absolute -bottom-2 -left-2 h-24 w-24 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_12%,transparent)] opacity-40 blur-2xl",
} as const;

const routeHints = [
  { label: "Programs & training", text: "Worksite, treatment, and community-based workshops" },
  { label: "Partnerships", text: "Coalitions, funders, and long-term collaboration" },
  { label: "Press & events", text: "Media, speaking, and public appearances" },
];

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact the Michael Kellermann Foundation for partnerships, programming questions, or media inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone, address, social } = site;
  const tel = phone.replace(/\D/g, "");

  return (
    <Section
      id="contact"
      className="scroll-mt-28 border-b border-mkf-border bg-mkf-hero-tint"
      wideHeader
      eyebrow="Contact"
      eyebrowIcon={MessageCircle}
      title="We read every message with care"
      intro="Share a little context so we can route you to the right person. If you or someone you know is in immediate danger, contact local emergency services or a crisis line in your area—this form is not monitored for emergencies."
    >
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
        <div className="space-y-8">
          <article
            className="relative overflow-hidden rounded-2xl border border-mkf-border bg-mkf-surface p-7 shadow-[0_1px_0_rgba(15,23,42,0.05),0_8px_28px_-6px_rgba(12,44,64,0.1)] sm:p-8 dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_8px_32px_-6px_rgba(0,0,0,0.35)]"
            aria-labelledby="contact-direct-heading"
          >
            <div className={glowPair.a} aria-hidden />
            <div className={glowPair.b} aria-hidden />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span
                  className="h-1 w-10 rounded-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent sm:w-12"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">Direct lines</p>
              </div>
              <h2
                id="contact-direct-heading"
                className="font-display mt-4 text-2xl font-semibold tracking-tight text-mkf-ink sm:text-3xl"
              >
                How to reach us
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mkf-muted sm:text-base">
                Prefer email? Use the form, or message us using the same address. We aim to reply within a few
                business days, sooner when we can.
              </p>
            </div>

            <ul className="relative mt-6 space-y-4 border-t border-mkf-border pt-6 text-sm sm:text-base">
              <li className="flex gap-3 sm:items-start">
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mkf-gold"
                  aria-hidden
                />
                <div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mkf-muted">
                    <Mail className="h-3.5 w-3.5 text-mkf-teal" strokeWidth={1.75} aria-hidden="true" />
                    Email
                  </span>
                  <a
                    className="mt-0.5 block font-medium text-mkf-primary transition-colors hover:underline"
                    href={`mailto:${email}`}
                  >
                    {email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3 sm:items-start">
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mkf-teal"
                  aria-hidden
                />
                <div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mkf-muted">
                    <Phone className="h-3.5 w-3.5 text-mkf-teal" strokeWidth={1.75} aria-hidden="true" />
                    Phone
                  </span>
                  <a
                    className="mt-0.5 block font-medium text-mkf-primary transition-colors hover:underline"
                    href={`tel:${tel}`}
                  >
                    {phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-3 sm:items-start">
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mkf-accent"
                  aria-hidden
                />
                <div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mkf-muted">
                    <MapPin className="h-3.5 w-3.5 text-mkf-gold" strokeWidth={1.75} aria-hidden="true" />
                    Mailing address
                  </span>
                  <p className="mt-0.5 whitespace-pre-line text-mkf-fg leading-relaxed">{address}</p>
                </div>
              </li>
            </ul>
          </article>

          <div className="rounded-xl border border-dashed border-mkf-border bg-mkf-surface/80 px-5 py-4 dark:bg-mkf-surface/50">
            <h3 className="font-display text-sm font-semibold text-mkf-ink">Ways we can help</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-mkf-muted">
              {routeHints.map((h) => (
                <li key={h.label} className="flex gap-2.5">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mkf-gold/80"
                    aria-hidden
                  />
                  <span>
                    <span className="text-mkf-fg font-medium">{h.label}</span>
                    <span> — {h.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-0.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-mkf-muted">Follow</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
              <li>
                <a
                  className="text-mkf-primary underline decoration-mkf-primary/30 underline-offset-2 transition-colors hover:decoration-mkf-primary"
                  href={social.facebook}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="text-mkf-primary underline decoration-mkf-primary/30 underline-offset-2 transition-colors hover:decoration-mkf-primary"
                  href={social.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="text-mkf-primary underline decoration-mkf-primary/30 underline-offset-2 transition-colors hover:decoration-mkf-primary"
                  href={social.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <Card padded={false} className="overflow-hidden">
            <div
              className="h-0.5 w-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
              aria-hidden
            />
            <div className="relative p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-4 top-0 h-24 w-24 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_10%,transparent)] opacity-50 blur-2xl"
                aria-hidden
              />
              <div className="relative">
                <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold text-mkf-ink sm:text-xl">
                  <Send className="h-5 w-5 shrink-0 text-mkf-gold" strokeWidth={1.75} aria-hidden="true" />
                  Send a message
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mkf-muted">
                  Tell us who you are and what you need—we&rsquo;ll get back to you as soon as we&rsquo;re
                  able.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
