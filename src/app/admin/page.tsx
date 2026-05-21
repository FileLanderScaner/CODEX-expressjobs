import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { getServerUser } from "@/lib/supabase-server";

export default async function AdminPage() {
  const { supabase, user } = await getServerUser();

  if (!supabase) {
    return <AdminShell title="Admin no disponible" text="Supabase no esta configurado en este ambiente." />;
  }

  if (!user) {
    return <AdminShell title="Admin protegido" text="Inicia sesion con una cuenta autorizada para continuar." />;
  }

  const { data: profile } = await supabase.from("ej_profiles").select("role").eq("id", user.id).maybeSingle();

  if (profile?.role !== "admin") {
    return <AdminShell title="Acceso restringido" text="Esta vista requiere rol admin validado por Supabase." />;
  }

  const [profiles, jobs, applications, events] = await Promise.all([
    supabase.from("ej_profiles").select("id,role").limit(20),
    supabase.from("ej_jobs").select("id,status").limit(20),
    supabase.from("ej_job_applications").select("id,status").limit(20),
    supabase.from("ej_job_events").select("id,event_name").limit(20),
  ]);

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">Admin</h1>
        <p className="mt-2 text-[var(--muted)]">Vista de auditoria inicial sin acciones destructivas.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Usuarios", profiles.data?.length ?? 0],
            ["Trabajos", jobs.data?.length ?? 0],
            ["Postulaciones", applications.data?.length ?? 0],
            ["Eventos", events.data?.length ?? 0],
          ].map(([label, value]) => (
            <article className="rounded-md border border-[var(--line)] bg-white p-5" key={label}>
              <p className="text-sm font-bold text-[var(--muted)]">{label}</p>
              <p className="mt-1 text-2xl font-black">{value}</p>
            </article>
          ))}
        </div>
        <section className="mt-6 rounded-md border border-[var(--line)] bg-white p-5">
          <h2 className="text-xl font-black">Disputas</h2>
          <div className="mt-4">
            <EmptyState title="Sin disputas visibles" text="Los trabajos disputados apareceran aca para auditoria si RLS permite leerlos." />
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function AdminShell({ title, text }: { title: string; text: string }) {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-black">{title}</h1>
        <p className="mt-3 rounded-md border border-[var(--line)] bg-white p-4 text-[var(--muted)]">{text}</p>
      </main>
    </AppShell>
  );
}
