"use client";

import React, { useState } from "react";

const features = [
  {
    icon: "👨‍⚕️",
    title: "অভিজ্ঞ ও রেজিস্টার্ড শিক্ষক",
    description: "অভিজ্ঞ ও সরকারি রেজিস্টার্ড চিকিৎসক দ্বারা ক্লাস পরিচালনা",
  },
  {
    icon: "🧪",
    title: "হাতে-কলমে ল্যাব সুবিধা",
    description: "সম্পূর্ণ প্র্যাকটিক্যাল প্রশিক্ষণ ও ল্যাব সুবিধা",
  },
  {
    icon: "📜",
    title: "সার্টিফিকেট ও গাইডলাইন",
    description: "কোর্স শেষে প্রাতিষ্ঠানিক সার্টিফিকেট ও কর্মসংস্থানের দিকনির্দেশনা",
  },
  {
    icon: "💰",
    title: "স্বল্প খরচে মানসম্মত শিক্ষা",
    description: "সীমিত আসনে ন্যূনতম খরচে মানসম্মত পল্লী চিকিৎসা প্রশিক্ষণ",
  },
];

const modules = [
  "Human Anatomy",
  "First Aid",
  "Pharmacology",
  "OTC Drugs",
  "MCH Care",
];

export default function WhyChooseUs() {
  const [isDoubtOpen, setIsDoubtOpen] = useState(false);

  return (
    <section className="space-y-4 rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[var(--color-primary-green)]">কেন DHIT কে বেছে নেবেন?</p>
        <h3 className="text-2xl font-bold text-[var(--color-text-dark)]">DHIT-এর সাথে আপনার সেরা শেখা ও প্রস্তুতি</h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-light)] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary-green)] text-xl text-white">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-[var(--color-text-dark)]">{feature.title}</h4>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-light)]">
        <button
          type="button"
          onClick={() => setIsDoubtOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <span className="text-lg font-bold text-[var(--color-text-dark)]">
            গ্রামীণ চিকিৎসা প্রশিক্ষণ কোর্স নিয়ে দ্বিধা? সমাধান দিচ্ছে DHIT
          </span>
          <span className={`text-xl text-[var(--color-primary-green)] transition-transform duration-200 ${isDoubtOpen ? "rotate-180" : "rotate-0"}`}>
            +
          </span>
        </button>
        <div className={`overflow-hidden border-t border-[var(--color-border)] px-5 transition-[max-height] duration-300 ease-out ${isDoubtOpen ? "max-h-[800px] py-5" : "max-h-0 py-0"}`}>
          {isDoubtOpen ? (
            <>
              <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                আমাদের কোর্সগুলোতে আপনি পাচ্ছেন ব্যাপক কাঠামোবদ্ধ মডিউল যা আপনাকে দক্ষ পল্লী চিকিৎসক হিসেবে গড়ে তুলবে।
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {modules.map((module) => (
                  <span key={module} className="rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-text-dark)]">
                    {module}
                  </span>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
