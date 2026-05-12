import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { featuredJobs } from "@/lib/expressjobs-data";

export default function OpenJobsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">Trabajos abiertos</h1>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          Vista inicial para descubrir trabajos, postularse y compartir oportunidades.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </main>
    </AppShell>
  );
}
