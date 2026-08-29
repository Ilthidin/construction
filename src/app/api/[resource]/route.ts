/**
 * Collection route handler for a resource (projects, services, awards, blog,
 * team). GET lists the collection publicly; POST creates a new record and
 * requires an admin session.
 * @module app/api/[resource]
 */

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { entityConfigs, isResourceName } from "@/lib/entities";
import { isAdmin } from "@/lib/session";

type RouteContext = { params: Promise<{ resource: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { resource } = await params;
  if (!isResourceName(resource)) {
    return NextResponse.json({ error: "Unknown resource." }, { status: 404 });
  }

  const config = entityConfigs[resource];
  const supabase = createServerClient();
  let query = supabase
    .from(config.table)
    .select("*")
    .order("created_at", { ascending: true });

  if (resource === "blog" && !(await isAdmin())) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const fromDb = config.fromDb ?? ((row) => row);
  return NextResponse.json((data ?? []).map(fromDb));
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { resource } = await params;
  if (!isResourceName(resource)) {
    return NextResponse.json({ error: "Unknown resource." }, { status: 404 });
  }
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const config = entityConfigs[resource];
  const body = await request.json().catch(() => null);
  const result = config.validate(body ?? {});
  if (!result.ok) {
    return NextResponse.json({ error: result.errors.join(" ") }, { status: 400 });
  }

  const supabase = createServerClient();
  const row = (config.toDb ?? ((data) => data))(result.data);

  const { data: existing } = await supabase
    .from(config.table)
    .select("id")
    .eq("id", row.id)
    .maybeSingle();
  if (existing) {
    return NextResponse.json(
      { error: `A ${config.singular.toLowerCase()} with this slug already exists.` },
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from(config.table)
    .insert(row)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const fromDb = config.fromDb ?? ((r) => r);
  return NextResponse.json(fromDb(data), { status: 201 });
}
