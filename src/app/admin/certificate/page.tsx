import DashboardShell from "@/components/auth/DashboardShell";
import CertificateGenerator from "@/components/admin/CertificateGenerator";
import { requireRole } from "@/lib/auth/session";

export default async function CertificatePage() {
  const user = await requireRole("super_admin");

  return (
    <DashboardShell role={user.role} roleLabel="Super Admin" displayName={user.displayName}>
      <div className="mx-auto w-full min-w-0 max-w-[1600px]">
        <div className="mb-6">
          <p className="text-sm font-semibold text-emerald-700">Student documents</p>
          <h1 className="mt-2 text-2xl font-black">Certificate generator</h1>
          <p className="mt-2 text-sm text-slate-600">Find a student by registration number or roll, review and edit certificate details, then print or save as PDF.</p>
        </div>
        <CertificateGenerator />
      </div>
    </DashboardShell>
  );
}
