import { BriefcaseBusiness, UserRoundCheck } from "lucide-react";
import { PrimaryButton } from "@/components/primary-button";

export function RoleSelector() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-md border border-[var(--line)] bg-white p-5">
        <BriefcaseBusiness aria-hidden="true" className="text-[var(--brand)]" />
        <h2 className="mt-4 text-xl font-black">Cliente</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Publica tareas, compara postulaciones y coordina por chat.</p>
        <div className="mt-4">
          <PrimaryButton href="/client/jobs/new">Publicar un trabajo</PrimaryButton>
        </div>
      </article>
      <article className="rounded-md border border-[var(--line)] bg-white p-5">
        <UserRoundCheck aria-hidden="true" className="text-[var(--brand)]" />
        <h2 className="mt-4 text-xl font-black">Trabajador</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Crea un perfil, encuentra tareas cercanas y construye reputacion.</p>
        <div className="mt-4">
          <PrimaryButton href="/worker/jobs">Buscar trabajos cerca</PrimaryButton>
        </div>
      </article>
    </div>
  );
}
