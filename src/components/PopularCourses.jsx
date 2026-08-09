import React from "react";
import Link from "next/link";

const courses = [
  {
    badge: "RMP Course",
    title: "RMP সার্টিফিকেট কোর্স",
    duration: "মেয়াদ: ৩ মাস",
    price: "৳৪,০০০",
  },
  {
    badge: "LMAFP Course",
    title: "LMAFP সার্টিফিকেট কোর্স",
    duration: "মেয়াদ: ২ বছর",
    price: "৳৯,০০০",
  },
  {
    badge: "DMF Course",
    title: "DMF সার্টিফিকেট কোর্স",
    duration: "মেয়াদ: ৩ বছর",
    price: "৳১৫,০০০",
  },
];

export default function PopularCourses() {
  return (
    <section className="space-y-3 px-4">
      <div>
        <h3 className="text-base font-bold text-[var(--color-text-dark)]">জনপ্রিয় কোর্স</h3>
      </div>

      <div className="-mx-4 overflow-x-auto pb-2 pl-4 pr-4">
        <div className="flex gap-4">
          {courses.map((c) => (
            <div key={c.title} className="min-w-[260px] flex-shrink-0 rounded-[16px] bg-white p-4 shadow-sm ring-1 ring-[var(--color-border)]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(0,119,182,0.08)] px-3 py-1 text-sm font-semibold text-[#0077B6]">{c.badge}</div>
              <div className="mt-3">
                <div className="text-lg font-bold text-[var(--color-text-dark)]">{c.title}</div>
                <div className="mt-2 text-sm text-[var(--color-text-muted)]">{c.duration}</div>
                <div className="mt-2 text-lg font-extrabold text-[var(--color-primary-green)]">{c.price}</div>
              </div>
              <div className="mt-4">
                <Link href="/courses" className="w-full inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--color-primary-green)] px-4 py-2 text-sm font-bold text-white">ভর্তি হন</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
