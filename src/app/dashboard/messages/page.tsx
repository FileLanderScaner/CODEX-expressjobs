import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getServerUser } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Mensajes | Trabajos Rapidos",
  description: "Mensajes privados autorizados por trabajo aceptado.",
};

export default async function DashboardMessagesPage() {
  const { supabase, user } = await getServerUser();
  if (!supabase) {
    return <Shell text="Supabase no esta configurado." />;
  }
  if (!user) {
    redirect("/auth?next=/dashboard/messages");
  }
  return <Shell text="Los mensajes se habilitan por trabajo aceptado y RLS limita la lectura a participantes." />;
}

function Shell({ text }: { text: string }) {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-black">Mensajes</h1>
        <p className="mt-3 rounded-md border border-[var(--line)] bg-white p-4 text-[var(--muted)]">{text}</p>
      </main>
    </AppShell>
  );
}
