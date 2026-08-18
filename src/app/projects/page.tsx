"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { ProjectBenefits } from "@/components/projects/ProjectBenefits";
import { ProjectCTA } from "@/components/projects/ProjectCTA";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCollection } from "@/hooks/useCollection";
import { projects as fallbackProjects, type Category, type Project } from "@/data/projects";

/**
 * The Projects page displays a hero banner followed by a filterable grid
 * of construction projects sourced from the centralised project data.
 *
 * Categories can be filtered with the {@link ProjectFilter} bar and the
 * grid transitions smoothly via Framer Motion layout animations.
 */
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { data: projects, loading } = useCollection<Project>("projects", fallbackProjects);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Projects
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Explore our portfolio of completed and ongoing construction projects
          </p>
        </div>
      </section>

      {/* ── Benefits Section ───────────────────────────────────── */}
      <ProjectBenefits />

      {/* ── Projects Section ────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <SectionHeader
          subtitle="Portfolio"
          title="Project Gallery"
        />

        <div className="mb-10">
          <ProjectFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            <p className="col-span-full py-12 text-center text-muted">
              Loading projects…
            </p>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onSelect={setSelectedProject}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────── */}
      <ProjectCTA />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
