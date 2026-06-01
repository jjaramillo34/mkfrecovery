"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

const amounts = [25, 50, 100, 250];

export function DonateForm({
  givebutterUrl,
  eventLabel,
}: {
  givebutterUrl: string;
  eventLabel?: string | null;
}) {
  const id = useId();
  const [amount, setAmount] = useState<string>("50");
  const [custom, setCustom] = useState("");
  const canCheckout = givebutterUrl.length > 0;
  const effectiveAmount = custom ? custom : amount;

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      noValidate
    >
      {eventLabel ? (
        <p className="rounded-lg border border-mkf-border/80 bg-mkf-surface/80 px-3 py-2 text-sm text-mkf-muted">
          <span className="font-medium text-mkf-ink">Active campaign: </span>
          {eventLabel}
        </p>
      ) : null}
      <fieldset>
        <legend className="text-sm font-medium text-mkf-fg">Choose an amount (USD)</legend>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {amounts.map((a) => {
            const inputId = `${id}-amt-${a}`;
            return (
              <div key={a}>
                <input
                  type="radio"
                  id={inputId}
                  name="amount"
                  value={String(a)}
                  checked={amount === String(a) && custom === ""}
                  onChange={() => {
                    setAmount(String(a));
                    setCustom("");
                  }}
                  className="peer sr-only"
                />
                <label
                  htmlFor={inputId}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-mkf-border bg-mkf-bg px-3 py-3 text-sm font-semibold text-mkf-fg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-mkf-primary peer-checked:border-mkf-primary peer-checked:bg-[color-mix(in_oklab,var(--mkf-primary)_12%,var(--mkf-bg))]"
                >
                  ${a}
                </label>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <label htmlFor={`${id}-custom`} className="text-sm font-medium text-mkf-fg">
            Custom amount
          </label>
          <input
            id={`${id}-custom`}
            name="customAmount"
            inputMode="decimal"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Enter another amount"
            className="mt-2 w-full max-w-md rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-mkf-fg">Frequency</legend>
        <div className="mt-4 flex flex-wrap gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-mkf-fg">
            <input
              type="radio"
              name="frequency"
              value="once"
              defaultChecked
              className="accent-[color:var(--mkf-primary)]"
            />
            One-time
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-mkf-fg">
            <input type="radio" name="frequency" value="monthly" className="accent-[color:var(--mkf-primary)]" />
            Monthly
          </label>
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium text-mkf-fg">
            Full name
            <span className="font-normal text-mkf-muted"> (optional here)</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-mkf-fg">
            Email
            <span className="font-normal text-mkf-muted"> (optional here)</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
          />
        </div>
      </div>

      <p className="text-xs text-mkf-muted" aria-live="polite">
        You&rsquo;re planning to support MKF for{" "}
        <strong className="text-mkf-fg">${effectiveAmount || "—"}</strong>—complete payment and billing on
        Givebutter&rsquo;s page.
      </p>

      <div className="space-y-3">
        {canCheckout ? (
          <Button
            href={givebutterUrl}
            newTab
            variant="primary"
            className="w-full justify-center"
          >
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Donate on Givebutter
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            className="w-full justify-center"
            disabled
          >
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Donate on Givebutter
          </Button>
        )}
        <p className="text-center text-xs text-mkf-muted">
          {canCheckout
            ? "Opens Givebutter in a new tab. Card details stay with Givebutter, not on this site."
            : (
                <>
                  We are connecting our live Givebutter page—check back soon, or reach out on{" "}
                  <Link className="font-medium text-mkf-primary underline decoration-mkf-primary/30 underline-offset-2 hover:decoration-mkf-primary" href="/contact">Contact</Link> to give
                  another way.
                </>
              )}
        </p>
      </div>
    </form>
  );
}
