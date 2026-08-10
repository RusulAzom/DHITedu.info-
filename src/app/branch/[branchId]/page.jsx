import BranchDetailView from "@/components/BranchDetailView";
import { notFound } from "next/navigation";

function isValidSlug(slug) {
  if (!slug || typeof slug !== "string") return false;
  // allow lowercase letters, numbers, hyphen and underscore
  return /^[a-z0-9_-]+$/.test(slug);
}

export async function generateMetadata({ params }) {
  const { branchId } = params ?? {};
  if (!isValidSlug(branchId)) return {};

  try {
    const mod = await import(`@/data/branch/${branchId}.json`);
    const data = mod?.default ?? mod;
    return {
      title: data?.seo?.metaTitle || data?.branch?.name,
      description: data?.seo?.metaDescription || data?.branch?.tagline,
      openGraph: {
        title: data?.seo?.metaTitle,
        description: data?.seo?.metaDescription,
      },
    };
  } catch (e) {
    return {};
  }
}

export default async function Page({ params }) {
  const { branchId } = params ?? {};
  if (!isValidSlug(branchId)) return notFound();

  try {
    const mod = await import(`@/data/branch/${branchId}.json`);
    const data = mod?.default ?? mod;
    return <BranchDetailView data={data} />;
  } catch (err) {
    console.error("Branch import failed:", err);
    return notFound();
  }
}
