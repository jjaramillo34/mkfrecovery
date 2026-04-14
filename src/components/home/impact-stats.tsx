"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    label: "People reached annually (pilot regions)",
    end: 12_400,
    suffix: "+",
    colorClass: "text-mkf-teal",
  },
  {
    label: "Facilitators trained in prevention fundamentals",
    end: 860,
    suffix: "+",
    colorClass: "text-mkf-gold",
  },
  {
    label: "Community partners & other organizations",
    end: 54,
    suffix: "",
    colorClass: "text-mkf-accent",
  },
] as const;

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
    <dd
      ref={ref}
      className={`font-display mt-2 text-3xl font-semibold tracking-tight tabular-nums ${colorClass}`}
    >
      {formatCount(value, end)}
      {suffix}
    </dd>
  );
}

export function ImpactStats() {
  return (
    <dl className="grid gap-8 sm:grid-cols-3">
      {STATS.map((s) => (
        <div key={s.label} className="border-l border-mkf-border pl-6">
          <dt className="text-sm font-medium text-mkf-muted">{s.label}</dt>
          <AnimatedValue end={s.end} suffix={s.suffix} colorClass={s.colorClass} />
        </div>
      ))}
    </dl>
  );
}
