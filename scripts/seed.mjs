/**
 * Seeds the Supabase database from the bundled static data files.
 * Run with: npm run seed
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local (see
 * .env.example). Idempotent: existing rows are overwritten by id.
 */

import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { projects } from "../src/data/projects.ts";
import { services } from "../src/data/services.ts";
import { awards } from "../src/data/awards.ts";
import { blogPosts } from "../src/data/blog.ts";
import { teamMembers } from "../src/data/team.ts";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed
        .slice(eq + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}

function blogRows() {
  return blogPosts.map(({ readTime, ...rest }) => ({
    ...rest,
    read_time: readTime,
  }));
}

loadEnv();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Copy .env.example to .env.local and fill in the values."
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const datasets = [
  { table: "projects", rows: projects },
  { table: "services", rows: services },
  { table: "awards", rows: awards },
  { table: "blog_posts", rows: blogRows() },
  { table: "team_members", rows: teamMembers },
];

let failed = false;

for (const { table, rows } of datasets) {
  if (rows.length === 0) {
    console.log(`Skipping ${table} (no data)`);
    continue;
  }
  const { error } = await supabase.from(table).upsert(rows, {
    onConflict: "id",
  });
  if (error) {
    failed = true;
    console.error(`Failed to seed ${table}:`, error.message);
  } else {
    console.log(`Seeded ${table} (${rows.length} records)`);
  }
}

if (failed) {
  console.error("Seed finished with errors.");
  process.exit(1);
}

console.log("Done. All tables up to date.");
