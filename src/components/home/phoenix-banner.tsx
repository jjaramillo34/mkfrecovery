"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/** Smooth loop: glide + gentle drift — rotation kept small so a rectangular image frame doesn’t read as a “tilted box”. */
const flightKeyframes = {
  x: [0, 18, 10, -16, -8, 0],
  y: [0, -22, -8, -26, -12, 0],
  rotate: [0, 1.5, 0.5, -2, -1, 0],
};

const flightTransition = {
  duration: 11,
  repeat: Infinity,
  ease: "easeInOut" as const,
  times: [0, 0.18, 0.38, 0.58, 0.78, 1],
};

const TYPEWRITER_PHRASE =
  "Prevention is hope in action—early, honest, and never alone.";

const ENCOURAGING_WORDS = [
  "Strength",
  "Virtue",
  "Hope",
  "Courage",
  "Grace",
  "Renewal",
  "Resilience",
  "Peace",
  "Worth",
  "Faith",
];

/**
 * Hand-placed landing spots (% from left, % from bottom) so words scatter across
 * the whole “floor” instead of clustering—corners, edges, center, staggered heights.
 */
const WORD_LANDING: readonly { left: number; bottom: number }[] = [
  { left: 5, bottom: 4 },
  { left: 14, bottom: 36 },
  { left: 26, bottom: 10 },
  { left: 38, bottom: 42 },
  { left: 48, bottom: 18 },
  { left: 58, bottom: 6 },
  { left: 72, bottom: 30 },
  { left: 84, bottom: 12 },
  { left: 92, bottom: 38 },
  { left: 66, bottom: 22 },
];

/** Stable 0–1 pseudo-random from index (SSR/hydration safe). */
function drift(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

function FallingEncouragement({ reduceMotion }: { reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
      aria-hidden
    >
      {ENCOURAGING_WORDS.map((word, i) => {
        const spot = WORD_LANDING[i % WORD_LANDING.length];
        const jitterL = (drift(i, 11) - 0.5) * 7;
        const jitterB = (drift(i, 12) - 0.5) * 6;
        const leftPct = Math.min(96, Math.max(4, spot.left + jitterL));
        const bottomPct = Math.min(48, Math.max(1, spot.bottom + jitterB));
        const settleRotate = (drift(i, 3) - 0.5) * 18;
        const delay = 0.15 + i * 0.16;

        const style = {
          left: `${leftPct}%`,
          bottom: `${bottomPct}%`,
        } as const;

        const className =
          "absolute max-w-[45%] whitespace-nowrap text-center font-display text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-mkf-teal/80 shadow-[0_1px_0_color-mix(in_oklab,var(--mkf-bg)_70%,transparent)] sm:text-[11px] dark:text-mkf-teal/90";

        if (reduceMotion) {
          return (
            <span
              key={word}
              className={className}
              style={{
                ...style,
                transform: `translate(-50%, 0) rotate(${settleRotate}deg)`,
              }}
            >
              {word}
            </span>
          );
        }

        return (
          <motion.span
            key={word}
            className={`${className} -translate-x-1/2`}
            style={style}
            initial={{
              y: -320,
              opacity: 0,
              rotate: drift(i, 4) * 24 - 12,
            }}
            animate={
              inView
                ? {
                    y: 0,
                    opacity: 1,
                    rotate: settleRotate,
                  }
                : {}
            }
            transition={{
              delay,
              type: "spring",
              damping: 16,
              stiffness: 100,
              mass: 0.85,
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

function PreventionTypewriter({ phrase }: { phrase: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setCount(phrase.length);
      return;
    }
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let i = 0;

    const step = () => {
      if (cancelled) return;
      i += 1;
      setCount(Math.min(i, phrase.length));
      if (i < phrase.length) {
        timeoutId = setTimeout(step, 30 + Math.random() * 12);
      }
    };

    timeoutId = setTimeout(step, 450);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [inView, phrase, reduceMotion]);

  const typing = count < phrase.length && !reduceMotion;

  return (
    <p
      ref={ref}
      className="font-display min-h-[3.25rem] text-lg font-medium leading-snug text-mkf-primary sm:min-h-[3.5rem] sm:text-xl md:text-2xl"
    >
      <span className="sr-only">{phrase}</span>
      <span aria-hidden className="text-mkf-primary">
        {phrase.slice(0, count)}
        {typing && (
          <span
            className="ml-0.5 inline-block min-h-[1em] w-[2px] translate-y-px animate-pulse bg-mkf-primary align-middle"
            aria-hidden
          />
        )}
      </span>
    </p>
  );
}

export function PhoenixBanner() {
  const reduceMotion = useReducedMotion();

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

      <div className="relative mx-auto max-w-6xl px-4 pt-14 text-center sm:px-6 lg:px-8 lg:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mkf-teal">
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

      <div className="relative mx-auto mt-10 grid w-full max-w-6xl gap-12 px-4 pb-16 sm:px-6 sm:pb-20 lg:mt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 lg:px-8 lg:pb-24">
        <motion.div
          className="relative mx-auto flex min-h-[min(26rem,52vh)] w-full max-w-sm flex-col justify-start lg:mx-0 lg:min-h-[28rem] lg:max-w-none"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, scale: 0.88, x: -56, y: 72, rotate: -5 }
          }
          whileInView={
            reduceMotion ? undefined : { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }
          }
          viewport={{ once: true, amount: 0.35 }}
          transition={{ type: "spring", stiffness: 95, damping: 18, mass: 0.9 }}
        >
          <FallingEncouragement reduceMotion={reduceMotion === true} />

          <motion.div
            className="relative z-10 mx-auto aspect-square w-full max-w-[min(100%,18rem)] will-change-transform sm:max-w-[min(100%,20rem)]"
            style={{ transformOrigin: "50% 55%" }}
            animate={reduceMotion ? undefined : flightKeyframes}
            transition={reduceMotion ? undefined : flightTransition}
          >
            <Image
              src="/images/fenix.png"
              alt=""
              fill
              className="object-contain mix-blend-screen dark:mix-blend-lighten"
              sizes="(max-width: 1024px) 80vw, 360px"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center lg:mt-0 lg:text-left"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mkf-teal">
            Hope &amp; prevention
          </p>

          <div className="mt-4">
            <PreventionTypewriter phrase={TYPEWRITER_PHRASE} />
          </div>

          <h2
            id="phoenix-banner-heading"
            className="font-display mt-6 text-3xl font-semibold tracking-tight text-mkf-ink sm:text-4xl"
          >
            Renewal begins with{" "}
            <span className="text-mkf-primary">honest conversation</span>—and stays rooted in community.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mkf-muted lg:mx-0">
            Like the phoenix, recovery reminds us that change is possible. Drug prevention is how we protect
            that possibility—early education, compassion, and support so fewer families face crisis alone.
          </p>
          <p className="mx-auto mt-4 max-w-xl font-display text-xl font-semibold leading-snug text-mkf-ink lg:mx-0">
            Break the chain before it tightens: teach, listen, and show up.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
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
        </motion.div>
      </div>
    </section>
  );
}
