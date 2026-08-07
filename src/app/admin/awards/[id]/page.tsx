"use client";

import { EntityEditPage } from "@/components/admin/EntityManager";
import { awardsConfig } from "@/components/admin/entityConfigs";

export default function AdminAwardsEditPage() {
  return <EntityEditPage config={awardsConfig} />;
}
