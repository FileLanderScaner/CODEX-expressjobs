import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { WorkerJobsClient } from "@/components/worker-jobs-client";

export default function JobsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center gap-3">
          <Search aria-hidden="true" className="text-[var(--brand)]" />
          <div>
            <h1 className="text-3xl font-black">Trabajos publicados</h1>
            <p className="mt-2 text-[var(--muted)]">Listado publico conectado a Supabase cuando el ambiente esta configurado.</p>
          </div>
        </div>
        <WorkerJobsClient publicMode />
      </main>
    </AppShell>
  );
}
