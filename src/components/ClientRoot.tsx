"use client";

import React, { useEffect, useState } from "react";
import SearchModal from "@/components/SearchModal";
import { AppShellProvider } from "@/components/AppShellContext";

type Props = { children: React.ReactNode };

export default function ClientRoot({ children }: Props) {
  const [dark, setDark] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    // Remove stray attributes added by browser extensions which can cause
    // hydration mismatches (e.g. cz-shortcut-listen="true").
    try {
      if (typeof document !== "undefined") {
        document.documentElement.removeAttribute("cz-shortcut-listen");
        document.body.removeAttribute("cz-shortcut-listen");
      }
    } catch {
      // ignore
    }

    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href");

      if (href === "#" || href === "" || href === "javascript:void(0)") {
        e.preventDefault();
        console.log("This page is under development.");
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, []);

  const appShellValue = {
    isDark: dark,
    toggleTheme: () => setDark((v) => !v),
    openSearch: () => setShowSearch(true),
  };

  return (
    <AppShellProvider value={appShellValue}>
      <SearchModal open={showSearch} onClose={() => setShowSearch(false)} />
      {children}
    </AppShellProvider>
  );
}
