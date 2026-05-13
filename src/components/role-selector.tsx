import { BriefcaseBusiness, ChevronRight, UserRoundCheck } from "lucide-react";
import { PrimaryButton } from "@/components/primary-button";

export function RoleSelector() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <BriefcaseBusiness aria-hidden="true" className="text-[var(--brand)]" />
        <h2 className="mt-4 text-xl font-black">Busco ayuda</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Publica una tarea, compara postulaciones y coordina por chat con mas claridad.</p>
        <div className="mt-4">
          <PrimaryButton href="/client/jobs/new" icon={ChevronRight}>Publicar una tarea</PrimaryButton>
        </div>
      </article>
      <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <UserRoundCheck aria-hidden="true" className="text-[var(--brand)]" />
        <h2 className="mt-4 text-xl font-black">Quiero trabajar</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Encuentra tareas cercanas y postulate sin promesas de empleo o ingresos garantizados.</p>
        <div className="mt-4">
          <PrimaryButton href="/worker/jobs" icon={ChevronRight}>Buscar trabajos</PrimaryButton>
        </div>
      </article>
    </div>
  );
}
