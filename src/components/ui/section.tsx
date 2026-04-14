import type { ReactNode } from "react";
import { Container } from "./container";

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  eyebrow,
  title,
  intro,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container className={containerClassName}>
        {(eyebrow || title || intro) && (
          <header className="mb-10 max-w-3xl">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-mkf-ink sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-4 text-lg leading-relaxed text-mkf-muted">{intro}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
