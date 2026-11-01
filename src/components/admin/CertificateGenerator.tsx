"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import styles from "./CertificateGenerator.module.css";

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
  photoUrl: string;
};

type GradeRecord = {
  season: string;
  exam: string;
  first: string;
  second: string;
  third: string;
  overallGrade: string;
  result: string;
};

type CertificateDetails = StudentRecord & {
  seasons: GradeRecord[];
  season: string;
  issueDate: string;
  subjects: string;
  faculty: string;
  firstGrade: string;
  secondGrade: string;
  thirdGrade: string;
  overallGrade: string;
};

type EditableField = Exclude<keyof CertificateDetails, "seasons" | "photoUrl">;

const emptyDetails: CertificateDetails = {
  name: "",
  fatherName: "",
  motherName: "",
  roll: "",
  regNo: "",
  course: "",
  branchName: "",
  branchCode: "",
  photoUrl: "",
  seasons: [],
  season: "",
  issueDate: "",
  subjects: "",
  faculty: "",
  firstGrade: "",
  secondGrade: "",
  thirdGrade: "",
  overallGrade: "",
};

const verificationUrl = "https://dhitedu.vercel.app/result";

function todayDateInput(): string {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function detailsForSeason(details: CertificateDetails, season: GradeRecord): CertificateDetails {
  return {
    ...details,
    season: season.season,
    firstGrade: season.first,
    secondGrade: season.second,
    thirdGrade: season.third,
    overallGrade: season.overallGrade,
  };
}

export default function CertificateGenerator() {
  const [lookupType, setLookupType] = useState<LookupType>("registration");
  const [lookupValue, setLookupValue] = useState("");
  const [candidates, setCandidates] = useState<StudentCandidate[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [details, setDetails] = useState<CertificateDetails | null>(null);
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
      const response = await fetch("/api/admin/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lookupType, lookupValue, ...(studentId ? { studentId } : {}) }),
      });
      const result = await response.json() as {
        student?: StudentRecord;
        seasons?: GradeRecord[];
        candidates?: StudentCandidate[];
        error?: string;
      };

      if (response.status === 409 && result.candidates) {
        setCandidates(result.candidates);
        setSelectedCandidateId(result.candidates[0]?.id || "");
        setError("More than one student matches. Select the correct record and load it.");
        return;
      }

      if (!response.ok || !result.student || !result.seasons) {
        setError(result.error || "Unable to load the student record.");
        return;
      }

      const initialDetails: CertificateDetails = {
        ...emptyDetails,
        ...result.student,
        seasons: result.seasons,
        issueDate: todayDateInput(),
      };
      const firstSeason = result.seasons[0];
      setDetails(firstSeason ? detailsForSeason(initialDetails, firstSeason) : initialDetails);
    } catch (lookupError) {
      console.error("Certificate student lookup failed:", lookupError);
      setError("Unable to reach the student lookup service. Please try again.");
    } finally {
      setPending(false);
    }
  }

  function updateField(field: EditableField, value: string) {
    setDetails((current) => current ? { ...current, [field]: value } : current);
  }

  function renderTextField(label: string, field: EditableField, type = "text") {
    return (
      <label key={field} className="block text-xs font-semibold text-slate-700">
        {label}
        <input
          type={type}
          value={details?.[field] || ""}
          onChange={(event) => updateField(field, event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
        />
      </label>
    );
  }

  return (
    <div className={styles.workspace}>
      <section className={`${styles.editor} no-print`} aria-label="Certificate controls">
        <h2 className="text-lg font-black text-slate-900">Find student</h2>
        <p className="mt-1 text-sm text-slate-600">Search the existing student JSON records. Review and edit the certificate details before printing.</p>
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
            <h3 className="mt-6 border-t border-slate-200 pt-5 text-sm font-black text-slate-900">Review certificate details</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {renderTextField("Student name", "name")}
              {renderTextField("Father's name", "fatherName")}
              {renderTextField("Mother&apos;s name", "motherName")}
              {renderTextField("Registration no.", "regNo")}
              {renderTextField("Roll no.", "roll")}
              {renderTextField("Course", "course")}
              {renderTextField("Institute / branch", "branchName")}
              {renderTextField("Branch code", "branchCode")}
              {details.seasons.length > 0 ? (
                <label className="block text-xs font-semibold text-slate-700">
                  Session
                  <select
                    value={details.season}
                    onChange={(event) => {
                      const record = details.seasons.find((item) => item.season === event.target.value);
                      setDetails((current) => current && record ? detailsForSeason(current, record) : current);
                    }}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900"
                  >
                    {details.seasons.map((record) => <option key={record.season} value={record.season}>{record.season}</option>)}
                  </select>
                </label>
              ) : renderTextField("Session", "season")}
              {renderTextField("Issue date", "issueDate", "date")}
              {renderTextField("1st term grade", "firstGrade")}
              {renderTextField("2nd term grade", "secondGrade")}
              {renderTextField("3rd term grade", "thirdGrade")}
              {renderTextField("Overall grade", "overallGrade")}
              <label className="block text-xs font-semibold text-slate-700 sm:col-span-2">
                Subjects (one per line)
                <textarea
                  value={details.subjects}
                  onChange={(event) => updateField("subjects", event.target.value)}
                  rows={3}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700 sm:col-span-2">
                Faculty / instructors (one per line)
                <textarea
                  value={details.faculty}
                  onChange={(event) => updateField("faculty", event.target.value)}
                  rows={2}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                />
              </label>
            </div>
            <button type="button" onClick={() => window.print()} className="mt-5 w-full rounded-lg bg-[#1a2a6c] px-4 py-3 text-sm font-bold tracking-wide text-white hover:bg-[#111d4c]">
              Print / Save as PDF
            </button>
            <p className="mt-2 text-xs leading-5 text-slate-500">Choose landscape orientation and “Save as PDF” in the print dialog.</p>
          </>
        )}
      </section>

      <section className={`${styles.preview} ${details ? styles.printArea : ""}`} aria-label="Certificate preview">
        {!details ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            Find a student to preview the certificate.
          </div>
        ) : (
          <article className={styles.certificate}>
            <div className={styles.outerBorder}>
              <div className={styles.innerBorder}>
                <svg className={`${styles.corner} ${styles.cornerTopLeft}`} viewBox="0 0 64 64" aria-hidden="true">
                  <path d="M4 60C4 29 16 8 60 4M8 46C16 26 27 16 46 8M18 45c-8-7-8-16 0-23 7 8 7 15 0 23Zm16-18c-6-5-6-12 0-17 6 5 6 12 0 17ZM4 42c8 2 13 7 14 15" />
                  <circle cx="18" cy="22" r="2" />
                  <circle cx="34" cy="11" r="2" />
                </svg>
                <svg className={`${styles.corner} ${styles.cornerTopRight}`} viewBox="0 0 64 64" aria-hidden="true">
                  <path d="M4 60C4 29 16 8 60 4M8 46C16 26 27 16 46 8M18 45c-8-7-8-16 0-23 7 8 7 15 0 23Zm16-18c-6-5-6-12 0-17 6 5 6 12 0 17ZM4 42c8 2 13 7 14 15" />
                  <circle cx="18" cy="22" r="2" />
                  <circle cx="34" cy="11" r="2" />
                </svg>
                <svg className={`${styles.corner} ${styles.cornerBottomLeft}`} viewBox="0 0 64 64" aria-hidden="true">
                  <path d="M4 60C4 29 16 8 60 4M8 46C16 26 27 16 46 8M18 45c-8-7-8-16 0-23 7 8 7 15 0 23Zm16-18c-6-5-6-12 0-17 6 5 6 12 0 17ZM4 42c8 2 13 7 14 15" />
                  <circle cx="18" cy="22" r="2" />
                  <circle cx="34" cy="11" r="2" />
                </svg>
                <svg className={`${styles.corner} ${styles.cornerBottomRight}`} viewBox="0 0 64 64" aria-hidden="true">
                  <path d="M4 60C4 29 16 8 60 4M8 46C16 26 27 16 46 8M18 45c-8-7-8-16 0-23 7 8 7 15 0 23Zm16-18c-6-5-6-12 0-17 6 5 6 12 0 17ZM4 42c8 2 13 7 14 15" />
                  <circle cx="18" cy="22" r="2" />
                  <circle cx="34" cy="11" r="2" />
                </svg>
                <div className={styles.watermark} aria-hidden="true">
                  {Array.from({ length: 14 }, (_, row) => (
                    <div className={styles.watermarkRow} key={row}>
                      {Array.from({ length: 9 }, (_, word) => <span key={word}>DHITedu</span>)}
                    </div>
                  ))}
                </div>
                <Image src="/imgs/dhitlogo.png" alt="" aria-hidden="true" width={260} height={260} className={styles.centerWatermark} />
                <div className={styles.certificateContent}>
                  <header className={styles.certificateHeader}>
                    <Image src="/imgs/dhitlogo.png" alt="DHIT logo" width={64} height={64} className={styles.logo} />
                    <div className={styles.headerText}>
                      <p className={styles.headerEyebrow}>DREAM HEALTH &amp; INFORMATION TECHNOLOGY</p>
                      <h2 className={styles.instituteTitle}>DREAM HEALTH &amp; INFORMATION TECHNOLOGY</h2>
                      <p className={styles.approval}>Govt Reg. No. C-170224/21 <span>•</span> Govt Approved: সি-১৭০২২৪/২১</p>
                      <p className={styles.contact}>www.dhitedu.info <span>•</span> info@dhitedu.info</p>
                    </div>
                    <div className={styles.certificateNumber}>
                      <span>REGISTRATION</span>
                      <strong>{details.regNo || "—"}</strong>
                    </div>
                  </header>

                  <div className={styles.mainRow}>
                    <aside className={styles.detailsPanel}>
                      <p className={styles.panelTitle}>ACADEMIC RECORD</p>
                      <dl className={styles.studentDetails}>
                        <div><dt>Father</dt><dd>{details.fatherName || "—"}</dd></div>
                        <div><dt>Mother</dt><dd>{details.motherName || "—"}</dd></div>
                        <div><dt>Roll</dt><dd>{details.roll || "—"}</dd></div>
                        <div><dt>Course</dt><dd>{details.course || "—"}</dd></div>
                        <div><dt>Institute</dt><dd>{details.branchName || "—"}{details.branchCode ? ` · ${details.branchCode}` : ""}</dd></div>
                        <div><dt>Session</dt><dd>{details.season || "—"}</dd></div>
                        <div><dt>Subjects</dt><dd>{details.subjects.split(/\r?\n/).filter(Boolean).join(" · ") || "—"}</dd></div>
                        <div><dt>Faculty</dt><dd>{details.faculty.split(/\r?\n/).filter(Boolean).join(" · ") || "—"}</dd></div>
                      </dl>
                      <div className={styles.gradeBlock}>
                        <p className={styles.panelTitle}>GRADE BREAKDOWN</p>
                        <div><span>1st Term</span><strong>{details.firstGrade || "—"}</strong></div>
                        <div><span>2nd Term</span><strong>{details.secondGrade || "—"}</strong></div>
                        <div><span>3rd Term</span><strong>{details.thirdGrade || "—"}</strong></div>
                        <div className={styles.finalGrade}><span>Final Grade</span><strong>{details.overallGrade || "—"}</strong></div>
                      </div>
                    </aside>

                    <div className={styles.awardContent}>
                      <p className={styles.certificateKicker}>CERTIFICATE OF ACHIEVEMENT</p>
                      <h1 className={styles.certificateTitle}>Certificate</h1>
                      <p className={styles.presented}>This is to certify that</p>
                      <h2 className={styles.studentName}>{details.name || "Student name"}</h2>
                      <p className={styles.awardCopy}>
                        has successfully completed the academic requirements for
                      </p>
                      <h3 className={styles.courseName}>{details.course || "Course name"}</h3>
                      <p className={styles.awardCopy}>and is hereby awarded this certificate in recognition of the achievement.</p>
                    </div>
                  </div>

                  <footer className={styles.certificateFooter}>
                    <div className={styles.issueBlock}>
                      <span>DATE OF ISSUE</span>
                      <strong>{details.issueDate || "—"}</strong>
                      <span className={styles.verificationLabel}>Verify certificate</span>
                    </div>
                    <div className={styles.qrFrame}>
                      <QRCodeSVG value={verificationUrl} size={64} bgColor="#fffdf7" fgColor="#17382e" level="H" aria-label="DHITedu result verification QR code" />
                    </div>
                    <div className={styles.signatures}>
                      <div className={styles.signature}>
                        <svg className={styles.signatureArtwork} viewBox="0 0 180 90" role="img" aria-label="Controller of Examinations signature artwork">
                          <path d="M14 34 C4 39 2 28 14 18 C28 6 54 3 62 12 C69 20 49 31 33 39 C24 44 15 48 18 53" />
                          <path d="M18 53 C27 45 35 38 43 36 C49 35 47 43 40 46 C34 49 29 46 35 42 C43 36 49 32 55 37 C62 43 52 53 44 56" />
                          <path d="M44 56 C50 47 53 32 61 31 C69 30 60 45 57 49 C65 43 73 34 82 35 C93 35 91 43 80 46 C71 49 69 42 78 40" />
                          <path d="M78 40 C88 34 97 31 105 36 C114 42 106 48 98 45 C107 43 116 38 124 40 C134 43 145 37 158 35 C166 34 171 35 175 34" />
                          <path d="M64 43 C59 55 53 64 49 78 C47 84 44 83 43 77" />
                          <path d="M12 65 C35 61 60 58 85 52 C112 46 140 42 174 38" />
                          <path d="M103 48q4-2 7-1" />
                        </svg>
                        <div className={styles.signatureLine} />
                        <strong>Controller of Examinations</strong>
                      </div>
                      <div className={styles.signature}>
                        <svg className={`${styles.signatureArtwork} ${styles.directorMark}`} viewBox="0 0 180 90" role="img" aria-label="Director signature flourish">
                          <path d="M8 58C26 40 43 22 58 27c13 4-5 18-21 25-8 4-15 0-10-7 6-9 24-12 30-3 5 8-7 18-15 24" />
                          <path d="M58 62c12-16 19-30 27-29 8 1-3 20-7 27 12-16 23-26 31-20 8 6-5 19-13 22 15-12 34-26 47-24 13 1 16 6 28 2" />
                          <path d="M16 73c35-3 78-14 145-33" />
                        </svg>
                        <div className={styles.signatureLine} />
                        <strong>Director</strong>
                      </div>
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
