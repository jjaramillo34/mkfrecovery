"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type FormStatus = "idle" | "loading" | "sent" | "error";

const inputClassName =
  "mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary";

export function VolunteerForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const r = await fetch("/api/public/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        interests: data.get("interests"),
        availability: data.get("availability"),
      }),
    });

    const body = (await r.json().catch(() => null)) as { error?: string } | null;

    if (!r.ok) {
      setStatus("error");
      setErrorMessage(body?.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("sent");
    form.reset();
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-name" className="text-sm font-medium text-mkf-fg">
            Full name
          </label>
          <input
            id="vol-name"
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            disabled={status === "loading" || status === "sent"}
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="vol-email" className="text-sm font-medium text-mkf-fg">
            Email
          </label>
          <input
            id="vol-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            disabled={status === "loading" || status === "sent"}
            className={inputClassName}
          />
        </div>
      </div>
      <div>
        <label htmlFor="vol-interests" className="text-sm font-medium text-mkf-fg">
          Interests & skills
        </label>
        <textarea
          id="vol-interests"
          name="interests"
          rows={4}
          required
          aria-required="true"
          disabled={status === "loading" || status === "sent"}
          placeholder="Event support, translation, facilitation, tech help, etc."
          className={inputClassName}
        />
      </div>
      <div>
        <label htmlFor="vol-availability" className="text-sm font-medium text-mkf-fg">
          Availability
        </label>
        <input
          id="vol-availability"
          name="availability"
          disabled={status === "loading" || status === "sent"}
          className={inputClassName}
          placeholder="Weekdays, evenings, weekends — general range is fine"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {status === "sent" ? (
          <p role="status" className="text-sm font-medium text-mkf-teal">
            Thank you—your interest was sent. We will follow up with realistic opportunities.
          </p>
        ) : (
          <>
            <Button type="submit" variant="primary" className="inline-flex" disabled={status === "loading"}>
              <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {status === "loading" ? "Sending…" : "Submit interest"}
            </Button>
            {status === "error" && errorMessage && (
              <p role="alert" className="text-sm text-red-600">
                {errorMessage}
              </p>
            )}
          </>
        )}
      </div>
    </form>
  );
}
