"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { recoveryTestimonialsFallback } from "@/lib/recovery-testimonials-fallback";
import type { RecoveryTestimonial } from "@/lib/recovery-testimonial-types";

export type { RecoveryTestimonial } from "@/lib/recovery-testimonial-types";

/** @deprecated Use server-fetched testimonials; kept for backwards compatibility */
export const recoveryTestimonials = recoveryTestimonialsFallback;

export function RecoveryTestimonialsCarousel({
  testimonials = recoveryTestimonialsFallback,
  wide = false,
}: {
  testimonials?: RecoveryTestimonial[];
  /** Full-width layout with roomier padding and optional two-column body on large screens */
  wide?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  if (count === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-mkf-border bg-mkf-surface/50 px-6 py-10 text-center text-mkf-muted">
        Recovery stories will appear here once published in admin.
      </p>
    );
  }

  const current = testimonials[index]!;

  const goTo = useCallback(
    (next: number) => {
      if (count <= 1) return;
      setIndex((next + count) % count);
    },
    [count],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, prev, next]);

  const slideMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.28 },
      };

  return (
    <figure
      className={`relative w-full overflow-hidden border border-mkf-border bg-mkf-surface shadow-[0_1px_0_rgba(15,23,42,0.05),0_12px_32px_-8px_rgba(12,44,64,0.15)] dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_12px_40px_-8px_rgba(0,0,0,0.4)] ${
        wide ? "rounded-2xl" : ""
      }`}
      aria-roledescription="carousel"
      aria-label="Recovery stories"
    >
      <div
        className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_15%,transparent)] opacity-50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-0 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_12%,transparent)] opacity-40 blur-2xl"
        aria-hidden
      />

      <div
        className={
          wide
            ? "relative p-8 sm:p-10 lg:p-12 xl:p-14"
            : "relative p-8 sm:p-10"
        }
      >
        {count > 1 && (
          <div
            className={`mb-6 flex items-center gap-2 ${
              wide ? "justify-between sm:mb-8" : "justify-end"
            }`}
          >
            {wide && (
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">
                Recovery stories
              </p>
            )}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-mkf-border bg-mkf-bg text-mkf-muted transition-colors hover:border-mkf-teal/40 hover:text-mkf-ink"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-mkf-border bg-mkf-bg text-mkf-muted transition-colors hover:border-mkf-teal/40 hover:text-mkf-ink"
                aria-label="Next story"
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={current.id} {...slideMotion}>
            <p
              className="font-display text-5xl leading-none text-[color-mix(in_oklab,var(--mkf-teal)_35%,var(--mkf-border))] dark:text-[color-mix(in_oklab,var(--mkf-teal)_30%,var(--mkf-surface))]"
              aria-hidden
            >
              “
            </p>
            <h3
              className={`font-display -mt-1 font-semibold text-mkf-ink ${
                wide ? "text-2xl sm:text-3xl lg:text-4xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {current.heading}
            </h3>
            <blockquote className="m-0 mt-8 border-0 p-0 lg:mt-10">
              <div
                className={`space-y-5 leading-relaxed text-mkf-muted sm:space-y-6 ${
                  wide
                    ? "text-base sm:text-lg sm:leading-relaxed lg:columns-2 lg:gap-x-12 lg:space-y-6 xl:gap-x-16 [&>p]:break-inside-avoid"
                    : "text-base sm:text-[1.05rem] sm:leading-relaxed"
                }`}
              >
                {current.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </blockquote>
            <figcaption className={`mt-10 border-t border-mkf-border pt-6 ${wide ? "lg:mt-12" : ""}`}>
              <p className="m-0 font-display text-lg font-semibold text-mkf-ink">{current.name}</p>
              <p className="mt-1 text-sm text-mkf-muted">{current.location}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="h-px w-10 shrink-0 bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
                    aria-hidden
                  />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">
                    Recovery story
                  </span>
                </div>
                {count > 1 && (
                  <div className="flex items-center gap-2" role="tablist" aria-label="Choose a story">
                    {testimonials.map((t, i) => (
                      <button
                        key={t.id}
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        aria-label={`Story ${i + 1}: ${t.name}`}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === index
                            ? "w-6 bg-mkf-accent"
                            : "w-2 bg-mkf-border hover:bg-mkf-teal/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </figcaption>
          </motion.div>
        </AnimatePresence>
      </div>
    </figure>
  );
}
