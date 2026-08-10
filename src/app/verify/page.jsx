import { redirect } from "next/navigation";

export const metadata = {
  title: "Result & Certificate Verification | DHITedu",
  description: "Verify your student result and certificate online using your registration number.",
};

export default function VerifyPage() {
  redirect("/result");
}
