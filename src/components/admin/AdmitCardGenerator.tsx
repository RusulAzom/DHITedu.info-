"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import styles from "./AdmitCardGenerator.module.css";

type LookupType = "registration" | "roll";

type StudentCandidate = {
  id: string;
  name: string;
  regNo: string;
  roll: string;
  branchName: string;
};

type StudentRecord = {
  name: string;
  fatherName: string;
  motherName: string;
  roll: string;
  regNo: string;
  course: string;
  branchName: string;
  branchCode: string;
  seasons: string[];
  photoUrl: string;
};

type CardDetails = StudentRecord & {
  serial: string;
  examineeType: string;
  season: string;
  photoOverride: string;
};

type EditableField = "serial" | "branchName" | "branchCode" | "course" | "name" | "fatherName" | "motherName" | "roll" | "regNo" | "examineeType" | "season";

const emptyDetails: CardDetails = {
  name: "",
  fatherName: "",
  motherName: "",
  roll: "",
  regNo: "",
  course: "",
  branchName: "",
  branchCode: "",
  seasons: [],
  photoUrl: "/result/pics/no-photo.png",
  serial: "",
  examineeType: "Regular",
  season: "",
  photoOverride: "",
};

export default function AdmitCardGenerator() {
  const [lookupType, setLookupType] = useState<LookupType>("registration");
  const [lookupValue, setLookupValue] = useState("");
  const [candidates, setCandidates] = useState<StudentCandidate[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [details, setDetails] = useState<CardDetails | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function lookupStudent(event?: FormEvent<HTMLFormElement>, studentId?: string) {
    event?.preventDefault();
    setError("");
    setDetails(null);
    setCandidates([]);
    setSelectedCandidateId("");

    if (!lookupValue.trim()) {
      setError(`Enter a ${lookupType === "registration" ? "registration number" : "roll number"}.`);
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/admin/admit-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lookupType, lookupValue, ...(studentId ? { studentId } : {}) }),
      });
      const result = await response.json() as {
        student?: StudentRecord;
        candidates?: StudentCandidate[];
        error?: string;
      };

      if (response.status === 409 && result.candidates) {
        setCandidates(result.candidates);
        setSelectedCandidateId(result.candidates[0]?.id || "");
        setError("More than one student matches. Select the correct record and load it.");
        return;
      }

      if (!response.ok || !result.student) {
        setError(result.error || "Unable to load the student record.");
        return;
      }

      setDetails({
        ...emptyDetails,
        ...result.student,
        serial: `${Date.now()}`,
        season: result.student.seasons[0] || "",
      });
    } catch (lookupError) {
      console.error("Admit card student lookup failed:", lookupError);
      setError("Unable to reach the student lookup service. Please try again.");
    } finally {
      setPending(false);
    }
  }

  function updateField(field: keyof CardDetails, value: string) {
    setDetails((current) => current ? { ...current, [field]: value } : current);
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file for the student photo.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateField("photoOverride", reader.result);
        setError("");
      }
    };
    reader.onerror = () => setError("The selected photo could not be read.");
    reader.readAsDataURL(file);
  }

  function renderTextField(label: string, field: EditableField) {
    return (
      <label key={field} className="block text-xs font-semibold text-slate-700">
        {label}
        <input
          value={details?.[field] || ""}
          onChange={(event) => updateField(field, event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
        />
      </label>
    );
  }

  return (
    <div className={styles.workspace}>
      <section className={`${styles.editor} no-print`} aria-label="Admit card controls">
        <h2 className="text-lg font-black text-slate-900">Find student</h2>
        <p className="mt-1 text-sm text-slate-600">Search the existing student JSON records. Card fields can be reviewed and edited before printing.</p>
        <form onSubmit={(event) => lookupStudent(event)} className="mt-5 space-y-3">
          <label className="block text-xs font-semibold text-slate-700">
            Search by
            <select
              value={lookupType}
              onChange={(event) => setLookupType(event.target.value as LookupType)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900"
            >
              <option value="registration">Registration number</option>
              <option value="roll">Roll number</option>
            </select>
          </label>
          <label className="block text-xs font-semibold text-slate-700">
            {lookupType === "registration" ? "Registration number" : "Roll number"}
            <input
              value={lookupValue}
              onChange={(event) => setLookupValue(event.target.value)}
              maxLength={64}
              required
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
            />
          </label>
          <button type="submit" disabled={pending} className="w-full rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-900 disabled:opacity-60">
            {pending ? "Searching…" : "Find student"}
          </button>
        </form>

        {candidates.length > 0 && (
          <div className="mt-4 space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
            <label className="block text-xs font-semibold text-slate-700">
              Matching records
              <select
                value={selectedCandidateId}
                onChange={(event) => setSelectedCandidateId(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal"
              >
                {candidates.map((candidate) => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.name} · Reg {candidate.regNo} · Roll {candidate.roll} · {candidate.branchName}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" disabled={pending || !selectedCandidateId} onClick={() => lookupStudent(undefined, selectedCandidateId)} className="w-full rounded-lg border border-amber-700 px-3 py-2 text-sm font-bold text-amber-900 hover:bg-amber-100 disabled:opacity-60">
              {pending ? "Loading…" : "Load selected record"}
            </button>
          </div>
        )}

        {error && <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}

        {details && (
          <>
            <h3 className="mt-6 border-t border-slate-200 pt-5 text-sm font-black text-slate-900">Review card details</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {renderTextField("Serial no.", "serial")}
              {renderTextField("Institute name", "branchName")}
              {renderTextField("Institute code", "branchCode")}
              {renderTextField("Course", "course")}
              {renderTextField("Examinee name", "name")}
              {renderTextField("Father's name", "fatherName")}
              {renderTextField("Mother's name", "motherName")}
              {renderTextField("Roll no.", "roll")}
              {renderTextField("Registration no.", "regNo")}
              {renderTextField("Type of examinee", "examineeType")}
              {details.seasons.length > 0 ? (
                <label className="block text-xs font-semibold text-slate-700">
                  Season
                  <select value={details.season} onChange={(event) => updateField("season", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900">
                    {details.seasons.map((season) => <option key={season} value={season}>{season}</option>)}
                  </select>
                </label>
              ) : renderTextField("Season", "season")}
              <label className="block text-xs font-semibold text-slate-700 sm:col-span-2">
                Student photo (optional override)
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1.5 w-full text-sm font-normal text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold" />
              </label>
            </div>
            <button type="button" onClick={() => window.print()} className="mt-5 w-full rounded-lg bg-[#1a2a6c] px-4 py-3 text-sm font-bold tracking-wide text-white hover:bg-[#111d4c]">
              Print / Save as PDF
            </button>
            <p className="mt-2 text-xs leading-5 text-slate-500">In the print dialog, choose “Save as PDF” to download a PDF copy.</p>
          </>
        )}
      </section>

      <section className={`${styles.preview} ${details ? styles.printArea : ""}`} aria-label="Admit card preview">
        {!details ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            Find a student to preview the admit card.
          </div>
        ) : (
          <article className={styles.card}>
            <div className={styles.outerBorder}>
              <div className={styles.innerBorder}>
                <div className={styles.watermark} aria-hidden="true">DHITedu · DREAM HEALTH &amp; INFORMATION TECHNOLOGY</div>
                <div className={styles.cardContent}>
                  <header className={styles.cardHeader}>
                    <Image src="/imgs/dhitlogo.png" alt="DHIT logo" width={68} height={68} className={styles.logo} />
                    <div className={styles.headerText}>
                      <h2 className={styles.instituteTitle}>DREAM HEALTH &amp; INFORMATION TECHNOLOGY</h2>
                      <p className={styles.banglaTitle}>ড্রীম হেলথ এন্ড ইনফরমেশন টেকনোলজি</p>
                      <p className={styles.instituteSub}>Approved &amp; Recognized Skill Development Training Center</p>
                      <p className={styles.approval}>(Govt Approved: সি-১৭০২২৪/২১)</p>
                      <span className={styles.badge}>Admit Card</span>
                    </div>
                    <Image src="/imgs/dhitlogo.png" alt="" aria-hidden="true" width={68} height={68} className={styles.logo} />
                  </header>
                  <div className={styles.serialBar}>
                    <span>Serial No.: <strong>{details.serial || "—"}</strong></span>
                    <span>Exam Year: <strong>{details.season || "—"}</strong></span>
                  </div>
                  <div className={styles.bodyRow}>
                    <table className={styles.detailsTable}>
                      <tbody>
                        <tr><th>Institute Name &amp; Code</th><td>:</td><td>{details.branchName || "—"} (Center Code: {details.branchCode || "—"})</td></tr>
                        <tr><th>Student Course Name</th><td>:</td><td>{details.course || "—"}</td></tr>
                        <tr><th>Season</th><td>:</td><td>{details.season || "—"}</td></tr>
                        <tr><th>Name of Examinee</th><td>:</td><td>{details.name || "—"}</td></tr>
                        <tr><th>Father&apos;s Name</th><td>:</td><td>{details.fatherName || "—"}</td></tr>
                        <tr><th>Mother&apos;s Name</th><td>:</td><td>{details.motherName || "—"}</td></tr>
                        <tr><th>Roll No.</th><td>:</td><td>{details.roll || "—"}</td></tr>
                        <tr><th>Registration No.</th><td>:</td><td>{details.regNo || "—"}</td></tr>
                        <tr><th>Type of Examinee</th><td>:</td><td>{details.examineeType || "—"}</td></tr>
                      </tbody>
                    </table>
                    <div className={styles.photoColumn}>
                      <div className={styles.photoFrame}>
                        <Image src={details.photoOverride || details.photoUrl} alt={`Photo of ${details.name}`} width={100} height={120} unoptimized className={styles.studentPhoto} />
                      </div>
                      <QRCodeSVG value="https://dhitedu.info" size={64} bgColor="#fdf8ee" fgColor="#1c1208" level="H" aria-label="DHITedu website QR code" />
                    </div>
                  </div>
                  <footer className={styles.cardFooter}>
                    <div className={styles.instructions}>
                      <strong>Direction:</strong>
                      <ol>
                        <li>The examinee must bring the Registration Card along with Admit Card in the examination hall.</li>
                        <li>The examinee must sign in the attendance sheet otherwise examinee will be treated as absent.</li>
                      </ol>
                    </div>
                    <div className={styles.signature}>
                      <span className={styles.signatureScript}>A. Kalam Ajad</span>
                      <div className={styles.signatureLine} />
                      <strong>Controller Of Examinations</strong>
                      <span>DHITedu Board</span>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </article>
        )}
      </section>
    </div>
  );
}
