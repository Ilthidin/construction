/**
 * Secret admin login page, served at /login/:key. The key is validated by the
 * route itself AND by the proxy middleware; an invalid key yields a 404. After
 * a successful login the admin is redirected to the dashboard (/admin).
 * @module app/login/[key]
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in | Hedgar Construction",
  robots: { index: false, follow: false },
};

const SECRET = process.env.ADMIN_LOGIN_KEY?.trim() || "admin-login-2026";

export default async function SecretLoginPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;

  if (key !== SECRET) {
    notFound();
  }

  return <LoginForm />;
}
