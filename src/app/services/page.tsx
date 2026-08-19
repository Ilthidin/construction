"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { useCollection } from "@/hooks/useCollection";
import { services as fallbackServices, type Service } from "@/data/services";

/**
 * Services page for the construction showcase website.
 * Renders a hero banner, service cards grid, detailed alternating
 * service breakdown rows, and a closing CTA section.
 *
 * @returns {JSX.Element} The services page component
 */
export default function ServicesPage() {
  const { data: services } = useCollection<Service>("services", fallbackServices);

  return (
    <>
      {/* Hero section */}
      <section className="relative flex h-[40vh] min-h-[300px] items-center justify-center overflow-hidden">
        <Image
          src="/assets/images/service-4.jpg"
          alt="Our services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4 text-center">
          <AnimatedSection direction="up">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Our Services
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Delivering excellence across every facet of construction — from
              commercial builds to historic restorations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services cards section */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              subtitle="Expertise"
              title="What We Offer"
              center
            />
          </AnimatedSection>

          <div className="mt-16 space-y-12">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-24">
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed service breakdown */}
      <div>
        {services.map((service, index) => (
          <ServiceDetail
            key={service.id}
            service={service}
            index={index}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>

      {/* CTA section */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              Need a Custom Solution?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Every project is unique. Let our team design a tailored plan that
              meets your specific requirements and budget.
            </p>
            <div className="mt-10">
              <Button variant="primary" size="lg" href="/contact">
                Contact Us
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
