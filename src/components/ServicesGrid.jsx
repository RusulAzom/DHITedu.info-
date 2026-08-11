import React from "react";
import Link from "next/link";

const services = [
  { icon: "�", label: "All Course", href: "/courses" },
  { icon: "🎤", label: "ফ্রি সেমিনার", href: "/" },
  { icon: "💊", label: "Medicine Directory", href: "/" },
  { icon: "📖", label: "Resources", href: "/" },
  { icon: "💰", label: "অনলাইন আয়", href: "/" },
  { icon: "💻", label: "অনলাইন কোর্স", href: "/online" },
  { icon: "🏛️", label: "সরকারি চাকরি প্রিপারেশন", href: "https://bcspark.vercel.app", external: true },
  { icon: "📰", label: "লাইভ নিউজ", href: "/" },
  { icon: "🩺", label: "চিকিৎসা কথা", href: "/blog" },
  { icon: "📜", label: "Certificate Verify", href: "/result" },
  { icon: "👨‍⚕️", label: "Doctor Booking", disabled: true },
  { icon: "🚑", label: "Ambulance", disabled: true },
];

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {services.map((service) => {
        const content = (
          <div
            className={`flex items-center gap-3 p-2 ${service.disabled ? "opacity-60" : ""}`}
            aria-disabled={service.disabled}
          >
            <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg text-[var(--color-primary-green)]">
              {service.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800 flex-1">
                {service.label}
              </div>
            </div>
          </div>
        );

        if (service.disabled) {
          return (
            <div key={service.label} className="min-w-0">
              {content}
            </div>
          );
        }

        return service.external ? (
          <a
            key={service.label}
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0"
          >
            {content}
          </a>
        ) : (
          <Link key={service.label} href={service.href || "/"} className="min-w-0">
            {content}
          </Link>
        );
      })}
    </div>
  );
}
