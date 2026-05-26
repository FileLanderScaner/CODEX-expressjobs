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
        <section className="ej-glass mt-6 p-4">
          <p className="ej-badge">Como leer estados</p>
          <p className="ej-muted mt-3 text-sm leading-6">
            Enviada significa que el cliente puede verla. Aceptada indica que el cliente eligio avanzar. Rechazada o retirada cierran esa postulacion sin prometer contratacion.
          </p>
        </section>
        <div className="mt-6">
          <EmptyState title="Sin postulaciones cargadas en esta vista" text="Busca un trabajo abierto y postulate desde el detalle. Esta vista mantiene los datos protegidos hasta que el flujo completo este habilitado." />
        </div>
      </main>
    </AppShell>
  );
}
