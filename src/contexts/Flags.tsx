/**
 * Client-side flags shared across the root layout. Used to let the Navbar know
 * when the currently rendered page is the global not-found page, so it can
 * switch to the "dark text" (scrolled-like) styling that suits the light 404
 * background.
 * @module contexts/Flags
 */

"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface FlagsContextValue {
  isNotFound: boolean;
  setNotFound: (value: boolean) => void;
}

const FlagsContext = createContext<FlagsContextValue | undefined>(undefined);

export function FlagsProvider({ children }: { children: ReactNode }) {
  const [isNotFound, setIsNotFound] = useState(false);

  const value: FlagsContextValue = {
    isNotFound,
    setNotFound: (value) => setIsNotFound(value),
  };

  return (
    <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>
  );
}

/**
 * Sets the not-found flag (called by the not-found page).
 */
export function useSetNotFound() {
  const ctx = useContext(FlagsContext);
  if (!ctx) throw new Error("useSetNotFound must be used within FlagsProvider");
  return ctx.setNotFound;
}

/**
 * Reads the not-found flag (called by the Navbar or Footer).
 */
export function useIsNotFound() {
  const ctx = useContext(FlagsContext);
  if (!ctx) throw new Error("useIsNotFound must be used within FlagsProvider");
  return ctx.isNotFound;
}
