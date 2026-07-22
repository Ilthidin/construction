"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";

/**
 * Featured projects section for the home page.
 * Displays a curated selection of featured projects in a grid layout
 * with hover effects and staggered animations.
 *
 * @returns {JSX.Element} The featured projects section component
 */
export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            subtitle="Our Portfolio"
            title="Featured Projects"
            center
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1} direction="up">
              <Link href={`/projects/${project.id}`} className="group block h-full">
                <div className="group h-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="mb-2 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                      {project.category}
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-primary">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {project.location} &middot; {project.year}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <Button variant="primary" size="md" href="/projects">
            View All Projects
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
