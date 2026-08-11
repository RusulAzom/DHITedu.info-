"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const branchOptions = [
  { label: "সকল ব্রাঞ্চ", value: "" },
  { label: "ঢাকা সেন্ট্রাল", value: "dhakacentral" },
  { label: "চান্দিনা", value: "chandina" },
  { label: "দিনাজপুর-খানসামা", value: "dinajpur-khanshama" },
  { label: "কিশোরগঞ্জ নীলফামারী", value: "kishorgonj-nilphamari" },
  { label: "ভোলা জেলা", value: "bholadistrict" },
  { label: "মনিরামপুর", value: "monirampur" },
  { label: "অনলাইন ব্যাচ", value: "online-batch" },
];

export default function QuickActions() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const selectedBranch = (() => {
    const match = pathname?.match(/^\/branch\/([^/?#]+)/);
    if (match?.[1]) {
      const found = branchOptions.find((br) => br.value === match[1]);
      if (found) return found.label;
    }
    return branchOptions[0].label;
  })();

  return (
    <section className="rounded-[20px] bg-gradient-to-r from-[#0d4b75] to-[#0A7F2E] text-white rounded-2xl p-3 shadow-md">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Link
          href="/result"
          className="rounded-2xl border border-white/20 bg-white/10 p-4 transition hover:bg-white/15"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">📊</div>
            <div>
              <p className="text-sm font-semibold text-white">Result</p>
              <p className="mt-1 text-xs text-white/80">ফলাফল দেখুন</p>
            </div>
          </div>
        </Link>
        <Link
          href="/result"
          className="rounded-2xl border border-white/20 bg-white/10 p-4 transition hover:bg-white/15"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">✅</div>
            <div>
              <p className="text-sm font-semibold text-white">Certificate Verify</p>
              <p className="mt-1 text-xs text-white/80">সার্টিফিকেট যাচাই করুন</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-3 relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-2xl border border-white/20 border-b-2 border-emerald-500/20 bg-white/10 px-4 py-4 text-left text-sm font-semibold text-white shadow-xs shadow-slate-200/50 transition hover:bg-white/15"
        >
          <span>{selectedBranch}</span>
          <span>▾</span>
        </button>

        {open ? (
          <div className="absolute left-0 right-0 z-10 mt-2 overflow-hidden rounded-[20px] border border-white/15 bg-white text-[var(--color-text-dark)] shadow-xs shadow-slate-200/50">
            {branchOptions.map((br) => (
              <Link
                key={br.value}
                href={`/branch/${br.value}`}
                onClick={() => {
                  setSelectedBranch(br.label);
                  setOpen(false);
                }}
                className="block border-b-2 border-emerald-500/20 px-4 py-3 text-left text-sm text-slate-900 transition hover:bg-slate-100"
              >
                {br.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
