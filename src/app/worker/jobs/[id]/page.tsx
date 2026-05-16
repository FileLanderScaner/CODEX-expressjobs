import { AppShell } from "@/components/app-shell";
import { ChatBox } from "@/components/chat-box";
import { ReviewForm } from "@/components/review-form";
import { WorkerJobDetailClient } from "@/components/worker-job-detail-client";
import { getJobById } from "@/services/jobs-service";
import { listMessagesForJob } from "@/services/messages-service";

export default async function WorkerJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJobById(id);
  const messages = listMessagesForJob(job.id);

  return (
    <AppShell>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1fr_360px]">
        <WorkerJobDetailClient jobId={id} />
        <aside className="grid gap-6">
          <ChatBox messages={messages} />
          <ReviewForm />
        </aside>
      </main>
    </AppShell>
  );
}
