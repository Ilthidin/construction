"use client";

import { Medal, Shield, Lightbulb, Handshake } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { values } from "@/data/team";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Medal,
  Shield,
  Lightbulb,
  Handshake,
};

/**
 * ValuesSection - A full-width dark section that showcases the company's core
 * values in a responsive horizontal layout. Each value is centred with a
 * circular accent-bordered icon, title, and description. Items animate in with
 * a staggered delay.
 *
 * Responsive behaviour: 1 column on mobile, 2 columns at md, 4 columns at lg.
 *
 * @example
 * ```tsx
 * <ValuesSection />
 * ```
 */
export function ValuesSection() {
  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Our Core"
          title="Values That Define Us"
          light
        />

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {values.map((value, index) => {
            const Icon = iconMap[value.icon];
            return (
              <AnimatedSection
                key={value.title}
                delay={index * 0.1}
                direction="up"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Circular icon */}
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent">
                    {Icon && <Icon className="h-7 w-7 text-accent" />}
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white">
                    {value.title}
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-gray-400">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
