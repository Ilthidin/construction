"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MissionSection } from "@/components/about/MissionSection";
import { companyStats } from "@/data/team";

/**
 * About page - Full about section for the Hedgar Construction showcase site.
 *
 * Renders a hero banner, mission & values, team members grid, company story,
 * and a company statistics bar.
 *
 * @returns {JSX.Element} The complete About page.
 */
export default function AboutPage() {
  const stats = [
    { number: `${companyStats.projectsCompleted}+`, label: "Projects Completed" },
    { number: `${companyStats.employees}+`, label: "Team Members" },
    { number: `${companyStats.statesServed}`, label: "States Covered" },
    { number: "20+", label: "Years Experience" },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <Image
          src="/assets/images/hero-bg.jpg"
          alt="Hedgar Construction team at work"
          fill
          sizes="100vw"
          quality={60}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />

        <div className="relative z-10 px-4 text-center">
          <AnimatedSection>
            <h1 className="text-3xl font-bold break-words text-white sm:text-4xl md:text-5xl lg:text-6xl">
              About Hedgar Construction
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Building tomorrow&apos;s landmarks with integrity, innovation,
              and precision.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Values */}
      <MissionSection />

      {/* Stats Bar */}
      <section className="border-y border-white/10 bg-primary py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {stats.map((stat, index) => (
              <AnimatedSection
                key={stat.label}
                delay={index * 0.1}
                direction="up"
              >
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

      {/* Company Story */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <AnimatedSection direction="left">
              <div className="relative h-80 overflow-hidden rounded-2xl lg:h-[28rem]">
                <Image
                  src="/assets/images/about-hero.jpg"
                  alt="Hedgar Construction history"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={60}
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            {/* Story text */}
            <div>
              <AnimatedSection>
                <SectionHeader
                  subtitle="Our Story"
                  title="A Legacy of Excellence"
                  center={false}
                />
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
                  Founded in {companyStats.founded}, Hedgar Construction started
                  as a small family-run firm with a big vision — to deliver
                  construction services that set new benchmarks for quality and
                  reliability.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  Over two decades later, we have grown into one of the most
                  respected names in the industry, completing over{" "}
                  {companyStats.projectsCompleted} projects across{" "}
                  {companyStats.statesServed} states while staying true to the
                  values that built our reputation.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  Today, our team of {companyStats.employees}+ professionals
                  continues to push the boundaries of what&apos;s possible —
                  blending time-tested craftsmanship with cutting-edge technology
                  to shape the spaces where communities thrive.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}
