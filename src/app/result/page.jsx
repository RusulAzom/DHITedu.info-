"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultCheckForm from "@/components/ResultCheckForm";
import ResultDisplayCard from "@/components/ResultDisplayCard";
import { clean, cleanReg, parseTables, searchResult } from "@/utils/resultDataClient";

import rawResultData from "@/data/result/student/student_info.json";

export default function ResultPage() {
  const tables = useMemo(() => parseTables(rawResultData), []);
  const branches = tables.branches || [];

  const distinctSeasons = useMemo(() => {
    const gradeRecords = tables.grade || [];
    const set = new Set();
    for (const g of gradeRecords) {
      const s = clean(g.season);
      if (s) set.add(s);
    }
    return Array.from(set).sort();
  }, [tables]);

  const seasonOptions = distinctSeasons.map((s) => ({ label: s, value: s }));

  const branchOptions = branches.map((b) => ({
    value: b.branch_id,
    label: clean(b.name),
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [resultData, setResultData] = useState(null);

  const handleSearch = ({ reg_id, roll, branch_id, season }) => {
    setError("");
    setWarnings([]);
    setResultData(null);

    const cleanedReg = cleanReg(reg_id);
    if (!cleanedReg || cleanedReg.length < 5) {
      setError("Registration No is required (minimum 5 characters).");
      return;
    }

    setLoading(true);
    try {
      const formData = {
        reg_id: cleanedReg,
        roll: clean(roll),
        branch_id: branch_id || undefined,
        season: season || undefined,
      };
      const result = searchResult(formData, tables);
      if (result.found) {
        setResultData(result);
        setWarnings(result.warnings || []);
      } else {
        setError(result.message || "No student found with this Registration No");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetSearch = () => {
    setError("");
    setWarnings([]);
    setResultData(null);
    setLoading(false);
  };

  const hasResults = resultData && resultData.found;

  return (
    <main className="min-h-screen pt-[100px] mb-[100px] px-2 sm:px-4 max-w-5xl mx-auto">
      <Header />
      <div className="flex flex-row items-center gap-2 sm:gap-4 w-full border-b pb-3 mb-4">
        <div className="shrink-0">
          <img
            src="/src/data/imgs/dhitlogo.png"
            alt="DHIT Logo"
            className="w-12 h-12 sm:w-20 sm:h-20 object-contain certificate-logo print:block"
            style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
          />
        </div>

        <div className="flex-1 min-w-0 text-left flex flex-col justify-center gap-0.5">
          <h1 className="text-xs sm:text-lg font-bold text-emerald-800 leading-tight truncate sm:whitespace-normal">
            Dream Health and Information Technology - DHIT
          </h1>
          <div className="text-[10px] sm:text-xs font-semibold text-gray-700">
            Govt Approved: সি-১৭০২২৪/২১
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9px] sm:text-xs text-gray-600 mt-0.5">
            <span>✉️ info@dhitedu.info</span>
            <span>📞 01355009341</span>
            <span>🌐 www.dhitedu.info</span>
          </div>
        </div>
      </div>

        <div className="w-full p-2 sm:p-6 rounded-lg bg-white shadow-sm ring-1 ring-[var(--color-border)]">
          {!hasResults && (
            <ResultCheckForm
              onSearch={handleSearch}
              loading={loading}
              error={error}
              warnings={warnings}
              branchOptions={branchOptions}
              seasonOptions={seasonOptions}
            />
          )}

          {hasResults && (
            <ResultDisplayCard
              resultData={resultData}
              onPrint={handlePrint}
              onResetSearch={handleResetSearch}
            />
          )}

          {!hasResults && error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!hasResults && warnings.length > 0 && (
            <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
              <p className="font-semibold">Warnings:</p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                {warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      <Footer />
    </main>
  );
}