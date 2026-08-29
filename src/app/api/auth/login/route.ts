/**
 * Login endpoint. Verifies the submitted password and, on success, sets an
 * httpOnly session cookie used to protect the admin panel.
 * @module app/api/auth/login
 */

import { NextResponse, type NextRequest } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  verifyPassword,
} from "@/lib/auth";

// Simple in-memory rate limiter to deter password brute-forcing. Keyed by the
// client IP. Note: in a serverless/multi-instance deployment this state is not
// shared across instances, so it is a basic deterrent rather than a hard
// guarantee (a distributed limiter would need an external store).
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const attempts = new Map<string, { count: number; firstAt: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now - entry.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAt: now });
    return false;
  }

  if (entry.count >= MAX_ATTEMPTS) return true;

  entry.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password is not configured." },
      { status: 500 }
    );
  }

  if (!password || !(await verifyPassword(password))) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
