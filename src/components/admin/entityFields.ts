/**
 * Field definitions that drive the generic EntityForm for each content type.
 * The `name` must match the API-shape field names (camelCase) used by the
 * entity validators in lib/entities.ts.
 * @module components/admin/entityFields
 */

export interface FormFieldDef {
  name: string;
  label: string;
  type?: "text" | "textarea" | "checkbox" | "tags" | "select" | "image";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  help?: string;
  full?: boolean;
}

export const projectFields: FormFieldDef[] = [
  { name: "title", label: "Title", required: true, full: true },
  {
    name: "id",
    label: "Slug",
    help: "URL identifier. Leave blank to auto-generate from the title.",
  },
  { name: "category", label: "Category", required: true },
  { name: "year", label: "Year", placeholder: "e.g. 2024" },
  { name: "location", label: "Location", full: true },
  { name: "area", label: "Area", placeholder: "e.g. 320,000 sq ft" },
  { name: "duration", label: "Duration", placeholder: "e.g. 28 months" },
  { name: "image", label: "Image", type: "image", full: true },
  {
    name: "featured",
    label: "Featured",
    type: "checkbox",
    help: "Show on the home page featured section.",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    full: true,
  },
];

export const serviceFields: FormFieldDef[] = [
  { name: "title", label: "Title", required: true, full: true },
  {
    name: "id",
    label: "Slug",
    help: "URL identifier. Leave blank to auto-generate from the title.",
  },
  { name: "icon", label: "Icon", help: "Lucide icon name, e.g. Building2, Home, Landmark, Hammer." },
  { name: "image", label: "Image", type: "image", full: true },
  {
    name: "features",
    label: "Features",
    type: "tags",
    full: true,
    help: "One per line, or separated by commas.",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    full: true,
  },
];

export const awardFields: FormFieldDef[] = [
  { name: "title", label: "Title", required: true, full: true },
  {
    name: "id",
    label: "Slug",
    help: "URL identifier. Leave blank to auto-generate from the title.",
  },
  { name: "organization", label: "Organization", full: true },
  { name: "year", label: "Year", placeholder: "e.g. 2024" },
  { name: "category", label: "Category" },
  { name: "image", label: "Image", type: "image", full: true },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    full: true,
  },
];

export const blogFields: FormFieldDef[] = [
  { name: "title", label: "Title", required: true, full: true },
  {
    name: "id",
    label: "Slug",
    help: "URL identifier. Leave blank to auto-generate from the title.",
  },
  { name: "author", label: "Author" },
  { name: "date", label: "Date", placeholder: "e.g. March 15, 2024" },
  { name: "category", label: "Category" },
  { name: "readTime", label: "Read Time", placeholder: "e.g. 5 min read" },
  {
    name: "status",
    label: "Status",
    type: "select",
    help: "Draft posts are hidden from the public site until published.",
    options: ["published", "draft"],
  },
  { name: "image", label: "Image", type: "image", full: true },
  {
    name: "excerpt",
    label: "Excerpt",
    type: "textarea",
    full: true,
  },
];