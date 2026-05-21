import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getServerUser } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Configuracion | Trabajos Rapidos",
  description: "Configuracion segura de cuenta y entorno.",
};

export default async function DashboardSettingsPage() {
  const { supabase, user } = await getServerUser();
  if (!supabase) {
    return <Settings text="Supabase no esta configurado." />;
  }
  if (!user) {
    redirect("/auth?next=/dashboard/settings");
  }
  return <Settings text="Pagos y agentes IA siguen desactivados. No se muestran valores de entorno ni secretos." />;
}

function Settings({ text }: { text: string }) {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-black">Configuracion</h1>
        <p className="mt-3 rounded-md border border-[var(--line)] bg-white p-4 text-[var(--muted)]">{text}</p>
        <a className="focus-ring mt-5 inline-flex rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white" href="/auth">Gestionar sesion</a>
      </main>
    </AppShell>
  );
}
