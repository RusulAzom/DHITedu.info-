import BranchDetailView from "@/components/BranchDetailView";

const data = {
  branch: {
    id: "dinajpur-khanshama",
    name: "Dream Health and Information Technology - Dinajpur Khanshama Branch",
    shortName: "DHIT Dinajpur-Khanshama",
    tagline: "দিনাজপুর-খানসামা শাখা যেখানে পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি প্রশিক্ষণের সুযোগ রয়েছে",
    govtApproved: true,
    govtRegNo: "সি-১৭০২২৭/২১",
    approvalNote: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত এবং স্বাস্থ্য অধিদপ্তরের কারিকুলাম অনুসারে",
    govtRegNoShort: "সি-১৭০২২৭",
  },
  director: {
    name: "Director (DHIT Dinajpur Khanshama)",
    designation: "Director (DHIT Dinajpur Khanshama)",
    email: "dinajpur@dhitedu.info",
    phonePrimary: "01XXXXXXXXX",
    phoneSecondary: [],
  },
  contact: {
    address: "দিনাজপুর-খানসামা, দিনাজপুর, বাংলাদেশ",
    addressEn: "Dinajpur Khanshama, Dinajpur, Bangladesh",
    district: "Dinajpur",
    phones: ["01XXXXXXXXX"],
    email: "dinajpur@dhitedu.info",
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
    slug: "dinajpur-khanshama",
    metaTitle: "DHIT Dinajpur Khanshama Branch - Dream Health and Information Technology",
    metaDescription: "DHIT Dinajpur Khanshama Branch. Govt approved paramedical courses including RMP, DMA, DMF, Dental & Nursing. Admission going on.",
  },
};

export const metadata = {
  title: "দিনাজপুর-খানসামা শাখা | DHIT - Dream Health & Information Technology",
  description: "DHIT দিনাজপুর-খানসামা শাখার পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি কোর্সসমূহ। ভর্তি চলছে।",
  openGraph: {
    title: "DHIT Dinajpur Khanshama Branch",
    description: "Medical Assistant, Paramedical & Nursing Courses at Dinajpur Khanshama Branch.",
  },
};

export default function DinajpurKhanshamaPage() {
  return <BranchDetailView data={data} />;
}
