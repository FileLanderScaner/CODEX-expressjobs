import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getServerUser } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Postulaciones | Trabajos Rapidos",
  description: "Postulaciones privadas del usuario.",
};

export default async function DashboardApplicationsPage() {
  const { supabase, user } = await getServerUser();
  if (!supabase) {
    return <State title="Postulaciones" text="Supabase no esta configurado." />;
  }
  if (!user) {
    redirect("/auth?next=/dashboard/applications");
  }
  const { data } = await supabase.from("ej_job_applications").select("id,job_id,status,created_at").eq("worker_id", user.id).order("created_at", { ascending: false }).limit(20);
  return <State title="Postulaciones" text={`${data?.length ?? 0} postulacion(es) visibles para tu sesion.`} />;
}

function State({ title, text }: { title: string; text: string }) {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-black">{title}</h1>
        <p className="mt-3 rounded-md border border-[var(--line)] bg-white p-4 text-[var(--muted)]">{text}</p>
      </main>
    </AppShell>
  );
}
