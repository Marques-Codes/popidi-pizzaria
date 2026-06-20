import { NextRequest, NextResponse } from "next/server";
import { createAdminAuthCookie } from "@/lib/admin-auth";

function getSafeNextPath(nextPath: string | null) {
  if (!nextPath) {
    return "/admin";
  }

  if (!nextPath.startsWith("/")) {
    return "/admin";
  }

  if (nextPath.startsWith("//")) {
    return "/admin";
  }

  return nextPath;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const rawNextPath = formData.get("next");
  const nextPath = getSafeNextPath(
    typeof rawNextPath === "string" ? rawNextPath : "/admin",
  );

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "server");
    loginUrl.searchParams.set("next", nextPath);

    return NextResponse.redirect(loginUrl, {
      status: 303,
    });
  }

  if (username !== adminUsername || password !== adminPassword) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "invalid");
    loginUrl.searchParams.set("next", nextPath);

    return NextResponse.redirect(loginUrl, {
      status: 303,
    });
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), {
    status: 303,
  });

  const authCookie = await createAdminAuthCookie();

  response.cookies.set(authCookie.name, authCookie.value, {
    httpOnly: authCookie.httpOnly,
    secure: authCookie.secure,
    sameSite: authCookie.sameSite,
    path: authCookie.path,
    maxAge: authCookie.maxAge,
  });

  return response;
}