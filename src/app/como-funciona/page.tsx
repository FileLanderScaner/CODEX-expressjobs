import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Handshake, LogIn, MessageCircle, Search, ShieldCheck, UserRoundCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";
import { publicBrand } from "@/lib/expressjobs-data";

export const metadata: Metadata = {
  title: "Como funciona | Trabajos Rapidos",
  description: "Guia simple para publicar trabajos, buscar tareas, postularse y coordinar de forma segura en Trabajos Rapidos.",
};

const checklist = [
  "Pagos online y PayPal live siguen apagados.",
  "Produccion publica permanece NO-GO_PRODUCTION.",
  "Mensajes privados limitados por RLS a participantes autorizados.",
  "Las publicaciones deben ser legales, claras y verificables.",
];

const flow = [
  { icon: BriefcaseBusiness, title: "1. Publica o busca", text: "El cliente describe una tarea concreta. El trabajador revisa trabajos abiertos y postula si encaja." },
  { icon: UserRoundCheck, title: "2. Compara y elegi", text: "Revisa perfil, mensaje, presupuesto y estado antes de aceptar o seguir buscando." },
  { icon: Handshake, title: "3. Coordina seguro", text: "Cuando el cliente acepta a un trabajador, el flujo queda conectado para coordinar la tarea." },
];

const roles = [
  { title: "Cliente", text: "Crea cuenta, elegi rol cliente, publica una tarea concreta y revisa postulantes.", href: "/client/jobs/new", cta: "Publicar como cliente" },
  { title: "Trabajador", text: "Crea cuenta, elegi rol trabajador, completa tu perfil y postulate a trabajos abiertos.", href: "/worker/jobs", cta: "Buscar como trabajador" },
  { title: "Antes de pagos", text: "El piloto valida seguridad, demanda y flujo. No presentes pagos online como activos.", href: "/pricing", cta: "Ver ofertas piloto" },
];

export default function ComoFuncionaPage() {
  return (
    <AppShell>
      <main className="ej-page">
        <section className="ej-container grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="ej-badge">Guia del piloto</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Como usar {publicBrand.productName} sin perderte en el proceso.
            </h1>
            <p className="ej-muted mt-5 max-w-2xl text-lg leading-8">
              Crea una cuenta, elegi tu rol, publica o busca trabajos y coordina de forma clara dentro de una experiencia segura.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton href="/auth" icon={LogIn}>Crear cuenta / Ingresar</PrimaryButton>
              <PrimaryButton href="/jobs" icon={Search}>Ver trabajos</PrimaryButton>
              <PrimaryButton href="/client/jobs/new" icon={BriefcaseBusiness}>Publicar trabajo</PrimaryButton>
            </div>
          </div>

          <aside className="ej-glass p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck aria-hidden="true" className="text-[var(--ej-accent)]" size={24} />
              <h2 className="text-xl font-black">Estado seguro actual</h2>
            </div>
            <ul className="mt-4 grid gap-3">
              {checklist.map((item) => (
                <li className="ej-muted flex gap-2 text-sm leading-6" key={item}>
                  <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-[var(--ej-accent)]" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="ej-dark-section py-12">
          <div className="ej-container">
            <p className="ej-badge">Flujo real</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight">Tres pasos para avanzar con claridad</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {flow.map((step) => (
                <article className="ej-card p-5" key={step.title}>
                  <step.icon aria-hidden="true" className="text-[var(--ej-accent)]" size={26} />
                  <h3 className="mt-4 text-xl font-black">{step.title}</h3>
                  <p className="ej-muted mt-2 text-sm leading-6">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ej-container py-12">
          <p className="ej-badge">Roles</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight">Camino recomendado</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {roles.map((role) => (
              <div className="ej-card p-5" key={role.title}>
                <h3 className="text-xl font-black">{role.title}</h3>
                <p className="ej-muted mt-2 text-sm leading-6">{role.text}</p>
                <div className="mt-4">
                  <PrimaryButton href={role.href} icon={ArrowRight}>{role.cta}</PrimaryButton>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ej-container pb-12">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="ej-card p-5">
              <MessageCircle aria-hidden="true" className="text-[var(--ej-accent)]" />
              <h2 className="mt-3 text-2xl font-black">Seguridad de coordinacion</h2>
              <p className="ej-muted mt-3 text-sm leading-6">
                Usa mensajes y datos claros. No compartas informacion sensible innecesaria ni aceptes condiciones fuera del piloto.
              </p>
            </div>
            <TrustSafetyNotice />
          </div>
        </section>
      </main>
    </AppShell>
  );
}
