import { NextResponse } from "next/server";
import rawResultData from "@/data/result/student/student_info.json";
import { getSessionUser } from "@/lib/auth/session";

type JsonRecord = Record<string, unknown>;

type StudentCandidate = {
  id: string;
  name: string;
  regNo: string;
  roll: string;
  branchName: string;
};

function asRecord(value: unknown): JsonRecord | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as JsonRecord
    : null;
}

function text(value: unknown): string {
  return typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
}

function normalized(value: unknown): string {
  return text(value).replace(/\s+/g, "").toUpperCase();
}

function getTable(name: string): JsonRecord[] {
  const entries: unknown = rawResultData;
  if (!Array.isArray(entries)) return [];

  const table = entries
    .map(asRecord)
    .find((entry) => entry?.type === "table" && entry.name === name);
  return Array.isArray(table?.data)
    ? table.data.map(asRecord).filter((record): record is JsonRecord => record !== null)
    : [];
}

function getPhotoUrl(value: unknown): string {
  const fileName = text(value);
  if (!fileName || fileName === "no-photo.png" || /[^a-zA-Z0-9._-]/.test(fileName) || fileName.includes("..")) {
    return "/result/pics/no-photo.png";
  }
  return `/result/pics/${fileName}`;
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });
  }
  if (user.role !== "super_admin") {
    return NextResponse.json({ error: "Only a super admin can generate certificates." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid lookup request." }, { status: 400 });
  }

  const input = asRecord(body);
  const lookupType = input?.lookupType;
  const lookupValue = text(input?.lookupValue);
  const studentId = text(input?.studentId);

  if (
    (lookupType !== "registration" && lookupType !== "roll") ||
    !lookupValue ||
    lookupValue.length > 64
  ) {
    return NextResponse.json({ error: "Enter a valid registration number or roll." }, { status: 400 });
  }

  const students = getTable("students");
  const lookupMatches = students.filter((student) => (
    normalized(student[lookupType === "registration" ? "reg_id" : "roll"]) === normalized(lookupValue)
  ));
  const matches = studentId
    ? lookupMatches.filter((student) => normalized(student.id) === normalized(studentId))
    : lookupMatches;

  if (matches.length === 0) {
    return NextResponse.json({ error: "No student record matched that value." }, { status: 404 });
  }

  const branches = getTable("branches");
  const courses = getTable("courses");
  const gradeRecords = getTable("grade");

  if (lookupMatches.length > 1 && !studentId) {
    const candidates: StudentCandidate[] = lookupMatches.map((student) => {
      const branch = branches.find((entry) => text(entry.branch_id) === text(student.branch_id));
      return {
        id: text(student.id),
        name: text(student.name) || "Unnamed student",
        regNo: text(student.reg_id),
        roll: text(student.roll),
        branchName: text(branch?.name) || "Branch not listed",
      };
    });
    return NextResponse.json({ candidates }, { status: 409 });
  }

  const student = matches[0];
  const branch = branches.find((entry) => text(entry.branch_id) === text(student.branch_id));
  const course = courses.find((entry) => text(entry.crs_id) === text(student.crs_id));
  const matchingGrades = gradeRecords.filter((entry) => normalized(entry.reg_id) === normalized(student.reg_id));
  const courseGrades = matchingGrades.filter((entry) => text(entry.crs_id) === text(student.crs_id));
  const applicableGrades = courseGrades.length > 0 ? courseGrades : matchingGrades;
  const seasons = Array.from(new Set(
    applicableGrades.map((entry) => text(entry.season)).filter(Boolean),
  ))
    .sort((a, b) => b.localeCompare(a))
    .map((season) => {
      const record = applicableGrades.find((entry) => text(entry.season) === season);
      return {
        season,
        exam: text(record?.Exam),
        first: text(record?.["1st"]),
        second: text(record?.["2nd"]),
        third: text(record?.["3rd"]),
        overallGrade: text(record?.grade) || text(record?.result),
        result: text(record?.result),
      };
    });

  return NextResponse.json({
    student: {
      name: text(student.name),
      fatherName: text(student.f_name) || text(student.father),
      motherName: text(student.m_name) || text(student.mother),
      roll: text(student.roll),
      regNo: text(student.reg_id),
      course: [text(course?.name), text(course?.full_form)].filter(Boolean).join(" - "),
      branchName: text(branch?.name),
      branchCode: text(branch?.branch_id),
      photoUrl: getPhotoUrl(student.picture),
    },
    seasons,
  });
}
