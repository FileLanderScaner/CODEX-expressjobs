import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { EmptyState } from "@/components/empty-state";
import { listOpenJobs, listWorkerAcceptedJobs } from "@/services/jobs-service";

export default function WorkerJobsPage() {
  const openJobs = listOpenJobs();
  const acceptedJobs = listWorkerAcceptedJobs();

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">Trabajos para trabajador</h1>
        <h2 className="mt-6 text-2xl font-black">Abiertos</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {openJobs.length ? openJobs.map((job) => <JobCard key={job.id} {...job} href={`/worker/jobs/${job.id}`} />) : <EmptyState title="Sin trabajos abiertos" text="Vuelve a revisar mas tarde." />}
        </div>
        <h2 className="mt-8 text-2xl font-black">Aceptados</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {acceptedJobs.length ? acceptedJobs.map((job) => <JobCard key={job.id} {...job} href={`/worker/jobs/${job.id}`} />) : <EmptyState title="Sin trabajos aceptados" text="Tus trabajos asignados apareceran aca." />}
        </div>
      </main>
    </AppShell>
  );
}
