"use client";

import { EntityCreatePage } from "@/components/admin/EntityManager";
import { projectsConfig } from "@/components/admin/entityConfigs";

export default function AdminProjectsCreatePage() {
  return <EntityCreatePage config={projectsConfig} />;
}
