"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { courses } from "@/lib/courseData";

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

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [branchesOpen, setBranchesOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [drawerCoursesOpen, setDrawerCoursesOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);

  const selectedBranch = (() => {
    const match = pathname?.match(/^\/branch\/([^/?#]+)/);
    if (match?.[1]) {
      const found = branchOptions.find((br) => br.value === match[1]);
      if (found) return found.label;
    }
    return branchOptions[0].label;
  })();

  return (
    <>
      <header className="fixed top-0 z-50 w-full px-4 py-3 flex items-center justify-between shadow-sm bg-white">
        <div className="flex w-full items-center justify-between overflow-hidden">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex-shrink-0 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white text-[var(--color-text-dark)] shadow-sm md:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>
            <div className="min-w-0">
              <a href="/" className="text-lg font-black text-[var(--color-primary-green)]">
                DHITedu
              </a>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/online" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-text-dark)] transition hover:border-b-2 hover:border-[#0A7F2E] hover:text-[var(--color-primary-green)] pb-1">
              অনলাইন কোর্স
            </Link>
            <Link href="#" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-text-dark)] transition hover:border-b-2 hover:border-[#0A7F2E] hover:text-[var(--color-primary-green)] pb-1">
              আমাদের সম্পর্কে
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => setCoursesOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-text-dark)] transition hover:bg-[var(--color-bg-light)]"
                aria-expanded={coursesOpen}
              >
                কোর্স সমূহ
                <span className="text-xs">▾</span>
              </button>
              {coursesOpen ? (
                <div className="absolute left-0 z-20 mt-2 w-[320px] overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white shadow-xl">
                  <div className="space-y-1 p-3">
                    {courses.map((course) => (
                      <Link
                        key={course.title}
                        href="/courses"
                        className="block rounded-2xl px-3 py-3 text-sm text-[var(--color-text-dark)] transition hover:bg-[var(--color-bg-light)]"
                      >
                        <div className="font-semibold">{course.title}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">মেয়াদ: {course.duration}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <Link href="#" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-text-dark)] transition hover:border-b-2 hover:border-[#0A7F2E] hover:text-[var(--color-primary-green)] pb-1">
              ব্লগ
            </Link>
            <Link
              href="/verify"
              className="rounded-full bg-[#0A7F2E] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
            >
              সার্টিফিকেট ভেরিফাই
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => setBranchOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-[var(--color-border)] border-b-2 border-emerald-500/20 bg-white px-4 py-2 text-sm font-semibold text-[var(--color-text-dark)] shadow-xs shadow-slate-200/50 transition hover:bg-[var(--color-bg-light)]"
                aria-expanded={branchOpen}
              >
                {selectedBranch}
                <span className="text-xs">▾</span>
              </button>
              {branchOpen ? (
                <div className="absolute left-0 z-20 mt-2 w-[240px] overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white shadow-xl">
                  <div className="space-y-1 p-2">
                    {branchOptions.map((br) => (
                      <Link
                        key={br.value}
                        href={`/branch/${br.value}`}
                        onClick={() => {
                          setSelectedBranch(br.label);
                          setBranchOpen(false);
                        }}
                        className="block rounded-2xl px-4 py-3 text-sm text-[var(--color-text-dark)] transition hover:bg-[var(--color-bg-light)]"
                      >
                        {br.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex-shrink-0 ml-auto">
            <div className="relative inline-flex items-center p-1.5 bg-green-50 rounded-full border border-green-200">
              <span className="text-base">💰</span>
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                ১২৫০
              </span>
            </div>
          </div>
        </div>
      </header>

      {drawerOpen ? (
        <div className="fixed inset-0 z-[60] flex bg-black/40 backdrop-blur-sm md:hidden">
          <div className="h-full w-[70vw] max-w-[340px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4">
              <div>

                <a href="/" className="text-lg font-black text-[var(--color-primary-green)]">
                  DHITedu
                </a>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="text-xl text-[var(--color-text-dark)]"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1 px-4 py-4 overflow-y-auto pb-8">
              <Link href="#" className="block rounded-2xl px-3 py-3 text-sm font-semibold text-[var(--color-text-dark)] hover:bg-[var(--color-bg-light)]">
                আমাদের সম্পর্কে
              </Link>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-light)]">
                <button
                  type="button"
                  onClick={() => setDrawerCoursesOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between px-3 py-3 text-sm font-semibold text-[var(--color-text-dark)]"
                >
                  <span>কোর্স সমূহ</span>
                  <span>{drawerCoursesOpen ? "−" : "+"}</span>
                </button>
                {drawerCoursesOpen ? (
                  <div className="space-y-1 border-t border-[var(--color-border)] px-3 py-2">
                    {courses.map((course) => (
                      <Link
                        key={course.title}
                        href="/courses"
                        className="block rounded-xl px-3 py-2 text-sm text-[var(--color-text-muted)] transition hover:bg-white hover:text-[var(--color-text-dark)]"
                      >
                        <div className="font-semibold">{course.title}</div>
                        <div className="text-xs">মেয়াদ: {course.duration}</div>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
              <Link href="#" className="block rounded-2xl px-3 py-3 text-sm font-semibold text-[var(--color-text-dark)] hover:bg-[var(--color-bg-light)]">
                ব্লগ
              </Link>
              <Link href="/verify" className="block rounded-2xl bg-[#0A7F2E] px-3 py-3 text-sm font-semibold text-white">
                সার্টিফিকেট ভেরিফিকেশন
              </Link>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-light)] px-3 py-3">
                <div className="text-sm font-semibold text-[var(--color-text-dark)]">Branch</div>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => setBranchOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-2xl border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-dark)]"
                  >
                    {selectedBranch}
                    <span>▾</span>
                  </button>
                  {branchOpen ? (
                    <div className="mt-2 overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-white shadow-sm">
                      {branchOptions.map((br) => (
                        <Link
                          key={br.value}
                          href={`/branch/${br.value}`}
                          onClick={() => {
                            setSelectedBranch(br.label);
                            setBranchOpen(false);
                          }}
                          className="block px-3 py-3 text-left text-sm text-[var(--color-text-dark)] hover:bg-[var(--color-bg-light)]"
                        >
                          {br.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <Link href="/profile" className="block rounded-2xl px-3 py-3 text-center text-sm font-semibold text-[var(--color-text-dark)] transition hover:border-b-2 hover:border-[#0A7F2E] hover:text-[var(--color-primary-green)]">
                লগইন / সাইনআপ
              </Link>
              <div className="mt-3 flex items-center justify-between gap-3">
                <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-bg-light)] text-[var(--color-text-dark)]">f</a>
                <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-bg-light)] text-[var(--color-text-dark)]">▶</a>
                <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-bg-light)] text-[var(--color-text-dark)]">🟢</a>
                <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-bg-light)] text-[var(--color-text-dark)]">in</a>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="flex-1"
            aria-hidden="true"
          />
        </div>
      ) : null}
    </>
  );
}
