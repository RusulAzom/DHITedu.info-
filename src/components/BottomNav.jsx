"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { href: "/courses", icon: "📘", label: "Learn" },
  { href: "/shop", icon: "🛒", label: "Shop" },
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/profile", icon: "👤", label: "Profile" },
  { href: "/", icon: "▦", label: "More" },
];

export default function BottomNav() {
  const pathname = usePathname() || "/";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-[var(--color-border)] bg-white px-4 py-2 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] md:hidden">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href === "/" && pathname === "/");
          return (
            <Link key={item.label} href={item.href} className={`flex min-h-[54px] flex-1 flex-col items-center justify-center rounded-[16px] px-2 text-[10px] font-semibold transition ${active ? "text-[var(--color-primary-green)]" : "text-[var(--color-text-muted)]"}`}>
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
