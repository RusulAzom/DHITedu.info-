import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import ServicesGrid from "@/components/ServicesGrid";
import BookBanner from "@/components/BookBanner";
import PopularCourses from "@/components/PopularCourses";
import UtilityGrid from "@/components/UtilityGrid";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-transparent text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-20 pt-4 lg:px-8">
        <Header />

        <div className="mt-4 space-y-4">
          <HeroSection />
          <NewsTicker />
          <section className="rounded-[20px] bg-white p-4 shadow-sm ring-1 ring-[var(--color-border)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-muted)]">ডিজিটাল সার্ভিস</p>
                <h3 className="text-xl font-bold text-[var(--color-text-dark)]">কী করতে চান?</h3>
              </div>
              <button
                type="button"
                className="min-h-[44px] rounded-full bg-[var(--color-secondary-blue)] px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                সব সার্ভিস দেখুন
              </button>
            </div>
            <ServicesGrid />
          </section>
          <BookBanner />
          <PopularCourses />
          <UtilityGrid />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
