import { ArrowRight, BriefcaseBusiness, CheckCircle2, ClipboardList, LogIn, MessageCircle, Search, ShieldCheck, UserRoundCheck, UsersRound } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { RoleSelector } from "@/components/role-selector";
import { StatusFlow } from "@/components/status-flow";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";
import { TrackingClient } from "@/components/tracking-client";
import { categories, pilotSalesCopy, publicBrand } from "@/lib/expressjobs-data";

const panels = [
  {
    href: "/client/jobs/new",
    label: "Para clientes",
    title: "Publica una tarea y recibi postulaciones",
    text: "Indica que necesitas, zona aproximada y presupuesto. Compara mensajes antes de coordinar.",
    cta: "Publicar tarea",
    icon: BriefcaseBusiness,
  },
  {
    href: "/worker/jobs",
    label: "Para trabajadores",
    title: "Encontra trabajos cerca de tu zona",
    text: "Filtra tareas abiertas, postulate con un mensaje claro y revisa el estado de tus postulaciones.",
    cta: "Ver trabajos",
    icon: Search,
  },
  {
    href: "/auth",
    label: "Tu cuenta",
    title: "Crea tu cuenta para avanzar",
    text: "Guarda tu rol, perfil y actividad para volver sin empezar de cero.",
    cta: "Crear perfil",
    icon: UserRoundCheck,
  },
] as const;

const flow = [
  { icon: LogIn, title: "1. Crea cuenta", text: "Ingresa con email o Google cuando el ambiente este disponible." },
  { icon: UserRoundCheck, title: "2. Elegi rol", text: "Cliente para publicar o trabajador para postularte." },
  { icon: ClipboardList, title: "3. Publica o busca", text: "Describe una tarea concreta o revisa trabajos abiertos." },
  { icon: MessageCircle, title: "4. Coordina", text: "Acepta postulaciones y coordina sin compartir datos sensibles." },
];

const heroMetrics = [
  { label: "Cliente", value: "Publica tareas reales" },
  { label: "Trabajador", value: "Postula con perfil" },
  { label: "Seguridad", value: "RLS y piloto cerrado" },
];

export default function Home() {
  return (
    <AppShell>
      <TrackingClient />
      <main className="ej-page">
        <section className="relative isolate overflow-hidden">
          <div className="hero-grid-pattern absolute inset-0 -z-10 opacity-35" />
          <div className="ej-container grid min-h-[620px] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div>
              <p className="ej-badge">{publicBrand.statusLabel}</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.97] tracking-tight sm:text-6xl lg:text-7xl">
                Trabajo local claro, rapido y protegido.
              </h1>
              <p className="ej-muted mt-6 max-w-2xl text-lg leading-8 sm:text-xl">
                Trabajos Rapidos conecta clientes y trabajadores para tareas reales en Uruguay y LatAm. Publica una tarea, encontra oportunidades cerca y avanza con estados visibles dentro de un piloto controlado.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="focus-ring ej-btn-primary text-sm uppercase tracking-[0.12em]" href="/client/jobs/new">
                  Publicar tarea <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <Link className="focus-ring ej-btn-secondary text-sm uppercase tracking-[0.12em]" href="/worker/jobs">
                  Buscar trabajos <Search aria-hidden="true" size={18} />
                </Link>
                <Link className="focus-ring ej-btn-secondary text-sm uppercase tracking-[0.12em]" href="/auth">
                  Crear cuenta <LogIn aria-hidden="true" size={18} />
                </Link>
              </div>
              <div className="ej-glass mt-6 max-w-2xl p-4 text-sm leading-6">
                <strong className="text-white">Piloto controlado:</strong> estamos validando la experiencia antes de abrir produccion publica. No hay pagos reales activos ni promesas de empleo garantizado. <span className="font-black text-red-200">NO-GO_PRODUCTION.</span>
              </div>
            </div>
            <div className="ej-glass p-5">
              <div className="grid min-h-[390px] content-between rounded-lg border border-[var(--ej-border)] bg-[linear-gradient(135deg,#132238,#07111f)] p-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">Marketplace local</p>
                  <h2 className="mt-3 text-4xl font-black tracking-tight">Una ruta simple para publicar, postular y decidir.</h2>
                  <p className="ej-muted mt-4 text-sm leading-6">
                    La interfaz separa roles, estados y proximas acciones para que un usuario nuevo entienda que hacer sin leer documentacion.
                  </p>
                </div>
                <div className="mt-6 grid gap-3">
                  {heroMetrics.map((item) => (
                    <div className="grid gap-1 rounded-lg border border-[var(--ej-border)] bg-white/[0.06] p-4 sm:grid-cols-[9rem_1fr] sm:items-center" key={item.label}>
                      <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-200">{item.label}</p>
                      <p className="ej-muted text-sm font-semibold leading-6">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ej-dark-section py-12">
          <div className="ej-container">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="ej-badge">Empeza por aca</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Tres caminos claros para usar la plataforma</h2>
              </div>
              <p className="ej-muted max-w-xl text-sm leading-6">Publicar, buscar o crear perfil. Cada bloque lleva a una accion principal.</p>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {panels.map((panel) => (
                <Link className="group focus-ring ej-card relative min-h-[300px] overflow-hidden p-7 transition hover:-translate-y-2" href={panel.href} key={panel.title}>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(96,165,250,0.08),rgba(0,0,0,0.18))]" />
                  <div className="relative flex h-full min-h-[260px] flex-col justify-between">
                    <div className="flex items-center justify-between gap-4">
                      <p className="ej-chip text-[11px] uppercase tracking-[0.16em]">{panel.label}</p>
                      <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/10 text-blue-200"><panel.icon aria-hidden="true" size={22} /></span>
                    </div>
                    <div>
                      <h3 className="max-w-xs text-3xl font-black tracking-tight">{panel.title}</h3>
                      <p className="ej-muted mt-3 max-w-sm text-sm leading-6">{panel.text}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-emerald-200">{panel.cta}<ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={18} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="ej-container py-12" id="como-funciona">
          <h2 className="text-3xl font-black tracking-tight">Como funciona</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {flow.map((item) => (
              <article className="ej-card p-5 transition hover:-translate-y-1" key={item.title}>
                <item.icon aria-hidden="true" className="text-[var(--ej-accent)]" size={26} />
                <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                <p className="ej-muted mt-2 text-sm leading-6">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ej-container py-12"><RoleSelector /></section>
        <section className="ej-container pb-12"><TrustSafetyNotice /></section>

        <section className="ej-container py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: UsersRound, title: "Roles claros", text: "Cliente, trabajador y admin con limites separados." },
              { icon: ShieldCheck, title: "RLS primero", text: "Permisos separados para clientes, trabajadores y admin." },
              { icon: CheckCircle2, title: "Piloto seguro", text: "Pagos live desactivados hasta aprobacion humana." },
            ].map((item) => (
              <article className="ej-card p-6" key={item.title}>
                <item.icon aria-hidden="true" className="text-[var(--ej-accent)]" size={26} />
                <h2 className="mt-4 text-xl font-black">{item.title}</h2>
                <p className="ej-muted mt-2 text-sm leading-6">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ej-dark-section py-12">
          <div className="ej-container">
            <h2 className="text-3xl font-black tracking-tight">Estados de trabajo</h2>
            <div className="mt-6"><StatusFlow /></div>
          </div>
        </section>

        <section className="ej-container py-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="ej-badge">Categorias</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Trabajos reales para necesidades concretas</h2>
              <p className="ej-muted mt-4 text-sm leading-6">{pilotSalesCopy.main}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <div
                  className="grid gap-3 rounded-lg border border-[var(--ej-border)] bg-white/[0.04] p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                  key={category}
                >
                  <span className="font-black text-white">{category}</span>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      className="focus-ring inline-flex items-center gap-2 rounded-md border border-[var(--ej-border)] px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-[var(--ej-text-muted)] transition hover:bg-white/10 hover:text-white"
                      href="/worker/jobs"
                    >
                      Buscar <ArrowRight aria-hidden="true" size={14} />
                    </Link>
                    <Link
                      className="focus-ring inline-flex items-center gap-2 rounded-md bg-[var(--ej-success)] px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-[#04130e] transition hover:bg-[var(--ej-success-hover)]"
                      href="/client/jobs/new"
                    >
                      Publicar <ArrowRight aria-hidden="true" size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
