import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth } from "@/lib/auth/firebaseAdmin";
import { isUserRole, ROLE_DASHBOARDS, type UserProfile, type UserRole } from "@/lib/auth/roles";

export const SESSION_COOKIE = "dhitedu_session";
const SESSION_DURATION_MS = 5 * 24 * 60 * 60 * 1000;

export async function getSessionUser(): Promise<(UserProfile & { uid: string }) | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true);
    if (!isUserRole(decoded.role)) return null;

    return {
      uid: decoded.uid,
      email: typeof decoded.email === "string" ? decoded.email : "",
      username: typeof decoded.username === "string" ? decoded.username : "",
      displayName: typeof decoded.name === "string" ? decoded.name : (typeof decoded.email === "string" ? decoded.email.split("@")[0] : "DHITedu user"),
      role: decoded.role,
      ...(typeof decoded.branchId === "string" ? { branchId: decoded.branchId } : {}),
      ...(typeof decoded.regId === "string" ? { regId: decoded.regId } : {}),
    };
  } catch {
    return null;
  }
}

export async function requireRole(role: UserRole) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== role) redirect(ROLE_DASHBOARDS[user.role]);
  return user;
}

export { SESSION_DURATION_MS };
