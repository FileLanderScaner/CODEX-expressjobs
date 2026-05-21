import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getServerUser } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Dashboard | Trabajos Rapidos",
  description: "Panel privado de Trabajos Rapidos.",
};

export default async function DashboardPage() {
  const { supabase, user } = await getServerUser();

  if (!supabase) {
    return <DashboardSetup message="Supabase no esta configurado en este ambiente." />;
  }

  if (!user) {
    redirect("/auth?next=/dashboard");
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="mt-2 text-[var(--muted)]">Sesion activa. Elegi el area que queres gestionar.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["/dashboard/profile", "Perfil", "Datos propios y rol seguro."],
            ["/dashboard/client", "Cliente", "Publicar y gestionar trabajos."],
            ["/dashboard/worker", "Trabajador", "Buscar trabajos y postulaciones."],
            ["/dashboard/jobs", "Trabajos", "Vista consolidada de trabajos."],
            ["/dashboard/applications", "Postulaciones", "Estado de aplicaciones."],
            ["/dashboard/messages", "Mensajes", "Conversaciones autorizadas."],
          ].map(([href, title, text]) => (
            <Link className="focus-ring rounded-md border border-[var(--line)] bg-white p-5 hover:bg-[#f7f6f2]" href={href} key={href}>
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
            </Link>
          ))}
        </div>
      </main>
    </AppShell>
  );
}

function DashboardSetup({ message }: { message: string }) {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-black">Dashboard no disponible</h1>
        <p className="mt-3 rounded-md border border-[var(--line)] bg-white p-4 text-[var(--muted)]">{message}</p>
      </main>
    </AppShell>
  );
}
