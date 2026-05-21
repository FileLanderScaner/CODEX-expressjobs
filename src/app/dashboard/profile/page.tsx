import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ProfileForm } from "@/components/profile-form";
import { getServerUser } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Perfil | Trabajos Rapidos",
  description: "Perfil privado de Trabajos Rapidos.",
};

export default async function DashboardProfilePage() {
  const { supabase, user } = await getServerUser();

  if (!supabase) {
    return <Shell title="Perfil no disponible" text="Supabase no esta configurado en este ambiente." />;
  }

  if (!user) {
    redirect("/auth?next=/dashboard/profile");
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-black">Perfil</h1>
        <p className="mt-2 text-[var(--muted)]">Edita solo campos seguros. El rol privilegiado no es editable.</p>
        <div className="mt-6">
          <ProfileForm />
        </div>
      </main>
    </AppShell>
  );
}

function Shell({ title, text }: { title: string; text: string }) {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-black">{title}</h1>
        <p className="mt-3 text-[var(--muted)]">{text}</p>
      </main>
    </AppShell>
  );
}
