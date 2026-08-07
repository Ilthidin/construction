/**
 * Admin dashboard. Shows a summary card per content section with the current
 * record count and a link to manage each section.
 * @module app/admin
 */

"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  FolderKanban,
  Newspaper,
  Users,
  Wrench,
} from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { type Entity } from "@/lib/api";
import type { ResourceName } from "@/lib/entities";
import { projects as projectsFallback } from "@/data/projects";
import { services as servicesFallback } from "@/data/services";
import { awards as awardsFallback } from "@/data/awards";
import { blogPosts as blogPostsFallback } from "@/data/blog";
import { teamMembers as teamMembersFallback } from "@/data/team";

const sections: {
  resource: ResourceName;
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fallback: Entity[];
}[] = [  {
    resource: "projects",
    href: "/admin/projects",
    label: "Projects",
    description: "Portfolio projects shown on the Projects page.",
    icon: FolderKanban,
    fallback: projectsFallback,
  },
  {
    resource: "services",
    href: "/admin/services",
    label: "Services",
    description: "Service offerings shown on the Services page.",
    icon: Wrench,
    fallback: servicesFallback,
  },
  {
    resource: "awards",
    href: "/admin/awards",
    label: "Awards",
    description: "Recognition and awards shown on the Awards page.",
    icon: Award,
    fallback: awardsFallback,
  },
  {
    resource: "blog",
    href: "/admin/blog",
    label: "Blog Posts",
    description: "Articles for the blog section.",
    icon: Newspaper,
    fallback: blogPostsFallback,
  },
  {
    resource: "team",
    href: "/admin/team",
    label: "Team Members",
    description: "Team shown on the About page.",
    icon: Users,
    fallback: teamMembersFallback,
  },
];

function SectionCard({
  section,
}: {
  section: (typeof sections)[number];
}) {
  const { data, loading } = useCollection(section.resource, section.fallback);
  const Icon = section.icon;

  return (
    <Link
      href={section.href}
      className="group rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <span className="flex items-center gap-1 text-sm font-medium text-muted transition-colors group-hover:text-accent">
          Manage
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-primary">{section.label}</h3>
      <p className="mt-1 text-sm text-muted">{section.description}</p>
      <p className="mt-4 text-sm text-primary">
        {loading ? "Loading…" : `${data.length} record${data.length === 1 ? "" : "s"}`}
      </p>
    </Link>
  );
}

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Manage the content displayed across the site.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <SectionCard key={section.resource} section={section} />
        ))}
      </div>
    </div>
  );
}
