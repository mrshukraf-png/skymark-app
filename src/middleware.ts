import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("skymark_admin")?.value;
  const email = await verifySessionToken(token ?? undefined);

  if (!email) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
