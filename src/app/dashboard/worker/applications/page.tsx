import { ClipboardList } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { WorkerApplicationsClient } from "@/components/worker-applications-client";

export default function WorkerApplicationsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center gap-3">
          <ClipboardList aria-hidden="true" className="text-[var(--brand)]" />
          <div>
            <h1 className="text-3xl font-black">Mis postulaciones</h1>
            <p className="mt-2 text-[var(--muted)]">
              Estados reales de tus postulaciones: enviada, vista, preseleccionada, aceptada, rechazada o retirada.
            </p>
          </div>
        </div>
        <section className="ej-glass mt-6 p-4">
          <p className="ej-badge">Como leer estados</p>
          <p className="ej-muted mt-3 text-sm leading-6">
            Enviada significa que el cliente puede verla. Aceptada indica que el cliente eligio avanzar. Rechazada o retirada cierran esa postulacion sin prometer contratacion.
          </p>
        </section>
        <div className="mt-6">
          <WorkerApplicationsClient />
        </div>
      </main>
    </AppShell>
  );
}
