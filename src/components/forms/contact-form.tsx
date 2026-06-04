"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ContactFormInput } from "@/lib/validation/public-forms";

type FormStatus = "idle" | "loading" | "sent" | "error";

const inputClassName =
  "mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [role, setRole] = useState<ContactFormInput["role"] | "">("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const r = await fetch("/api/public/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        role: data.get("role"),
        message: data.get("message"),
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
    setRole("");
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
            disabled={status === "loading" || status === "sent"}
            className={inputClassName}
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
            disabled={status === "loading" || status === "sent"}
            className={inputClassName}
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
          disabled={status === "loading" || status === "sent"}
          className={inputClassName}
        />
      </div>
      <div>
        <label htmlFor="contact-role" className="text-sm font-medium text-mkf-fg">
          I am a…
        </label>
        <select
          id="contact-role"
          name="role"
          className={inputClassName}
          value={role}
          onChange={(e) => setRole(e.target.value as ContactFormInput["role"] | "")}
          required
          aria-required="true"
          disabled={status === "loading" || status === "sent"}
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="family">Parent or caregiver</option>
          <option value="educator">Educator or organizational staff</option>
          <option value="affected">Person in recovery or seeking help (any age)</option>
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
          disabled={status === "loading" || status === "sent"}
          className={inputClassName}
          placeholder="Share a little context so we can route your message thoughtfully."
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {status === "sent" ? (
          <p role="status" className="text-sm font-medium text-mkf-teal">
            Thank you—your message was sent. We will follow up as soon as we can.
          </p>
        ) : (
          <>
            <Button type="submit" variant="primary" className="inline-flex" disabled={status === "loading"}>
              <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {status === "loading" ? "Sending…" : "Send message"}
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
