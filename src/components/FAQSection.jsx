"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "ক্লাস কি অফলাইনে না অনলাইনে হয়?",
    answer:
      "DHIT এর প্রতিটি অনুমোদিত ব্রাঞ্চে প্র্যাকটিক্যালসহ সরাসরি অফলাইন ক্লাস অনুষ্ঠিত হয়। পাশাপাশি যারা ঘরে বসে শিখতে চান, তাদের জন্য অনলাইন লাইভ ক্লাসের সুযোগ রয়েছে।",
  },
  {
    question: "আমি কীভাবে ভর্তি হবো?",
    answer:
      "সরাসরি শারীরিকভাবে ভর্তি হতে আপনার নিকটস্থ DHIT সেন্টারে যোগাযোগ করুন। এছাড়া ওয়েবসাইট থেকে অনলাইনেও আবেদন করা যাবে।",
  },
  {
    question: "অনলাইন কোর্সের প্র্যাকটিক্যাল বা ইন্টার্নশিপ কীভাবে হবে?",
    answer:
      "অনলাইন ব্যাচের শিক্ষার্থীদের কোর্স শেষে প্র্যাকটিক্যাল ক্লাস ও ৭ দিনের বাধ্যতামূলক ইন্টার্নশিপ DHIT এর মেইন ব্রাঞ্চ বা নিকটস্থ যেকোনো অনুমোদিত সেন্টারে উপস্থিত হয়ে সম্পন্ন করতে হবে।",
  },
  {
    question: "ভর্তির যোগ্যতা ও ক্লাসের সময়সূচী কী?",
    answer: "ন্যূনতম ৮ম শ্রেণি বা SSC পাস। ক্লাস সাধারণত প্রতি শুক্রবার ও শনিবার অনুষ্ঠিত হয়।",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="space-y-4 rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-[var(--color-primary-green)]">প্রায় জিজ্ঞাসিত প্রশ্ন</p>
        <h3 className="mt-2 text-2xl font-bold text-[var(--color-text-dark)]">অফলাইন-প্রথম নির্দেশিকা</h3>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <button
              key={faq.question}
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-light)] p-4 text-left"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-base font-semibold text-[var(--color-text-dark)]">{faq.question}</span>
                <span className="text-xl text-[var(--color-primary-green)]">{isOpen ? "−" : "+"}</span>
              </div>
              {isOpen ? (
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">{faq.answer}</p>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
