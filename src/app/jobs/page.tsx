import { BriefcaseBusiness, HelpCircle, Search, UserRoundCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";
import { WorkerJobsClient } from "@/components/worker-jobs-client";

export default function JobsPage() {
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
                  <p className="ej-badge">Marketplace piloto</p>
                  <h1 className="mt-3 text-4xl font-black tracking-tight">Trabajos publicados</h1>
                  <p className="ej-muted mt-3 max-w-3xl text-lg leading-8">
                    Explora tareas disponibles. Para postularte con seguridad, ingresa, elegi rol trabajador y completa tu perfil.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton href="/como-funciona" icon={HelpCircle}>Como funciona</PrimaryButton>
                <PrimaryButton href="/role" icon={UserRoundCheck}>Elegir rol</PrimaryButton>
                <PrimaryButton href="/client/jobs/new" icon={BriefcaseBusiness}>Publicar trabajo</PrimaryButton>
              </div>
            </div>
          </section>

          <WorkerJobsClient publicMode />
        </div>
      </main>
    </AppShell>
  );
}
