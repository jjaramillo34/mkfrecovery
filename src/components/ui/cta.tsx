import type { ReactNode } from "react";
import { Button } from "./button";
import { Container } from "./container";

export function CtaBand({
  title,
  body,
  primary,
  secondary,
  children,
}: {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <aside className="border-y border-mkf-border bg-[color-mix(in_oklab,var(--mkf-primary)_10%,var(--mkf-bg))] py-14 sm:py-16">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-mkf-ink sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-mkf-muted">{body}</p>
          {children}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={primary.href} variant="primary">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          )}
        </div>
      </Container>
    </aside>
  );
}
