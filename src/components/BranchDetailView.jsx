"use client";

import React, { useState } from "react";
import Image from "next/image";
import PopularCourses from "@/components/PopularCourses";
import directorImg from "@/data/imgs/demodirectorofbranchs.png";

export default function BranchDetailView({ data }) {
  const [activeTab, setActiveTab] = useState(data?.studentList?.tabs?.[0] ?? null);

  if (!data) return <div className="p-6">Branch data not provided.</div>;

  const branch = data.branch || {};
  const director = data.director || {};
  const contact = data.contact || {};
  const admission = data.admission || {};
  const courses = data.availableCourses || [];
  const studentList = data.studentList || {};

  const directorPhones = [director.phonePrimary, ...(director.phoneSecondary || [])].filter(Boolean);
  const contactPhones = contact.phones || [];
  const mapAddress = contact.addressEn || contact.address || "";
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="w-full rounded-2xl bg-gradient-to-r from-[#004B82] via-[#0A7F2E] to-[#0A9A88] p-4 sm:p-6 text-white shadow-lg">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">{branch.name || branch.fullName}</h1>
            <div className="mt-1 text-sm text-white/90">{branch.shortName}</div>
            <div className="mt-2 text-sm text-white/90">{branch.tagline}</div>
          </div>
          <div className="flex flex-wrap gap-2 items-center my-3 sm:my-0">
            {admission?.status ? (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold">{admission.status}</span>
            ) : null}
            {admission?.durationOptions?.map((d) => (
              <span key={d} className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{d}</span>
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {branch.govtApproved ? (
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1">✅ Govt Approved: {branch.govtRegNo || branch.govtRegNoShort}</span>
          ) : null}
        </div>
      </header>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Director Profile</h2>
        <div className="mt-4 flex flex-col items-center gap-4 max-w-full overflow-hidden">
          <div className="w-full max-w-full rounded-xl bg-emerald-50 p-4 text-center">
            <p className="text-sm leading-7 text-slate-700 break-words">
              &ldquo;আমরা সবসময় মানুষের সেবার জন্য বেস্ট এফোর্ট দিয়ে থাকি। মানুষের কল্যাণে আমরা নিবেদিত। সেরা প্র্যাকটিক্যাল লার্নিং এর জন্য আজই ভর্তি হন DHIT {branch.shortName || branch.name || ""} এ।&rdquo;
            </p>
          </div>

          <div className="flex items-center justify-center">
            {director.photo ? (
              <Image
                src={directorImg}
                alt={director.name}
                width={160}
                height={160}
                className="w-40 h-40 rounded-2xl object-cover shadow-md border-2 border-emerald-500/20 mx-auto"
              />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-2xl border-2 border-dashed border-emerald-500/30 bg-slate-50 text-4xl font-black text-emerald-600/40">
                {(director.name || "D").charAt(0)}
              </div>
            )}
          </div>

          <div className="w-full max-w-full text-center">
            <div className="text-base font-bold text-slate-900">{director.name}</div>
            <div className="text-sm text-slate-600">{director.designation}</div>
            <div className="mt-2 text-sm break-all">
              <a href={`mailto:${director.email}`} className="text-[var(--color-primary-green)]">{director.email}</a>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 justify-center text-sm">
              {directorPhones.map((p) => (
                <a key={p} href={`tel:${p.replace(/[^0-9+]/g, "")}`} className="rounded-full bg-[var(--color-bg-light)] px-3 py-1 text-[var(--color-primary-green)]">{p}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="mt-6">
        <PopularCourses courses={courses.map((c) => ({ title: c.name, duration: c.code, code: c.code, category: c.category }))} title="আমাদের কোর্সসমূহ" />
      </section> */}

      <main className="mt-6 grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 space-y-6">

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Student Lists</h2>
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {studentList.tabs?.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t)}
                    className={`rounded-full px-3 py-1 text-sm ${activeTab?.id === t.id ? "bg-[var(--color-primary-green)] text-white" : "bg-slate-100 text-slate-700"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {activeTab ? (
                  <iframe
                    src={activeTab.embedUrl || activeTab.url}
                    title={activeTab.label}
                    className="w-full h-[600px] rounded-xl border"
                    loading="lazy"
                  />
                ) : (
                  <div className="p-4 text-sm text-slate-500">No student lists available.</div>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Available Courses</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <div key={c.code} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.code} • {c.category}</div>
                    </div>
                    <div>
                      <button className="ml-3 rounded-full bg-[#0A7F2E] px-3 py-1 text-sm text-white">Apply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="mt-2 text-sm text-slate-600">{contact.address}</div>
            <div className="mt-3 flex gap-2">
              <a href={mapLink} target="_blank" rel="noreferrer" className="rounded-md bg-[var(--color-primary-green)] px-3 py-2 text-sm text-white">Open in Maps</a>
              <a href={`tel:${(contactPhones[0] || '').replace(/[^0-9+]/g, '')}`} className="rounded-md border px-3 py-2 text-sm">Call</a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
