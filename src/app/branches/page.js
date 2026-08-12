import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const branchLocations = [
  { label: "ঢাকা সেন্ট্রাল", value: "dhakacentral" },
  { label: "চান্দিনা", value: "chandina" },
  { label: "ভোলা জেলা", value: "bholadistrict" },
  { label: "মণিরামপুর", value: "monirampur" },
  { label: "পাকেরহাট", value: "pakerhat" },
  { label: "কিশোরগঞ্জ নীলফামারী", value: "kishorgonj-nilphamari" },
];

export default function BranchesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-3xl p-4">
          <div className="mb-4 flex items-center gap-3">
            <Link href="/" className="text-[var(--color-primary-green)]">← Home</Link>
            <h1 className="text-xl font-bold">শাখা সমূহ</h1>
          </div>
          <p className="mb-4 text-sm text-[var(--color-text-muted)]">DHIT-এর সব শাখার তালিকা এখানে দেখুন। ঢাকা সহ সব সাইটে ভর্তি চলছে।</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {branchLocations.map((b) => (
              <Link key={b.value} href={`/branch/${b.value}`} className="block rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-light)] p-4 shadow-sm">
                <div className="text-base font-semibold text-[var(--color-text-dark)]">{b.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
