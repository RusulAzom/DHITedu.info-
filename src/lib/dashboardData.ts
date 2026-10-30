import "server-only";

import bhola from "@/data/branch/bholadistrict.json";
import monirampur from "@/data/branch/monirampur.json";
import studentInfo from "@/data/result/student/student_info.json";
import resultData from "@/utils/resultDataClient";

const jsonBranches = [
  { slug: "bholadistrict", data: bhola },
  { slug: "monirampur", data: monirampur },
];

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function getJsonBranches() {
  return jsonBranches.map(({ slug, data }) => ({
    slug,
    id: data.branch.id,
    name: data.branch.name,
    shortName: data.branch.shortName,
    address: data.contact.addressEn || data.contact.address,
    district: data.contact.district,
    director: data.director.name,
    email: data.contact.email || data.director.email,
    phone: data.director.phonePrimary,
  }));
}

export function getBranchForDashboard(branchClaim?: string) {
  const key = normalize(branchClaim);
  if (!key) return null;
  const match = jsonBranches.find(({ slug, data }) => [slug, data.branch.id, data.seo.slug].some((value) => normalize(value) === key));
  if (!match) return null;
  const { data } = match;
  return {
    slug: match.slug,
    id: data.branch.id,
    name: data.branch.name,
    shortName: data.branch.shortName,
    address: data.contact.addressEn || data.contact.address,
    district: data.contact.district,
    director: data.director.name,
    email: data.contact.email || data.director.email,
    phone: data.director.phonePrimary,
    admissionStatus: data.admission.statusEn || data.admission.status,
    courses: data.availableCourses.map((course) => course.name),
  };
}

export function getStudentForDashboard(regId?: string) {
  const key = resultData.cleanReg(regId ?? "");
  if (!key) return null;

  const tables = resultData.parseTables(studentInfo) as Record<string, Record<string, unknown>[]>;
  const student = tables.students?.find((entry: Record<string, unknown>) => resultData.cleanReg(String(entry.reg_id ?? "")) === key);
  if (!student) return null;

  const branch = tables.branches?.find((entry: Record<string, unknown>) => String(entry.branch_id) === String(student.branch_id));
  const course = tables.courses?.find((entry: Record<string, unknown>) => String(entry.crs_id) === String(student.crs_id));

  // Return a deliberate allowlist; do not pass credentials or private student fields into the UI.
  return {
    registrationId: resultData.cleanReg(String(student.reg_id ?? "")),
    name: resultData.clean(String(student.name ?? "")),
    roll: resultData.clean(String(student.roll ?? "")),
    branchName: resultData.clean(String(branch?.name ?? "")),
    courseName: resultData.clean(String(course?.name ?? "")),
    picture: resultData.getPictureUrl(String(student.picture ?? "")),
  };
}
