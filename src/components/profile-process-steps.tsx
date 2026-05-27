import { CheckCircle2 } from "lucide-react";

export const profileProcessSteps = [
  "Datos basicos",
  "Rol y objetivo",
  "Experiencia o necesidad",
  "Ubicacion y disponibilidad",
  "Confianza y contacto",
  "Confirmacion / publicacion",
] as const;

export function ProfileProcessSteps({ currentStep }: { currentStep: number }) {
  const normalizedStep = Math.min(Math.max(currentStep, 1), profileProcessSteps.length);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" aria-label="Progreso del perfil">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="ej-soft text-xs font-black uppercase tracking-[0.16em]">Perfil</p>
          <h2 className="mt-1 text-lg font-black">6 pasos para completar tu cuenta</h2>
        </div>
        <p className="rounded-full border border-[rgba(123,193,67,0.32)] bg-[var(--ej-accent-soft)] px-3 py-1 text-xs font-black text-[#d9f7bd]">
          Paso {normalizedStep}/6
        </p>
      </div>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2">
        {profileProcessSteps.map((step, index) => {
          const stepNumber = index + 1;
          const isDone = stepNumber < normalizedStep;
          const isCurrent = stepNumber === normalizedStep;

          return (
            <li
              className={isCurrent ? "flex items-center gap-2 text-sm font-black text-white" : "flex items-center gap-2 text-sm font-semibold text-[var(--ej-text-muted)]"}
              key={step}
            >
              {isDone ? (
                <CheckCircle2 aria-hidden="true" className="shrink-0 text-[var(--ej-accent)]" size={16} />
              ) : (
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-white/20 text-[10px]">
                  {stepNumber}
                </span>
              )}
              {step}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
