import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { featuredJobs } from "@/lib/expressjobs-data";

export default function OpenJobsPage() {
  return (
    <AppShell>
      <main className="ej-page px-4 py-10">
        <div className="ej-container">
          <p className="ej-badge">Formato de trabajo</p>
          <h1 className="mt-3 text-3xl font-black">Trabajos abiertos</h1>
          <p className="ej-muted mt-2 max-w-2xl leading-7">
            Referencia de lectura para el piloto: titulo, categoria, zona, presupuesto, estado y una accion clara hacia el detalle.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} href={`/worker/jobs/${job.id}`} />
            ))}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
