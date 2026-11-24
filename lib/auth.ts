export const SESSION_COOKIE = "skymark_admin";

const DEFAULT_ADMIN_EMAIL = "admin@skymark.com";
const DEFAULT_ADMIN_PASSWORD = "skymark123";
const SESSION_SECRET =
  process.env.AUTH_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "skymark-demo-secret";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function getAdminCredentials() {
  return {
    email: (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim(),
    password: (process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD).trim(),
  };
}

function encodeBase64Url(value: string | Uint8Array) {
  const bytes = typeof value === "string" ? encoder.encode(value) : value;
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  const encoded = typeof globalThis.btoa === "function"
    ? globalThis.btoa(binary)
    : Buffer.from(binary, "binary").toString("base64");

  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);

  const binary = typeof globalThis.atob === "function"
    ? globalThis.atob(padded)
    : Buffer.from(padded, "base64").toString("binary");

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return decoder.decode(bytes);
}

async function createSessionSignature(payload: string) {
  const cryptoApi = globalThis.crypto;

  if (!cryptoApi || !cryptoApi.subtle) {
    throw new Error("Web Crypto API is unavailable.");
  }

  const key = await cryptoApi.subtle.importKey(
    "raw",
    encoder.encode(SESSION_SECRET),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await cryptoApi.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(email: string) {
  const payload = JSON.stringify({ email, issuedAt: Date.now() });
  const encodedPayload = encodeBase64Url(payload);
  const signature = await createSessionSignature(payload);
  return `${encodedPayload}.${signature}`;
}

function constantTimeEquals(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

export async function verifySessionToken(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    const [encodedPayload, signature] = value.split(".");

    if (!encodedPayload || !signature) {
      return null;
    }

    const payload = decodeBase64Url(encodedPayload);
    const expected = await createSessionSignature(payload);

    if (!constantTimeEquals(expected, signature)) {
      return null;
    }

    const parsed = JSON.parse(payload) as { email?: string };
    return parsed.email || null;
  } catch {
    return null;
  }
}
