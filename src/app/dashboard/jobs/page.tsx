import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/account";

export default async function DashboardJobsPage() {
  const profile = await getCurrentProfile();

  if (profile?.role === "worker") {
    redirect("/worker/jobs");
  }

  redirect("/dashboard/client/jobs");
}
