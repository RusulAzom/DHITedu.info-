import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = { children: React.ReactNode };

export default function BranchLayout({ children }: Props) {
  return (
    <main className="relative min-h-screen w-full bg-transparent text-[var(--color-text)] overflow-x-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-20 pt-20 lg:px-8">
        <Header />
        {children}
      </div>
      <Footer />
    </main>
  );
}
