import { BriefcaseBusiness, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { WorkerJobsClient } from "@/components/worker-jobs-client";

export default function TrabajosPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <BriefcaseBusiness aria-hidden="true" className="text-[var(--brand)]" />
              <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand)]">Marketplace de trabajos</p>
            </div>
            <h1 className="mt-3 text-3xl font-black">Trabajos disponibles</h1>
            <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
              Busca tareas abiertas, revisa presupuesto y ubicacion, inicia sesion y postulate desde un flujo controlado por Supabase/RLS.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Link className="focus-ring rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white" href="/registro?next=/trabajos">
              Crear cuenta
            </Link>
            <Link className="focus-ring rounded-md border border-[var(--line)] px-4 py-3 text-sm font-bold" href="/publicar">
              Publicar trabajo
            </Link>
          </div>
        </div>
        <div className="mt-5 rounded-md border border-[var(--line)] bg-[#f7f6f2] p-4 text-sm leading-6 text-[var(--muted)]">
          <ShieldCheck aria-hidden="true" className="mr-2 inline text-[var(--brand)]" size={16} />
          Los pagos online siguen desactivados. La coordinacion y validacion comercial se mantienen en modo piloto controlado.
        </div>
        <WorkerJobsClient />
      </main>
    </AppShell>
  );
}
