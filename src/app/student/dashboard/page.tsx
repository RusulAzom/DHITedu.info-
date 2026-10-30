import DashboardShell from "@/components/auth/DashboardShell";
import { requireRole } from "@/lib/auth/session";
import { getStudentForDashboard } from "@/lib/dashboardData";

export default async function StudentDashboard() {
  const user = await requireRole("student");
  const student = getStudentForDashboard(user.regId);

  return (
    <DashboardShell role={user.role} roleLabel="Student" displayName={user.displayName}>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-emerald-700">Overview</p>
        <h1 className="mt-2 text-2xl font-black">Welcome to Student Panel</h1>
        <p className="mt-2 text-slate-600">Your account is matched to the existing student JSON by the Firebase Auth <code>regId</code> claim.</p>
      </section>
      {student ? (
        <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <img src={student.picture} alt="" className="h-20 w-20 rounded-full bg-slate-100 object-cover" />
          <div>
            <h2 className="text-xl font-black">{student.name}</h2>
            <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              <div><dt className="inline font-semibold text-slate-500">Registration ID: </dt><dd className="inline">{student.registrationId}</dd></div>
              <div><dt className="inline font-semibold text-slate-500">Roll: </dt><dd className="inline">{student.roll || "—"}</dd></div>
              <div><dt className="inline font-semibold text-slate-500">Branch: </dt><dd className="inline">{student.branchName || "—"}</dd></div>
              <div><dt className="inline font-semibold text-slate-500">Course: </dt><dd className="inline">{student.courseName || "—"}</dd></div>
            </dl>
          </div>
        </section>
      ) : (
        <p role="status" className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">No matching student record was found in the existing JSON. Confirm that the Firebase Auth <code>regId</code> claim matches a <code>reg_id</code> value in <code>student_info.json</code>.</p>
      )}
    </DashboardShell>
  );
}
