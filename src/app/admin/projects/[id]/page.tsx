"use client";

import { EntityEditPage } from "@/components/admin/EntityManager";
import { projectsConfig } from "@/components/admin/entityConfigs";

export default function AdminProjectsEditPage() {
  return <EntityEditPage config={projectsConfig} />;
}
