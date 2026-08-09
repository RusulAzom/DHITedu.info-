"use client";

import React from "react";
import Link from "next/link";

export default function SearchModal({ open, onClose }) {
  if (!open) return null;

  const popular = ["Doctor Booking", "RMP Course", "Ambulance", "Live TV"];

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/40 p-4">
      <div className="mt-12 w-full max-w-md rounded-[12px] bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Search</h3>
          <button onClick={onClose} className="text-sm text-[var(--color-text-muted)]">Close</button>
        </div>
        <div className="mt-3">
          <input autoFocus className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2" placeholder="Search courses, doctors..." />
        </div>
        <div className="mt-3">
          <div className="mb-2 text-sm font-semibold text-[var(--color-text-muted)]">Popular</div>
          <div className="flex flex-wrap gap-2">
            {popular.map((p) => (
              <Link key={p} href={`/search?q=${encodeURIComponent(p)}`} className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-muted)]">
                {p}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
