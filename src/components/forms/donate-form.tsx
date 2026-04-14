"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

const amounts = [25, 50, 100, 250];

export function DonateForm() {
  const id = useId();
  const [amount, setAmount] = useState<string>("50");
  const [custom, setCustom] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const effectiveAmount = custom ? custom : amount;

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("sent");
      }}
      noValidate
    >
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
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-mkf-fg">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
          />
        </div>
      </div>

      <p className="text-xs text-mkf-muted" aria-live="polite">
        Selected support:{" "}
        <strong className="text-mkf-fg">
          ${effectiveAmount || "—"}
        </strong>{" "}
        (placeholder — connect to your payment processor).
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary">
          Continue to payment
        </Button>
        {status === "sent" && (
          <p role="status" className="text-sm font-medium text-mkf-teal">
            Demo only—no charge was made. Integrate Stripe or your preferred nonprofit gateway.
          </p>
        )}
      </div>
    </form>
  );
}
