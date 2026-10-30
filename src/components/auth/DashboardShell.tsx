"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { UserRole } from "@/lib/auth/roles";

const navigation: Record<UserRole, { label: string; href: string }[]> = {
  super_admin: [
    { label: "Overview", href: "/admin/dashboard" },
    { label: "JSON branches", href: "/admin/dashboard#json-branches" },
    { label: "Admit cards", href: "/admin/admit-card" },
  ],
  branch_manager: [{ label: "Overview", href: "/branch/dashboard" }],
  student: [{ label: "Overview", href: "/student/dashboard" }],
};

export default function DashboardShell({
  role,
  roleLabel,
  displayName,
  children,
}: {
  role: UserRole;
  roleLabel: string;
  displayName: string;
  children: ReactNode;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      <aside className="bg-emerald-950 px-5 py-6 text-white md:min-h-screen md:w-64 md:shrink-0">
        <Link href="/" className="text-xl font-black tracking-tight">DHITedu</Link>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">{roleLabel}</p>
        <nav className="mt-8 flex gap-2 md:flex-col">
          {navigation[role].map((item) => (
            <a key={item.href} href={item.href} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15">{item.label}</a>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{roleLabel} dashboard</p>
            <p className="mt-1 font-bold">{displayName}</p>
          </div>
          <button type="button" onClick={logout} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Sign out</button>
        </header>
        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
