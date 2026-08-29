/**
 * Generic list/create/edit pages for a single content type, driven by an
 * {@link EntityManagerConfig}. Individual section routes compose these.
 * @module components/admin/EntityManager
 */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminTable, type TableColumn } from "@/components/admin/AdminTable";
import { EntityForm } from "@/components/admin/EntityForm";
import { Toast, type ToastKind } from "@/components/admin/Toast";
import { useCollection } from "@/hooks/useCollection";
import { api } from "@/lib/api";
import type { FormFieldDef } from "@/components/admin/entityFields";
import type { ResourceName } from "@/lib/entities";

export interface EntityManagerConfig<T extends { id: string }> {
  resource: ResourceName;
  singular: string;
  plural: string;
  description: string;
  fields: FormFieldDef[];
  columns: TableColumn<T>[];
  fallback: T[];
  editHrefPrefix: string;
  deleteLabel?: (row: T) => string;
  /**
   * Optional renderer that shows a live preview of the current form values
   * (before saving). Receives the draft values as a partial entity.
   */
  preview?: (values: Record<string, unknown>) => React.ReactNode;
}

export function EntityListPage<T extends { id: string }>({
  config,
}: {
  config: EntityManagerConfig<T>;
}) {
  const { data, loading, refetch } = useCollection<T>(
    config.resource,
    config.fallback
  );

  return (
    <AdminTable
      title={config.plural}
      description={config.description}
      columns={config.columns}
      data={data}
      loading={loading}
      newHref={`${config.editHrefPrefix}/new`}
      newLabel={`Add ${config.singular}`}
      getEditHref={(row) => `${config.editHrefPrefix}/${row.id}`}
      onDelete={async (row) => {
        await api.remove(config.resource, row.id);
        await refetch();
      }}
      deleteLabel={config.deleteLabel}
    />
  );
}

export function EntityCreatePage<T extends { id: string }>({
  config,
}: {
  config: EntityManagerConfig<T>;
}) {
  const router = useRouter();
  const [toast, setToast] = useState<{ kind: ToastKind; message: string } | null>(
    null
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Add {config.singular}</h1>
      <p className="mt-1 text-sm text-muted">
        Create a new {config.singular.toLowerCase()} record.
      </p>

      <div className="mt-8 max-w-3xl rounded-xl border border-border bg-white p-6 shadow-sm">
        <EntityForm
          fields={config.fields}
          preview={config.preview}
          submitLabel={`Create ${config.singular}`}
          onSave={async (data) => {
            await api.create(config.resource, data);
            setToast({
              kind: "success",
              message: `${config.singular} created successfully.`,
            });
            router.push(config.editHrefPrefix);
          }}
          onCancel={() => router.push(config.editHrefPrefix)}
        />
      </div>

      {toast && (
        <Toast
          kind={toast.kind}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}

export function EntityEditPage<T extends { id: string }>({
  config,
}: {
  config: EntityManagerConfig<T>;
}) {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";

  const [initial, setInitial] = useState<Record<string, unknown> | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ kind: ToastKind; message: string } | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;

    api
      .get(config.resource, id)
      .then((item) => {
        if (!cancelled) {
          setInitial(item as unknown as Record<string, unknown>);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load the record.");
      });

    return () => {
      cancelled = true;
    };
  }, [config.resource, id]);

  if (error) {
    return (
      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (!initial) {
    return <p className="text-sm text-muted">Loading…</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Edit {config.singular}</h1>
      <p className="mt-1 text-sm text-muted">
        Update the details of this {config.singular.toLowerCase()}.
      </p>

      <div className="mt-8 max-w-3xl rounded-xl border border-border bg-white p-6 shadow-sm">
        <EntityForm
          fields={config.fields}
          initial={initial}
          preview={config.preview}
          submitLabel="Save Changes"
          onSave={async (data) => {
            await api.update(config.resource, id, data);
            setToast({
              kind: "success",
              message: `${config.singular} saved successfully.`,
            });
            router.push(config.editHrefPrefix);
          }}
          onCancel={() => router.push(config.editHrefPrefix)}
        />
      </div>

      {toast && (
        <Toast
          kind={toast.kind}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
