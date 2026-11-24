import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createSessionToken, getAdminCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const email = body.email?.trim() || "";
    const password = body.password || "";
    const credentials = getAdminCredentials();

    if (email !== credentials.email || password !== credentials.password) {
      return NextResponse.json(
        {
          error: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const cookieStore = await cookies();
    const sessionToken = await createSessionToken(email);
    cookieStore.set("skymark_admin", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return NextResponse.json({
      success: true,
      email,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to sign in right now.",
      },
      {
        status: 500,
      }
    );
  }
}
