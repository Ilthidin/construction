"use client";

import Image from "next/image";
import { MapPin, Maximize, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Project } from "@/data/projects";

/**
 * A card component that displays a single construction project with an image,
 * overlay metadata, summary details, and a hover-zoom effect.
 *
 * @param project - The project data to render inside the card.
 * @param index   - Position index used to stagger the entrance animation.
 * @param onSelect - Callback when the card is clicked to open the modal.
 */
export function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect?: (project: Project) => void;
}) {
  return (
    <AnimatedSection direction="up" delay={index * 0.1}>
      <div
        onClick={() => onSelect?.(project)}
        className="group/card rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
      >
        {/* Image section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Category tag & year */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-white">
              {project.category}
            </span>
          </div>
          <span className="absolute top-4 right-4 text-xs font-medium text-white/80">
            {project.year}
          </span>
        </div>

        {/* Content section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary mb-1">
            {project.title}
          </h3>

          <div className="flex items-center gap-1 text-muted text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>

          <p className="text-muted text-sm line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Bottom meta row */}
        <div className="px-6 pb-6 flex items-center gap-4 text-sm text-muted">
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{project.area}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{project.duration}</span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
