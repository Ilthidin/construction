"use client";

import { Shield, Clock, Award, Handshake } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

const benefits = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "We use premium materials and follow strict quality standards to ensure lasting results.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Our efficient project management keeps every milestone on schedule.",
  },
  {
    icon: Award,
    title: "Expert Craftsmanship",
    description: "Our skilled team brings decades of experience to every project detail.",
  },
  {
    icon: Handshake,
    title: "Transparent Communication",
    description: "Stay informed at every stage with regular updates and honest reporting.",
  },
];

export function ProjectBenefits() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Why Choose Us"
          title="Benefits of Working With Us"
          description="We deliver excellence at every step of the construction process."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <AnimatedSection key={benefit.title} delay={index * 0.1} direction="up">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-primary">
                    {benefit.title}
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-muted">
                    {benefit.description}
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
