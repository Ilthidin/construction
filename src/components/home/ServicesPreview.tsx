"use client";

import Image from "next/image";
import { Building2, Home, Landmark, Hammer } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useCollection } from "@/hooks/useCollection";
import { services as fallbackServices, type Service } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Home,
  Landmark,
  Hammer,
};

/**
 * Services preview section for the home page.
 * Displays a grid of service cards with images, icons, descriptions,
 * and feature lists. Cards have hover effects and staggered animations.
 *
 * @returns {JSX.Element} The services preview section component
 */
export function ServicesPreview() {
  const { data: services } = useCollection<Service>("services", fallbackServices);

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            subtitle="What We Do"
            title="Our Services"
            center
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Building2;

            return (
              <AnimatedSection key={service.id} delay={index * 0.1} direction="up">
                <div className="group h-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      quality={60}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-primary">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      {service.description}
                    </p>
                    {service.features && (
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center text-xs text-gray-500"
                          >
                            <span className="mr-2 h-1 w-1 rounded-full bg-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <Button variant="primary" size="md" href="/services">
            Explore All Services
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
