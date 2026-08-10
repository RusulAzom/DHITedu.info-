import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NoticeBoard from "@/components/NoticeBoard";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import BookBanner from "@/components/BookBanner";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import HighlightCard from "@/components/HighlightCard";
import PopularCourses from "@/components/PopularCourses";
import ShopSection from "@/components/ShopSection";
import UtilityGrid from "@/components/UtilityGrid";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-transparent text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-20 pt-4 lg:px-8">
        <Header />

        <div className="mt-4 space-y-4">
          <HeroSection />
          <NoticeBoard />
          <section className="rounded-[20px] bg-white p-4 shadow-sm ring-1 ring-[var(--color-border)]">
            <h2 className="text-lg font-bold text-gray-900 mb-3">আমাদের সেবা সমূহ</h2>
            <ServicesGrid />
          </section>
          <PopularCourses />
          <WhyChooseUs />
          <BookBanner />
          <ShopSection />
          <BlogSection />
          <HighlightCard />
          <UtilityGrid />
          <FAQSection />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
