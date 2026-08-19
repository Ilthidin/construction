"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { categories, type Category } from "@/data/projects";

/**
 * A horizontal, scrollable filter bar that lets the user select a project
 * category. The active tab is highlighted with the accent colour.
 *
 * @param activeFilter   - The currently selected category.
 * @param onFilterChange - Callback fired when the user picks a new category.
 */
export function ProjectFilter({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: Category;
  onFilterChange: (category: Category) => void;
}) {
  return (
    <AnimatedSection>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pt-4">
        {categories.map((category) => {
          const isActive = category === activeFilter;

          return (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 justify-center items-center ${
                isActive
                  ? "bg-accent text-white"
                  : "bg-surface text-primary hover:bg-surface-dark"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
