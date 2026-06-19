import { NextResponse } from "next/server";
import { adminAuthCookieName, createAdminToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD não configurado.");
  }

  if (password !== adminPassword) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "1");

    return NextResponse.redirect(loginUrl);
  }

  const token = await createAdminToken();

  const response = NextResponse.redirect(new URL("/admin", request.url));

  response.cookies.set(adminAuthCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}