"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useCollection } from "@/hooks/useCollection";
import { awards as fallbackAwards, type Award } from "@/data/awards";

/**
 * AwardTimeline component displays awards in a vertical timeline layout.
 *
 * Features:
 * - Vertical gold accent line running down the center
 * - Timeline dots with accent color and white border
 * - Alternating left/right layout on desktop (md+)
 * - Single column with line on left for mobile
 * - Each item wrapped in AnimatedSection for scroll-triggered animation
 * - Responsive design with Tailwind CSS
 *
 * @returns A timeline section displaying all awards
 */
export function AwardTimeline() {
  const { data: awards } = useCollection<Award>("awards", fallbackAwards);

  return (
    <div className="relative">
      {/* Vertical line - center on desktop, left on mobile */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-accent/30 md:left-1/2 md:-translate-x-0.5" />

      <div className="space-y-8 md:space-y-12">
        {awards.map((award, index) => {
          const isLeft = index % 2 === 0;

          return (
            <AnimatedSection key={award.id} delay={index * 0.1}>
              <div
                className={`relative flex items-start pl-12 md:pl-0 ${
                  isLeft
                    ? "md:flex-row md:pr-[calc(50%+2rem)]"
                    : "md:flex-row-reverse md:pl-[calc(50%+2rem)]"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-2.5 top-6 z-10 h-4 w-4 rounded-full border-4 border-white bg-accent shadow md:left-1/2 md:-translate-x-1/2`}
                />

                {/* Card */}
                <div className="w-full rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  {/* Top row: Category + Year */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase text-accent">
                      {award.category}
                    </span>
                    <span className="text-sm font-medium text-muted/60">
                      {award.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-primary">
                    {award.title}
                  </h3>

                  {/* Organization */}
                  <p className="mb-2 text-sm text-muted">
                    {award.organization}
                  </p>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted/80">
                    {award.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
