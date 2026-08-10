import BranchDetailView from "@/components/BranchDetailView";

const data = {
  branch: {
    id: "chandina",
    name: "Dream Health and Information Technology - Chandina Branch",
    shortName: "DHIT Chandina",
    tagline: "চান্দিনা শাখা যেখানে পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি প্রশিক্ষণের নিশ্চয়তfulness রয়েছে",
    govtApproved: true,
    govtRegNo: "সি-১৭০২২৬/২১",
    approvalNote: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত এবং স্বাস্থ্য অধিদপ্তরের কারিকুলাম অনুসারে",
    govtRegNoShort: "সি-১৭০২২৬",
  },
  director: {
    name: "Director (DHIT Chandina)",
    designation: "Director (DHIT Chandina)",
    email: "chandina@dhitedu.info",
    phonePrimary: "01XXXXXXXXX",
    phoneSecondary: [],
  },
  contact: {
    address: "চান্দিনা, কুমিল্লা, বাংলাদেশ",
    addressEn: "Chandina, Comilla, Bangladesh",
    district: "Comilla",
    phones: ["01XXXXXXXXX"],
    email: "chandina@dhitedu.info",
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
    slug: "chandina",
    metaTitle: "DHIT Chandina Branch - Dream Health and Information Technology",
    metaDescription: "DHIT Chandina Branch. Govt approved paramedical courses including RMP, DMA, DMF, Dental & Nursing. Admission going on.",
  },
};

export const metadata = {
  title: "চান্দিনা শাখা | DHIT - Dream Health & Information Technology",
  description: "DHIT চান্দিনা শাখার পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি কোর্সসমূহ। ভর্তি চলছে।",
  openGraph: {
    title: "DHIT Chandina Branch",
    description: "Medical Assistant, Paramedical & Nursing Courses at Chandina Branch.",
  },
};

export default function ChandinaPage() {
  return <BranchDetailView data={data} />;
}
