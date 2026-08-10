"use client";

import React, { useEffect, useState } from "react";

const slides = [
  {
    badge: "DHIT - Dream Health and Information Technology",
    title: "স্বচ্ছ ও বাস্তবভিত্তিক গ্রামীণ চিকিৎসা প্রশিক্ষণ",
    subtitle: "আমাদের লক্ষ্য সার্টিফিকেট বিক্রি নয়, আপনাকে দক্ষ পল্লী ডাক্তার হিসেবে গড়ে তোলা। প্রতিটি নিকটস্থ সেন্টারে সরাসরি অফলাইন প্র্যাকটিক্যাল ক্লাস অনুষ্ঠিত হয়।",
  },
  {
    badge: "ভর্তি চলছে",
    title: "ন্যূনতম ৮ম শ্রেণি / SSC পাশেই চিকিৎসা প্রশিক্ষণ",
    subtitle: "যে কোনো বিভাগ থেকে ১৭+ বছর বয়সী আগ্রহী যে কেউ আবেদন করতে পারবেন। প্রতিটি নিকটস্থ সেন্টারে সরাসরি অফলাইন প্র্যাকটিক্যাল ক্লাস অনুষ্ঠিত হয়।",
  },
  {
    badge: "Digital Skill",
    title: "Mastering AI & Virtual Assistance",
    subtitle: "স্মার্টফোনেই শিখুন আধুনিক এআই টুলস ও ভার্চুয়াল অ্যাসিস্ট্যান্টের কাজ।",
  },
  {
    badge: "Freelancing",
    title: "মোবাইল ফ্রিল্যান্সিং ক্যারিয়ার কোর্স",
    subtitle: "ঘরে বসে পার্ট-টাইম ইনকামের সুনির্দিষ্ট দিকনির্দেশনা ও প্র্যাকটিক্যাল গাইডলাইন।",
  },
  {
    badge: "অনলাইন ব্যাচ",
    title: "ঘরে বসেই অনলাইন কোর্সে দক্ষ পল্লী চিকিৎসক হন",
    subtitle: "Google Meet & Zoom এর মাধ্যমে প্রতি শুক্রবার ও শনিবার সরাসরি ক্লাস।",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const slideCount = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5500);

    return () => clearInterval(interval);
  }, [slideCount]);

  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % slideCount);

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  return (
    <section className="space-y-3">
      <div
        className="relative h-[380px] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#004B82] via-[#0A7F2E] to-[#0A9A88] p-5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:h-[414px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* layered slides for fade transition */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-500 ease-in-out ${
                  isActive ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
                }`}
              >
                <div className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  {slide.badge}
                </div>
                <h2 className="mt-6 text-[1.7rem] font-black leading-tight sm:text-[2rem]">{slide.title}</h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-white/85 sm:text-base">{slide.subtitle}</p>

                <div className="mt-8 flex flex-col items-center gap-3">
                  <a
                    href="/courses"
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0A7F2E] transition hover:bg-white/90"
                  >
                    ভর্তি হন
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* pagination dots at very bottom */}
        <div className="absolute left-0 right-0 bottom-3 flex items-center justify-center gap-2 z-30">
          {slides.map((_, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ease-in-out focus:outline-none ${
                  isActive ? "w-6 h-2 bg-[#0A7F2E] rounded-full" : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
