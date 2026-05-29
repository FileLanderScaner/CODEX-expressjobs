import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { getCurrentProfile, getServerSupabaseClient } from "@/lib/account";
import Link from "next/link";

type AdminMetric = {
  label: string;
  table: string;
};

const metrics: AdminMetric[] = [
  { label: "Usuarios", table: "ej_profiles" },
  { label: "Trabajos", table: "ej_jobs" },
  { label: "Postulaciones", table: "ej_job_applications" },
  { label: "Eventos", table: "ej_job_events" },
];

async function countRows(table: string) {
  const supabase = await getServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { count, error } = await supabase.from(table).select("id", { count: "exact", head: true });
  return error ? null : count ?? 0;
}

export default async function AdminPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return (
      <AppShell>
        <main className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-3xl font-black">Admin</h1>
          <p className="ej-muted mt-2 text-sm leading-6">Ruta protegida para auditoria operativa.</p>
          <div className="mt-6">
            <ErrorState message="Debes iniciar sesion con una cuenta admin para ver auditoria operativa." />
          </div>
        </main>
      </AppShell>
    );
  }

  if (profile.role !== "admin") {
    return (
      <AppShell>
        <main className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-3xl font-black">Admin</h1>
          <p className="ej-muted mt-2 text-sm leading-6">Ruta protegida para auditoria operativa.</p>
          <div className="mt-6">
            <ErrorState message="Tu cuenta no tiene permiso admin. Esta ruta no muestra datos operativos a usuarios comunes." />
          </div>
        </main>
      </AppShell>
    );
  }

  const [metricCounts, reportsCount] = await Promise.all([
    Promise.all(metrics.map(async (metric) => ({ ...metric, count: await countRows(metric.table) }))),
    countRows("ej_job_reports"),
  ]);

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">Admin</h1>
        <p className="mt-2 text-[var(--muted)]">
          Vista de auditoria inicial protegida por sesion admin y RLS. No hay acciones destructivas.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {metricCounts.map((metric) => (
            <article className="ej-card p-5" key={metric.label}>
              <p className="ej-soft text-sm font-bold">{metric.label}</p>
              <p className="mt-1 text-2xl font-black">{metric.count ?? "RLS"}</p>
            </article>
          ))}
        </div>
        <section className="ej-card mt-6 p-5">
          <h2 className="text-xl font-black">Reportes y disputas</h2>
          <div className="mt-4">
            {reportsCount ? (
              <p>{reportsCount} reporte(s) requieren revision.</p>
            ) : (
              <EmptyState
                title="Sin reportes"
                text="Los reportes y disputas apareceran aca para auditoria cuando existan y RLS permita verlos."
              />
            )}
          </div>
        </section>
        <section className="ej-card mt-6 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-black">Llamados publicos</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Cola de revision para fuentes oficiales, licencias, borradores y publicacion manual con auditoria.
              </p>
            </div>
            <Link className="ej-btn-secondary" href="/admin/llamados-publicos">
              Revisar cola
            </Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
