import { FileText, HandCoins, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const TAGLINE =
  "Recovery is hope in motion—honest, supported, and never alone.";

const COURAGE_WORDS: { word: string; left: number; top: number; rotate: number }[] = [
  { word: "Strength", left: 4, top: 68, rotate: -10 },
  { word: "Sobriety", left: 0, top: 42, rotate: 8 },
  { word: "Hope", left: 18, top: 12, rotate: -6 },
  { word: "Courage", left: 78, top: 8, rotate: 12 },
  { word: "Grace", left: 88, top: 32, rotate: -8 },
  { word: "Recovery", left: 82, top: 58, rotate: 6 },
  { word: "Resilience", left: 62, top: 78, rotate: -12 },
  { word: "Peace", left: 38, top: 86, rotate: 4 },
  { word: "Worth", left: 14, top: 82, rotate: -6 },
  { word: "Faith", left: 48, top: 4, rotate: 8 },
];

const wordClassName =
  "absolute max-w-[42%] whitespace-nowrap font-display text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-mkf-teal/85 sm:text-[11px] dark:text-mkf-teal";

function PhoenixWithCourageWords() {
  return (
    <div className="relative mx-auto h-[min(22rem,78vw)] w-full max-w-[min(100%,22rem)] sm:h-[min(24rem,72vw)] lg:max-w-none">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {COURAGE_WORDS.map(({ word, left, top, rotate }) => (
          <span
            key={word}
            className={wordClassName}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            }}
          >
            {word}
          </span>
        ))}
      </div>
      <div className="absolute left-1/2 top-[46%] z-10 aspect-square w-[min(72%,14rem)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(76%,16rem)] lg:w-[min(78%,18rem)]">
        <Image
          src="/images/fenix.png"
          alt="Phoenix symbol with broken chain, representing recovery and renewal"
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 80vw, 360px"
          priority
        />
      </div>
    </div>
  );
}

export function PhoenixBanner() {
  return (
    <section
      className="relative overflow-x-hidden border-b border-mkf-border bg-mkf-hero-tint"
      aria-labelledby="page-title"
    >
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

      <div className="relative mx-auto max-w-7xl px-4 pt-14 text-center sm:px-6 lg:px-8 lg:pt-16">
        <p className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-mkf-teal">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          Welcome
        </p>
        <h1
          id="page-title"
          className="font-display mt-3 text-4xl font-semibold tracking-tight text-mkf-ink sm:text-5xl lg:text-[3.15rem] lg:leading-tight"
        >
          {site.name}
        </h1>
        <p className="mt-3 font-display text-xl font-semibold text-mkf-primary sm:text-2xl">{site.slogan}</p>
      </div>

      <div className="relative mx-auto mt-10 grid w-full max-w-7xl gap-12 px-4 pb-16 sm:px-6 sm:pb-20 lg:mt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 lg:px-8 lg:pb-24">
        <div className="flex justify-center lg:justify-start">
          <PhoenixWithCourageWords />
        </div>

        <div className="text-center lg:text-left">
          <p className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-mkf-teal lg:justify-start">
            <Heart className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            Hope, recovery &amp; sobriety
          </p>

          <p className="font-display mt-4 text-lg font-medium leading-snug text-mkf-primary sm:text-xl md:text-2xl">
            {TAGLINE}
          </p>

          <h2
            id="phoenix-banner-heading"
            className="font-display mt-6 text-3xl font-semibold tracking-tight text-mkf-ink sm:text-4xl"
          >
            Renewal begins with{" "}
            <span className="text-mkf-primary">honest conversation</span>—and stays rooted in community.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mkf-muted lg:mx-0">
            Like the phoenix, recovery reminds us that change is possible. Standing with people of any age on the
            path to sobriety and fuller life is how we make that real—connection, clinical and community support,
            and groups that show up on the calendar so fewer people and families walk alone.
          </p>
          <p className="mx-auto mt-4 max-w-xl font-display text-xl font-semibold leading-snug text-mkf-ink lg:mx-0">
            Break the chains of addiction. Change is possible. Find a way to help.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button href="/donate" variant="primary" className="inline-flex">
              <HandCoins className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Donate now
            </Button>
            <Button href="/programs#how-mkf-cares" variant="secondary" className="inline-flex">
              <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Therapists, groups &amp; program lengths
            </Button>
            <Link
              href="#overview"
              className="inline-flex items-center gap-1 px-2 text-sm font-semibold text-mkf-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
