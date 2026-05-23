import { AppShell } from "@/components/app-shell";
import { ClientJobDetailClient } from "@/components/client-job-detail-client";

export default async function DashboardClientJobApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-black">Gestionar postulantes</h1>
        <ClientJobDetailClient jobId={id} />
      </main>
    </AppShell>
  );
}
