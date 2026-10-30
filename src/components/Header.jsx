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
  const [mobileCoursesHaveMore, setMobileCoursesHaveMore] = useState(false);
  const [mobileBranchesHaveMore, setMobileBranchesHaveMore] = useState(false);

  const updateScrollIndicator = (element, setHasMore) => {
    if (!element) return;
    setHasMore(element.scrollTop + element.clientHeight < element.scrollHeight - 1);
  };

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm w-full overflow-visible">
        <div className="flex items-center justify-between w-full px-2 py-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="flex flex-col items-center justify-center p-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors md:hidden"
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-[8px] font-semibold tracking-wider uppercase text-slate-600 mt-0.5">
              MENU
            </span>
          </button>

          <Link className="flex items-center gap-1.5 mx-auto" href="/">
            <img
              src="/imgs/dhitlogo.png"
              alt="DHIT Logo"
              className="h-7 w-auto object-contain"
            />
            <span className="text-base font-bold text-emerald-800 tracking-tight">
              DHITedu
            </span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/online" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-text-dark)] transition hover:border-b-2 hover:border-[#0A7F2E] hover:text-[var(--color-primary-green)] pb-1">
              অনলাইন কোর্স
            </Link>
            <Link href="#" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-text-dark)] transition hover:border-b-2 hover:border-[#0A7F2E] hover:text-[var(--color-primary-green)] pb-1">
              আমাদের সম্পর্কে
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
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
                <div className="absolute left-0 top-full z-[60] w-[320px] pt-2">
                  <div className="overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white shadow-xl">
                  <div className="space-y-1 p-3">
                    {courses.map((course) => (
                      <Link
                        key={course.title}
                        href={`/course/${course.slug}`}
                        className="block rounded-2xl px-3 py-3 text-sm text-[var(--color-text-dark)] transition hover:bg-[var(--color-bg-light)]"
                      >
                        <div className="font-semibold">{course.title}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">মেয়াদ: {course.duration}</div>
                      </Link>
                    ))}
                  </div>
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
            <div
              className="relative"
              onMouseEnter={() => setBranchOpen(true)}
              onMouseLeave={() => setBranchOpen(false)}
            >
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
                <div className="absolute left-0 top-full z-[60] w-[240px] pt-2">
                  <div className="overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white shadow-xl">
                  <div className="space-y-1 p-2">
                    {branchOptions.map((br) => (
                      <Link
                        key={br.value}
                        href={`/branch/${br.value}`}
                        onClick={() => {
                          setBranchOpen(false);
                        }}
                        className="block rounded-2xl px-4 py-3 text-sm text-[var(--color-text-dark)] transition hover:bg-[var(--color-bg-light)]"
                      >
                        {br.label}
                      </Link>
                    ))}
                  </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2">
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

            <div className="h-[calc(100dvh-73px)] space-y-1 overflow-y-auto overscroll-contain scroll-smooth touch-pan-y px-4 py-4 pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                  <div className="relative border-t border-[var(--color-border)]">
                    <div
                      ref={(element) => updateScrollIndicator(element, setMobileCoursesHaveMore)}
                      onScroll={(event) => updateScrollIndicator(event.currentTarget, setMobileCoursesHaveMore)}
                      className="mobile-dropdown-scrollbar max-h-60 space-y-1 overflow-y-auto overscroll-contain scroll-smooth touch-pan-y px-3 py-2"
                    >
                    {courses.map((course) => (
                      <Link
                        key={course.title}
                        href={`/course/${course.slug}`}
                        className="block rounded-xl px-3 py-2 text-sm text-[var(--color-text-muted)] transition hover:bg-white hover:text-[var(--color-text-dark)]"
                      >
                        <div className="font-semibold">{course.title}</div>
                        <div className="text-xs">মেয়াদ: {course.duration}</div>
                      </Link>
                    ))}
                    </div>
                    {mobileCoursesHaveMore ? (
                      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex h-9 items-end justify-center bg-gradient-to-t from-[var(--color-bg-light)] via-[var(--color-bg-light)]/80 to-transparent pb-1 text-[10px] font-medium text-[var(--color-text-muted)]">
                        ↓ Scroll for more
                      </div>
                    ) : null}
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
                    <div className="relative mt-2">
                      <div
                        ref={(element) => updateScrollIndicator(element, setMobileBranchesHaveMore)}
                        onScroll={(event) => updateScrollIndicator(event.currentTarget, setMobileBranchesHaveMore)}
                        className="mobile-dropdown-scrollbar max-h-60 overflow-y-auto overscroll-contain scroll-smooth touch-pan-y rounded-[20px] border border-[var(--color-border)] bg-white shadow-sm"
                      >
                        {branchOptions.map((br) => (
                          <Link
                            key={br.value}
                            href={`/branch/${br.value}`}
                            onClick={() => {
                              setBranchOpen(false);
                            }}
                            className="block px-3 py-3 text-left text-sm text-[var(--color-text-dark)] hover:bg-[var(--color-bg-light)]"
                          >
                            {br.label}
                          </Link>
                        ))}
                      </div>
                      {mobileBranchesHaveMore ? (
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex h-9 items-end justify-center rounded-b-[20px] bg-gradient-to-t from-white via-white/80 to-transparent pb-1 text-[10px] font-medium text-[var(--color-text-muted)]">
                          {"\u2193 Scroll for more"}
                        </div>
                      ) : null}
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
