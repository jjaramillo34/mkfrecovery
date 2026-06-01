"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { startTransition, useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-mkf-border bg-mkf-surface"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-mkf-border bg-mkf-surface text-mkf-fg transition-colors hover:border-mkf-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Moon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
