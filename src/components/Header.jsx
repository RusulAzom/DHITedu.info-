"use client";

import React, { useState } from "react";
import Link from "next/link";

import { courses } from "@/lib/courseData";

const branchLocations = [
  "ঢাকা সেন্ট্রাল",
  "চান্দিনা",
  "ভোলা জেলা",
  "মণিরামপুর",
  "পাকেরহাট",
  "কিশোরগঞ্জ নীলফামারী",
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [branchesOpen, setBranchesOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [drawerCoursesOpen, setDrawerCoursesOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/95 px-3 py-2 backdrop-blur-md shadow-sm">
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
              <div className="truncate text-lg font-black text-[var(--color-primary-green)]">DHITedu.info</div>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/online" className="rounded-full bg-[var(--color-primary-green)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-green)/90]">
              অনলাইন কোর্স
            </Link>
            <Link href="#" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-text-dark)] transition hover:bg-[var(--color-bg-light)]">
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
            <Link href="#" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-text-dark)] transition hover:bg-[var(--color-bg-light)]">
              ব্লগ
            </Link>
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
        <div className="fixed inset-0 z-40 flex bg-black/40 backdrop-blur-sm md:hidden">
          <div className="h-full w-[70vw] max-w-[340px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4">
              <div>
                <div className="text-lg font-black text-[var(--color-primary-green)]">DHITedu.info</div>
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
              <Link href="#" className="block rounded-2xl px-3 py-3 text-sm font-semibold text-[var(--color-text-dark)] hover:bg-[var(--color-bg-light)]">
                সার্টিফিকেট ভেরিফিকেশন
              </Link>
              <Link href="/profile" className="block rounded-2xl bg-[var(--color-primary-green)] px-3 py-3 text-center text-sm font-semibold text-white">
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
