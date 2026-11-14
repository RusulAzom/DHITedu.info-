"use client";

import React from "react";

export default function ResultDisplayCard({ resultData, onPrint, onResetSearch }) {
  if (!resultData || !resultData.found) return null;

  const { student, branch, course_code, results } = resultData;
  console.log("STEP 3 - ResultDisplayCard Received Student Prop:", student);

  return (
    <div className="mt-2 print:mt-0">
      <div className="mb-4 print:mb-2">
        <h3 className="text-base font-semibold text-[var(--color-text-dark)] print:text-sm">Result Details</h3>
      </div>

      <div
        className="w-full p-2 sm:p-6 print:p-1 rounded-lg bg-white shadow-sm ring-1 ring-[var(--color-border)] relative overflow-hidden certificate-card"
        id="result-print-area"
        style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
      >
        {/* Watermark Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 print:flex print:opacity-30">
          <img
            src="/src/data/imgs/dhitlogo.png"
            alt="DHIT Watermark"
            className="w-64 sm:w-80 md:w-96 opacity-30 object-contain grayscale-0 print:opacity-30"
            style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col items-center">
            <img
              src={student?.picture_url || `/result/pics/${student?.picture}`}
              alt={student?.name || "Student"}
              className="w-28 h-28 sm:w-32 sm:h-32 print:w-20 print:h-20 rounded-full object-cover border-4 border-emerald-600 mx-auto shadow-md print:border-2"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/result/pics/no-photo.png";
              }}
            />

            <h2 className="mt-4 text-xl font-bold text-[var(--color-text-dark)] print:mt-1 print:text-lg">{student.name}</h2>
          </div>

        <div className="mt-4 print:mt-2 rounded-lg border border-[var(--color-border)] bg-white/70 px-3 py-2.5 print:px-2 print:py-1.5 print:bg-white">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 print:grid-cols-3 print:gap-x-3 print:gap-y-1">
            <div className="min-w-0">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)] print:text-[9px]">Student Name</dt>
              <dd className="text-sm font-semibold leading-tight text-[var(--color-text-dark)] print:text-[11px]">{student.name}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)] print:text-[9px]">Father&apos;s Name</dt>
              <dd className="text-sm font-semibold leading-tight text-[var(--color-text-dark)] print:text-[11px]">{student?.father || student?.f_name || "-"}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)] print:text-[9px]">Mother&apos;s Name</dt>
              <dd className="text-sm font-semibold leading-tight text-[var(--color-text-dark)] print:text-[11px]">{student?.mother || student?.m_name || "-"}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)] print:text-[9px]">Registration No</dt>
              <dd className="text-sm font-semibold leading-tight text-[var(--color-text-dark)] print:text-[11px]">{student.reg_id}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)] print:text-[9px]">Roll No</dt>
              <dd className="text-sm font-semibold leading-tight text-[var(--color-text-dark)] print:text-[11px]">{student.roll}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)] print:text-[9px]">Branch</dt>
              <dd className="text-sm font-semibold leading-tight text-[var(--color-text-dark)] print:text-[11px]">
                {branch.name}
                {branch.address ? (
                  <span className="block text-[10px] font-normal leading-tight text-[var(--color-text-muted)] print:text-[9px]">{branch.address}</span>
                ) : null}
              </dd>
            </div>
            <div className="col-span-2 min-w-0 sm:col-span-3 print:col-span-3">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)] print:text-[9px]">Course</dt>
              <dd className="text-sm font-semibold leading-tight text-[var(--color-text-dark)] print:text-[11px]">
                {course_code} - {student.course_name}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 print:mt-2 rounded-lg border border-[var(--color-border)] bg-white p-4 print:p-2">
          <h3 className="text-base font-semibold text-[var(--color-text-dark)] print:text-sm">Academic Results</h3>
          <div className="mt-3 print:mt-1 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th rowSpan={2} className="py-2 pr-3 font-semibold text-[var(--color-text-muted)]">Exam</th>
                  <th rowSpan={2} className="py-2 pr-3 font-semibold text-[var(--color-text-muted)]">Season/Year</th>
                  <th colSpan={3} className="py-2 px-3 font-semibold text-center text-[var(--color-text-muted)]">
                    Yearly Grade
                  </th>
                  <th rowSpan={2} className="py-2 px-3 font-semibold text-[var(--color-text-muted)]">Final Grade / GPA</th>
                  <th rowSpan={2} className="py-2 font-semibold text-[var(--color-text-muted)]">Status</th>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="py-2 pr-3 font-semibold text-[var(--color-text-muted)]">1st Yr</th>
                  <th className="py-2 pr-3 font-semibold text-[var(--color-text-muted)]">2nd Yr</th>
                  <th className="py-2 font-semibold text-[var(--color-text-muted)]">3rd Yr</th>
                </tr>
              </thead>
              <tbody>
                {results && results.length > 0 ? (
                  results.map((r) => (
                    <tr key={r.g_id} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="py-2 pr-3 text-[var(--color-text-dark)]">{r.exam}</td>
                      <td className="py-2 pr-3 text-[var(--color-text-dark)]">{r.season}</td>
                      <td className="py-2 pr-3 text-[var(--color-text-dark)]">{r["1st"]}</td>
                      <td className="py-2 pr-3 text-[var(--color-text-dark)]">{r["2nd"]}</td>
                      <td className="py-2 pr-3 text-[var(--color-text-dark)]">{r["3rd"]}</td>
                      <td className="py-2 px-3 font-semibold text-[var(--color-text-dark)]">{r.grade}</td>
                      <td className="py-2">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            String(r.result).includes("Pass")
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.result}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-sm text-[var(--color-text-muted)]">
                      No result history found for this student
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 no-print">
          <button
            type="button"
            onClick={() => {
              if (typeof onPrint === "function") {
                onPrint();
              } else {
                window.print();
              }
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-md flex items-center gap-2 cursor-pointer transition-all"
          >
            Print Result / Download Certificate Copy
          </button>
          <button
            type="button"
            onClick={() => {
              if (typeof onResetSearch === "function") {
                onResetSearch();
              }
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 px-5 rounded-lg border cursor-pointer transition-all"
          >
            Search Another Student / নতুন রেজাল্ট খুঁজুন
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
