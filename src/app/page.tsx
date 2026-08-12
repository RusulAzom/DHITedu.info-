import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NoticeBoard from "@/components/NoticeBoard";
import QuickActions from "@/components/QuickActions";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import BookBanner from "@/components/BookBanner";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import HighlightCard from "@/components/HighlightCard";
import PopularCourses from "@/components/PopularCourses";
import { courses } from "@/lib/courseData";
import ShopSection from "@/components/ShopSection";
import UtilityGrid from "@/components/UtilityGrid";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-transparent text-[var(--color-text)] overflow-x-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-20 pt-20 lg:px-8">
        <Header />

        <div className="mt-4 space-y-4">
          <HeroSection />
          <NoticeBoard />
          <QuickActions />
          <section className="rounded-[20px] bg-white p-4 shadow-sm ring-1 ring-[var(--color-border)]">
            <h2 className="text-lg font-bold text-gray-900 mb-3">আমাদের সেবা সমূহ</h2>
            <ServicesGrid />
          </section>
          <PopularCourses courses={courses} />
          <WhyChooseUs />
          <BookBanner />
          <ShopSection />
          <BlogSection />
          <HighlightCard />
          <UtilityGrid />
          <FAQSection />
        </div>
      </div>
      <Footer />
      <a
        href="https://wa.me/8801725949612"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-50 p-3 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
      </a>
      <BottomNav />
    </main>
  );
}
