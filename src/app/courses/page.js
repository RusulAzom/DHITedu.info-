import Link from "next/link";
import { courses } from "@/lib/courseData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-bg-light)] pt-16 md:pt-20">
        <div className="mx-auto max-w-md p-4">
          <div className="mb-4 flex items-center gap-3">
            <Link href="/" className="text-[var(--color-primary-green)]">← Back</Link>
            <h1 className="text-xl font-bold">Course Catalogue</h1>
          </div>
          <div className="grid gap-3">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/course/${course.slug}`}
                className="block rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm transition hover:bg-[var(--color-bg-light)]"
              >
                <div className="font-semibold text-[var(--color-text-dark)]">{course.title}</div>
                <div className="text-xs text-[var(--color-text-muted)]">মেয়াদ: {course.duration}</div>
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
