export const ADMIN_AUTH_COOKIE_NAME = "popidi_admin_session";

const adminSessionMaxAgeInSeconds = 60 * 60 * 8;

function getAdminAuthSecret() {
  const secret = process.env.ADMIN_AUTH_SECRET;

  if (!secret) {
    throw new Error("ADMIN_AUTH_SECRET não configurado.");
  }

  return secret;
}

function safeCompare(firstValue: string, secondValue: string) {
  if (firstValue.length !== secondValue.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < firstValue.length; index += 1) {
    result |= firstValue.charCodeAt(index) ^ secondValue.charCodeAt(index);
  }

  return result === 0;
}

async function createSignature(payload: string) {
  const secret = getAdminAuthSecret();
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminToken() {
  const expiresAt = Date.now() + adminSessionMaxAgeInSeconds * 1000;
  const payload = `admin.${expiresAt}`;
  const signature = await createSignature(payload);

  return `${payload}.${signature}`;
}

export async function verifyAdminToken(token?: string) {
  if (!token) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [user, expiresAtText, signature] = parts;
  const expiresAt = Number(expiresAtText);

  if (user !== "admin") {
    return false;
  }

  if (!Number.isFinite(expiresAt)) {
    return false;
  }

  if (Date.now() > expiresAt) {
    return false;
  }

  const payload = `${user}.${expiresAt}`;
  const expectedSignature = await createSignature(payload);

  return safeCompare(signature, expectedSignature);
}

export async function createAdminAuthCookie() {
  const token = await createAdminToken();

  return {
    name: ADMIN_AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: adminSessionMaxAgeInSeconds,
  };
}