export const courses = [
  { slug: "lmaf", title: "L.M.A.F (পল্লী চিকিৎসক)", duration: "৬ মাস" },
  { slug: "mch", title: "M.C.H (মা ও শিশু স্বাস্থ্য)", duration: "৬ মাস" },
  { slug: "nursing", title: "Nursing / নার্সিং", duration: "২ বছর" },
  { slug: "paramedical", title: "Paramedical / প্যারামেডিকেল", duration: "১ বছর" },
  { slug: "pharmacy", title: "Pharmacy / ফার্মেসী", duration: "১ বছর" },
  { slug: "dms", title: "D.M.S (Diploma in Medicine & Surgery)", duration: "১ বছর" },
    { slug: "dms", title: "D.M.S (Diploma in Medicine & Surgery Assistant)", duration: "১ বছর" },
  { slug: "dma", title: "D.M.A (Diploma in Medical Assistant)", duration: "২ বছর" },
  { slug: "rmp", title: "R.M.P / E.K.M.S", duration: "৬ মাস" },
  { slug: "pathology", title: "DMLT/Pathology(প্যাথলজি)", duration: "৪ বছর" },
  { slug: "lmsp", title: "L.M.S.P", duration: "১ বছর" },
];

export function getCourseBySlug(slug) {
  if (!slug || typeof slug !== "string") return null;
  return courses.find((c) => c.slug === slug.toLowerCase()) || null;
}

