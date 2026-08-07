/**
 * Lightweight session authentication for the admin panel.
 *
 * A session is a base64url-encoded JSON payload (`{ exp }`) signed with an
 * HMAC-SHA256 derived from the `ADMIN_PASSWORD` environment variable. The
 * token is stored in an httpOnly cookie and verified on every request.
 *
 * This module is isomorphic: it only uses Web Crypto (`crypto.subtle`) and
 * global helpers, so it works in both the Edge runtime (middleware) and the
 * Node.js runtime (route handlers).
 * @module lib/auth
 */

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days, in seconds

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("Missing ADMIN_PASSWORD environment variable.");
  }
  return secret;
}

async function getHmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function toBase64Url(input: string | Uint8Array): string {
  const bytes = typeof input === "string" ? encoder.encode(input) : input;
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): Uint8Array {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function sha256(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(input));
  return toBase64Url(new Uint8Array(digest));
}

/**
 * Creates a new signed session token valid for {@link SESSION_MAX_AGE}.
 */
export async function createSessionToken(): Promise<string> {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE * 1000 });
  const body = toBase64Url(payload);
  const key = await getHmacKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return `${body}.${toBase64Url(new Uint8Array(signature))}`;
}

/**
 * Validates a session token. Returns true when the signature is valid and the
 * token has not expired.
 */
export async function isValidSessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [body, signature] = parts;
  const key = await getHmacKey();
  const expected = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  if (!constantTimeEqual(signature, toBase64Url(new Uint8Array(expected)))) {
    return false;
  }

  try {
    const payload = JSON.parse(decoder.decode(fromBase64Url(body))) as {
      exp?: number;
    };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

/**
 * Constant-time comparison of a user-supplied password against the configured
 * admin password. Comparing the SHA-256 digests keeps lengths uniform.
 */
export async function verifyPassword(input: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== "string") return false;
  return constantTimeEqual(await sha256(input), await sha256(expected));
}
