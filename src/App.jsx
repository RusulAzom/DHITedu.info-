"use client";

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BranchDetail from "./pages/BranchDetail";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--color-bg-light)] text-[var(--color-text)]">
        <nav className="p-4">
          <Link to="/">Home</Link>
        </nav>

        <Routes>
          <Route path="/branch/:branchId" element={<BranchDetail />} />
          <Route path="/" element={<div className="p-6">Welcome - open /branch/bholadistrict to view sample</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
