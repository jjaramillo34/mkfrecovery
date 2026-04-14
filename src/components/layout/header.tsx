"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoBrand } from "@/components/brand/logo";
import { site, mainNav } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-mkf-border bg-[color-mix(in_oklab,var(--mkf-bg)_88%,transparent)] backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--mkf-bg)_75%,transparent)]">
      <Container as="nav" className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 text-mkf-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
        >
          <LogoBrand variant="header" />
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-semibold leading-tight text-mkf-ink sm:text-base">
              {site.shortName}
            </span>
            <span className="hidden text-xs font-medium text-mkf-muted sm:block">{site.slogan}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary ${
                  active ? "text-mkf-primary" : "text-mkf-muted hover:text-mkf-fg"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <span className="ml-2 pl-2">
            <ThemeToggle />
          </span>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-mkf-border bg-mkf-surface px-3 py-2 text-sm font-semibold text-mkf-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-mkf-border bg-mkf-bg lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
        >
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-base font-medium ${
                    active ? "bg-mkf-surface text-mkf-primary" : "text-mkf-fg hover:bg-mkf-surface"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}
