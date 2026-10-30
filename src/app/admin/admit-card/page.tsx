import DashboardShell from "@/components/auth/DashboardShell";
import AdmitCardGenerator from "@/components/admin/AdmitCardGenerator";
import { requireRole } from "@/lib/auth/session";

export default async function AdmitCardPage() {
  const user = await requireRole("super_admin");

  return (
    <DashboardShell role={user.role} roleLabel="Super Admin" displayName={user.displayName}>
      <div className="mb-6">
        <p className="text-sm font-semibold text-emerald-700">Student documents</p>
        <h1 className="mt-2 text-2xl font-black">Admit card generator</h1>
        <p className="mt-2 text-sm text-slate-600">Find a student by registration number or roll, review the details, then print or save the card as a PDF.</p>
      </div>
      <AdmitCardGenerator />
    </DashboardShell>
  );
}
