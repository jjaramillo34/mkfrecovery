import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "./container";
import {
  SectionHeader,
  type SectionHeaderAlign,
  type SectionHeaderVariant,
} from "./section-header";

export { SectionHeader, type SectionHeaderAlign, type SectionHeaderVariant } from "./section-header";

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  eyebrow,
  eyebrowIcon,
  title,
  intro,
  wideHeader = false,
  /** Forwarded to `SectionHeader` as `variant` */
  headerVariant,
  /** Center the title block in the `max-w-7xl` container; section body stays full width of the container. */
  headerAlign,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  eyebrow?: string;
  /** Shown with the gradient bar; pair with an `eyebrow` label. */
  eyebrowIcon?: LucideIcon;
  title?: string;
  intro?: string;
  /** @deprecated use `headerVariant="wide"` */
  wideHeader?: boolean;
  /** Overrides `wideHeader` when set */
  headerVariant?: SectionHeaderVariant;
  headerAlign?: SectionHeaderAlign;
}) {
  const variant: SectionHeaderVariant = headerVariant ?? (wideHeader ? "wide" : "default");

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container className={containerClassName}>
        {(eyebrow || title || intro) && (
          <SectionHeader
            eyebrow={eyebrow}
            eyebrowIcon={eyebrowIcon}
            title={title}
            intro={intro}
            variant={variant}
            align={headerAlign}
          />
        )}
        {children}
      </Container>
    </section>
  );
}
