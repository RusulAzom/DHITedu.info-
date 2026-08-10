"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BranchDetailView from "@/components/BranchDetailView";

export default function BranchDetail() {
  const { branchId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        const mod = await import(`@/data/branch/${branchId}.json`);
        const json = mod?.default ?? mod;
        if (!mounted) return;
        setData(json);

        if (typeof document !== "undefined") {
          const title = json?.seo?.metaTitle || json?.branch?.name || "Branch";
          const desc = json?.seo?.metaDescription || json?.branch?.tagline || "";
          document.title = title;
          let meta = document.querySelector("meta[name=description]");
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "description");
            document.head.appendChild(meta);
          }
          meta.setAttribute("content", desc);
        }
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError(new Error("Branch data not found"));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [branchId]);

  if (loading) return <div className="p-6">Loading branch...</div>;
  if (error || !data) return <div className="p-6">Branch not found.</div>;

  return <BranchDetailView data={data} />;
}
