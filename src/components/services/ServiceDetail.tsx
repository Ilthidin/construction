"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Service } from "@/data/services";

/**
 * Predefined stats displayed for each service row, indexed by
 * the service's position in the services array.
 */
const serviceStats: Record<number, { label: string; value: string }[]> = {
  0: [
    { label: "Projects Completed", value: "150+" },
    { label: "On-Time Delivery", value: "99%" },
    { label: "Client Satisfaction", value: "98%" },
  ],
  1: [
    { label: "Homes Built", value: "200+" },
    { label: "Happy Families", value: "500+" },
    { label: "Energy Efficiency", value: "40%" },
  ],
  2: [
    { label: "Miles of Road", value: "300+" },
    { label: "Bridges Built", value: "45" },
    { label: "Infrastructure Lifespan", value: "50yr" },
  ],
  3: [
    { label: "Restorations", value: "80+" },
    { label: "Heritage Sites", value: "25" },
    { label: "Cost Savings", value: "30%" },
  ],
};

/**
 * Props for the ServiceDetail component.
 */
interface ServiceDetailProps {
  /** The service data to render in the detailed breakdown. */
  service: Service;
  /** Position index used to stagger animations and select stats. */
  index: number;
  /** When true the layout is reversed (image on right, content on left). */
  isReversed: boolean;
}

/**
 * ServiceDetail - A full-width alternating row layout that provides a deep
 * breakdown of a single service. Each row features a large background image
 * with a dark overlay, a stats row, and a feature checklist.
 *
 * @example
 * ```tsx
 * <ServiceDetail service={services[0]} index={0} isReversed={false} />
 * ```
 */
export function ServiceDetail({
  service,
  index,
  isReversed,
}: ServiceDetailProps) {
  const stats = serviceStats[index] ?? serviceStats[0];

  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div
          className={`flex flex-col items-center gap-12 ${
            isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          {/* Text content */}
          <AnimatedSection
            direction={isReversed ? "right" : "left"}
            className="w-full lg:w-1/2"
          >
            <span className="mb-2 block text-sm uppercase tracking-widest text-accent">
              0{index + 1}
            </span>
            <h3 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              {service.title}
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-white/70">
              {service.description}
            </p>

            {/* Feature checklist */}
            <ul className="space-y-3">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-white/90"
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Stats grid */}
          <AnimatedSection
            direction={isReversed ? "left" : "right"}
            delay={0.2}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                >
                  <span className="block text-3xl font-bold text-accent md:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-sm text-white/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
