import { NextRequest, NextResponse } from "next/server";
import { ADMIN_AUTH_COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL("/admin/login", request.url),
    {
      status: 303,
    },
  );

  response.cookies.set(ADMIN_AUTH_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}