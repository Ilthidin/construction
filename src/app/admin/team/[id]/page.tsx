"use client";

import { EntityEditPage } from "@/components/admin/EntityManager";
import { teamConfig } from "@/components/admin/entityConfigs";

export default function AdminTeamEditPage() {
  return <EntityEditPage config={teamConfig} />;
}
