import React from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    title: "Surgical Mask",
    description: "উচ্চ মানের সার্জিক্যাল মাস্ক।",
    price: "৳ ১৫০ / প্যাক",
  },
  {
    id: 2,
    title: "Oxygen Mask",
    description: "রোগীর জন্য জরুরি অক্সিজেন সাপোর্ট মাস্ক।",
    price: "৳ ৫৫০",
  },
  {
    id: 3,
    title: "Blood Pressure Monitor",
    description: "নির্ভরযোগ্য ব্লাড প্রেসার মনিটর।",
    price: "৳ ১,২০০",
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="rounded-[20px] border border-[var(--color-border)] bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)]">ডাক্তারি ও ফার্মেসী শপ</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">সমস্ত প্রোডাক্ট এবং রেট তালিকা এখানে দেখুন।</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {products.map((product) => (
              <div key={product.id} className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-light)] p-4">
                <h2 className="text-xl font-semibold text-[var(--color-text-dark)]">{product.title}</h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{product.description}</p>
                <p className="mt-3 text-base font-bold text-[var(--color-secondary-blue)]">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
