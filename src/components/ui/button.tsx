import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

/** Primary = accent blue · Secondary = sky blue w/ dark text for contrast. */
const variants: Record<Variant, string> = {
  primary:
    "bg-mkf-accent text-mkf-accent-fg hover:opacity-[0.92] shadow-sm dark:hover:opacity-95",
  secondary:
    "bg-mkf-gold text-slate-900 shadow-sm hover:opacity-[0.92] dark:text-slate-900",
  ghost: "text-mkf-primary hover:underline underline-offset-4",
};

const focusRing: Record<Variant, string> = {
  primary:
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-accent",
  secondary:
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-gold",
  ghost:
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  newTab,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** When set with `href`, forwards to `Link` (e.g. `true` = `target="_blank"`, `rel="noopener noreferrer"`). */
  newTab?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-opacity duration-200 ${focusRing[variant]}`;

  if (href) {
    return (
      <Link
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
