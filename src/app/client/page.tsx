import { ClipboardPlus, MessageSquareText, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { PrimaryButton } from "@/components/primary-button";
import { listClientJobs } from "@/services/jobs-service";

export default function ClientPage() {
  const jobs = listClientJobs();

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">Cliente</h1>
            <p className="mt-2 text-[var(--muted)]">Administra trabajos, postulaciones, estados y reseñas.</p>
          </div>
          <PrimaryButton href="/client/jobs/new" icon={ClipboardPlus}>Publicar un trabajo</PrimaryButton>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: ClipboardPlus, label: "Trabajos", value: jobs.length },
            { icon: MessageSquareText, label: "Postulaciones", value: 2 },
            { icon: Star, label: "Reseñas", value: 1 },
          ].map((item) => (
            <article className="rounded-md border border-[var(--line)] bg-white p-5" key={item.label}>
              <item.icon aria-hidden="true" className="text-[var(--brand)]" />
              <p className="mt-3 text-sm font-bold text-[var(--muted)]">{item.label}</p>
              <p className="mt-1 text-2xl font-black">{item.value}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} href={`/client/jobs/${job.id}`} />
          ))}
        </div>
      </main>
    </AppShell>
  );
}
