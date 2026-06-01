import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const eyebrowIconClass =
  "h-4 w-4 shrink-0 text-mkf-teal sm:h-5 sm:w-5 stroke-[1.75]";

export type SectionHeaderVariant = "default" | "wide";
export type SectionHeaderAlign = "start" | "center";

/**
 * Reusable page/section title block: eyebrow, display title, and optional lead paragraph.
 * Pair with `Section` or use standalone in custom layouts.
 * Use `align="center"` to center the header inside the same `max-w-7xl` `Container` as the section body.
 */
export function SectionHeader({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  intro,
  variant = "default",
  align = "start",
  className = "",
  kicker,
}: {
  eyebrow?: string;
  /** Renders to the right of the gradient kicker, before the eyebrow label. */
  eyebrowIcon?: LucideIcon;
  title?: string;
  intro?: string;
  variant?: SectionHeaderVariant;
  /** Center eyebrow, title, and intro; intro keeps a comfortable max width for reading. */
  align?: SectionHeaderAlign;
  className?: string;
  /** Optional line under the title (e.g. extra context) before intro */
  kicker?: ReactNode;
}) {
  const isWide = variant === "wide";
  const isCenter = align === "center";

  const widthBlock =
    isCenter && isWide
      ? "mb-12 w-full text-center sm:mb-16"
      : isCenter && !isWide
        ? "mb-10 mx-auto w-full max-w-3xl text-center"
        : isWide
          ? "mb-12 w-full sm:mb-16"
          : "mb-10 max-w-3xl";

  const eyebrowRow = isCenter ? "flex items-center justify-center gap-2.5 sm:gap-3" : "flex items-center gap-2.5 sm:gap-3";

  return (
    <header className={`${widthBlock}${className ? ` ${className}` : ""}`}>
      {eyebrow && (
        <div className={eyebrowRow}>
          <span
            className="h-1 w-9 shrink-0 rounded-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent sm:w-12"
            aria-hidden
          />
          {EyebrowIcon && <EyebrowIcon className={eyebrowIconClass} aria-hidden="true" />}
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">{eyebrow}</p>
        </div>
      )}
      {title && (
        <h2
          className={`font-display text-balance font-semibold tracking-tight text-mkf-ink ${
            eyebrow ? "mt-3 sm:mt-4" : ""
          } ${
            isWide
              ? "text-3xl sm:text-4xl lg:text-5xl lg:leading-[1.1]"
              : "text-3xl sm:text-4xl"
          }`}
        >
          {title}
        </h2>
      )}
      {kicker && <div className={eyebrow || title ? "mt-3" : ""}>{kicker}</div>}
      {intro && (
        <p
          className={
            isWide
              ? isCenter
                ? "mx-auto mt-5 max-w-3xl text-balance text-xl leading-relaxed text-mkf-muted sm:mt-6 sm:text-2xl sm:leading-relaxed"
                : "mt-5 max-w-5xl text-balance text-xl leading-relaxed text-mkf-muted sm:mt-6 sm:text-2xl sm:leading-relaxed"
              : isCenter
                ? "mx-auto mt-4 max-w-2xl text-balance text-lg leading-relaxed text-mkf-muted sm:mt-5"
                : "mt-4 text-balance text-lg leading-relaxed text-mkf-muted sm:mt-5"
          }
        >
          {intro}
        </p>
      )}
    </header>
  );
}
