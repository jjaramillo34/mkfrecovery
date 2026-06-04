"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { GraduationCap, Handshake, type LucideIcon, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    label: "People reached annually (pilot regions)",
    end: 100,
    suffix: "+",
    colorClass: "text-mkf-teal",
    topBar: "from-mkf-teal via-mkf-gold/50 to-mkf-accent/50",
    iconRing: "bg-mkf-teal/12 text-mkf-teal",
  },
  {
    label: "Locations & programs",
    end: 5,
    suffix: "+",
    colorClass: "text-mkf-gold",
    topBar: "from-mkf-gold via-mkf-teal/45 to-mkf-accent/45",
    iconRing: "bg-mkf-gold/12 text-mkf-gold",
  },
  {
    label: "Community partners & other organizations",
    end: 10,
    suffix: "",
    colorClass: "text-mkf-accent",
    topBar: "from-mkf-accent via-mkf-teal/40 to-mkf-gold/50",
    iconRing: "bg-mkf-accent/10 text-mkf-accent",
  },
] as const;

const statIcons: LucideIcon[] = [UserRound, GraduationCap, Handshake];

function formatCount(n: number, end: number) {
  if (end >= 1000) return n.toLocaleString("en-US");
  return String(n);
}

function AnimatedValue({
  end,
  suffix,
  colorClass,
}: {
  end: number;
  suffix: string;
  colorClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(end);
      return;
    }

    const durationMs = 1600;
    let startAt: number | null = null;

    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const frame = (now: number) => {
      if (startAt === null) startAt = now;
      const t = Math.min((now - startAt) / durationMs, 1);
      const eased = easeOutCubic(t);
      setValue(Math.round(end * eased));
      if (t < 1) requestAnimationFrame(frame);
    };

    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [inView, end, reduceMotion]);

  return (
    <div
      ref={ref}
      className={`font-display mt-1 text-3xl font-semibold tabular-nums sm:text-4xl ${colorClass} tracking-tight`}
    >
      {formatCount(value, end)}
      {suffix}
    </div>
  );
}

export function ImpactStats() {
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {STATS.map((s, i) => {
        const I = statIcons[i] ?? UserRound;
        return (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-2xl border border-mkf-border/80 bg-mkf-surface/90 shadow-[0_1px_0_0_rgba(15,23,42,0.04),0_16px_40px_-20px_rgba(12,44,64,0.18)] dark:border-mkf-border/50 dark:bg-mkf-surface/85 dark:shadow-[0_1px_0_0_rgba(0,0,0,0.2),0_20px_45px_-22px_rgba(0,0,0,0.45)]"
          >
            <div
              className={`h-0.5 w-full bg-gradient-to-r ${s.topBar}`}
              aria-hidden
            />
            <div className="p-5 sm:p-6">
              <dt>
                <span className="flex items-start gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.iconRing}`}
                  >
                    <I className="h-5 w-5 opacity-90" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="pt-1.5 text-sm font-medium leading-snug text-mkf-muted">
                    {s.label}
                  </span>
                </span>
              </dt>
              <dd className="m-0 mt-1">
                <AnimatedValue
                  end={s.end}
                  suffix={s.suffix}
                  colorClass={s.colorClass}
                />
              </dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
