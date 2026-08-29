/**
 * Proxy (formerly middleware) that protects the admin area.
 *
 * Security model (defense in depth beyond the password itself):
 * - `/admin/*` routes are hidden: requests without a valid session are
 *   answered with a 404 "Not Found" rather than being surfaced to a login
 *   page, so the existence of an admin panel is not exposed to outsiders.
 * - The login page lives at `/login/:key`, where `:key` must match the
 *   ADMIN_LOGIN_KEY environment variable. Anyone who does not know the secret
 *   key gets a 404 as well.
 * - With a valid session, `/admin/*` is served normally.
 * @module proxy
 */

import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

// Route that does not exist; rewriting the request here makes Next.js render
// the global not-found.tsx page (styled 404) instead of a raw JSON/plain
// response, so hidden paths are indistinguishable from any other missing page.
const NOT_FOUND = "/__not-found__";

// Login secret. Treats an unset/blank ADMIN_LOGIN_KEY as unconfigured and
// falls back to a known value so the panel remains reachable for setup.
const SECRET = process.env.ADMIN_LOGIN_KEY?.trim() || "admin-login-2026";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const loggedIn = await isValidSessionToken(
    request.cookies.get(SESSION_COOKIE)?.value
  );

  // Secret login entry: /login/{key}. Only serves the login page when the
  // key matches. Otherwise 404 so the endpoint is indistinguishable from a
  // missing page.
  const loginMatch = pathname.match(/^\/login\/([A-Za-z0-9_-]+)$/);
  if (loginMatch) {
    if (loggedIn) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (loginMatch[1] !== SECRET) {
      return NextResponse.rewrite(new URL(NOT_FOUND, request.url));
    }
    return NextResponse.next();
  }

  // Any other /login or /admin/* request without a session is hidden as a
  // 404 page, preventing discovery of the admin panel (including the legacy
  // /admin/login path).
  if (pathname.startsWith("/login") || !loggedIn) {
    return NextResponse.rewrite(new URL(NOT_FOUND, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login/:path*"],
};
