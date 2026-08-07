"use client";

import { EntityEditPage } from "@/components/admin/EntityManager";
import { blogConfig } from "@/components/admin/entityConfigs";

export default function AdminBlogEditPage() {
  return <EntityEditPage config={blogConfig} />;
}
