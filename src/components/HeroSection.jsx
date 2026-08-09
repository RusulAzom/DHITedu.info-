"use client";

import React, { useState } from "react";

const branchLocations = [
  "ঢাকা সেন্ট্রাল",
  "চান্দিনা",
  "ভোলা জেলা",
  "মণিরামপুর",
  "পাকেরহাট",
  "কিশোরগঞ্জ নীলফামারী",
];

export default function HeroSection() {
  const [branchesOpen, setBranchesOpen] = useState(false);

  return (
    <section className="space-y-3">
      <div className="overflow-hidden rounded-[20px] bg-gradient-to-br from-[#005F9E] via-[#003f78] to-[#0A7F2E] p-5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
        <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
          অনলাইন কোর্স
        </span>
        <h2 className="mt-5 text-[1.35rem] font-bold leading-tight">
          ঘরে বসে শিখুন, নিজের সময়ে ক্লাস করুন
        </h2>
        <p className="mt-4 text-sm text-white/85">
          প্রিমিয়াম কোর্সের মাধ্যমে দ্রুত দক্ষতা অর্জন করুন এবং নিজের সময়ে উন্নতি করুন।
        </p>
        <div className="mt-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 w-full my-3">
        <button
          type="button"
          className="w-full text-xs sm:text-sm font-semibold py-2.5 px-2 rounded-xl border border-gray-200 bg-white flex items-center justify-center gap-1.5 shadow-sm"
        >
          ✅ Certificate Verify
        </button>
        <button
          type="button"
          className="w-full text-xs sm:text-sm font-semibold py-2.5 px-2 rounded-xl border border-gray-200 bg-white flex items-center justify-center gap-1.5 shadow-sm"
        >
          📊 Result
        </button>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setBranchesOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-[14px] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-text-dark)] shadow-sm transition hover:bg-[var(--color-bg-light)]"
        >
          <span>সকল ব্রাঞ্চ</span>
          <span>▾</span>
        </button>
        {branchesOpen ? (
          <div className="space-y-2 rounded-[16px] border border-[var(--color-border)] bg-white p-3">
            {branchLocations.map((branch) => (
              <button key={branch} type="button" className="w-full rounded-[14px] bg-[var(--color-bg-light)] px-3 py-3 text-left text-sm text-[var(--color-text-dark)] transition hover:bg-[#f5f7fb]">
                {branch}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
