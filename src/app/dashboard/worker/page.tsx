import { BadgeCheck, BriefcaseBusiness, Send, Star, UserRoundCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";

export default function WorkerDashboardPage() {
  return (
    <AppShell>
      <main className="ej-page px-4 py-10">
        <div className="ej-container">
          <h1 className="text-3xl font-black">Dashboard trabajador</h1>
          <section className="ej-glass mt-5 p-4">
            <p className="ej-badge">Proximo paso recomendado</p>
            <h2 className="mt-3 text-xl font-black">Completa tu perfil y postulate a un trabajo abierto</h2>
            <p className="ej-muted mt-2 text-sm leading-6">
              Primero deja claras tus habilidades, zona, experiencia, disponibilidad y tarifa. Despues contale al cliente por que podes resolver la tarea.
            </p>
          </section>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { icon: BriefcaseBusiness, title: "Trabajos abiertos", value: "Postularme" },
              { icon: BadgeCheck, title: "Aceptados", value: "Coordinar inicio" },
              { icon: Star, title: "Confianza", value: "Perfil completo" },
            ].map((item) => (
              <article className="ej-card p-5" key={item.title}>
                <item.icon aria-hidden="true" className="text-[var(--ej-accent)]" />
                <p className="ej-soft mt-4 text-sm font-bold">{item.title}</p>
                <h2 className="mt-1 text-xl font-black">{item.value}</h2>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href="/worker/jobs" icon={BriefcaseBusiness}>Ver trabajos</PrimaryButton>
            <PrimaryButton href="/dashboard/worker/applications" icon={Send}>Mis postulaciones</PrimaryButton>
            <PrimaryButton href="/dashboard/worker/profile" icon={UserRoundCheck}>Perfil trabajador</PrimaryButton>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
