/**
 * Generic admin form rendered from a {@link FormFieldDef} list. Handles text,
 * textarea, checkbox, tags (comma/newline separated), and select inputs, plus
 * submit/cancel actions and inline validation errors.
 * @module components/admin/EntityForm
 */

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FormFieldDef } from "@/components/admin/entityFields";

interface EntityFormProps {
  fields: FormFieldDef[];
  initial?: Record<string, unknown>;
  submitLabel: string;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

const inputClasses =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/30";

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FormFieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          id={field.name}
          required={field.required}
          rows={4}
          placeholder={field.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClasses, "resize-y")}
        />
      );
    case "checkbox":
      return (
        <input
          id={field.name}
          type="checkbox"
          checked={value === true}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 rounded border-border text-accent accent-[var(--color-accent)]"
        />
      );
    case "tags": {
      const text = Array.isArray(value) ? value.join(", ") : "";
      return (
        <textarea
          id={field.name}
          rows={3}
          placeholder={field.placeholder ?? "one, two, three"}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClasses, "resize-y")}
        />
      );
    }
    case "select":
      return (
        <select
          id={field.name}
          required={field.required}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        >
          <option value="">Select an option…</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          id={field.name}
          type="text"
          required={field.required}
          placeholder={field.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        />
      );
  }
}

export function EntityForm({
  fields,
  initial,
  submitLabel,
  onSave,
  onCancel,
}: EntityFormProps) {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const out: Record<string, unknown> = {};
    for (const field of fields) {
      const value = initial?.[field.name];
      if (field.type === "checkbox") {
        out[field.name] = value === true || value === "true" || value === "1";
      } else {
        out[field.name] = value ?? "";
      }
    }
    return out;
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function setValue(name: string, value: unknown) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: Record<string, unknown> = {};
      for (const field of fields) {
        let value = values[field.name];
        if (field.type === "tags" && typeof value === "string") {
          value = value
            .split(/[\n,]+/)
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
        }
        payload[field.name] = value;
      }
      await onSave(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={cn(field.full && "md:col-span-2")}>
            <label
              htmlFor={field.name}
              className="mb-1.5 block text-sm font-medium text-primary"
            >
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            <FieldInput
              field={field}
              value={values[field.name]}
              onChange={(value) => setValue(field.name, value)}
            />
            {field.help && <p className="mt-1 text-xs text-muted">{field.help}</p>}
          </div>
        ))}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="inline-flex items-center justify-center rounded-lg border-2 border-border px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
