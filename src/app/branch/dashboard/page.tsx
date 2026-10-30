import DashboardShell from "@/components/auth/DashboardShell";
import { requireRole } from "@/lib/auth/session";
import { getBranchForDashboard } from "@/lib/dashboardData";

export default async function BranchManagerDashboard() {
  const user = await requireRole("branch_manager");
  const branch = getBranchForDashboard(user.branchId);

  return (
    <DashboardShell role={user.role} roleLabel="Branch Manager" displayName={user.displayName}>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-emerald-700">Overview</p>
        <h1 className="mt-2 text-2xl font-black">Welcome to Branch Manager Panel</h1>
        <p className="mt-2 text-slate-600">Branch information is matched from the existing JSON data using your Firebase Auth branch claim.</p>
      </section>
      {branch ? (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-emerald-700">{branch.slug}</p>
          <h2 className="mt-2 text-xl font-black">{branch.name}</h2>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div><dt className="font-semibold text-slate-500">Address</dt><dd className="mt-1 text-slate-800">{branch.address}</dd></div>
            <div><dt className="font-semibold text-slate-500">Director</dt><dd className="mt-1 text-slate-800">{branch.director}</dd></div>
            <div><dt className="font-semibold text-slate-500">Contact</dt><dd className="mt-1 text-slate-800">{branch.phone} · {branch.email}</dd></div>
            <div><dt className="font-semibold text-slate-500">Admission status</dt><dd className="mt-1 text-slate-800">{branch.admissionStatus}</dd></div>
          </dl>
          <div className="mt-5"><p className="text-sm font-semibold text-slate-700">Courses listed for this branch</p><ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">{branch.courses.map((course, index) => <li key={`${course}-${index}`}>{course}</li>)}</ul></div>
          <a href={`/branch/${branch.slug}`} className="mt-5 inline-flex text-sm font-semibold text-emerald-700">View public branch page →</a>
        </section>
      ) : (
        <p role="status" className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">No matching branch JSON was found for your Firebase Auth <code>branchId</code> claim. Ask an administrator to set it to a branch slug or JSON branch ID.</p>
      )}
    </DashboardShell>
  );
}
