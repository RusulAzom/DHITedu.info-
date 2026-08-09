import React from "react";

export default function NewsTicker() {
  const tickerItems = [
    "🩺 অ্যান্টিবায়োটিক ব্যবহারের ৫টি নিয়ম",
    "🐍 সাপে কাটলে প্রাথমিক করণীয়",
    "💧 ডায়রিয়ায় করণীয় ও বিপদ চিহ্ন",
    "🌡️ জ্বর হলেই এন্টিবায়োটিক নয়",
    "🤰 গর্ভবতীর ৫টি বিপদ সংকেত",
  ];

  return (
    <div className="mb-4 overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-white shadow-sm">
      <div className="flex h-[44px] items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-alert-red)] px-4 text-sm font-semibold text-white">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">📰</span>
        <span>নোটিস</span>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-sm font-medium text-[var(--color-text)]">
            {tickerItems.map((item) => (
              <span key={item} className="mr-8">{item}</span>
            ))}
            {tickerItems.map((item) => (
              <span key={`${item}-clone`} className="mr-8">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
