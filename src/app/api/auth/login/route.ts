import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/auth/firebaseAdmin";
import { ROLE_DASHBOARDS, isUserRole } from "@/lib/auth/roles";
import { SESSION_COOKIE, SESSION_DURATION_MS } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Enter your email or username and password." }, { status: 400 });
    }
    const identity = typeof body.identity === "string" ? body.identity.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!identity || !password || password.length > 256) {
      return NextResponse.json({ error: "Enter your email or username and password." }, { status: 400 });
    }

    // Usernames use the configured Firebase email's local part.
    const email = (identity.includes("@") ? identity : `${identity}@${process.env.FIREBASE_USERNAME_DOMAIN || "dhitedu.info"}`).toLowerCase();

    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) throw new Error("Firebase Web API key is not configured.");

    const authResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      cache: "no-store",
    });
    if (!authResponse.ok) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const authData = (await authResponse.json()) as { idToken?: string; localId?: string };
    if (!authData.idToken || !authData.localId) {
      return NextResponse.json({ error: "Unable to sign in." }, { status: 401 });
    }

    const decoded = await getAdminAuth().verifyIdToken(authData.idToken, true);
    if (!isUserRole(decoded.role)) {
      return NextResponse.json({ error: "This account has no valid dashboard role." }, { status: 403 });
    }

    const sessionCookie = await getAdminAuth().createSessionCookie(authData.idToken, { expiresIn: SESSION_DURATION_MS });
    const response = NextResponse.json({ redirectTo: ROLE_DASHBOARDS[decoded.role] });
    response.cookies.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_MS / 1000,
    });
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ error: "Sign in is temporarily unavailable." }, { status: 500 });
  }
}
