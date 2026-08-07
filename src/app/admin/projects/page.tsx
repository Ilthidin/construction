"use client";

import { EntityListPage } from "@/components/admin/EntityManager";
import { projectsConfig } from "@/components/admin/entityConfigs";

export default function AdminProjectsListPage() {
  return <EntityListPage config={projectsConfig} />;
}
