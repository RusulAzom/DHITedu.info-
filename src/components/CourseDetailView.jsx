import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function CourseDetailView({ course }) {
  const isGeneral = !course;

  const admissionRules = [
    {
      title: "ভর্তির যোগ্যতা",
      body: "এসএসসি/সমমান পাস (যেকোনো গ্রুপ, যেকোনো সাল)।",
    },
    {
      title: "প্রয়োজনীয় কাগজপত্র",
      list: [
        "এসএসসি পাস সনদের সত্যায়িত ফটোকপি - ২ কপি।",
        "পাসপোর্ট সাইজ ছবি - ৪ কপি ও স্ট্যাম্প সাইজ ছবি - ২ কপি।",
        "জাতীয় পরিচয়পত্র (NID) বা জন্ম নিবন্ধনের ফটোকপি - ২ কপি।",
      ],
    },
    {
      title: "কোর্স বৈশিষ্ট্য",
      list: [
        "অভিজ্ঞ এমবিবিএস ও বিশেষজ্ঞ ডাক্তার দ্বারা ক্লাস পরিচালিত।",
        "ব্যবহারিক ক্লাসের সুব্যবস্থা ও ক্লিনিকাল ইন্টার্নশিপের সুযোগ।",
        "কোর্স শেষে সরকারি নিবন্ধিত ও অনুমোদনপ্রাপ্ত সনদপত্র প্রদান।",
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-bg-light)] pt-20">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <div className="mb-4 flex items-center gap-3">
            <Link href="/" className="text-[var(--color-primary-green)]">← Back</Link>
            <Link href="/courses" className="text-sm text-[var(--color-text-muted)]">Course Catalogue</Link>
        </div>

        {/* DHIT Branding Header */}
        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[var(--color-border)]">
          <img
            src="/imgs/dhitlogo.png"
            alt="DHIT Logo"
            className="h-14 w-14 object-contain"
          />
          <div>
            <h1 className="text-base font-black leading-tight text-[var(--color-primary-green)]">
              Dream Health and Information Technology - DHIT
            </h1>
            <div className="text-xs text-[var(--color-text-muted)]">
              Govt Approved: সি-১৭০২২৪/২১
            </div>
          </div>
        </div>

        {/* Selected Course Banner */}
        <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#004B82] via-[#0A7F2E] to-[#0A9A88] p-5 text-white shadow-md">
          <div className="text-xs uppercase tracking-wide text-white/80">Selected Course</div>
          <h2 className="mt-1 text-xl font-bold">
            {isGeneral
              ? "General Course Information & Admission Guidelines"
              : `${course.title} - মেয়াদ: ${course.duration}`}
          </h2>
        </div>

        {/* Common Admission Rules & Information */}
        <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[var(--color-border)]">
          <h3 className="text-lg font-bold text-[var(--color-text-dark)]">
            সাধারণ ভর্তির নিয়মাবলী
          </h3>
          <div className="mt-4 space-y-4">
            {admissionRules.map((rule) => (
              <div
                key={rule.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-light)] p-4"
              >
                <div className="text-sm font-semibold text-[var(--color-primary-green)]">
                  {rule.title}
                </div>
                {rule.body ? (
                  <p className="mt-1 text-sm text-[var(--color-text-dark)]">{rule.body}</p>
                ) : null}
                {rule.list ? (
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--color-text-dark)]">
                    {rule.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-4 rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)]">
            ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য নিকটস্থ ডিএইচআইটি শাখায় যোগাযোগ করুন।
          </p>
          <Link
            href="/branches"
            className="mt-3 inline-block rounded-full bg-[#0A7F2E] px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            শাখা খুঁজুন
          </Link>
        </div>
      </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
