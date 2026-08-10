"use client";

import React, { useState, useMemo } from "react";
import { Mail, Phone, Globe } from "lucide-react";
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
    <main className="min-h-screen bg-[var(--color-bg-light)]">
      <Header />
      <div className="pt-[100px] px-4 max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-emerald-800">
            Dream Health and Information Technology - DHIT
          </h1>
          <p className="text-sm font-semibold text-emerald-600 mt-1">
            Govt Approved: সি-১৭০২২৪/২১
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm text-gray-600 mt-3">
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-emerald-600" /> info@dhitedu.info
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-emerald-600" /> 01355009341
            </span>
            <a
              href="https://www.dhitedu.info"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline text-emerald-700"
            >
              <Globe className="w-4 h-4 text-emerald-600" /> www.dhitedu.info
            </a>
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
      </div>
      <Footer />
    </main>
  );
}