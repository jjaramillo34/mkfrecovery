import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

/** Primary = orange #D95F18 · Secondary = gold #D99923 (fenix CTA pair). */
const variants: Record<Variant, string> = {
  primary:
    "bg-mkf-accent text-mkf-accent-fg hover:opacity-[0.92] shadow-sm dark:hover:opacity-95",
  secondary:
    "bg-mkf-gold text-[#0c2c40] shadow-sm hover:opacity-[0.92] dark:text-[#0c2c40]",
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
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-opacity duration-200 ${focusRing[variant]}`;

  if (href) {
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
