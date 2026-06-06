import { type LucideIcon, LayoutGrid, Mail } from "lucide-react";
import Link from "next/link";
import { LogoBrand } from "@/components/brand/logo";
import { site, footerNav } from "@/lib/site";
import { Container } from "@/components/ui/container";

const linkClass =
  "text-sm text-mkf-muted transition-colors hover:text-mkf-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary";
const colHeadingClass = "text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal";
const kickerLineClass = "h-0.5 w-7 flex-shrink-0 rounded-full bg-gradient-to-r from-mkf-teal to-mkf-gold sm:w-8";
const socialClass =
  "inline-flex min-h-[2.5rem] items-center justify-center rounded-lg border border-mkf-border bg-mkf-bg/60 px-3.5 text-sm font-medium text-mkf-fg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary dark:bg-mkf-bg/30 hover:border-mkf-gold/50 hover:text-mkf-primary dark:hover:border-mkf-gold/40";

function ColumnHeading({ children, icon: Icon }: { children: string; icon: LucideIcon }) {
  return (
    <div className="mb-0 flex items-center gap-2.5">
      <span className={kickerLineClass} aria-hidden />
      <Icon className="h-3.5 w-3.5 shrink-0 text-mkf-gold/90 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden="true" />
      <h2 className={colHeadingClass}>{children}</h2>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const tel = site.phone.replace(/\D/g, "");

  return (
    <footer className="relative overflow-x-hidden border-t border-mkf-border bg-mkf-surface">
      <div
        className="h-0.5 w-full bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
        aria-hidden
      />
      <div className="pointer-events-none absolute -bottom-8 left-1/2 h-40 w-[min(100%,32rem)] -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--mkf-primary)_5%,transparent)] opacity-50 blur-3xl dark:opacity-40" />

      <Container className="relative py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="pt-0.5 text-mkf-primary">
                <LogoBrand variant="footer" />
              </span>
              <div className="min-w-0 border-l-2 border-[color-mix(in_oklab,var(--mkf-gold)_55%,var(--mkf-border))] pl-4">
                <p className="font-display text-lg font-semibold text-mkf-ink sm:text-xl">{site.name}</p>
                <p className="mt-0.5 text-sm font-medium tracking-wide text-mkf-gold/95">{site.slogan}</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-mkf-muted sm:text-base sm:leading-relaxed">
              {site.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2 sm:mt-7">
              <li>
                <a className={socialClass} href={site.social.facebook} rel="noopener noreferrer" target="_blank">
                  Facebook
                </a>
              </li>
              <li>
                <a className={socialClass} href={site.social.instagram} rel="noopener noreferrer" target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                <a className={socialClass} href={site.social.linkedin} rel="noopener noreferrer" target="_blank">
                  LinkedIn
                </a>
              </li>
            </ul>
            <p className="mt-5 max-w-md text-xs leading-relaxed text-mkf-muted sm:mt-6">
              <Link className="font-medium text-mkf-primary underline decoration-mkf-primary/30 underline-offset-2 transition hover:decoration-mkf-primary" href="/donate">Donate</Link>
              {" · "}
              <Link
                className="font-medium text-mkf-primary underline decoration-mkf-primary/30 underline-offset-2 transition hover:decoration-mkf-primary"
                href="/get-involved"
              >
                Get involved
              </Link>
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-8 lg:gap-10">
            <div>
              <ColumnHeading icon={LayoutGrid}>Navigate</ColumnHeading>
              <ul className="mt-3 space-y-2.5">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ColumnHeading icon={Mail}>Contact</ColumnHeading>
              <address className="mt-3 space-y-2.5 not-italic">
                <p>
                  <a
                    className="text-sm text-mkf-fg/90 transition hover:underline"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                </p>
                <p>
                  <a
                    className="text-sm text-mkf-fg/90 transition hover:underline"
                    href={`tel:${tel}`}
                  >
                    {site.phone}
                  </a>
                </p>
                <p className="whitespace-pre-line text-sm text-mkf-muted leading-relaxed">{site.address}</p>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-mkf-border/80 pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:pt-9">
          <p className="text-xs text-mkf-muted sm:text-sm">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-mkf-muted sm:text-sm">
            Website by{" "}
            <a
              href="https://www.jaramillohub.com/"
              className="font-medium text-mkf-primary underline decoration-mkf-primary/30 underline-offset-2 transition hover:decoration-mkf-primary"
              rel="noopener noreferrer"
              target="_blank"
            >
              Javier Jaramillo
            </a>
            {" · "}
            <a
              href="https://www.jaramillohub.com/"
              className="text-mkf-muted underline decoration-mkf-border underline-offset-2 transition hover:text-mkf-fg hover:decoration-mkf-primary/40"
              rel="noopener noreferrer"
              target="_blank"
            >
              jaramillohub.com
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
