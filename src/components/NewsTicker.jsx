import React from "react";

  const notices = [
    "📢 জরুরী নোটিশ: সকল নতুন ও পুরাতন শিক্ষার্থীকে আমাদের নতুন ওয়েবসাইটে বাধ্যতামূলকভাবে রি-রেজিস্ট্রেশন করে নিজ নিজ ইউজার আইডি (User ID) ও পাসওয়ার্ড সংগ্রহ করার জন্য নির্দেশ দেওয়া হচ্ছে।",
    "🎓 ফ্রি মাস্টারক্লাস: DHIT এর সকল শিক্ষার্থীদের জন্য আগামী ১৬ আগস্ট 'মোবাইল ফ্রিল্যান্সিং' বিষয়ক বিশেষ অনলাইন ফ্রি মাস্টারক্লাস অনুষ্ঠিত হবে।",
    "📜 সার্টিফিকেট ভেরিফিকেশন: সকল কেন্দ্রকে পুরাতন শিক্ষার্থীদের সনদপত্র নতুন অনলাইন সিস্টেমের অধীনে ভেরিফাই করার নির্দেশনা প্রদান করা হয়েছে।",
  ];

export default function NewsTicker() {
  return (
    <div className="mb-4 overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-white shadow-sm">
      <div className="flex h-[44px] items-center gap-3 border-b border-[var(--color-border)] bg-gradient-to-r from-[#8b1020] to-[#0b274e] px-4 text-sm font-semibold text-white">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">📢</span>
        <span>নোটিশ</span>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap text-sm font-medium text-[var(--color-text)]">
            {notices.map((n, i) => (
              <span key={i} className="mr-8">{n}</span>
            ))}
            {notices.map((n, i) => (
              <span key={`clone-${i}`} className="mr-8">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
