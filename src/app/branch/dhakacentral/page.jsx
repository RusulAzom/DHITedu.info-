import BranchDetailView from "@/components/BranchDetailView";

const data = {
  branch: {
    id: "dhaka-central",
    name: "Dream Health and Information Technology - Dhaka Central Branch",
    shortName: "DHIT Dhaka Central",
    tagline: "ঢাকার কেন্দ্রীয় শাখা যেখানে পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি কোর্স Available এবং দক্ষতা বৃদ্ধির সুযোগ রয়েছে",
    govtApproved: true,
    govtRegNo: "সি-১৭০২২৫/২১",
    approvalNote: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত এবং স্বাস্থ্য অধিদপ্তরের কারিকুলাম অনুসারে",
    govtRegNoShort: "সি-১৭০২২৫",
  },
  director: {
    name: "Director (DHIT Dhaka Central)",
    designation: "Director (DHIT Dhaka Central)",
    email: "dhakacentral@dhitedu.info",
    phonePrimary: "01XXXXXXXXX",
    phoneSecondary: [],
  },
  contact: {
    address: "ঢাকা সেন্ট্রাল, ঢাকা, বাংলাদেশ",
    addressEn: "Dhaka Central, Dhaka, Bangladesh",
    district: "Dhaka",
    phones: ["01XXXXXXXXX"],
    email: "dhakacentral@dhitedu.info",
  },
  admission: {
    status: "ভর্তি চলছে",
    statusEn: "Admission Going On",
    announcement: "সুখবর! সুখবর!!! ভর্তি চলছে",
    durationOptions: ["3 মাস", "6 মাস", "1 বছর", "2 বছর"],
  },
  availableCourses: [
    { code: "RMP", name: "RMP - Rural Medical Practitioner / Palli Chikitsak", category: "Paramedical" },
    { code: "DMA", name: "DMA - Diploma in Medical Assistant", category: "Paramedical" },
    { code: "DMF", name: "DMF - Diploma in Medical Faculty", category: "Paramedical" },
    { code: "DENTAL", name: "Dental Course", category: "Paramedical" },
    { code: "NURSING", name: "Nursing Course", category: "Paramedical" },
    { code: "PARAMEDICAL", name: "Paramedical Course - General", category: "Paramedical" },
  ],
  courseDurations: ["3 Months", "6 Months", "1 Year", "2 Years"],
  studentList: {
    title: "Student Lists",
    titleBn: "ছাত্র-ছাত্রীদের তালিকা",
    previewType: "googleDocsEmbed",
    tabs: [],
  },
  seo: {
    slug: "dhaka-central",
    metaTitle: "DHIT Dhaka Central Branch - Dream Health and Information Technology",
    metaDescription: "DHIT Dhaka Central Branch. Govt approved paramedical courses including RMP, DMA, DMF, Dental & Nursing. Admission going on.",
  },
};

export const metadata = {
  title: "ঢাকা সেন্ট্রাল শাখা | DHIT - Dream Health & Information Technology",
  description: "DHIT ঢাকা সেন্ট্রাল শাখার পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি কোর্সসমূহ। ভর্তি চলছে।",
  openGraph: {
    title: "DHIT Dhaka Central Branch",
    description: "Medical Assistant, Paramedical & Nursing Courses at Dhaka Central Branch.",
  },
};

export default function DhakaCentralPage() {
  return <BranchDetailView data={data} />;
}
