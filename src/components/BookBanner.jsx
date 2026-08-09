import React from "react";

const books = [
  {
    title: "পল্লী চিকিৎসক গাইডবুক",
    description: "নিয়মাবলী, জীবাণু-নিয়ন্ত্রণ ও প্রাথমিক চিকিৎসা।",
    cta: "স্যাম্পল পড়ুন ➔",
  },
  {
    title: "রোগ নির্ণয় বই",
    description: "সিম্পল গাইড আপনার রোগ বিশ্লেষণের জন্য।",
    cta: "বিস্তারিত দেখুন ➔",
  },
];

export default function BookBanner() {
  return (
    <section className="space-y-3 px-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[var(--color-text-dark)]">পল্লী চিকিৎসক গাইডবুক</h3>
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto pb-2 pl-4 pr-4">
        {books.map((book) => (
          <div key={book.title} className="min-w-[220px] flex-shrink-0 rounded-[20px] bg-white p-4 shadow-sm ring-1 ring-[var(--color-border)]">
            <div className="mb-3 h-28 rounded-[18px] bg-[linear-gradient(135deg,#0A7F2E,#004e6b)] p-4 text-white">
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-white/80">বই</div>
              <div className="mt-4 text-lg font-bold leading-snug">{book.title}</div>
            </div>
            <p className="mb-4 text-[12px] text-[var(--color-text-muted)]">{book.description}</p>
            <a href="#" className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--color-primary-green)] px-4 py-2 text-sm font-semibold text-white">
              {book.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
