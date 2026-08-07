"use client";

import { EntityCreatePage } from "@/components/admin/EntityManager";
import { awardsConfig } from "@/components/admin/entityConfigs";

export default function AdminAwardsCreatePage() {
  return <EntityCreatePage config={awardsConfig} />;
}
