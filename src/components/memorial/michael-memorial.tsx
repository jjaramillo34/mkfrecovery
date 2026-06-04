import { Heart } from "lucide-react";
import { RecoveryTestimonialsCarousel } from "@/components/memorial/recovery-testimonials-carousel";
import { Section } from "@/components/ui/section";
import { fetchPublicTestimonials } from "@/lib/public-testimonials";

export async function MichaelMemorialSection({ className = "" }: { className?: string }) {
  const testimonials = await fetchPublicTestimonials();

  return (
    <Section
      className={`border-y border-mkf-border bg-[color-mix(in_oklab,var(--mkf-primary)_4%,var(--mkf-bg))] ${className}`}
      wideHeader
      headerAlign="center"
      eyebrow="Remembering Michael"
      eyebrowIcon={Heart}
      title="His strength lives on in this foundation"
      intro="The charity was developed in memory of our dear friend Michael Kellermann."
    >
      <div className="flex flex-col gap-12 sm:gap-14 lg:gap-16">
        <div className="w-full rounded-2xl border border-mkf-border bg-mkf-surface/90 px-6 py-10 shadow-sm sm:px-10 sm:py-12 lg:px-14 lg:py-14 dark:bg-mkf-surface/60">
          <div className="mx-auto max-w-3xl space-y-8 text-center sm:space-y-10">
            <p className="m-0 text-lg leading-relaxed text-mkf-fg sm:text-xl sm:leading-relaxed">
              He fought a battle that most people never fully understood—maybe still don’t—and although his
              battle is over, his strength lives on through this foundation.
            </p>
            <aside className="border-t-4 border-mkf-accent bg-[color-mix(in_oklab,var(--mkf-primary)_3%,var(--mkf-bg))] px-6 py-7 sm:px-8 sm:py-8">
              <p className="m-0 font-display text-lg font-medium leading-snug text-mkf-ink sm:text-xl sm:leading-snug">
                MKF is here to help all the “Michael Kellermanns” who just need someone who understands the
                battle.
              </p>
            </aside>
          </div>
        </div>

        <div className="w-full">
          <RecoveryTestimonialsCarousel testimonials={testimonials} wide />
        </div>
      </div>
    </Section>
  );
}
