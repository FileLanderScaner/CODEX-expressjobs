import { ClipboardList } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { JobForm } from "@/components/job-form";

export default function NewJobPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-center gap-3">
          <ClipboardList aria-hidden="true" className="text-[var(--brand)]" size={28} />
          <h1 className="text-3xl font-black">Publicar trabajo</h1>
        </div>
        <div className="mt-6">
          <JobForm />
        </div>
      </main>
    </AppShell>
  );
}
