"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const downloads = [
  {
    title: "Family conversation starter (PDF)",
    description: "A one-page guide to open healthy dialogue without alarm.",
    href: "#",
  },
  {
    title: "Classroom micro-lesson: coping skills (PDF)",
    description: "15-minute facilitator notes for youth and community settings.",
    href: "#",
  },
  {
    title: "Community event checklist (PDF)",
    description: "Planning prompts for neighborhood and community partners.",
    href: "#",
  },
];

export function DownloadsNewsletter() {
  const [email, setEmail] = useState("");

  return (
    <Section
      eyebrow="Downloads & updates"
      title="Stay connected"
      intro="Grab a few starter downloads (placeholder links for now) and sign up for occasional updates—event announcements, new resources, and impact notes."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-lg font-semibold text-mkf-ink">Downloadable resources</h3>
          <ul className="mt-5 space-y-4">
            {downloads.map((d) => (
              <li key={d.title}>
                <Card className="p-5">
                  <p className="font-medium text-mkf-fg">{d.title}</p>
                  <p className="mt-2 text-sm text-mkf-muted">{d.description}</p>
                  <a
                    href={d.href}
                    className="mt-4 inline-flex text-sm font-semibold text-mkf-primary hover:underline"
                  >
                    Download (sample)
                  </a>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Card className="p-8">
            <h3 className="font-display text-lg font-semibold text-mkf-ink">Newsletter</h3>
            <p className="mt-2 text-sm leading-relaxed text-mkf-muted">
              We send thoughtful updates—not daily clutter. Unsubscribe anytime.
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              noValidate
            >
              <div>
                <label htmlFor="newsletter-email" className="text-sm font-medium text-mkf-fg">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.org"
                  className="mt-2 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2.5 text-sm text-mkf-fg placeholder:text-mkf-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mkf-primary"
                  required
                  aria-required="true"
                />
              </div>
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
              <p className="text-xs text-mkf-muted">
                This demo form does not send email yet—wire it to your ESP or server action when ready.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </Section>
  );
}
