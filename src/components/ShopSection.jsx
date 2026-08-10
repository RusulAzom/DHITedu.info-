"use client";

import React, { useState } from "react";
import Link from "next/link";

const tabs = [
  { id: "all", label: "All" },
  { id: "diagnostic", label: "Diagnostic Tools" },
  { id: "surgical", label: "Surgical & First Aid" },
  { id: "emergency", label: "Emergency Care" },
];

const products = [
  {
    id: 1,
    title: "Surgical Mask",
    category: "surgical",
    price: "৳ ১৫০ / প্যাক",
    rating: 4.6,
    image: "https://pharmaplast-online.net/wp-content/uploads/2022/12/masks-blue-11.jpg",
  },
  {
    id: 2,
    title: "Oxygen Mask",
    category: "diagnostic",
    price: "৳ ৫৫০",
    rating: 4.8,
    image: "https://cdn.aerohealthcare.com/uk/wp-content/uploads/AB1024.jpg",
  },
  {
    id: 3,
    title: "Blood Pressure Monitor",
    category: "diagnostic",
    price: "৳ ১,২০০",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvjBp22O2MWHzV07yXNslCn2pe3-35uU9tuPOtGzyyjQ&s=10",
  },
  {
    id: 4,
    title: "Thermometer",
    category: "emergency",
    price: "৳ ৬৫০",
    image: "https://img.medicalexpo.com/images_me/photo-mg/130282-15999299.jpg",
  },
  {
    id: 5,
    title: "Surgical Instruments Set",
    category: "surgical",
    price: "৳ ২,৩০০",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOYUyCnxLisnP02ruWk8EvqVnVjwVIzNS_RJ86pxVrQ&s=10",
  },
  {
    id: 6,
    title: "First Aid Kit",
    category: "surgical",
    price: "৳ ৮৫০",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ08P21v7cwyW28JqtbSlA8jKNlrvohRmvKvMdQSJvQrppPgzLV2aYsJAA&s=10",
  },
  {
    id: 7,
    title: "IV Set / Fluid Bag",
    category: "emergency",
    price: "৳ ২২০",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvjeoVlrLjMuf3fCIhO2Cf0h10SpVGD-hcSUl6NrbWrg&s=10",
  },
  {
    id: 8,
    title: "Cotton Wool",
    category: "surgical",
    price: "৳ ৯০",
    image: "https://source.unsplash.com/200x200/?medical,cotton",
  },
  {
    id: 9,
    title: "Stethoscope",
    category: "diagnostic",
    price: "৳ ১,৮০০",
    image: "https://source.unsplash.com/200x200/?medical,stethoscope",
  },
  {
    id: 10,
    title: "Pregnancy Testing Kit",
    category: "diagnostic",
    price: "৳ ৪৫০",
    rating: 4.3,
    image: "https://source.unsplash.com/200x200/?medical,diagnostic",
  },
];

function renderStars(rating) {
  const rounded = Math.round(rating);
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

export default function ShopSection() {
  const [activeTab, setActiveTab] = useState("all");
  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) => product.category === activeTab);

  return (
    <section className="space-y-4 rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-sm font-bold text-[#0A7F2E] mb-1">ডাক্তারি ও ফার্মেসী ইকুইপমেন্ট শপ</h3>
        <p className="text-xs sm:text-sm font-normal text-gray-600 mb-3 leading-snug line-clamp-2">
          পল্লী চিকিৎসক ও প্র্যাকটিশনারদের জন্য প্রয়োজনীয় মানসম্মত চিকিৎসা সরঞ্জাম
        </p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-transparent bg-[var(--color-primary-green)] text-white shadow-sm"
                  : "border-gray-200 bg-white text-[var(--color-text-dark)] hover:border-[var(--color-primary-green)] hover:bg-[var(--color-bg-light)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-x-auto snap-x scrollbar-none pb-2">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[36vw] sm:auto-cols-[140px] gap-2.5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="shrink-0 rounded-xl border border-gray-100 bg-white p-2 shadow-2xs"
            >
              <img
                src={product.image}
                alt={product.title}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "https://source.unsplash.com/200x200/?medical,thermometer";
                }}
                className="w-full h-24 object-contain rounded-lg mb-1"
              />
              <p className="text-xs font-semibold text-gray-800 line-clamp-1">{product.title}</p>
              <p className="text-xs font-bold text-[#0A7F2E]">{product.price}</p>
              <p className="text-xs text-gray-500">{renderStars(product.rating)}</p>
              <button className="mt-1 w-full rounded-md bg-amber-500 py-1 px-2 text-[10px] font-bold text-white hover:bg-amber-600">
                অর্ডার করুন
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-center">
        <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary-green)] px-5 py-3 text-sm font-bold text-white">
          সকল প্রোডাক্ট ও রেট তালিকা দেখুন →
        </Link>
      </div>
    </section>
  );
}
