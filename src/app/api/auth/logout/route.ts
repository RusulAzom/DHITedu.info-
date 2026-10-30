import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/auth/firebaseAdmin";
import { SESSION_COOKIE } from "@/lib/auth/session";

export async function POST() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionCookie) {
    try {
      const decoded = await getAdminAuth().verifySessionCookie(sessionCookie);
      await getAdminAuth().revokeRefreshTokens(decoded.uid);
    } catch {
      // Clear invalid or expired cookies as well.
    }
  }

  const response = NextResponse.json({ redirectTo: "/login" });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
