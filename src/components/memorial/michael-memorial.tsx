import { Heart } from "lucide-react";
import { Section } from "@/components/ui/section";

export function MichaelMemorialSection({ className = "" }: { className?: string }) {
  return (
    <Section
      className={`border-y border-mkf-border bg-[color-mix(in_oklab,var(--mkf-primary)_4%,var(--mkf-bg))] ${className}`}
      wideHeader
      eyebrow="Remembering Michael"
      eyebrowIcon={Heart}
      title="His strength lives on in this foundation"
      intro="The charity was developed in memory of our dear friend Michael “Dart” Kellermann."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
        <div className="space-y-8 lg:col-span-5">
          <p className="text-lg leading-relaxed text-mkf-fg sm:text-xl sm:leading-relaxed">
            He fought a battle that most people never fully understood—maybe still don’t—and although his
            battle is over, his strength lives on through this foundation.
          </p>
          <aside className="border-l-4 border-mkf-accent bg-mkf-surface/80 py-5 pl-6 pr-4 shadow-sm dark:bg-mkf-surface/50">
            <p className="m-0 font-display text-lg font-medium leading-snug text-mkf-ink sm:text-xl">
              MKF is here to help all the “Michael Kellermanns” who just need someone who understands the
              battle.
            </p>
          </aside>
        </div>

        <figure
          className="relative overflow-hidden border border-mkf-border bg-mkf-surface p-8 shadow-[0_1px_0_rgba(15,23,42,0.05),0_12px_32px_-8px_rgba(12,44,64,0.15)] sm:p-10 dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_12px_40px_-8px_rgba(0,0,0,0.4)] lg:col-span-7"
        >
          <div
            className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-[color-mix(in_oklab,var(--mkf-teal)_15%,transparent)] opacity-50 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-10 left-0 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--mkf-accent)_12%,transparent)] opacity-40 blur-2xl"
            aria-hidden
          />
          <div className="relative">
            <p
              className="font-display text-5xl leading-none text-[color-mix(in_oklab,var(--mkf-teal)_35%,var(--mkf-border))] dark:text-[color-mix(in_oklab,var(--mkf-teal)_30%,var(--mkf-surface))]"
              aria-hidden
            >
              “
            </p>
            <h3 className="font-display -mt-1 text-2xl font-semibold text-mkf-ink sm:text-3xl">A voice from recovery</h3>
            <blockquote className="m-0 mt-8 border-0 p-0">
              <div className="space-y-5 text-base leading-relaxed text-mkf-muted sm:space-y-6 sm:text-[1.05rem] sm:leading-relaxed">
                <p>
                  Working with MKF was a life-changing experience for me. From the very beginning, I felt a level
                  of compassion, professionalism, and genuine care that I had not encountered anywhere else during
                  my journey with addiction.
                </p>
                <p>
                  The environment at the facility itself was calm, clean, and welcoming, which is what I needed to
                  feel safe and focused. It felt supportive and restorative, which made a huge difference in my
                  ability to open up and commit to the process. Every person I interacted with at and through MKF
                  was knowledgeable, patient, and invested in my recovery. They didn’t treat me like just another
                  case and they took the time to understand my personal struggles and tailored my treatment in a
                  way that worked for me.
                </p>
                <p>
                  The programs offered were excellent in every way. They addressed not only the addiction itself
                  but also the underlying causes, which was critical for long-term recovery. I learned coping
                  strategies, built healthier habits, and gained a better understanding of myself. The balance of
                  therapy, group sessions, and personal reflection was incredibly effective.
                </p>
                <p>
                  MKF gave me hope when I felt like I had none. They helped me rebuild my confidence and showed me
                  that recovery is not only possible but sustainable. I am in a much better place today because of
                  the tools and support I received there.
                </p>
                <p>
                  I would highly recommend MKF to anyone struggling with addiction or to families looking for help
                  for a loved one. The Florida facility, in particular, exceeded all my expectations and truly
                  changed my life for the better.
                </p>
              </div>
            </blockquote>
            <figcaption className="mt-10 border-t border-mkf-border pt-6">
              <p className="m-0 font-display text-lg font-semibold text-mkf-ink">Annie G</p>
              <p className="mt-1 text-sm text-mkf-muted">Queens, NY</p>
              <div className="mt-4 flex items-center gap-3">
                <span
                  className="h-px w-10 shrink-0 bg-gradient-to-r from-mkf-teal via-mkf-gold to-mkf-accent"
                  aria-hidden
                />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mkf-teal">Recovery story</span>
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
    </Section>
  );
}
