"use client";

import { useEffect } from "react";
import { useSetNotFound } from "@/contexts/Flags";

/**
 * Mounted by the global not-found page to tell the Navbar/Footer that the
 * current route is a 404, so the Navbar switches to its dark-text styling.
 */
export function NotFoundMarker() {
  const setNotFound = useSetNotFound();
  useEffect(() => {
    setNotFound(true);
  }, [setNotFound]);
  return null;
}
