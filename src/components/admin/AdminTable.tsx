/**
 * Generic admin table that lists a collection of records with edit/delete
 * actions. Delete requires confirmation via the ConfirmDialog.
 * @module components/admin/AdminTable
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export interface TableColumn<T extends { id: string }> {
  key: string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface AdminTableProps<T extends { id: string }> {
  title: string;
  description?: string;
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  newHref: string;
  newLabel?: string;
  getEditHref: (row: T) => string;
  onDelete: (row: T) => Promise<void>;
  deleteLabel?: (row: T) => string;
}

export function AdminTable<T extends { id: string }>({
  title,
  description,
  columns,
  data,
  loading = false,
  newHref,
  newLabel = "Add New",
  getEditHref,
  onDelete,
  deleteLabel,
}: AdminTableProps<T>) {
  const [pendingDelete, setPendingDelete] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await onDelete(pendingDelete);
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-muted">{description}</p>
          )}
        </div>
        <Link
          href={newHref}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          <Plus className="h-4 w-4" />
          {newLabel}
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-3 font-semibold text-primary"
                >
                  {column.label}
                </th>
              ))}
              <th className="px-5 py-3 text-right font-semibold text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-muted">
                  Loading…
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-muted">
                  No records yet. Add your first one.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border last:border-0 hover:bg-surface/50"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-5 py-3 text-primary">
                      {column.render
                        ? column.render((row as Record<string, unknown>)[column.key], row)
                        : String((row as Record<string, unknown>)[column.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={getEditHref(row)}
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-accent-dark transition-colors hover:bg-accent/10"
                        aria-label="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(row)}
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete record?"
        message={
          pendingDelete
            ? `"${deleteLabel ? deleteLabel(pendingDelete) : pendingDelete.id}" will be permanently removed.`
            : undefined
        }
        busy={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </section>
  );
}
