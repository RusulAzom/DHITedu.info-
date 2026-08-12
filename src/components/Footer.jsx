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
    <footer className="bg-[#031d17] text-emerald-100/80 border-t border-emerald-900/50">
      <div className="px-4 py-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Identity */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/imgs/dhitlogo.png"
              alt="DHIT"
              className="h-9 w-auto bg-white/10 p-1 rounded-md"
            />
            <span className="text-xl font-bold text-white tracking-tight">DHITedu</span>
          </div>
          <p className="text-sm text-emerald-100/70">
            DHIT এর লক্ষ্য হল স্বপ্ন পূরণের পাশাপাশি সর্বজনীন স্বাস্থ্য ও তথ্য প্রযুক্তি প্রশিক্ষণ পৌঁছে দেওয়া।
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-900/40 text-emerald-200 transition hover:bg-emerald-800/60">f</a>
            <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-900/40 text-emerald-200 transition hover:bg-emerald-800/60">▶</a>
            <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-900/40 text-emerald-200 transition hover:bg-emerald-800/60">🟢</a>
          </div>
        </div>

        {/* Branches */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            Branches
          </h3>
          <div className="grid gap-1">
            {branchLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-emerald-400 transition-colors text-sm py-1 block"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links & Contact */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            Quick Links
          </h3>
          <div className="grid gap-1 mb-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-emerald-400 transition-colors text-sm py-1 block"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            Contact Info
          </h3>
          <div className="space-y-2 text-sm text-emerald-100/70">
            <div>
              <span className="text-white font-semibold">WhatsApp / Helpline: </span>
              +880 1355 009 341
            </div>
            <div>
              <span className="text-white font-semibold">Email: </span>
              info@dhitedu.info
            </div>
            <div>
              <span className="text-white font-semibold">Main Branch: </span>
              Dhaka, Bangladesh
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 my-6" />
      <div className="px-4 pb-24 text-center text-sm text-emerald-100/60">
        © DHITedu. All rights reserved.
      </div>
    </footer>
  );
}
