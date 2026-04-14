import Link from "next/link";
import { LogoBrand } from "@/components/brand/logo";
import { site, footerNav } from "@/lib/site";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-mkf-border bg-mkf-surface">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-mkf-primary">
              <LogoBrand variant="footer" />
              <div>
                <p className="font-display text-lg font-semibold text-mkf-ink">{site.name}</p>
                <p className="text-sm text-mkf-muted">{site.slogan}</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mkf-muted">{site.description}</p>
            <ul className="mt-6 flex flex-wrap gap-4 text-sm">
              <li>
                <a
                  href={site.social.facebook}
                  className="font-medium text-mkf-primary hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  className="font-medium text-mkf-primary hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  className="font-medium text-mkf-primary hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-mkf-teal">
                Navigate
              </h2>
              <ul className="mt-3 space-y-2">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-mkf-muted hover:text-mkf-fg hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-mkf-teal">
                Contact
              </h2>
              <address className="mt-3 space-y-2 not-italic">
                <p className="text-sm text-mkf-muted">
                  <a className="hover:underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </p>
                <p className="text-sm text-mkf-muted">
                  <a className="hover:underline" href={`tel:${site.phone.replace(/\D/g, "")}`}>
                    {site.phone}
                  </a>
                </p>
                <p className="whitespace-pre-line text-sm text-mkf-muted">{site.address}</p>
              </address>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-mkf-border pt-8 text-xs text-mkf-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved. This site uses placeholder
          contact details; replace with your organization&apos;s real information before launch.
        </p>
      </Container>
    </footer>
  );
}
