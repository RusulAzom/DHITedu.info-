import DashboardShell from "@/components/auth/DashboardShell";
import { requireRole } from "@/lib/auth/session";
import { getJsonBranches } from "@/lib/dashboardData";

export default async function SuperAdminDashboard() {
  const user = await requireRole("super_admin");
  const branches = getJsonBranches();

  return (
    <DashboardShell role={user.role} roleLabel="Super Admin" displayName={user.displayName}>
      <div className="mb-8">
        <p className="text-sm font-semibold text-emerald-700">Overview</p>
        <h1 className="mt-2 text-2xl font-black">Welcome to Super Admin Panel</h1>
        <p className="mt-2 text-slate-600">Review public branch details currently served from the project JSON files.</p>
      </div>
      <section id="json-branches" className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5">
          <p className="text-sm font-semibold text-emerald-700">JSON data overview</p>
          <h2 className="mt-1 text-xl font-black">Configured branches</h2>
          <p className="mt-1 text-sm text-slate-600">These details are read directly from <code>src/data/branch/*.json</code>.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {branches.map((branch) => (
            <article key={branch.slug} className="rounded-xl border border-slate-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{branch.slug}</p>
              <h3 className="mt-1 text-lg font-bold">{branch.shortName || branch.name}</h3>
              <dl className="mt-4 space-y-2 text-sm text-slate-600">
                <div><dt className="inline font-semibold text-slate-800">Location: </dt><dd className="inline">{branch.address}</dd></div>
                <div><dt className="inline font-semibold text-slate-800">Manager/director: </dt><dd className="inline">{branch.director}</dd></div>
                <div><dt className="inline font-semibold text-slate-800">Contact: </dt><dd className="inline">{branch.phone} · {branch.email}</dd></div>
              </dl>
              <a href={`/branch/${branch.slug}`} className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-900">Open public branch page →</a>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">Public content and result data remain JSON-backed. This overview is read-only.</p>
      </section>
    </DashboardShell>
  );
}
