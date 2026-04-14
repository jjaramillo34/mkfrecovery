import { Section } from "@/components/ui/section";

const quotes = [
  {
    quote:
      "MKF met our staff where we were—no jargon, no shame—just usable tools and follow-up we could actually implement.",
    attribution: "High school counselor",
  },
  {
    quote:
      "As a parent, I needed language that felt honest. The family resources helped us talk without turning it into a lecture.",
    attribution: "Caregiver participant",
  },
];

const partners = [
  "Riverside United School District",
  "Coalition for Healthy Youth",
  "Northside Community Center",
  "State Prevention Partners Network",
];

export function TestimonialsPartners() {
  return (
    <Section
      className="bg-mkf-surface"
      eyebrow="Voices & partners"
      title="Trusted relationships, built slowly"
      intro="We are grateful for partners who share data ethically, show up consistently, and keep young people at the center."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          {quotes.map((q) => (
            <figure key={q.attribution} className="border-l-2 border-mkf-accent pl-6">
              <blockquote className="text-base leading-relaxed text-mkf-fg">“{q.quote}”</blockquote>
              <figcaption className="mt-3 text-sm text-mkf-muted">— {q.attribution}</figcaption>
            </figure>
          ))}
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mkf-teal">
            Partner organizations
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {partners.map((p) => (
              <li
                key={p}
                className="border border-mkf-border bg-mkf-bg px-4 py-3 text-sm font-medium text-mkf-fg"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-mkf-muted">
            Partner names are illustrative placeholders—replace with your actual collaborators and logos
            as permissions allow.
          </p>
        </div>
      </div>
    </Section>
  );
}
