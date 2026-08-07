"use client";

import { EntityListPage } from "@/components/admin/EntityManager";
import { awardsConfig } from "@/components/admin/entityConfigs";

export default function AdminAwardsListPage() {
  return <EntityListPage config={awardsConfig} />;
}
