/**
 * Typed client helpers for talking to the site's own API routes. Used by the
 * public pages (via the useCollection hook) and the admin panel.
 * @module lib/api
 */

import type { Project } from "@/data/projects";
import type { Service } from "@/data/services";
import type { Award } from "@/data/awards";
import type { BlogPost } from "@/data/blog";
import type { TeamMember } from "@/data/team";
import type { ResourceName } from "@/lib/entities";

export type { ResourceName };

export type Entity = Project | Service | Award | BlogPost | TeamMember;

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data && typeof data.error === "string") message = data.error;
    } catch {
      // ignore non-JSON error bodies
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  list: (resource: ResourceName) =>
    request<Entity[]>(`/api/${resource}`, { cache: "no-store" }),
  get: (resource: ResourceName, id: string) =>
    request<Entity>(`/api/${resource}/${id}`),
  create: (resource: ResourceName, data: Record<string, unknown>) =>
    request<Entity>(`/api/${resource}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (resource: ResourceName, id: string, data: Record<string, unknown>) =>
    request<Entity>(`/api/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (resource: ResourceName, id: string) =>
    request<void>(`/api/${resource}/${id}`, { method: "DELETE" }),
  login: (password: string) =>
    request<{ ok: true }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),
  logout: () =>
    request<{ ok: true }>("/api/auth/logout", { method: "POST" }),
  upload: async (resource: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("resource", resource);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) {
      let message = `Upload failed (${res.status})`;
      try {
        const data = await res.json();
        if (data && typeof data.error === "string") message = data.error;
      } catch {
        // ignore
      }
      throw new Error(message);
    }
    return res.json() as Promise<{ url: string }>;
  },
};