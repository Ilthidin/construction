/**
 * Generic admin form rendered from a {@link FormFieldDef} list. Handles text,
 * textarea, checkbox, tags (comma/newline separated), and select inputs, plus
 * submit/cancel actions and inline validation errors.
 * @module components/admin/EntityForm
 */

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import type { FormFieldDef } from "@/components/admin/entityFields";

interface EntityFormProps {
  fields: FormFieldDef[];
  initial?: Record<string, unknown>;
  submitLabel: string;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
  /** Optional live preview of the current (unsaved) form values. */
  preview?: (values: Record<string, unknown>) => React.ReactNode;
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
    case "image":
      return (
        <ImageUpload
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
          resource={field.name}
        />
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

const MAX_DIMENSION = 1600; // longest side in px
const WEBP_QUALITY = 0.82;

/**
 * Compresses an image in the browser using the Canvas API. Resizes the longest
 * side down to {@link MAX_DIMENSION} and re-encodes to WebP at
 * {@link WEBP_QUALITY}. Animated GIFs are returned unchanged to preserve
 * animation.
 */
async function compressImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file;

  const isPng = file.type === "image/png";
  const bitmap = await createImageBitmap(file);

  const scale =
    Math.max(bitmap.width, bitmap.height) > MAX_DIMENSION
      ? MAX_DIMENSION / Math.max(bitmap.width, bitmap.height)
      : 1;
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }

  if (isPng) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY)
  );
  if (!blob) return file;

  const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${baseName}.webp`, { type: "image/webp" });
}

function ImageUpload({
  value,
  onChange,
  resource,
}: {
  value: string;
  onChange: (value: unknown) => void;
  resource: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [compressing, setCompressing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File) {
    setError(null);
    setCompressing(true);
    let compressed = file;
    try {
      compressed = await compressImage(file);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Image compression failed."
      );
      setCompressing(false);
      return;
    }
    setCompressing(false);

    setUploading(true);
    try {
      const { url } = await api.upload(resource, compressed);
      onChange(url);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-3">
      {value && (
        <div className="relative overflow-hidden rounded-lg border border-border">
          <Image
            src={value}
            alt="Preview"
            width={800}
            height={400}
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              onChange("");
              setError(null);
            }}
            className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white transition-colors hover:bg-black/80"
          >
            Remove
          </button>
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors",
          dragOver
            ? "border-accent bg-accent/5"
            : "border-border hover:border-accent/50 hover:bg-surface"
        )}
      >
        {compressing ? (
          <p className="text-sm text-muted">Compressing…</p>
        ) : uploading ? (
          <p className="text-sm text-muted">Uploading…</p>
        ) : (
          <>
            <p className="text-sm text-muted">
              Click or drag to upload an image
            </p>
            <p className="text-xs text-muted/60">
              JPG, PNG, WebP, GIF — auto-compressed on upload
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={onSelect}
        className="hidden"
      />

      {error && (
        <p
          className={cn(
            "text-xs",
            error.startsWith("Warning")
              ? "text-yellow-600"
              : "text-red-600"
          )}
        >
          {error}
        </p>
      )}

      {!value && !uploading && (
        <input
          type="text"
          placeholder="Or paste an image URL…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        />
      )}
    </div>
  );
}

export function EntityForm({
  fields,
  initial,
  submitLabel,
  onSave,
  onCancel,
  preview,
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
  const [showPreview, setShowPreview] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function setValue(name: string, value: unknown) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const newErrors: Record<string, string> = {};
    for (const field of fields) {
      if (!field.required) continue;
      const value = values[field.name];
      const empty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "");
      if (empty) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setSaving(true);
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
    <div className="space-y-6">
      {preview && (
        <div className="rounded-lg border border-border bg-surface p-4">
          <button
            type="button"
            onClick={() => setShowPreview((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface"
          >
            <Eye className="h-4 w-4" />
            {showPreview ? "Hide preview" : "Preview"}
          </button>
          {showPreview && (
            <div className="mt-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
                Preview (not yet saved)
              </p>
              <div className="mx-auto max-w-sm">{preview(values)}</div>
            </div>
          )}
        </div>
      )}

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
              {fieldErrors[field.name] && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors[field.name]}
                </p>
              )}
              {!fieldErrors[field.name] && field.help && (
                <p className="mt-1 text-xs text-muted">{field.help}</p>
              )}
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
    </div>
  );
}
