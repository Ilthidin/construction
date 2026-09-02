"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { useCollection } from "@/hooks/useCollection";
import { projects as fallbackProjects, type Project } from "@/data/projects";

const PROJECTS_PER_VIEW = 3;

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const { data: projects } = useCollection<Project>("projects", fallbackProjects);
  const featuredProjects = projects.filter((project) => project.featured);

  const totalPages = Math.ceil(featuredProjects.length / PROJECTS_PER_VIEW);
  const currentProjects = featuredProjects.slice(
    page * PROJECTS_PER_VIEW,
    page * PROJECTS_PER_VIEW + PROJECTS_PER_VIEW
  );

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setPage((prev) => {
      const next = prev + newDirection;
      if (next < 0) return totalPages - 1;
      if (next >= totalPages) return 0;
      return next;
    });
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

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

        <div className="relative mt-12">
          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute -left-8 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:bg-accent hover:text-white hover:shadow-xl md:-left-16"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute -right-8 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:bg-accent hover:text-white hover:shadow-xl md:-right-16"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {currentProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group block h-full cursor-pointer"
                  >
                    <div className="group h-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={60}
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
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > page ? 1 : -1);
                    setPage(i);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === page
                      ? "w-8 bg-accent"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <Button variant="primary" size="md" href="/projects">
            View All Projects
          </Button>
        </AnimatedSection>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
