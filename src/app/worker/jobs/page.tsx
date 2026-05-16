import { AppShell } from "@/components/app-shell";
import { WorkerJobsClient } from "@/components/worker-jobs-client";

export default function WorkerJobsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">Trabajos para trabajador</h1>
        <WorkerJobsClient />
      </main>
    </AppShell>
  );
}
