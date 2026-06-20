import { NextRequest, NextResponse } from "next/server";
import { ADMIN_AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminToken(token);

  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};