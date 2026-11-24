import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const email = await verifySessionToken(token);

  return NextResponse.json({
    authenticated: !!email,
    email: email ?? null,
  });
}
