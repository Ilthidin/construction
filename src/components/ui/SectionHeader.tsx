import { AnimatedSection } from "./AnimatedSection";

/**
 * Props for the SectionHeader component.
 */
export interface SectionHeaderProps {
  /** Main heading text displayed in large bold type. */
  title: string;
  /** Smaller uppercase text displayed above the title. */
  subtitle?: string;
  /** Paragraph of supporting text displayed below the title. */
  description?: string;
  /** Whether to center-align the content. Default: true. */
  center?: boolean;
  /** Whether to use light (white) text for dark backgrounds. Default: false. */
  light?: boolean;
  /** Additional CSS classes for the wrapper element. */
  className?: string;
}

/**
 * SectionHeader - A reusable section heading composed of an optional subtitle,
 * a title, and an optional description, wrapped in an AnimatedSection.
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   subtitle="About Us"
 *   title="Building the Future"
 *   description="We deliver quality construction services."
 * />
 * ```
 */
export function SectionHeader({
  title,
  subtitle,
  description,
  center = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedSection className={className}>
      <div
        className={
          center ? "mx-auto max-w-3xl text-center" : undefined
        }
      >
        {subtitle && (
          <span
            className={
              "mb-2 block text-sm uppercase tracking-widest text-accent-dark"
            }
          >
            {subtitle}
          </span>
        )}

        <h2
          className={
            `mb-4 text-3xl font-bold md:text-4xl lg:text-5xl ${
              light ? "text-white" : "text-primary"
            }`
          }
        >
          {title}
        </h2>

        {description && (
          <p
            className={
              `mx-auto max-w-2xl text-base leading-relaxed md:text-lg ${
                light ? "text-gray-300" : "text-gray-600"
              }`
            }
          >
            {description}
          </p>
        )}
      </div>
    </AnimatedSection>
  );
}
