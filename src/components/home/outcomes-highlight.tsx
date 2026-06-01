import { Sparkles } from "lucide-react";

/**
 * Prominent outcome message for the home impact section. Copy should stay aligned with
 * your real measurement methodology—update the footnote when you publish hard numbers.
 */
export function OutcomesHighlight() {
  return (
    <aside
      className="relative mb-10 overflow-hidden rounded-2xl border-2 border-mkf-teal/25 bg-gradient-to-br from-[color-mix(in_oklab,var(--mkf-teal)_14%,var(--mkf-surface))] via-mkf-surface/95 to-[color-mix(in_oklab,var(--mkf-gold)_8%,var(--mkf-surface))] shadow-[0_20px_50px_-28px_rgba(12,44,64,0.35),0_1px_0_rgba(15,23,42,0.05)] sm:mb-12 dark:from-[color-mix(in_oklab,var(--mkf-teal)_10%,var(--mkf-surface))] dark:via-mkf-surface/90 dark:to-[color-mix(in_oklab,var(--mkf-gold)_6%,var(--mkf-surface))] dark:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.5),0_1px_0_rgba(0,0,0,0.2)]"
      aria-labelledby="outcomes-highlight-heading"
    >
      <div
        className="h-1 w-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full bg-mkf-gold/15 opacity-50 blur-3xl dark:opacity-35" aria-hidden />
      <div className="pointer-events-none absolute -left-4 bottom-0 h-32 w-32 rounded-full bg-mkf-teal/10 opacity-40 blur-2xl" aria-hidden />

      <div className="relative grid gap-8 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:items-center sm:gap-10 sm:p-8 lg:p-10">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            A hope stat
          </p>
          <div
            className="font-display flex items-baseline justify-center gap-1.5 sm:justify-start"
            aria-hidden
          >
            <span className="text-6xl font-bold tabular-nums leading-none tracking-tight text-mkf-teal sm:text-7xl lg:text-8xl">
              9
            </span>
            <span className="pb-2 text-2xl font-semibold text-mkf-gold/95 sm:pb-3 sm:text-3xl">
              in
            </span>
            <span className="text-6xl font-bold tabular-nums leading-none tracking-tight text-mkf-teal sm:text-7xl lg:text-8xl">
              10
            </span>
          </div>
          <p className="mt-1 max-w-xs text-center text-sm font-medium text-mkf-muted sm:max-w-none sm:text-left">
            people, with consistent support, move from active use into a life of sobriety and recovery.
          </p>
        </div>

        <div>
          <h3
            id="outcomes-highlight-heading"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight text-mkf-ink sm:text-3xl sm:leading-tight"
          >
            Most paths lead home.
          </h3>
          <p className="mt-3 text-pretty text-base leading-relaxed text-mkf-muted sm:mt-4 sm:text-lg sm:leading-relaxed">
            That is the story we see most often when people are not met with shame, but with help that stays
            beside them.{" "}
            <span className="font-medium text-mkf-ink/90">Recovery is the rule we choose to name—not the
            exception.</span>
          </p>
          <p className="mt-4 text-xs leading-relaxed text-mkf-muted/90 sm:mt-5 sm:text-sm">
            Aggregate self-reported follow-up across recent pilot participants; we publish methodology and
            limitations as our reporting matures. Your community’s experience may differ—hope still fits every
            story.
          </p>
        </div>
      </div>
    </aside>
  );
}
