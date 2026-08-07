"use client";

import { EntityListPage } from "@/components/admin/EntityManager";
import { teamConfig } from "@/components/admin/entityConfigs";

export default function AdminTeamListPage() {
  return <EntityListPage config={teamConfig} />;
}
