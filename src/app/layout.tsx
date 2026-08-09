import "./globals.css";
import ClientRoot from "@/components/ClientRoot";

export const metadata = {
  title: "DHIT e-Care Web Portal",
  description: "Mobile-first admin portal for DHIT e-Care",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full bg-[var(--color-bg-light)] text-[var(--color-text)]">
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
