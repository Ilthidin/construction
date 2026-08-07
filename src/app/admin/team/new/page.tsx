"use client";

import { EntityCreatePage } from "@/components/admin/EntityManager";
import { teamConfig } from "@/components/admin/entityConfigs";

export default function AdminTeamCreatePage() {
  return <EntityCreatePage config={teamConfig} />;
}
