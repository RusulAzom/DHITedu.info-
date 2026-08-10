"use client";

import React, { useState, useMemo } from "react";
import { clean, cleanReg, parseTables } from "@/utils/resultDataClient";

import rawResultData from "@/data/result/student/student_info.json";

const tables = parseTables(rawResultData);
const branches = tables.branches || [];
const gradeRecords = tables.grade || [];

export default function ResultCheckForm({
  onSearch,
  loading = false,
  error = "",
  warnings = [],
  reg_id = "",
  roll = "",
  branch_id = "",
  season = "",
  onRegChange,
  branchOptions: branchOptionsProp,
  seasonOptions: seasonOptionsProp,
}) {
  const [localRegId, setLocalRegId] = useState(reg_id);
  const [localRoll, setLocalRoll] = useState(roll);
  const [localBranch, setLocalBranch] = useState(branch_id);
  const [localSeason, setLocalSeason] = useState(season);

  const distinctSeasons = useMemo(() => {
    const set = new Set();
    for (const g of gradeRecords) {
      const s = clean(g.season);
      if (s) set.add(s);
    }
    return Array.from(set).sort();
  }, []);

  const branchOptions = branchOptionsProp.length > 0 ? branchOptionsProp : branches.map((b) => ({ value: b.branch_id, label: clean(b.name) }));
  const seasonOptions = seasonOptionsProp.length > 0 ? seasonOptionsProp : distinctSeasons.map((s) => ({ label: s, value: s }));

  const handleRegChange = (e) => {
    const sanitized = cleanReg(e.target.value);
    setLocalRegId(sanitized);
    if (typeof onRegChange === "function") {
      onRegChange(sanitized);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === "function") {
      onSearch({ reg_id: localRegId, roll: localRoll, branch_id: localBranch, season: localSeason });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 w-full space-y-4">
      <div>
        <label htmlFor="reg_id" className="block text-sm font-semibold text-[var(--color-text-dark)]">
          Registration No <span className="text-[var(--color-alert-red)]">*</span>
        </label>
        <input
          id="reg_id"
          type="text"
          value={localRegId}
          onChange={handleRegChange}
          placeholder="e.g. 41100918023"
          minLength={5}
          required
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-text-dark)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary-green)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)]/20"
        />
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          Spaces will be removed automatically.
        </p>
      </div>

      <div>
        <label htmlFor="roll" className="block text-sm font-semibold text-[var(--color-text-dark)]">
          Roll No
        </label>
        <input
          id="roll"
          type="text"
          value={localRoll}
          onChange={(e) => setLocalRoll(clean(e.target.value))}
          placeholder="e.g. 22023"
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-text-dark)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary-green)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)]/20"
        />
      </div>

      <div>
        <label htmlFor="branch_id" className="block text-sm font-semibold text-[var(--color-text-dark)]">
          Branch
        </label>
        <select
          id="branch_id"
          value={localBranch}
          onChange={(e) => setLocalBranch(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-text-dark)] focus:border-[var(--color-primary-green)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)]/20"
        >
          <option value="">All Branches / সকল শাখা</option>
          {branchOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="season" className="block text-sm font-semibold text-[var(--color-text-dark)]">
          Season / Exam Year
        </label>
        <select
          id="season"
          value={localSeason}
          onChange={(e) => setLocalSeason(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-text-dark)] focus:border-[var(--color-primary-green)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)]/20"
        >
          <option value="">All Seasons / সকল সেশন</option>
          {seasonOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#0A7F2E] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Checking..." : "Check Result / ফলাফল দেখুন"}
      </button>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {warnings.length > 0 && (
        <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          <p className="font-semibold">Warnings:</p>
          <ul className="mt-1 list-disc list-inside space-y-1">
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
