import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";
import { maskEmail, unsubscribeFromNewsletter } from "@/lib/newsletter-unsubscribe";
import { verifyNewsletterUnsubscribeToken } from "@/lib/newsletter-unsubscribe-token";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Unsubscribe",
    description: `Manage your ${site.shortName} newsletter subscription.`,
    path: "/unsubscribe",
  }),
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function UnsubscribePage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <Section className="border-b border-mkf-border" headerAlign="center" title="Unsubscribe">
        <Card className="mx-auto max-w-lg p-8 text-center">
          <XCircle className="mx-auto h-10 w-10 text-mkf-muted" aria-hidden />
          <p className="mt-4 text-mkf-muted">
            This unsubscribe link is invalid or incomplete. Use the link in your newsletter email, or
            contact us at{" "}
            <a className="text-mkf-teal hover:underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
          <Link href="/" className="mt-6 inline-block text-sm font-medium text-mkf-teal hover:underline">
            Return to homepage
          </Link>
        </Card>
      </Section>
    );
  }

  const email = await verifyNewsletterUnsubscribeToken(token);

  if (!email) {
    return (
      <Section className="border-b border-mkf-border" headerAlign="center" title="Unsubscribe">
        <Card className="mx-auto max-w-lg p-8 text-center">
          <XCircle className="mx-auto h-10 w-10 text-mkf-muted" aria-hidden />
          <p className="mt-4 text-mkf-muted">This unsubscribe link has expired or is not valid.</p>
          <Link href="/" className="mt-6 inline-block text-sm font-medium text-mkf-teal hover:underline">
            Return to homepage
          </Link>
        </Card>
      </Section>
    );
  }

  await unsubscribeFromNewsletter(email);

  return (
    <Section className="border-b border-mkf-border" headerAlign="center" title="You're unsubscribed">
      <Card className="mx-auto max-w-lg p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-mkf-teal" aria-hidden />
        <p className="mt-4 font-display text-lg font-semibold text-mkf-ink">
          You&apos;ve been removed from our list
        </p>
        <p className="mt-2 text-sm leading-relaxed text-mkf-muted">
          <span className="font-medium text-mkf-fg">{maskEmail(email)}</span> will no longer receive
          newsletter updates from {site.name}.
        </p>
        <p className="mt-4 text-sm text-mkf-muted">
          Changed your mind? You can{" "}
          <Link href="/#downloads-newsletter" className="font-medium text-mkf-teal hover:underline">
            subscribe again
          </Link>{" "}
          anytime.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-medium text-mkf-teal hover:underline">
          Return to homepage
        </Link>
      </Card>
    </Section>
  );
}
