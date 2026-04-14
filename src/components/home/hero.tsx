import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-mkf-border bg-mkf-hero-tint">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage: `repeating-linear-gradient(
            -12deg,
            transparent,
            transparent 48px,
            color-mix(in oklab, var(--mkf-primary) 55%, transparent) 48px,
            color-mix(in oklab, var(--mkf-primary) 55%, transparent) 49px
          )`,
        }}
      />
      <Container className="relative py-20 sm:py-24 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12 lg:py-28">
        <div className="motion-rise">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mkf-teal">
            Michael Kellermann Foundation
          </p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-mkf-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
            {site.slogan}: prevention rooted in{" "}
            <span className="text-mkf-primary">compassion</span> and community.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mkf-muted">
            We partner with schools, families, and local organizations to build protective environments
            where young people can thrive—through education, early support, and honest conversation.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/donate" variant="primary">
              Donate now
            </Button>
            <Button href="/resources" variant="secondary">
              Get help &amp; resources
            </Button>
            <Link
              href="#overview"
              className="inline-flex items-center px-2 text-sm font-semibold text-mkf-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
            >
              Learn more
            </Link>
          </div>
        </div>
        <aside className="mt-14 border border-mkf-border bg-mkf-surface p-8 shadow-sm lg:mt-0 lg:p-10">
          <p className="font-display text-xl font-semibold text-mkf-ink">What we stand for</p>
          <ul className="mt-5 space-y-4 text-sm leading-relaxed text-mkf-muted">
            <li>
              <strong className="font-semibold text-mkf-fg">Dignity first.</strong> Support without
              stigma—especially for families navigating worry or uncertainty.
            </li>
            <li>
              <strong className="font-semibold text-mkf-fg">Prevention that fits real life.</strong>{" "}
              Practical tools for classrooms, caregivers, and community spaces.
            </li>
            <li>
              <strong className="font-semibold text-mkf-fg">Local partnership.</strong> We listen,
              co-create, and measure impact alongside the people we serve.
            </li>
          </ul>
        </aside>
      </Container>
    </section>
  );
}
