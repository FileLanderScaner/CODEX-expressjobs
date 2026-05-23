import { AppShell } from "@/components/app-shell";
import { WorkerJobDetailClient } from "@/components/worker-job-detail-client";

export default async function PublicJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <WorkerJobDetailClient jobId={id} />
      </main>
    </AppShell>
  );
}
