export const ROLES = ["super_admin", "branch_manager", "student"] as const;

export type UserRole = (typeof ROLES)[number];

export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  super_admin: "/admin/dashboard",
  branch_manager: "/branch/dashboard",
  student: "/student/dashboard",
};

export type UserProfile = {
  email: string;
  username: string;
  role: UserRole;
  displayName: string;
  branchId?: string;
  regId?: string;
};

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && ROLES.includes(value as UserRole);
}
