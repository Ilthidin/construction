"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { companyStats } from "@/data/team";

/**
 * Statistics section for the home page.
 * Displays key company metrics in a clean, responsive grid
 * with a dark background and accent-colored numbers.
 *
 * @returns {JSX.Element} The stats section component
 */
export function Stats() {
  const stats = [
    { number: `${companyStats.projectsCompleted}+`, label: "Projects Completed" },
    { number: `${companyStats.employees}+`, label: "Team Members" },
    { number: `${companyStats.statesServed}`, label: "States Covered" },
    { number: "20+", label: "Years Experience" },
  ];

  return (
    <section className="border-y border-white/10 bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.1} direction="up">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent md:text-5xl">
                  {stat.number}
                </div>
                <div className="mt-2 text-sm uppercase tracking-wider text-white/70">
                  {stat.label}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
