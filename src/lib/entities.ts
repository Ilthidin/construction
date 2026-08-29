/**
 * Entity registry that maps a public resource name to its database table and
 * validation rules. This is the single source of truth shared by the API route
 * handlers, the admin forms, and the client helpers.
 * @module lib/entities
 */

export type ResourceName = "projects" | "services" | "awards" | "blog";

export const resourceNames: ResourceName[] = [
  "projects",
  "services",
  "awards",
  "blog",
];

export function isResourceName(value: string): value is ResourceName {
  return (resourceNames as string[]).includes(value);
}

/**
 * Converts a title (or any string) into a URL-friendly slug used as the row id.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]+/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ValidationResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; errors: string[] };

export interface EntityConfig {
  table: string;
  singular: string;
  plural: string;
  validate: (input: Record<string, unknown>) => ValidationResult;
  /** Transform validated API-shape data into the database row shape. */
  toDb?: (data: Record<string, unknown>) => Record<string, unknown>;
  /** Transform a database row into the API response shape. */
  fromDb?: (row: Record<string, unknown>) => Record<string, unknown>;
}

function str(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

function bool(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === "1";
}

function strArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => str(item).trim())
      .filter((item) => item.length > 0);
  }
  if (typeof value === "string") {
    return value
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }
  return [];
}

function commonValidation(input: Record<string, unknown>): {
  id: string;
  title: string;
  errors: string[];
} {
  const errors: string[] = [];
  const title = str(input.title).trim();
  const id = str(input.id).trim() || slugify(title);
  if (!title) errors.push("Title is required");
  if (!id) errors.push("Slug is required");
  return { id, title, errors };
}

export const entityConfigs: Record<ResourceName, EntityConfig> = {
  projects: {
    table: "projects",
    singular: "Project",
    plural: "Projects",
    validate: (input) => {
      const { id, title, errors } = commonValidation(input);
      if (errors.length > 0) return { ok: false, errors };
      return {
        ok: true,
        data: {
          id,
          title,
          category: str(input.category),
          location: str(input.location),
          year: str(input.year),
          description: str(input.description),
          image: str(input.image),
          area: str(input.area),
          duration: str(input.duration),
          featured: bool(input.featured),
        },
      };
    },
  },

  services: {
    table: "services",
    singular: "Service",
    plural: "Services",
    validate: (input) => {
      const { id, title, errors } = commonValidation(input);
      if (errors.length > 0) return { ok: false, errors };
      return {
        ok: true,
        data: {
          id,
          title,
          description: str(input.description),
          icon: str(input.icon),
          image: str(input.image),
          features: strArray(input.features),
        },
      };
    },
  },

  awards: {
    table: "awards",
    singular: "Award",
    plural: "Awards",
    validate: (input) => {
      const { id, title, errors } = commonValidation(input);
      if (errors.length > 0) return { ok: false, errors };
      return {
        ok: true,
        data: {
          id,
          title,
          organization: str(input.organization),
          year: str(input.year),
          description: str(input.description),
          category: str(input.category),
          image: str(input.image),
        },
      };
    },
  },

  blog: {
    table: "blog_posts",
    singular: "Blog Post",
    plural: "Blog Posts",
    validate: (input) => {
      const { id, title, errors } = commonValidation(input);
      if (errors.length > 0) return { ok: false, errors };
      const rawStatus = str(input.status).trim();
      const status = rawStatus === "draft" ? "draft" : "published";
      return {
        ok: true,
        data: {
          id,
          title,
          excerpt: str(input.excerpt),
          image: str(input.image),
          author: str(input.author),
          date: str(input.date),
          category: str(input.category),
          readTime: str(input.readTime),
          status,
        },
      };
    },
    toDb: (data) => {
      const { readTime, ...rest } = data;
      return { ...rest, read_time: readTime };
    },
    fromDb: (row) => {
      const { read_time, ...rest } = row;
      return { ...rest, readTime: str(read_time) };
    },
  },
};
