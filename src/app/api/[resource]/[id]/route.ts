/**
 * Single-record route handler. GET reads one record publicly; PATCH updates
 * and DELETE removes a record, both requiring an admin session.
 * @module app/api/[resource]/[id]
 */

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import {
  entityConfigs,
  isResourceName,
} from "@/lib/entities";
import { isAdmin } from "@/lib/session";

type RouteContext = {
  params: Promise<{ resource: string; id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { resource, id } = await params;
  if (!isResourceName(resource)) {
    return NextResponse.json({ error: "Unknown resource." }, { status: 404 });
  }

  const config = entityConfigs[resource];
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from(config.table)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const fromDb = config.fromDb ?? ((row) => row);
  return NextResponse.json(fromDb(data));
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { resource, id } = await params;
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

  const { data, error } = await supabase
    .from(config.table)
    .update(row)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const fromDb = config.fromDb ?? ((r) => r);
  return NextResponse.json(fromDb(data));
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const { resource, id } = await params;
  if (!isResourceName(resource)) {
    return NextResponse.json({ error: "Unknown resource." }, { status: 404 });
  }
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const config = entityConfigs[resource];
  const supabase = createServerClient();
  const { error } = await supabase.from(config.table).delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
