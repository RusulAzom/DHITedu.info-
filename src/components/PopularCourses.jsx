import React from "react";
import Link from "next/link";
import { courses } from "@/lib/courseData";

export default function PopularCourses() {
  return (
    <section className="space-y-3 px-4">
      <div>
        <h3 className="text-base font-bold text-[var(--color-text-dark)]">জনপ্রিয় কোর্স</h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          ঢাকা সহ সকল শাখাগুলিতে ভর্তি চলছে! <Link href="/branches" className="font-semibold text-[var(--color-primary-green)] underline">শাখা সমূহের তালিকা</Link>
        </p>
      </div>

      <div className="-mx-4 overflow-x-auto pb-2 pl-4 pr-4">
        <div className="flex gap-4 touch-pan-x overflow-x-auto">
          {courses.map((course) => (
            <div key={course.title} className="min-w-[260px] flex-shrink-0 rounded-[16px] bg-white p-4 shadow-sm ring-1 ring-[var(--color-border)]">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-green)]">কোর্স</div>
              <div className="mt-3 text-lg font-bold text-[var(--color-text-dark)]">{course.title}</div>
              <div className="mt-3 inline-flex rounded-full bg-[var(--color-bg-light)] px-3 py-1 text-sm font-semibold text-[var(--color-primary-green)]">
                মেয়াদ: {course.duration}
              </div>
              <div className="mt-4">
                <Link href="/courses" className="w-full inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--color-primary-green)] px-4 py-2 text-sm font-bold text-white">
                  ভর্তি তথ্য / বিস্তারিত
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
