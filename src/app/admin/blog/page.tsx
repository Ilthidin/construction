"use client";

import { EntityListPage } from "@/components/admin/EntityManager";
import { blogConfig } from "@/components/admin/entityConfigs";

export default function AdminBlogListPage() {
  return <EntityListPage config={blogConfig} />;
}
