/**
 * Shared admin login form. Verifies the admin password against
 * /api/auth/login and redirects to the dashboard on success.
 * @module components/admin/LoginForm
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { api } from "@/lib/api";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.login(password);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-lg">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
          <Lock className="h-6 w-6 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
        <p className="mt-1 text-sm text-muted">
          Enter the admin password to manage site content.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-primary">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-muted shadow-sm transition-colors hover:border-accent hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to main page
      </Link>
    </div>
  );
}
