import { Section } from "@/components/ui/section";

export function MichaelMemorialSection({ className = "" }: { className?: string }) {
  return (
    <Section
      className={className}
      eyebrow="Remembering Michael"
      title="His strength lives on in this foundation"
      intro="The charity was developed in memory of our dear friend Michael “Dart” Kellermann."
    >
      <div className="max-w-3xl space-y-5 text-base leading-relaxed text-mkf-muted">
        <p>
          He fought a battle that most people never fully understood—maybe still don’t—and although his
          battle is over, his strength lives on through this foundation.
        </p>
        <p>
          MKF is here to help all the “Michael Kellermanns” who just need someone who understands the battle.
        </p>
      </div>

      <figure className="mt-12 max-w-3xl border border-mkf-border bg-mkf-surface p-8 sm:p-10">
        <h3 className="font-display text-lg font-semibold text-mkf-ink">A voice from recovery</h3>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-mkf-muted sm:text-base">
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
        <figcaption className="mt-8 border-t border-mkf-border pt-6 text-sm font-medium text-mkf-fg">
          — Annie G
          <span className="mt-1 block font-normal text-mkf-muted">Queens, NY</span>
        </figcaption>
      </figure>
    </Section>
  );
}
