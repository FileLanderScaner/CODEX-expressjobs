import { ArrowRight, BriefcaseBusiness, CheckCircle2, ClipboardList, MessageCircle, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { PrimaryButton } from "@/components/primary-button";
import { RoleSelector } from "@/components/role-selector";
import { StatusFlow } from "@/components/status-flow";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";
import { TrackingClient } from "@/components/tracking-client";
import { categories, featuredJobs, publicBrand } from "@/lib/expressjobs-data";

export default function Home() {
  return (
    <AppShell>
      <TrackingClient />
      <main>
        <section className="border-b border-[var(--line)] bg-[#f7f6f2]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand)]">{publicBrand.statusLabel}</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Publica trabajos rapidos o encontra tareas cerca tuyo.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Conectamos personas que necesitan resolver tareas simples con trabajadores locales disponibles. Sin pagos reales activos y con foco en seguridad desde el piloto.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <PrimaryButton href="/client/jobs/new" icon={BriefcaseBusiness}>
                  Publicar una tarea
                </PrimaryButton>
                <PrimaryButton href="/worker/jobs" icon={ArrowRight}>
                  Buscar trabajos
                </PrimaryButton>
                <PrimaryButton href="/demo" icon={Sparkles}>
                  Ver demos comerciales
                </PrimaryButton>
                <PrimaryButton href="#como-funciona" icon={ClipboardList}>
                  Ver como funciona
                </PrimaryButton>
              </div>
            </div>
            <div className="rounded-md border border-[var(--line)] bg-white p-4 shadow-sm">
              <div className="grid gap-3">
                {featuredJobs.map((job) => (
                  <JobCard key={job.id} {...job} href={`/worker/jobs/${job.id}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-white" id="como-funciona">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h2 className="text-2xl font-black">Como funciona</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                { icon: ClipboardList, title: "1. Publica o busca", text: "El cliente describe una tarea simple o el trabajador revisa trabajos abiertos." },
                { icon: UsersRound, title: "2. Postulacion clara", text: "El trabajador envia una propuesta y el cliente compara perfil, mensaje y reputacion." },
                { icon: MessageCircle, title: "3. Coordina y cierra", text: "Participantes coordinan por chat, completan el trabajo y dejan resena." },
              ].map((item) => (
                <article className="rounded-md border border-[var(--line)] bg-[#f7f6f2] p-5" key={item.title}>
                  <item.icon aria-hidden="true" className="text-[var(--brand)]" size={24} />
                  <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <RoleSelector />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10">
          <TrustSafetyNotice />
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: UsersRound, title: "Roles claros", text: "Cliente, trabajador y admin con limites separados." },
              { icon: ShieldCheck, title: "RLS primero", text: "Datos de perfiles, trabajos, mensajes y resenas con politicas desde el schema." },
              { icon: CheckCircle2, title: "Sin pagos live", text: "Monetizacion documentada, desactivada por feature flags hasta staging aprobado." },
            ].map((item) => (
              <article className="rounded-md border border-[var(--line)] bg-white p-5" key={item.title}>
                <item.icon aria-hidden="true" className="text-[var(--brand)]" size={24} />
                <h2 className="mt-4 text-xl font-bold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-[#eef4ef]">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h2 className="text-2xl font-black">Estados de trabajo</h2>
            <div className="mt-5">
              <StatusFlow />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-black">Ejemplos de trabajos</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span className="rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold" key={category}>
                {category}
              </span>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
