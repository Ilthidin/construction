/**
 * Server-side Supabase client.
 * Uses the service_role key, which bypasses Row Level Security, so it should
 * only ever be imported in server contexts (route handlers, server components,
 * scripts) and never shipped to the browser.
 * @module lib/supabase/server
 */

import { createClient } from "@supabase/supabase-js";

export function createServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
