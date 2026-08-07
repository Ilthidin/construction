/**
 * Configuration for each content section, consumed by the generic
 * EntityManager pages.
 * @module components/admin/entityConfigs
 */

import type { Project } from "@/data/projects";
import type { Service } from "@/data/services";
import type { Award } from "@/data/awards";
import type { BlogPost } from "@/data/blog";
import type { TeamMember } from "@/data/team";
import { projects as projectsFallback } from "@/data/projects";
import { services as servicesFallback } from "@/data/services";
import { awards as awardsFallback } from "@/data/awards";
import { blogPosts as blogPostsFallback } from "@/data/blog";
import { teamMembers as teamMembersFallback } from "@/data/team";
import {
  projectFields,
  serviceFields,
  awardFields,
  blogFields,
  teamFields,
} from "@/components/admin/entityFields";
import type { EntityManagerConfig } from "@/components/admin/EntityManager";

function FeaturedBadge({ value }: { value: unknown }) {
  if (value !== true) return <span className="text-muted">No</span>;
  return (
    <span className="inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent-dark">
      Yes
    </span>
  );
}

export const projectsConfig: EntityManagerConfig<Project> = {
  resource: "projects",
  singular: "Project",
  plural: "Projects",
  description: "Portfolio projects shown on the Projects page.",
  fields: projectFields,
  editHrefPrefix: "/admin/projects",
  fallback: projectsFallback,
  deleteLabel: (row) => row.title,
  columns: [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "year", label: "Year" },
    {
      key: "featured",
      label: "Featured",
      render: (value) => <FeaturedBadge value={value} />,
    },
  ],
};

export const servicesConfig: EntityManagerConfig<Service> = {
  resource: "services",
  singular: "Service",
  plural: "Services",
  description: "Service offerings shown on the Services page.",
  fields: serviceFields,
  editHrefPrefix: "/admin/services",
  fallback: servicesFallback,
  deleteLabel: (row) => row.title,
  columns: [
    { key: "title", label: "Title" },
    { key: "icon", label: "Icon" },
  ],
};

export const awardsConfig: EntityManagerConfig<Award> = {
  resource: "awards",
  singular: "Award",
  plural: "Awards",
  description: "Recognition shown on the Awards page.",
  fields: awardFields,
  editHrefPrefix: "/admin/awards",
  fallback: awardsFallback,
  deleteLabel: (row) => row.title,
  columns: [
    { key: "title", label: "Title" },
    { key: "organization", label: "Organization" },
    { key: "year", label: "Year" },
    { key: "category", label: "Category" },
  ],
};

export const blogConfig: EntityManagerConfig<BlogPost> = {
  resource: "blog",
  singular: "Blog Post",
  plural: "Blog Posts",
  description: "Articles for the blog section.",
  fields: blogFields,
  editHrefPrefix: "/admin/blog",
  fallback: blogPostsFallback,
  deleteLabel: (row) => row.title,
  columns: [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
  ],
};

export const teamConfig: EntityManagerConfig<TeamMember> = {
  resource: "team",
  singular: "Team Member",
  plural: "Team Members",
  description: "Team members shown on the About page.",
  fields: teamFields,
  editHrefPrefix: "/admin/team",
  fallback: teamMembersFallback,
  deleteLabel: (row) => row.name,
  columns: [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
  ],
};
