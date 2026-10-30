import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { getSessionUser } from "@/lib/auth/session";
import { ROLE_DASHBOARDS } from "@/lib/auth/roles";

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect(ROLE_DASHBOARDS[user.role]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-9">
        <Link href="/" className="text-sm font-bold text-emerald-700">DHITedu</Link>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Sign in with your registered email or username to open your dashboard.</p>
        <LoginForm />
      </section>
    </main>
  );
}
