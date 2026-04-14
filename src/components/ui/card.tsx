import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={`border border-mkf-border bg-mkf-surface shadow-[0_1px_0_rgba(15,23,42,0.04)] ${padded ? "p-6 sm:p-8" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
