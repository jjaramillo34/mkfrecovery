"use client";

import { ArrowRight, CheckCircle2, HeartHandshake, Mail, Rss, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

type FormStatus = "idle" | "loading" | "success" | "already" | "error";

export function DownloadsNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const r = await fetch("/api/public/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = (await r.json().catch(() => null)) as { error?: string; alreadySubscribed?: boolean } | null;

    if (!r.ok) {
      setStatus("error");
      setErrorMessage(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus(data?.alreadySubscribed ? "already" : "success");
    setEmail("");
  }

  return (
    <Section
      id="downloads-newsletter"
      className="border-y border-mkf-border bg-[color-mix(in_oklab,var(--mkf-gold)_7%,var(--mkf-bg))] dark:bg-[color-mix(in_oklab,var(--mkf-gold)_12%,var(--mkf-bg))]"
      wideHeader
      headerAlign="center"
      eyebrow="Updates"
      eyebrowIcon={Rss}
      title="Stay in the loop"
      intro="We are a care-first organization—therapist involvement, group routines, and 30/60/90-day options live on the Programs page. Sign up for occasional news; we will not flood your inbox."
    >
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-stretch">
        <Card
          padded={false}
          className="flex h-full min-h-0 flex-col overflow-hidden shadow-sm"
        >
          <div
            className="h-0.5 w-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
            aria-hidden
          />
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-mkf-border/80 bg-mkf-bg/70 dark:bg-mkf-bg/20">
                <HeartHandshake
                  className="h-4 w-4 text-mkf-primary sm:h-[1.1rem] sm:w-[1.1rem]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-mkf-ink sm:text-[1.125rem]">
                  What MKF offers
                </h3>
                <p className="mt-0.5 text-sm text-mkf-muted">Therapy touchpoints, groups, and clear timeframes</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-mkf-muted sm:mt-5 sm:text-base sm:leading-relaxed">
              We do not maintain a separate &ldquo;resource library.&rdquo; Instead, we help people access{" "}
              <strong className="font-medium text-mkf-fg">therapist and clinical support</strong> when the care
              plan calls for it, <strong className="font-medium text-mkf-fg">group routines</strong> you can
              return to, and <strong className="font-medium text-mkf-fg">30-, 60-, and 90-day</strong> program
              structures you can plan around—with your team, not instead of them.
            </p>
            <Button href="/programs#program-lengths" variant="secondary" className="mt-5 w-full justify-center gap-2 sm:mt-6">
              View programs &amp; lengths
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Button>
          </div>
        </Card>

        <Card
          padded={false}
          className="relative flex h-full min-h-0 flex-col overflow-hidden shadow-sm"
        >
          <div
            className="h-0.5 w-full bg-gradient-to-r from-mkf-gold to-mkf-teal/90"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-2 bottom-0 h-28 w-28 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_10%,transparent)] opacity-30 blur-2xl"
            aria-hidden
          />
          <div className="relative flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-mkf-border/80 bg-mkf-bg/70 dark:bg-mkf-bg/20">
                <Send
                  className="h-4 w-4 text-mkf-gold sm:h-[1.1rem] sm:w-[1.1rem]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-mkf-ink sm:text-[1.125rem]">Newsletter</h3>
                <p className="mt-0.5 text-sm text-mkf-muted">Occasional updates, no daily clutter</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-mkf-muted sm:mt-4 sm:text-base">
              We share program news, partner spotlights, and impact notes—unsubscribe anytime.
            </p>

            {status === "success" || status === "already" ? (
              <div
                className="mt-4 flex flex-1 flex-col justify-center rounded-lg border border-mkf-teal/30 bg-[color-mix(in_oklab,var(--mkf-teal)_8%,var(--mkf-bg))] p-5 sm:mt-5"
                role="status"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mkf-teal" aria-hidden />
                  <div>
                    <p className="font-display font-semibold text-mkf-ink">
                      {status === "already" ? "You're already subscribed" : "You're subscribed"}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-mkf-muted">
                      {status === "already"
                        ? "This email is already on our list. You can unsubscribe from any message we send."
                        : "Check your inbox for a confirmation email. You can unsubscribe from any message we send."}
                    </p>
                    <button
                      type="button"
                      className="mt-4 text-sm font-medium text-mkf-teal underline-offset-2 hover:underline"
                      onClick={() => setStatus("idle")}
                    >
                      Subscribe another email
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                className="mt-4 flex w-full min-w-0 flex-1 flex-col sm:mt-5"
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <label htmlFor="newsletter-email" className="text-sm font-medium text-mkf-fg">
                    Email
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.org"
                    className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
                    required
                    aria-required="true"
                    disabled={status === "loading"}
                  />
                </div>
                {status === "error" && errorMessage && (
                  <p className="mt-3 text-sm text-red-600" role="alert">
                    {errorMessage}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-4 w-full justify-center gap-2 sm:mt-5"
                  disabled={status === "loading"}
                >
                  <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </Button>
              </form>
            )}
          </div>
        </Card>
      </div>
    </Section>
  );
}
