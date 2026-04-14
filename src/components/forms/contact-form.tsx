"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
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
          <label htmlFor="contact-first" className="text-sm font-medium text-mkf-fg">
            First name
          </label>
          <input
            id="contact-first"
            name="firstName"
            autoComplete="given-name"
            required
            aria-required="true"
            className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
          />
        </div>
        <div>
          <label htmlFor="contact-last" className="text-sm font-medium text-mkf-fg">
            Last name
          </label>
          <input
            id="contact-last"
            name="lastName"
            autoComplete="family-name"
            required
            aria-required="true"
            className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-mkf-fg">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
        />
      </div>
      <div>
        <label htmlFor="contact-role" className="text-sm font-medium text-mkf-fg">
          I am a…
        </label>
        <select
          id="contact-role"
          name="role"
          className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
          defaultValue=""
          required
          aria-required="true"
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="family">Parent or caregiver</option>
          <option value="educator">Educator or organizational staff</option>
          <option value="youth">Young person</option>
          <option value="partner">Community partner</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-mkf-fg">
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          aria-required="true"
          className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
          placeholder="Share a little context so we can route your message thoughtfully."
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary">
          Send message
        </Button>
        {status === "sent" && (
          <p role="status" className="text-sm font-medium text-mkf-teal">
            Thanks—this demo captured your message locally. Connect a backend or form service to deliver
            it.
          </p>
        )}
      </div>
    </form>
  );
}
