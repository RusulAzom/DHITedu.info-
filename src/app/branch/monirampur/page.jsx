import BranchDetailView from "@/components/BranchDetailView";
import data from "@/data/branch/monirampur.json";

export const metadata = {
  title: "মনিরামপুর শাখা | DHIT - Dream Health & Information Technology",
  description: "নতুন পাইকারী মাছ বাজার, দোলখোলা রোড, মনিরামপুর, যশোর। DHIT মনিরামপুর শাখার পেশাদার স্বাস্থ্য ও তথ্য প্রযুক্তি কোর্সসমূহ। ভর্তি চলছে।",
  openGraph: {
    title: "DHIT Monirampur Branch",
    description: "Medical Faculty, Medical Assistant, Nursing, Dental & Homeopathy Courses at Monirampur Branch.",
  },
};

export default function MonirampurPage() {
  return <BranchDetailView data={data} />;
}
