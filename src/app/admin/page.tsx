import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { getAdminOverview } from "@/services/admin-service";

export default function AdminPage() {
  const overview = getAdminOverview();

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">Admin</h1>
        <p className="mt-2 text-[var(--muted)]">Vista de auditoria inicial sin acciones destructivas.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Usuarios", overview.profiles.length],
            ["Trabajos", overview.jobs.length],
            ["Postulaciones", overview.applications.length],
            ["Eventos", overview.events.length],
          ].map(([label, value]) => (
            <article className="ej-card p-5" key={label}>
              <p className="ej-soft text-sm font-bold">{label}</p>
              <p className="mt-1 text-2xl font-black">{value}</p>
            </article>
          ))}
        </div>
        <section className="ej-card mt-6 p-5">
          <h2 className="text-xl font-black">Disputas</h2>
          <div className="mt-4">
            {overview.disputes.length ? <p>{overview.disputes.length} disputa(s)</p> : <EmptyState title="Sin disputas" text="Los trabajos disputados apareceran aca para auditoria." />}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
