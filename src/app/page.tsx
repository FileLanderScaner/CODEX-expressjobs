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
    title: "Publicar un trabajo",
    text: "Conta que necesitas, zona y presupuesto. Recibi interesados y coordina rapido.",
    cta: "Publicar ahora",
    icon: BriefcaseBusiness,
  },
  {
    href: "/worker/jobs",
    label: "Para trabajadores",
    title: "Buscar trabajos",
    text: "Mira tareas disponibles, postulate y construi tu historial desde tu perfil.",
    cta: "Ver trabajos",
    icon: Search,
  },
  {
    href: "/auth",
    label: "Tu cuenta",
    title: "Crear mi perfil",
    text: "Guarda tu sesion, datos y rol para volver sin empezar de cero.",
    cta: "Crear perfil",
    icon: UserRoundCheck,
  },
] as const;

const flow = [
  { icon: LogIn, title: "1. Crea cuenta", text: "Entra con email o Google cuando el ambiente este configurado." },
  { icon: UserRoundCheck, title: "2. Elegi rol", text: "Cliente para publicar o trabajador para postularte." },
  { icon: ClipboardList, title: "3. Publica o busca", text: "Describe una tarea o revisa trabajos abiertos." },
  { icon: MessageCircle, title: "4. Coordina", text: "Acepta postulaciones y coordina el trabajo." },
];

export default function Home() {
  return (
    <AppShell>
      <TrackingClient />
      <main className="ej-page">
        <section className="relative isolate overflow-hidden">
          <div className="hero-grid-pattern absolute inset-0 -z-10 opacity-50" />
          <div className="ej-container grid min-h-[620px] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div>
              <p className="ej-badge">{publicBrand.statusLabel}</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.97] tracking-tight sm:text-6xl lg:text-7xl">
                Publica trabajos. Encuentra oportunidades.
              </h1>
              <p className="ej-muted mt-6 max-w-2xl text-lg leading-8 sm:text-xl">
                ExpressJobs conecta clientes y trabajadores para tareas reales, rapidas y concretas. Crea tu cuenta, guarda tu perfil y coordina desde una plataforma preparada para crecer.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="focus-ring ej-btn-primary text-sm uppercase tracking-[0.12em]" href="/client/jobs/new">
                  Publicar un trabajo <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <Link className="focus-ring ej-btn-secondary text-sm uppercase tracking-[0.12em]" href="/worker/jobs">
                  Buscar trabajos <Search aria-hidden="true" size={18} />
                </Link>
                <Link className="focus-ring ej-btn-secondary text-sm uppercase tracking-[0.12em]" href="/auth">
                  Crear cuenta <LogIn aria-hidden="true" size={18} />
                </Link>
              </div>
              <div className="ej-glass mt-6 max-w-2xl p-4 text-sm leading-6">
                <strong className="text-white">Piloto controlado:</strong> experiencia moderna, cuenta persistente y perfiles claros antes de abrir uso publico masivo. <span className="font-black text-[#ffb4c2]">NO-GO_PRODUCTION.</span>
              </div>
            </div>
            <div className="ej-glass p-5">
              <div className="grid min-h-[390px] content-end rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_20%_25%,rgba(123,193,67,0.35),transparent_24%),radial-gradient(circle_at_80%_25%,rgba(59,130,246,0.28),transparent_26%),linear-gradient(135deg,#1b2a3a,#071018)] p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b9ef88]">Marketplace local</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight">Tareas, perfiles y oportunidades en un solo lugar.</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Cliente", "Trabajador", "Perfil"].map((item) => (
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur" key={item}>
                      <p className="text-xl font-black">{item}</p>
                      <p className="ej-muted mt-2 text-xs leading-5">Flujo claro para usuarios reales.</p>
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
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(123,193,67,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.18))]" />
                  <div className="relative flex h-full min-h-[260px] flex-col justify-between">
                    <div className="flex items-center justify-between gap-4">
                      <p className="ej-chip text-[11px] uppercase tracking-[0.16em]">{panel.label}</p>
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10"><panel.icon aria-hidden="true" size={22} /></span>
                    </div>
                    <div>
                      <h3 className="max-w-xs text-3xl font-black tracking-tight">{panel.title}</h3>
                      <p className="ej-muted mt-3 max-w-sm text-sm leading-6">{panel.text}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-[#b9ef88]">{panel.cta}<ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={18} /></span>
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
              { icon: ShieldCheck, title: "RLS primero", text: "Datos protegidos por politicas desde el schema." },
              { icon: CheckCircle2, title: "Sin pagos live", text: "Monetizacion documentada y desactivada hasta aprobacion." },
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
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link className="focus-ring ej-chip px-4 py-2 text-sm" href="/worker/jobs" key={category}>{category}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
