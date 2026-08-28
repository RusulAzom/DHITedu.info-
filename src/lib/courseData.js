export const courses = [
  { slug: "rmp", title: "R.M.P", duration: "৬ মাস" },
  { slug: "mch", title: "M.C.H (মা ও শিশু স্বাস্থ্য)", duration: "৬ মাস" },
  { slug: "nursing", title: "Nursing / নার্সিং", duration: "২ বছর" },
  { slug: "paramedical", title: "Paramedical / প্যারামেডিকেল", duration: "১ বছর" },
  { slug: "pathology", title: "DMLT/Pathology(শর্ট কোর্স)", duration: "১ বছর" },
  { slug: "pharmacy", title: "Pharmacy / ফার্মেসী", duration: "১ বছর" },
  { slug: "dms", title: "D.M.S (Diploma in Medicine & Surgery)", duration: "৪ বছর" },
  { slug: "dmsa", title: "D.M.S.A (Diploma in Medicine & Surgery Assistant)", duration: "১ বছর" },
  { slug: "dma", title: "D.M.A (Diploma in Medical Assistant)", duration: "২ বছর" },
  { slug: "pathology", title: "DMLT/Pathology(প্যাথলজি)", duration: "৪ বছর" },
  { slug: "pathology", title: "D.M.F.P (Diploma Medical Family Planning)", duration: "৪ বছর" },
  { slug: "lmsp", title: "L.M.S.P", duration: "১ বছর" },
];

export function getCourseBySlug(slug) {
  if (!slug || typeof slug !== "string") return null;
  return courses.find((c) => c.slug === slug.toLowerCase()) || null;
}

