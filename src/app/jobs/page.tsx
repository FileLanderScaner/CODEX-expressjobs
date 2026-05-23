import { BriefcaseBusiness, HelpCircle, Search, UserRoundCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";
import { WorkerJobsClient } from "@/components/worker-jobs-client";

export default function JobsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="rounded-md border border-[var(--line)] bg-[#f7f6f2] p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-3">
              <Search aria-hidden="true" className="mt-1 text-[var(--brand)]" />
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-[var(--brand)]">
                  Marketplace piloto
                </p>
                <h1 className="mt-2 text-3xl font-black">Trabajos publicados</h1>
                <p className="mt-2 max-w-2xl leading-7 text-[var(--muted)]">
                  Explora tareas disponibles. Para postularte con seguridad, primero ingresa,
                  elegi rol trabajador y completa tu perfil.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href="/como-funciona" icon={HelpCircle}>
                Como funciona
              </PrimaryButton>
              <PrimaryButton href="/role" icon={UserRoundCheck}>
                Elegir rol
              </PrimaryButton>
              <PrimaryButton href="/client/jobs/new" icon={BriefcaseBusiness}>
                Publicar trabajo
              </PrimaryButton>
            </div>
          </div>
        </section>

        <WorkerJobsClient publicMode />
      </main>
    </AppShell>
  );
}