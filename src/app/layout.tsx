import "./globals.css";
import ClientRoot from "@/components/ClientRoot";

export const metadata = {
  title: "DHITedu - Dream Health and Information Technology",
  description: "Official Portal of Dream Health and Information Technology",
  icons: {
    icon: "/imgs/favicon.ico",
    shortcut: "/imgs/favicon.ico",
    apple: "/imgs/favicon.ico",
  },
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
