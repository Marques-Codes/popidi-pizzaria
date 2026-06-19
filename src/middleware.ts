import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuthCookieName, verifyAdminToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(adminAuthCookieName)?.value;
  const isAuthenticated = await verifyAdminToken(token);

  if (!isAuthenticated) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};