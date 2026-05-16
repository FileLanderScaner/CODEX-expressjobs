import { ArrowRight, BriefcaseBusiness, CheckCircle2, ClipboardList, LogIn, MessageCircle, Search, ShieldCheck, UserRoundCheck, UsersRound } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";
import { RoleSelector } from "@/components/role-selector";
import { StatusFlow } from "@/components/status-flow";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";
import { TrackingClient } from "@/components/tracking-client";
import { categories, publicBrand } from "@/lib/expressjobs-data";

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
                Crea una cuenta, elegi si sos cliente o trabajador, y empeza a publicar o buscar tareas locales con postulaciones reales. El piloto mantiene pagos online apagados y seguridad primero.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <PrimaryButton href="/client/jobs/new" icon={BriefcaseBusiness}>
                  Publicar un trabajo
                </PrimaryButton>
                <PrimaryButton href="/worker/jobs" icon={ArrowRight}>
                  Buscar trabajos
                </PrimaryButton>
                <PrimaryButton href="/auth" icon={LogIn}>
                  Ingresar / Crear cuenta
                </PrimaryButton>
                <PrimaryButton href="/role" icon={UserRoundCheck}>
                  Elegir rol
                </PrimaryButton>
              </div>
              <div className="mt-5 rounded-md border border-[var(--line)] bg-white p-4 text-sm leading-6 text-[var(--muted)]">
                <strong className="text-[var(--foreground)]">Paso recomendado:</strong> primero crea cuenta o inicia sesion, despues elegi rol y recien ahi publica o postulate.
              </div>
            </div>
            <div className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Search aria-hidden="true" className="text-[var(--brand)]" size={24} />
                <h2 className="text-xl font-black">Buscar por categoria</h2>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {categories.map((category) => (
                  <Link
                    className="focus-ring rounded-md border border-[var(--line)] bg-[#f7f6f2] px-3 py-2 text-sm font-bold hover:bg-[#eef4ef]"
                    href="/worker/jobs"
                    key={category}
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Los trabajos disponibles se cargan desde Supabase cuando el ambiente esta configurado.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-white" id="como-funciona">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h2 className="text-2xl font-black">Como funciona</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {[
                { icon: LogIn, title: "1. Crea cuenta", text: "Entra con email o login social cuando este configurado en el ambiente." },
                { icon: UserRoundCheck, title: "2. Elegi rol", text: "Selecciona cliente para publicar o trabajador para postularte." },
                { icon: ClipboardList, title: "3. Publica o busca", text: "El cliente describe una tarea simple o el trabajador revisa trabajos abiertos." },
                { icon: MessageCircle, title: "4. Coordina", text: "El cliente acepta una postulacion y las partes coordinan el trabajo." },
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
          <h2 className="text-2xl font-black">Categorias de trabajos</h2>
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
