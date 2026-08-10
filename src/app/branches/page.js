import Link from "next/link";

const branchLocations = [
  "ঢাকা সেন্ট্রাল",
  "চান্দিনা",
  "ভোলা জেলা",
  "মণিরামপুর",
  "পাকেরহাট",
  "কিশোরগঞ্জ নীলফামারী",
];

export default function BranchesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl p-4">
        <div className="mb-4 flex items-center gap-3">
          <Link href="/" className="text-[var(--color-primary-green)]">← Home</Link>
          <h1 className="text-xl font-bold">শাখা সমূহ</h1>
        </div>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">DHIT-এর সব শাখার তালিকা এখানে দেখুন। ঢাকা সহ সব সাইটে ভর্তি চলছে।</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {branchLocations.map((branch) => (
            <div key={branch} className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-light)] p-4 shadow-sm">
              <div className="text-base font-semibold text-[var(--color-text-dark)]">{branch}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
