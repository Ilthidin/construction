"use client";

import { EntityEditPage } from "@/components/admin/EntityManager";
import { servicesConfig } from "@/components/admin/entityConfigs";

export default function AdminServicesEditPage() {
  return <EntityEditPage config={servicesConfig} />;
}
