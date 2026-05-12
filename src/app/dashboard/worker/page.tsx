import { BadgeCheck, BriefcaseBusiness, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";

export default function WorkerDashboardPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">Dashboard trabajador</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: BriefcaseBusiness, title: "Trabajos abiertos", value: "Postularme" },
            { icon: BadgeCheck, title: "Aceptados", value: "Coordinar inicio" },
            { icon: Star, title: "Reputacion", value: "Reseñas visibles" },
          ].map((item) => (
            <article className="rounded-md border border-[var(--line)] bg-white p-5" key={item.title}>
              <item.icon aria-hidden="true" className="text-[var(--brand)]" />
              <p className="mt-4 text-sm font-bold text-[var(--muted)]">{item.title}</p>
              <h2 className="mt-1 text-xl font-black">{item.value}</h2>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <PrimaryButton href="/jobs/open" icon={BriefcaseBusiness}>Ver trabajos</PrimaryButton>
        </div>
      </main>
    </AppShell>
  );
}
