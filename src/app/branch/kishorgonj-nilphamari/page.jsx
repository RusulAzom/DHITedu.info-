import BranchDetailView from "@/components/BranchDetailView";

const data = {
  branch: {
    id: "kishorgonj-nilphamari",
    name: "Dream Health and Information Technology - Kishorgonj Nilphamari Branch",
    shortName: "DHIT Kishorgonj-Nilphamari",
    tagline: "কিশোরগঞ্জ নীলফামারী শাখা যেখানে পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি প্রশিক্ষণের নিশ্চয়তfulness রয়েছে",
    govtApproved: true,
    govtRegNo: "সি-১৭০২২৮/২১",
    approvalNote: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত এবং স্বাস্থ্য অধিদপ্তরের কারিকুলাম অনুসারে",
    govtRegNoShort: "সি-১৭০২২৮",
  },
  director: {
    name: "Director (DHIT Kishorgonj Nilphamari)",
    designation: "Director (DHIT Kishorgonj Nilphamari)",
    email: "kishorgonj@dhitedu.info",
    phonePrimary: "01XXXXXXXXX",
    phoneSecondary: [],
  },
  contact: {
    address: "কিশোরগঞ্জ নীলফামারী, বাংলাদেশ",
    addressEn: "Kishorgonj Nilphamari, Bangladesh",
    district: "Nilphamari",
    phones: ["01XXXXXXXXX"],
    email: "kishorgonj@dhitedu.info",
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
    slug: "kishorgonj-nilphamari",
    metaTitle: "DHIT Kishorgonj Nilphamari Branch - Dream Health and Information Technology",
    metaDescription: "DHIT Kishorgonj Nilphamari Branch. Govt approved paramedical courses including RMP, DMA, DMF, Dental & Nursing. Admission going on.",
  },
};

export const metadata = {
  title: "কিশোরগঞ্জ নীলফামারী শাখা | DHIT - Dream Health & Information Technology",
  description: "DHIT কিশোরগঞ্জ নীলফামারী শাখার পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি কোর্সসমূহ। ভর্তি চলছে।",
  openGraph: {
    title: "DHIT Kishorgonj Nilphamari Branch",
    description: "Medical Assistant, Paramedical & Nursing Courses at Kishorgonj Nilphamari Branch.",
  },
};

export default function KishorgonjNilphamariPage() {
  return <BranchDetailView data={data} />;
}
