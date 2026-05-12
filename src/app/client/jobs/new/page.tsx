import { ClipboardPlus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { JobForm } from "@/components/job-form";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";

export default function ClientNewJobPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-center gap-3">
          <ClipboardPlus aria-hidden="true" className="text-[var(--brand)]" />
          <h1 className="text-3xl font-black">Publicar un trabajo</h1>
        </div>
        <p className="mt-2 text-[var(--muted)]">Crea un trabajo con datos claros para recibir postulaciones relevantes.</p>
        <div className="mt-6">
          <JobForm />
        </div>
        <div className="mt-6">
          <TrustSafetyNotice />
        </div>
      </main>
    </AppShell>
  );
}
