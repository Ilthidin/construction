"use client";

import Image from "next/image";
import { Building2, Home, Landmark, Hammer } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Service } from "@/data/services";

/**
 * Maps service icon string identifiers to their corresponding
 * Lucide React icon components.
 */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Home,
  Landmark,
  Hammer,
};

/**
 * Props for the ServiceCard component.
 */
interface ServiceCardProps {
  /** The service data to render inside the card. */
  service: Service;
  /** Position index used to control animation direction and layout order. */
  index: number;
}

/**
 * ServiceCard - A large split-layout card displaying a service with an image
 * on one side and content on the other. Even-indexed cards place the image on
 * the left, while odd-indexed cards place it on the right. Animates in from
 * the image side using AnimatedSection.
 *
 * @example
 * ```tsx
 * <ServiceCard service={services[0]} index={0} />
 * ```
 */
export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Building2;
  const isEven = index % 2 === 0;

  return (
    <AnimatedSection
      direction={isEven ? "left" : "right"}
      delay={index * 0.1}
    >
      <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm md:flex-row">
        {/* Image */}
        <div
          className={`relative h-[300px] w-full md:h-auto md:w-1/2 ${
            isEven ? "md:order-1" : "md:order-2"
          }`}
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={60}
            className={`object-cover min-h-[300px] ${
              isEven
                ? "rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                : "rounded-t-2xl md:rounded-r-2xl md:rounded-tl-none"
            }`}
          />
        </div>

        {/* Content */}
        <div
          className={`flex flex-col justify-center p-8 md:w-1/2 md:p-12 ${
            isEven ? "md:order-2" : "md:order-1"
          }`}
        >
          <Icon className="mb-4 h-12 w-12 text-accent" />
          <h3 className="mb-4 text-2xl font-bold text-primary">
            {service.title}
          </h3>
          <p className="mb-6 text-muted">{service.description}</p>
          <div className="grid grid-cols-2 gap-2">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="rounded-lg bg-surface px-3 py-1 text-sm text-primary"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
