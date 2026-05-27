import { BriefcaseBusiness, Search, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { WorkerJobsClient } from "@/components/worker-jobs-client";

export default function WorkerJobsPage() {
  return (
    <AppShell>
      <main className="ej-page px-4 py-10">
        <div className="ej-container">
          <section className="ej-glass p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--ej-accent-soft)] text-[var(--ej-accent)]">
                  <Search aria-hidden="true" />
                </span>
                <div>
                  <p className="ej-badge">Marketplace trabajador</p>
                  <h1 className="mt-3 text-4xl font-black tracking-tight">Trabajos abiertos</h1>
                  <p className="ej-muted mt-3 max-w-3xl text-lg leading-8">
                    Busca tareas reales, revisa presupuesto y postulate solo cuando tengas claro el alcance.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="ej-chip"><BriefcaseBusiness aria-hidden="true" size={15} /> Estado abierto</span>
                <span className="ej-danger-badge"><ShieldCheck aria-hidden="true" size={15} /> NO-GO_PRODUCTION</span>
              </div>
            </div>
          </section>
          <WorkerJobsClient />
        </div>
      </main>
    </AppShell>
  );
}
