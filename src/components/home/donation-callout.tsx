import { ArrowRight, HandCoins, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * High-visibility CTA for the home page—clear hierarchy and contrast so the donate path is unmistakable.
 */
export function DonationCallout() {
  return (
    <aside
      className="relative border-y-2 border-mkf-accent/25 bg-gradient-to-b from-[color-mix(in_oklab,var(--mkf-accent)_14%,var(--mkf-bg))] via-[color-mix(in_oklab,var(--mkf-gold)_6%,var(--mkf-bg))] to-[color-mix(in_oklab,var(--mkf-accent)_4%,var(--mkf-bg))] py-16 sm:py-20 lg:py-24 dark:from-[color-mix(in_oklab,var(--mkf-accent)_10%,var(--mkf-bg))] dark:via-[color-mix(in_oklab,var(--mkf-gold)_5%,var(--mkf-bg))] dark:to-[color-mix(in_oklab,var(--mkf-primary)_2%,var(--mkf-bg))]"
      aria-labelledby="donation-callout-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -left-1/4 top-0 h-64 w-[150%] bg-gradient-to-b from-mkf-surface/40 to-transparent sm:h-80 dark:from-white/[0.04]"
        />
        <div
          className="absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-[color-mix(in_oklab,var(--mkf-gold)_18%,transparent)] opacity-30 blur-3xl dark:opacity-25"
        />
        <div
          className="absolute -left-4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_12%,transparent)] opacity-25 blur-2xl"
        />
      </div>

      <Container className="relative max-w-5xl">
        <div className="mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2.5">
            <span
              className="h-1 w-10 rounded-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
              aria-hidden
            />
            <Heart
              className="h-4 w-4 text-mkf-accent sm:h-5 sm:w-5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-ink/90">
              Support our work
            </p>
            <span
              className="h-1 w-10 rounded-full bg-gradient-to-l from-mkf-teal via-mkf-gold to-mkf-accent"
              aria-hidden
            />
          </div>
          <h2
            id="donation-callout-heading"
            className="font-display mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-mkf-ink sm:mt-6 sm:text-4xl lg:text-[2.4rem] lg:leading-tight"
          >
            Fuel hope for recovery and sober living
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-mkf-muted sm:mt-5 sm:text-lg sm:leading-relaxed">
            Your gift helps keep support within reach where help is thinnest—workshops, family care,
            and training for teams walking alongside people in recovery every day. Monthly or one-time, you strengthen
            what already works in community.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-mkf-border/80 bg-mkf-surface/95 p-2 shadow-[0_20px_50px_-24px_rgba(12,44,64,0.35),0_1px_0_rgba(15,23,42,0.04)] sm:mt-10 sm:p-3 dark:border-mkf-border/50 dark:bg-mkf-surface/90 dark:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45),0_1px_0_rgba(0,0,0,0.2)]">
          <div
            className="h-0.5 w-full overflow-hidden rounded-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
            aria-hidden
          />
          <div className="flex flex-col items-center justify-center gap-3 px-4 py-5 sm:gap-4 sm:px-6 sm:py-6 lg:flex-row lg:flex-wrap">
            <Button
              href="/donate"
              variant="primary"
              className="h-auto w-full min-h-[2.75rem] justify-center gap-2.5 px-6 py-3.5 text-base sm:w-auto sm:px-8 sm:py-3.5"
            >
              <HandCoins className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} aria-hidden="true" />
              Donate now
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Button>
            <Button
              href="/get-involved#giving"
              variant="secondary"
              className="h-auto w-full min-h-[2.75rem] justify-center gap-2 px-5 py-3.5 text-sm sm:w-auto sm:px-6"
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              Other ways to give
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-mkf-muted sm:mt-5 sm:text-sm">
          Giving runs through our donate flow—sponsorships and DAFs welcome. Questions? We are glad to help on{" "}
          <a
            className="font-medium text-mkf-primary underline decoration-mkf-primary/30 underline-offset-2 transition hover:decoration-mkf-primary"
            href="/contact"
          >
            Contact
          </a>
          .
        </p>
      </Container>
    </aside>
  );
}
