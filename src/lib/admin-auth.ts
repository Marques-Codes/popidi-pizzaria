import { jwtVerify, SignJWT } from "jose";

export const adminAuthCookieName = "popidi_admin_token";

function getAdminAuthSecret() {
  const secret = process.env.ADMIN_AUTH_SECRET;

  if (!secret) {
    throw new Error("ADMIN_AUTH_SECRET não configurado.");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminToken() {
  return new SignJWT({
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getAdminAuthSecret());
}

export async function verifyAdminToken(token?: string) {
  if (!token) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, getAdminAuthSecret());

    return payload.role === "admin";
  } catch {
    return false;
  }
}