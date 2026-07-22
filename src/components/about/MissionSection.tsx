"use client";

import { Medal, Shield, Lightbulb, Handshake, Calendar } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { values, companyStats } from "@/data/team";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Medal,
  Shield,
  Lightbulb,
  Handshake,
};

/**
 * MissionSection - Displays the company mission statement alongside a 2×2 grid
 * of core values. The left column presents the mission heading, descriptive
 * paragraph, and a founded-year badge. The right column renders each value as
 * a card with a dynamically resolved Lucide icon, title, and description.
 *
 * Layout is single-column on mobile and two-column on desktop (lg breakpoint).
 *
 * @example
 * ```tsx
 * <MissionSection />
 * ```
 */
export function MissionSection() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Mission statement */}
          <div className="flex flex-col justify-center">
            <SectionHeader
              subtitle="Why We Exist"
              title="Our Mission"
              center={false}
            />

            <AnimatedSection delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
                To be the most trusted construction partner, delivering
                exceptional quality and innovative solutions that transform
                communities and exceed expectations.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Established
                  </p>
                  <p className="text-lg font-bold text-primary">
                    Since {companyStats.founded}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {values.map((value, index) => {
              const Icon = iconMap[value.icon];
              return (
                <AnimatedSection
                  key={value.title}
                  delay={index * 0.1}
                  direction="up"
                >
                  <div className="md:min-h-55 lg:min-h-64 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                      {Icon && <Icon className="h-6 w-6 text-accent" />}
                    </div>
                    <h3 className="mb-2 font-bold text-primary">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
