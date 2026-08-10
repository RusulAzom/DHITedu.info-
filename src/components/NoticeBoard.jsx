"use client";

import React, { useRef, useEffect, useState } from "react";

const notices = [
  "📢 জরুরী নোটিশ: সকল নতুন ও পুরাতন শিক্ষার্থীকে আমাদের নতুন ওয়েবসাইটে বাধ্যতামূলকভাবে রি-রেজিস্ট্রেশন করে নিজ নিজ ইউজার আইডি (User ID) ও পাসওয়ার্ড সংগ্রহ করার জন্য নির্দেশ দেওয়া হচ্ছে।",
  "🎓 ফ্রি মাস্টারক্লাস: DHIT এর সকল শিক্ষার্থীদের জন্য আগামী ১৬ আগস্ট 'মোবাইল ফ্রিল্যান্সিং' বিষয়ক বিশেষ অনলাইন ফ্রি মাস্টারক্লাস অনুষ্ঠিত হবে।",
  "📜 সার্টিফিকেট ভেরিফিকেশন: সকল কেন্দ্রকে পুরাতন শিক্ষার্থীদের সনদপত্র নতুন অনলাইন সিস্টেমের অধীনে ভেরিফাই করার নির্দেশনা প্রদান করা হয়েছে।",
];

export default function NoticeBoard() {
  const textRef = useRef(null);
  const [duration, setDuration] = useState(15);

  useEffect(() => {
    // calculate duration based on scrollWidth for constant velocity (50px/s)
    const compute = () => {
      if (textRef.current) {
        // Account for duplicated content and target visible speed 55px/s → divide by 110
        const calculatedDuration = Math.max(6, textRef.current.scrollWidth / 110);
        setDuration(calculatedDuration);
      }
    };

    compute();
    // recompute on resize to adapt to responsive layout
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <div className="mb-4 overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-white shadow-sm">
      <div className="flex h-[44px] items-center gap-3 border-b border-[var(--color-border)] bg-gradient-to-r from-[#8b1020] to-[#0b274e] px-4 text-sm font-semibold text-white">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">📢</span>
        <span>নোটিশ</span>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="overflow-hidden">
          <div
            ref={textRef}
            className="inline-block whitespace-nowrap text-sm font-medium text-[var(--color-text)] hover:[animation-play-state:paused]"
            style={{
              display: "inline-block",
              animationName: "marquee",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              animationDuration: `${duration}s`,
            }}
          >
            {notices.map((n, i) => (
              <span key={i} className="mr-8 inline-block">{n}</span>
            ))}
            {notices.map((n, i) => (
              <span key={`clone-${i}`} className="mr-8 inline-block">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
