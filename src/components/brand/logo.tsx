import Image from "next/image";
import { site } from "@/lib/site";

/** Custom mark: shield + broken chain — hope and recovery symbolism, no drug imagery. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Michael Kellermann Foundation mark"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        d="M24 4 40 10v13c0 9.4-7.3 17.4-16 19-8.7-1.6-16-9.6-16-19V10l16-6Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        d="M16 22c2.8-2.8 7.2-2.8 10 0M22 28c2.8 2.8 7.2 2.8 10 0"
      />
      <circle cx="18" cy="20" r="2.25" fill="currentColor" />
      <circle cx="30" cy="28" r="2.25" fill="currentColor" />
    </svg>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-lg font-semibold tracking-tight text-mkf-ink sm:text-xl ${className}`}
    >
      <span className="text-mkf-primary">MKF</span>
    </span>
  );
}

/** Raster logo for dark mode; SVG mark in light mode. */
export function LogoBrand({
  variant = "header",
  className = "",
}: {
  variant?: "header" | "footer";
  className?: string;
}) {
  const heightClass = variant === "footer" ? "h-10" : "h-9";
  const maxW = variant === "footer" ? "max-w-[15rem]" : "max-w-[13rem]";

  return (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
      <LogoMark
        className={`${heightClass} w-9 shrink-0 text-mkf-primary transition-transform group-hover:scale-[1.02] dark:hidden`}
      />
      <Image
        src="/images/logo_dark.png"
        alt={`${site.shortName} logo`}
        width={320}
        height={96}
        priority={variant === "header"}
        className={`hidden ${heightClass} w-auto ${maxW} shrink-0 object-contain object-left dark:block`}
      />
    </span>
  );
}
