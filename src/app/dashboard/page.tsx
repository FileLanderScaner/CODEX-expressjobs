import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/account";

export default async function DashboardIndexPage() {
  const profile = await getCurrentProfile();

  if (profile?.role === "worker") {
    redirect("/dashboard/worker");
  }

  redirect("/dashboard/client");
}
