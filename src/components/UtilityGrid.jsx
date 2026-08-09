import React from "react";

const items = [
  { icon: "📺", title: "Live TV", sub: "DHIT Health TV" },
  { icon: "💼", title: "Job", sub: "BCSpark" },
  { icon: "📖", title: "Book", sub: "Scholarship" },
];

export default function UtilityGrid() {
  return (
    <section className="mt-4">
      <div className="grid grid-cols-3 gap-3">
        {items.map((it) => (
          <div key={it.title} className="flex flex-col items-center justify-center gap-2 rounded-[12px] bg-[var(--color-bg-light)] p-3 text-center">
            <div className="mb-1 text-2xl">{it.icon}</div>
            <div className="text-sm font-semibold text-[var(--color-text-dark)]">{it.title}</div>
            <div className="text-xs text-[var(--color-text-muted)]">{it.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
