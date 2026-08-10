import React from "react";

const offers = [
  "L.M.A.F (৬ মাস)",
  "D.M.S (১ বছর)",
  "R.M.P (৩ মাস)",
  "নার্সিং / ফার্মেসী / প্যাথলজি",
];

export default function HighlightCard() {
  return (
    <section className="rounded-[24px] bg-gradient-to-r from-[#064e25] via-[#0a7f2e] to-[#128750] p-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold tracking-wide text-white">
            🔥 ৩০% ছাড় অন-লাইন কোর্সে ভর্তি চলছে! 🔥
          </div>
          <div>
            <p className="text-sm text-white/80">DHIT - Dream Health and Information Technology</p>
            <h3 className="mt-2 text-2xl font-bold text-white">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত প্রতিষ্ঠান কর্তৃক পরিচালিত পল্লী ডাক্তার কোর্সে ছাত্র/ছাত্রী ভর্তি চলছে!</h3>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {offers.map((offer) => (
              <span key={offer} className="inline-flex items-center rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                {offer}
              </span>
            ))}
          </div>
          <p className="text-sm text-white/90">🗓️ ক্লাস: প্রতি শুক্রবার ও শনিবার (Google Meet / Zoom)</p>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="/online"
            className="rounded-full bg-white px-6 py-4 text-sm font-bold text-[#0A7F2E] shadow-lg transition hover:bg-white/90"
          >
            এখনই অনলাইনে ভর্তি হন
          </a>
        </div>
      </div>
    </section>
  );
}
