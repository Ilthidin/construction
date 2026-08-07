"use client";

import { EntityListPage } from "@/components/admin/EntityManager";
import { servicesConfig } from "@/components/admin/entityConfigs";

export default function AdminServicesListPage() {
  return <EntityListPage config={servicesConfig} />;
}
