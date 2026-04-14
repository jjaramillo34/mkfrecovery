"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function VolunteerForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("sent");
      }}
      noValidate
    >
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
            className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
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
            className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
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
          placeholder="Event support, translation, facilitation, tech help, etc."
          className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
        />
      </div>
      <div>
        <label htmlFor="vol-availability" className="text-sm font-medium text-mkf-fg">
          Availability
        </label>
        <input
          id="vol-availability"
          name="availability"
          className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
          placeholder="Weekdays, evenings, weekends — general range is fine"
        />
      </div>
      <Button type="submit" variant="primary">
        Submit interest
      </Button>
      {status === "sent" && (
        <p role="status" className="text-sm font-medium text-mkf-teal">
          Thank you—this is a demo form. Connect it to your CRM or email workflow when ready.
        </p>
      )}
    </form>
  );
}
