import Link from "next/link";

export default function DoctorBookingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-md p-4">
        <div className="mb-4 flex items-center gap-3">
          <Link href="/" className="text-[var(--color-primary-green)]">← Back</Link>
          <h1 className="text-xl font-bold">Doctor Listing</h1>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">Static Doctor Listing placeholder.</p>
      </div>
    </main>
  );
}
