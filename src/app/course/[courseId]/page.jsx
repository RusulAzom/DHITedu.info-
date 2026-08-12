import { notFound } from "next/navigation";
import CourseDetailView from "@/components/CourseDetailView";
import { courses, getCourseBySlug } from "@/lib/courseData";

export function generateStaticParams() {
  return courses.map((c) => ({ courseId: c.slug }));
}

export async function generateMetadata({ params }) {
  const { courseId } = params ?? {};
  const course = getCourseBySlug(courseId);
  if (!course) {
    return {
      title: "Course Information & Admission Guidelines | DHIT",
      description: "General course information and admission guidelines for DHIT.",
    };
  }
  return {
    title: `${course.title} - DHIT`,
    description: `${course.title} (মেয়াদ: ${course.duration}) admission information and guidelines.`,
  };
}

export default async function CoursePage({ params, searchParams }) {
  const { courseId } = params ?? {};
  const type =
    (typeof searchParams?.type === "string" && searchParams.type) ||
    (Array.isArray(searchParams?.type) && searchParams.type[0]) ||
    null;

  const course = getCourseBySlug(courseId) || getCourseBySlug(type);

  if (courseId && !course && !type) {
    return notFound();
  }

  return <CourseDetailView course={course || null} />;
}
