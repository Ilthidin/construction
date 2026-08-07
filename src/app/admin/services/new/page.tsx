"use client";

import { EntityCreatePage } from "@/components/admin/EntityManager";
import { servicesConfig } from "@/components/admin/entityConfigs";

export default function AdminServicesCreatePage() {
  return <EntityCreatePage config={servicesConfig} />;
}
