"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      className="relative overflow-hidden border-b border-mkf-border bg-mkf-bg"
      aria-labelledby="phoenix-banner-heading"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 lg:px-8 lg:py-24">
        <motion.div
          className="relative mx-auto flex w-full max-w-sm justify-center lg:mx-0 lg:max-w-none"
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
          <motion.div
            className="relative aspect-square w-full max-w-[min(100%,18rem)] sm:max-w-[min(100%,20rem)] will-change-transform"
            style={{ transformOrigin: "50% 55%" }}
            animate={reduceMotion ? undefined : flightKeyframes}
            transition={reduceMotion ? undefined : flightTransition}
          >
            {/* mix-blend-screen: knocks out dark/navy backing pixels on light page bg (PNG isn’t transparent). Dark mode: lighten so dark frame fades against dark bg. */}
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
          className="mt-12 text-center lg:mt-0 lg:text-left"
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
        </motion.div>
      </div>
    </section>
  );
}
