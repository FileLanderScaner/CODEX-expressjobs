import { ClipboardList } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";

export default function WorkerApplicationsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center gap-3">
          <ClipboardList aria-hidden="true" className="text-[var(--brand)]" />
          <div>
            <h1 className="text-3xl font-black">Mis postulaciones</h1>
            <p className="mt-2 text-[var(--muted)]">Estados esperados: enviada, vista, preseleccionada, aceptada, rechazada o retirada.</p>
          </div>
        </div>
        <div className="mt-6">
          <EmptyState title="Sin postulaciones cargadas en esta vista" text="El detalle real queda protegido por RLS en ej_job_applications y se muestra al abrir cada trabajo." />
        </div>
      </main>
    </AppShell>
  );
}
