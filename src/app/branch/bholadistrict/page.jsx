import BranchDetailView from "@/components/BranchDetailView";
import data from "@/data/branch/bholadistrict.json";

export const metadata = {
  title: "ভোলা জেলা শাখা | DHIT - Dream Health & Information Technology",
  description: "ভোলা মুসলিম ইন্সটিটিউট পাবলিক লাইব্রেরি সংলগ্ন DHIT ভোলা জেলা শাখার কোর্সসমূহ ও ভর্তি তথ্য।",
  openGraph: {
    title: "DHIT Bhola Branch",
    description: "Rural Medical Practitioner, DMA & Paramedical Courses at Bhola District Branch.",
  },
};

export default function BholaDistrictPage() {
  return <BranchDetailView data={data} />;
}
