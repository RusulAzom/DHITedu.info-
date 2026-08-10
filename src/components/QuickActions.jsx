"use client";

import React, { useState } from "react";
import Link from "next/link";

const branchOptions = [
  "সকল ব্রাঞ্চ",
  "ঢাকা সেন্ট্রাল ব্রাঞ্চ",
  "চান্দিনা ব্রাঞ্চ",
  "দিনাজপুর-খানসামা ব্রাঞ্চ",
  "কিশোরগঞ্জ নীলফামারী ব্রাঞ্চ",
  "ভোলা জেলা ব্রাঞ্চ",
  "মনিরামপুর ব্রাঞ্চ",
  "অনলাইন ব্যাচ",
];

export default function QuickActions() {
  const [selectedBranch, setSelectedBranch] = useState(branchOptions[0]);
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-[20px] bg-gradient-to-r from-[#0d4b75] to-[#0A7F2E] text-white rounded-2xl p-3 shadow-md">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Link
          href="#"
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
          href="#"
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
            {branchOptions.map((branch) => (
              <button
                key={branch}
                type="button"
                onClick={() => {
                  setSelectedBranch(branch);
                  setOpen(false);
                }}
                className="w-full border-b-2 border-emerald-500/20 px-4 py-3 text-left text-sm text-slate-900 transition hover:bg-slate-100"
              >
                {branch}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
