import BranchDetailView from "@/components/BranchDetailView";

const data = {
  branch: {
    id: "online-batch",
    name: "DHIT Online Batch",
    shortName: "DHIT Online",
    tagline: "অনলাইন মাধ্যমেই পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি কোর্স Available এবং দক্ষতা বৃদ্ধির সুযোগ রয়েছে",
    govtApproved: true,
    govtRegNo: "সি-১৭০২৩০/২১",
    approvalNote: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত এবং স্বাস্থ্য অধিদপ্তরের কারিকুলাম অনুসারে",
    govtRegNoShort: "সি-১৭০২৩০",
  },
  director: {
    name: "Director (DHIT Online)",
    designation: "Director (DHIT Online Batch)",
    email: "online@dhitedu.info",
    phonePrimary: "01XXXXXXXXX",
    phoneSecondary: [],
  },
  contact: {
    address: "অনলাইন ব্যাচ, ঢাকা, বাংলাদেশ",
    addressEn: "Online Batch, Dhaka, Bangladesh",
    district: "Dhaka",
    phones: ["01XXXXXXXXX"],
    email: "online@dhitedu.info",
  },
  admission: {
    status: "ভর্তি চলছে",
    statusEn: "Admission Going On",
    announcement: "সুখবর! সুখবর!!! অনলাইন ব্যাচে ভর্তি চলছে",
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
    slug: "online-batch",
    metaTitle: "DHIT Online Batch - Dream Health and Information Technology",
    metaDescription: "DHIT Online Batch. Govt approved online paramedical courses including RMP, DMA, DMF, Dental & Nursing. Admission going on.",
  },
};

export const metadata = {
  title: "অনলাইন ব্যাচ | DHIT - Dream Health & Information Technology",
  description: "DHIT অনলাইন ব্যাচের পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি কোর্সসমূহ। বাড়ি থেকে অনলাইন এ Bengali কোর্স।",
  openGraph: {
    title: "DHIT Online Batch",
    description: "Online Medical Assistant, Paramedical & Nursing Courses from DHIT.",
  },
};

export default function OnlineBatchPage() {
  return <BranchDetailView data={data} />;
}
