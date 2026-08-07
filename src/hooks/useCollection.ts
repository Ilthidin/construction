/**
 * Data-fetching hook used by public pages. Loads a collection from the API and
 * falls back to the bundled static data when the API is unreachable (for
 * example when the database is not yet configured).
 * @module hooks/useCollection
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import { api, type ResourceName } from "@/lib/api";

export function useCollection<T extends { id: string }>(
  resource: ResourceName,
  fallback: T[]
) {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    api
      .list(resource)
      .then((items) => {
        if (!cancelled) {
          setData(items as unknown as T[]);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load data");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [resource, reloadKey]);

  return { data, setData, loading, error, refetch };
}