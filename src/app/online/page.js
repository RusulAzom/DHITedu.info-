import Link from "next/link";

export default function OnlineCoursePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl p-4">
        <div className="mb-4 flex items-center gap-3">
          <Link href="/" className="text-[var(--color-primary-green)]">← Home</Link>
          <h1 className="text-xl font-bold">অনলাইন কোর্স</h1>
        </div>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          ঘরে বসেই অনলাইনে ভর্তি ও ক্লাস নিন। প্রতি শুক্রবার ও শনিবার Google Meet এবং Zoom এর মাধ্যমে সরাসরি ক্লাস চলবে।
        </p>
        <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-light)] p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--color-text-dark)]">DHIT - Dream Health and Information Technology (অনলাইন ব্যাচ)</h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">ঘরে বসে অনলাইন ব্যাচে ভর্তি নিন এবং অফিসিয়াল DHIT(full form) ব্যানারে প্রশিক্ষণ গ্রহণ করুন।</p>
        </div>
        <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-light)] p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--color-text-dark)]">অনলাইন ব্যাচের সুবিধা</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-text-muted)]">
            <li>✔️ সরাসরি লাইভ ক্লাস Google Meet ও Zoom এ</li>
            <li>✔️ শুক্রবার ও শনিবার ক্লাস শিডিউল</li>
            <li>✔️ সহজ ও বোঝার মতো প্রশিক্ষণ</li>
            <li>✔️ ভর্তি প্রক্রিয়া সরাসরি অনলাইনে</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
