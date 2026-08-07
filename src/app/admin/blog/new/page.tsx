"use client";

import { EntityCreatePage } from "@/components/admin/EntityManager";
import { blogConfig } from "@/components/admin/entityConfigs";

export default function AdminBlogCreatePage() {
  return <EntityCreatePage config={blogConfig} />;
}
