import { BadgeCheck, BriefcaseBusiness, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";
import { getWorkerProfile } from "@/services/profiles-service";

export default function WorkerPage() {
  const worker = getWorkerProfile();

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">Trabajador</h1>
        <section className="ej-card mt-6 p-5">
          <h2 className="text-xl font-black">{worker.headline}</h2>
          <p className="ej-muted mt-2">{worker.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {worker.skills.map((skill) => (
              <span className="ej-chip text-xs" key={skill}>{skill}</span>
            ))}
          </div>
        </section>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: BriefcaseBusiness, label: "Radio", value: `${worker.serviceRadiusKm} km` },
            { icon: BadgeCheck, label: "Tarifa referencia", value: `UYU ${worker.hourlyRateUyu}/h` },
            { icon: Star, label: "Reputacion", value: "4.9" },
          ].map((item) => (
            <article className="ej-card p-5" key={item.label}>
              <item.icon aria-hidden="true" className="text-[var(--ej-accent)]" />
              <p className="ej-soft mt-3 text-sm font-bold">{item.label}</p>
              <p className="mt-1 text-2xl font-black">{item.value}</p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <PrimaryButton href="/worker/jobs" icon={BriefcaseBusiness}>Buscar trabajos cerca</PrimaryButton>
        </div>
      </main>
    </AppShell>
  );
}
