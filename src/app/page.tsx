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
    className: "from-emerald-500/90 via-emerald-900/85 to-slate-950",
    icon: BriefcaseBusiness,
  },
  {
    href: "/worker/jobs",
    label: "Para trabajadores",
    title: "Buscar trabajos",
    text: "Mira tareas disponibles, postulate y construi tu historial desde tu perfil.",
    cta: "Ver trabajos",
    className: "from-blue-500/90 via-slate-900/85 to-slate-950",
    icon: Search,
  },
  {
    href: "/auth",
    label: "Tu cuenta",
    title: "Crear mi perfil",
    text: "Guarda tu sesion, datos y rol para volver sin empezar de cero.",
    cta: "Crear perfil",
    className: "from-amber-400/90 via-orange-900/85 to-slate-950",
    icon: UserRoundCheck,
  },
] as const;

export default function Home() {
  return (
    <AppShell>
      <TrackingClient />
      <main>
        <section className="relative isolate overflow-hidden bg-[var(--dark)] text-white">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.34),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(37,99,235,0.26),transparent_32%),linear-gradient(135deg,#0b0f14_0%,#111827_48%,#07120d_100%)]" />
          <div className="hero-grid-pattern absolute inset-0 -z-10 opacity-70" />
          <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div>
              <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 shadow-lg backdrop-blur">
                {publicBrand.statusLabel}
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                Publica trabajos. Encuentra oportunidades.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                ExpressJobs conecta clientes y trabajadores para tareas reales, rapidas y concretas. Crea tu cuenta, guarda tu perfil y coordina desde una plataforma preparada para crecer.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-xl transition hover:-translate-y-1 hover:bg-emerald-500" href="/client/jobs/new">
                  Publicar un trabajo <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <Link className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/18" href="/worker/jobs">
                  Buscar trabajos <Search aria-hidden="true" size={18} />
                </Link>
                <Link className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--dark)] transition hover:-translate-y-1 hover:bg-emerald-50" href="/auth">
                  Crear cuenta <LogIn aria-hidden="true" size={18} />
                </Link>
              </div>
              <p className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-white/8 p-4 text-sm leading-6 text-slate-300 backdrop-blur">
                <strong className="text-white">Piloto controlado:</strong> experiencia moderna, cuenta persistente y perfiles claros antes de abrir uso publico masivo.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="grid min-h-[390px] content-end rounded-[1.5rem] bg-[radial-gradient(circle_at_20%_25%,rgba(34,197,94,0.48),transparent_24%),radial-gradient(circle_at_80%_25%,rgba(37,99,235,0.42),transparent_26%),linear-gradient(135deg,#17212f,#0b0f14)] p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100">Marketplace local</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">Tareas, perfiles y oportunidades en un solo lugar.</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Cliente", "Trabajador", "Perfil"].map((item) => (
                    <div className="rounded-2xl border border-white/10 bg-white/12 p-4 backdrop-blur" key={item}>
                      <p className="text-xl font-black">{item}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-300">Flujo claro para usuarios reales.</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--brand-dark)]">Empeza por aca</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Tres caminos claros para usar la plataforma</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">Publicar, buscar o crear perfil. Cada bloque lleva a una accion principal.</p>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {panels.map((panel) => (
                <Link className="group focus-ring visual-card-clip relative min-h-[340px] overflow-hidden rounded-3xl bg-[var(--dark)] text-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl" href={panel.href} key={panel.title}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${panel.className}`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_22%),linear-gradient(180deg,transparent,rgba(0,0,0,0.45))] transition duration-300 group-hover:scale-105" />
                  <div className="relative flex h-full min-h-[340px] flex-col justify-between p-7">
                    <div className="flex items-center justify-between gap-4">
                      <p className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-white/85 backdrop-blur">{panel.label}</p>
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/14 backdrop-blur"><panel.icon aria-hidden="true" size={22} /></span>
                    </div>
                    <div>
                      <h3 className="max-w-xs text-3xl font-black tracking-[-0.05em]">{panel.title}</h3>
                      <p className="mt-3 max-w-sm text-sm leading-6 text-white/82">{panel.text}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-white">{panel.cta}<ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={18} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-[#f7f8f5]" id="como-funciona">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="text-3xl font-black tracking-[-0.04em]">Como funciona</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                { icon: LogIn, title: "1. Crea cuenta", text: "Entra con email o login social cuando este configurado." },
                { icon: UserRoundCheck, title: "2. Elegi rol", text: "Cliente para publicar o trabajador para postularte." },
                { icon: ClipboardList, title: "3. Publica o busca", text: "Describe una tarea o revisa trabajos abiertos." },
                { icon: MessageCircle, title: "4. Coordina", text: "Acepta postulaciones y coordina el trabajo." },
              ].map((item) => (
                <article className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" key={item.title}>
                  <item.icon aria-hidden="true" className="text-[var(--brand)]" size={26} />
                  <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12"><RoleSelector /></section>
        <section className="mx-auto max-w-7xl px-4 pb-12"><TrustSafetyNotice /></section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: UsersRound, title: "Roles claros", text: "Cliente, trabajador y admin con limites separados." },
              { icon: ShieldCheck, title: "RLS primero", text: "Datos protegidos por politicas desde el schema." },
              { icon: CheckCircle2, title: "Sin pagos live", text: "Monetizacion documentada y desactivada hasta aprobacion." },
            ].map((item) => (
              <article className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm" key={item.title}>
                <item.icon aria-hidden="true" className="text-[var(--brand)]" size={26} />
                <h2 className="mt-4 text-xl font-black">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-[#eef4ef]">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="text-3xl font-black tracking-[-0.04em]">Estados de trabajo</h2>
            <div className="mt-6"><StatusFlow /></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--brand-dark)]">Categorias</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Trabajos reales para necesidades concretas</h2>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{pilotSalesCopy.main}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link className="focus-ring rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--brand)] hover:text-[var(--brand-dark)]" href="/worker/jobs" key={category}>{category}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
