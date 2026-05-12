import { CheckCircle2, PlayCircle } from "lucide-react";
import { ApplicationCard } from "@/components/application-card";
import { AppShell } from "@/components/app-shell";
import { ChatBox } from "@/components/chat-box";
import { JobStatusBadge } from "@/components/job-status-badge";
import { ReviewForm } from "@/components/review-form";
import { StatusFlow } from "@/components/status-flow";
import { WhatsAppShareButton } from "@/components/whatsapp-share-button";
import { listApplicationsForJob } from "@/services/applications-service";
import { getJobById } from "@/services/jobs-service";
import { listMessagesForJob } from "@/services/messages-service";

export default async function ClientJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJobById(id);
  const applications = listApplicationsForJob(job.id);
  const messages = listMessagesForJob(job.id);

  return (
    <AppShell>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1fr_360px]">
        <section>
          <div className="rounded-md border border-[var(--line)] bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[var(--brand)]">{job.category}</p>
                <h1 className="mt-1 text-3xl font-black">{job.title}</h1>
              </div>
              <JobStatusBadge status={job.status} />
            </div>
            <p className="mt-4 leading-7 text-[var(--muted)]">{job.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="focus-ring inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-3 py-2 text-sm font-bold">
                <CheckCircle2 aria-hidden="true" size={16} /> Aceptar trabajador
              </button>
              <button className="focus-ring inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-3 py-2 text-sm font-bold">
                <PlayCircle aria-hidden="true" size={16} /> Cambiar estado
              </button>
              <WhatsAppShareButton text={`Trabajo en ExpressJobs: ${job.title}`} />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-black">Postulaciones</h2>
            <div className="mt-4 grid gap-3">
              {applications.map((application) => (
                <ApplicationCard key={application.id} {...application} />
              ))}
            </div>
          </div>
          <div className="mt-6">
            <StatusFlow />
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
