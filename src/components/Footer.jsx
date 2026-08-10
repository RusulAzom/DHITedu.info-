import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "All Courses", href: "/courses" },
  { label: "Medicine Directory", href: "/shop" },
  { label: "Result Check", href: "/" },
  { label: "Certificate Verify", href: "/" },
  { label: "Shop", href: "/shop" },
];

const branchLinks = [
  { label: "ঢাকা সেন্ট্রাল", href: "/branch/dhakacentral" },
  { label: "চান্দিনা", href: "/branch/chandina" },
  { label: "দিনাজপুর-খানসামা", href: "/branch/dinajpur-khanshama" },
  { label: "কিশোরগঞ্জ নীলফামারী", href: "/branch/kishorgonj-nilphamari" },
  { label: "ভোলা জেলা", href: "/branch/bholadistrict" },
  { label: "মনিরামপুর", href: "/branch/monirampur" },
  { label: "অনলাইন ব্যাচ", href: "/branch/online-batch" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="text-xl font-black text-white">DHIT - Dream Health and Information Technology</div>
            <p className="max-w-xl text-sm text-slate-300">
              DHIT এর লক্ষ্য হল স্বপ্ন পূরণের পাশাপাশি সর্বজনীন স্বাস্থ্য ও তথ্য প্রযুক্তি প্রশিক্ষণ পৌঁছে দেওয়া।
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-white transition hover:bg-slate-700">f</a>
              <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-white transition hover:bg-slate-700">▶</a>
              <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-white transition hover:bg-slate-700">🟢</a>
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold text-white">Branches</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {branchLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold text-white">Quick Links</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold text-white">Contact Info</div>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div>
                <div className="text-slate-200 font-semibold">WhatsApp / Helpline</div>
                <div>+880 1355 009 341</div>
              </div>
              <div>
                <div className="text-slate-200 font-semibold">Email</div>
                <div>info@dhitedu.info</div>
              </div>
              <div>
                <div className="text-slate-200 font-semibold">Main Branch</div>
                <div>Dhaka, Bangladesh</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
          © 2026 DHIT - Dream Health & Information Technology. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
