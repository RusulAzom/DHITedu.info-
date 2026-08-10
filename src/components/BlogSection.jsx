import React from "react";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "অ্যান্টিবায়োটিক কেন ডাক্তারের পরামর্শ ছাড়া খাবেন না?",
    category: "সচেতনতা",
    readTime: "৪ মিনিট",
    summary: "অ্যান্টিবায়োটিক রেজিস্ট্যান্স এবং সঠিক ডোজ না মানার মারাত্মক ঝুঁকি।",
  },
  {
    id: 2,
    title: "উপমহাদেশের চিকিৎসা জগতের পথিকৃৎ: ডাক্তার বিধান চন্দ্র রায়",
    category: "বায়োগ্রাফি",
    readTime: "৫ মিনিট",
    summary: "কিংবদন্তি চিকিৎসক ড. বি সি রায়ের জীবন ও চিকিৎসা দর্শনের গল্প।",
  },
  {
    id: 3,
    title: "মেডিকেল কেস স্টাডি: বিশ্বের প্রথম সফল মানব হূৎপিণ্ড প্রতিস্থাপন",
    category: "কেস স্টাডি",
    readTime: "৬ মিনিট",
    summary: "১৯৬৭ সালে ড. ক্রিশ্চিয়ান বার্নার্ডের ঐতিহাসিক সার্জারির ব্যবচ্ছেদ।",
  },
  {
    id: 4,
    title: "প্রেসক্রিপশনের সংকেত পাঠ: 'Rx', 'TDS', 'BD' কথাগুলোর আসল অর্থ কী?",
    category: "ফার্মাকোলজি",
    readTime: "৩ মিনিট",
    summary: "পল্লী চিকিৎসকদের জন্য প্রেসক্রিপশন সহজে পড়ার নির্দেশিকা।",
  },
  {
    id: 5,
    title: "ইমার্জেন্সি 'গোল্ডেন আওয়ার': দুর্ঘটনা ও স্ট্রোকের প্রথম ১০ মিনিটে করণীয়",
    category: "ফার্স্ট এইড",
    readTime: "৫ মিনিট",
    summary: "সংকট মুহূর্তে রোগীর প্রাণ বাঁচানোর প্রাথমিক চিকিৎসা কৌশল।",
  },
  {
    id: 6,
    title: "কেস স্টাডি: পেনিসিলিন আবিষ্কার ও চিকিৎসা বিজ্ঞানের মোড় ঘোরানো অধ্যায়",
    category: "ইতিহাস",
    readTime: "৪ মিনিট",
    summary: "অ্যালেকজান্ডার ফ্লেমিংয়ের দুর্ঘটনাবশত আবিষ্কার কীভাবে কোটি প্রাণ বাঁচাল।",
  },
  {
    id: 7,
    title: "রক্তচাপ (BP) মাপার সঠিক নিয়ম ও প্রচলিত ৩টি ভুল ধারণা",
    category: "ডায়াগনোসিস",
    readTime: "৩ মিনিট",
    summary: "অ্যানালগ ও ডিজিটাল বিপি মেশিনের সঠিক প্র্যাকটিক্যাল ব্যবহার।",
  },
  {
    id: 8,
    title: "মা ও শিশুর পুষ্টি এবং গর্ভকালীন ৫টি বিপজ্জনক লক্ষণ",
    category: "এমসিএইচ care",
    readTime: "৫ মিনিট",
    summary: "গ্রাম পর্যায়ে মা ও শিশু স্বাস্থ্য সুরক্ষায় প্রাথমিক চিকিৎসকের দায়িত্ব।",
  },
  {
    id: 9,
    title: "ওটিসি (OTC) ওষুধ বনাম প্রেসক্রিপশন ড্রাগ: কোনোটি নিজে কেনা নিরাপদ?",
    category: "ঔষধ পরিচিতি",
    readTime: "৪ মিনিট",
    summary: "কাউন্টার থেকে বিক্রিযোগ্য সাধারণ ওষুধের নিরাপদ তালিকা।",
  },
  {
    id: 10,
    title: "রোগীর কেস হিস্ট্রি নেওয়ার সহজ কৌশল: কম খরচে সঠিক রোগ নির্ণয়",
    category: "ক্লিনিক্যাল স্কিল",
    readTime: "৫ মিনিট",
    summary: "সাধারণ উপসর্গ শুনে প্রাথমিক ধারণায় পৌঁছানোর বৈজ্ঞানিক উপায়।",
  },
];

export default function BlogSection() {
  const topPosts = posts.slice(0, 3);
  const listPosts = posts.slice(3);

  return (
    <section className="space-y-4 rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-[var(--color-primary-green)]">স্বাস্থ্য বার্তা ও কেস স্টাডি</p>
        <h3 className="mt-2 text-2xl font-bold text-[var(--color-text-dark)]">চিকিৎসা বিজ্ঞান, সচেতনতা ও পল্লী চিকিৎসকদের জন্য প্র্যাকটিক্যাল গাইড</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-3">
          <div className="overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-light)] shadow-sm">
            <div className="h-52 overflow-hidden bg-gray-100">
              <img
                src="https://www.bssnews.net/bangla/assets/news_photos/2022/12/03/image-69193-1670063212.jpg"
                alt={topPosts[0].title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-[var(--color-text-dark)]">{topPosts[0].title}</h4>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{topPosts[0].summary}</p>
              <div className="mt-3">
                <Link href="/blog" className="text-sm font-semibold text-[var(--color-primary-green)]">
                  বিস্তারিত →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1 rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-light)] p-4">
        {listPosts.map((post) => (
          <Link
            key={post.id}
            href="/blog"
            className="flex items-center justify-between border-b border-gray-100 py-1.5 text-xs sm:text-sm font-medium text-gray-800 transition hover:text-[#0A7F2E]"
          >
            <span>{post.title}</span>
            <span>→</span>
          </Link>
        ))}
      </div>

      <div className="mt-4">
        <Link href="/blog" className="w-full inline-flex items-center justify-center rounded-full bg-[var(--color-secondary-blue)] px-4 py-3 text-sm font-bold text-white">
          সকল ব্লগ ও কেস স্টাডি দেখুন →
        </Link>
      </div>
    </section>
  );
}
