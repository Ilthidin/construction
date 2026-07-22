"use client";

import { Trophy } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Award } from "@/data/awards";

/**
 * AwardCard component displays a single award in a styled card format.
 *
 * Features:
 * - Category pill tag and year badge at the top
 * - Trophy icon in a circular accent background
 * - Award title, organization, and description
 * - Subtle accent border at the bottom
 * - Hover effect with shadow and slight upward translation
 * - Staggered animation using AnimatedSection
 *
 * @param award - The award data to display
 * @param index - The index used for staggered animation delay calculation
 * @returns A styled award card component
 */
export function AwardCard({
  award,
  index,
}: {
  award: Award;
  index: number;
}) {
  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="group relative h-full rounded-xl bg-white p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        {/* Top: Category tag + Year badge */}
        <div className="mb-6 flex items-center justify-between">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase text-accent">
            {award.category}
          </span>
          <span className="text-sm font-medium text-muted/60">
            {award.year}
          </span>
        </div>

        {/* Center: Trophy icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <Trophy className="h-8 w-8 text-accent" />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-bold text-primary">{award.title}</h3>

        {/* Organization */}
        <p className="mb-3 text-sm text-muted">{award.organization}</p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted/80">
          {award.description}
        </p>

        {/* Bottom accent border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl bg-accent/20 transition-colors duration-300 group-hover:bg-accent/40" />
      </div>
    </AnimatedSection>
  );
}
