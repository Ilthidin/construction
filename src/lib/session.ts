/**
 * Server-side session helper that reads the session cookie from the incoming
 * request. Only import from server contexts (route handlers).
 * @module lib/session
 */

import { cookies } from "next/headers";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

/**
 * Returns true when the current request carries a valid admin session.
 */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}
