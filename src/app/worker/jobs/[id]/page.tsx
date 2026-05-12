import { Send } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ChatBox } from "@/components/chat-box";
import { JobStatusBadge } from "@/components/job-status-badge";
import { ReviewForm } from "@/components/review-form";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";
import { WhatsAppShareButton } from "@/components/whatsapp-share-button";
import { getJobById } from "@/services/jobs-service";
import { listMessagesForJob } from "@/services/messages-service";

export default async function WorkerJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJobById(id);
  const messages = listMessagesForJob(job.id);

  return (
    <AppShell>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1fr_360px]">
        <section className="rounded-md border border-[var(--line)] bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[var(--brand)]">{job.category}</p>
              <h1 className="mt-1 text-3xl font-black">{job.title}</h1>
            </div>
            <JobStatusBadge status={job.status} />
          </div>
          <p className="mt-4 leading-7 text-[var(--muted)]">{job.description}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="focus-ring inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-3 py-2 text-sm font-bold text-white">
              <Send aria-hidden="true" size={16} /> Postularme
            </button>
            <WhatsAppShareButton text={`Trabajo cerca en ExpressJobs: ${job.title}`} />
          </div>
          <div className="mt-6">
            <TrustSafetyNotice />
          </div>
        </section>
        <aside className="grid gap-6">
          <ChatBox messages={messages} />
          <ReviewForm />
        </aside>
      </main>
    </AppShell>
  );
}
