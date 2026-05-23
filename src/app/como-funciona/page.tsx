import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Handshake,
  LogIn,
  MessageCircle,
  Search,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrimaryButton } from "@/components/primary-button";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";
import { publicBrand } from "@/lib/expressjobs-data";

export const metadata: Metadata = {
  title: "Como funciona | Trabajos Rapidos",
  description:
    "Guia simple para publicar trabajos, buscar tareas, postularse y coordinar de forma segura en Trabajos Rapidos.",
};

const steps = [
  {
    icon: LogIn,
    title: "1. Crea tu cuenta",
    text: "Ingresa con email o proveedor social cuando el ambiente lo permita. El acceso mantiene el piloto protegido y controlado.",
  },
  {
    icon: UserRoundCheck,
    title: "2. Elegi tu rol",
    text: "Selecciona cliente para publicar trabajos o trabajador para postularte a tareas disponibles.",
  },
  {
    icon: ClipboardList,
    title: "3. Publica o busca",
    text: "El cliente describe una tarea concreta. El trabajador revisa trabajos abiertos y postula si encaja.",
  },
  {
    icon: Handshake,
    title: "4. Acepta una postulacion",
    text: "Cuando el cliente acepta a un trabajador, el flujo queda conectado para coordinar la tarea.",
  },
  {
    icon: MessageCircle,
    title: "5. Coordina con cuidado",
    text: "Usa mensajes y datos claros. No compartas informacion sensible innecesaria ni aceptes condiciones fuera del piloto.",
  },
  {
    icon: CheckCircle2,
    title: "6. Cierra y aprende",
    text: "La etapa piloto sirve para validar experiencia, seguridad, demanda y funcionamiento antes de pagos online.",
  },
];

const safetyItems = [
  "Pagos online y PayPal live siguen apagados.",
  "Produccion publica permanece NO-GO_PRODUCTION.",
  "Los mensajes privados estan limitados por RLS a participantes aceptados.",
  "Las publicaciones deben ser legales, claras y verificables.",
];

export default function ComoFuncionaPage() {
  return (
    <AppShell>
      <main>
        <section className="border-b border-[var(--line)] bg-[#f7f6f2]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[var(--brand)]">
                Guia del piloto
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                Como usar {publicBrand.productName} sin perderte en el proceso.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Esta guia explica el flujo real del marketplace: crear cuenta, elegir rol,
                publicar o buscar trabajos, aceptar postulaciones y coordinar de forma segura.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <PrimaryButton href="/auth" icon={LogIn}>
                  Crear cuenta / Ingresar
                </PrimaryButton>
                <PrimaryButton href="/jobs" icon={Search}>
                  Ver trabajos
                </PrimaryButton>
                <PrimaryButton href="/client/jobs/new" icon={BriefcaseBusiness}>
                  Publicar trabajo
                </PrimaryButton>
              </div>
            </div>

            <aside className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck aria-hidden="true" className="text-[var(--brand)]" size={24} />
                <h2 className="text-xl font-black">Estado seguro actual</h2>
              </div>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
                {safetyItems.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-[var(--brand)]" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm" key={step.title}>
                <step.icon aria-hidden="true" className="text-[var(--brand)]" size={26} />
                <h2 className="mt-4 text-xl font-black">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-[#eef4ef]">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h2 className="text-2xl font-black">Camino recomendado</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-md border border-[var(--line)] bg-white p-5">
                <h3 className="font-black">Cliente</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Crea cuenta, elegi rol cliente, publica una tarea concreta y revisa postulantes.
                </p>
                <div className="mt-4">
                  <PrimaryButton href="/client/jobs/new" icon={ArrowRight}>
                    Publicar como cliente
                  </PrimaryButton>
                </div>
              </div>
              <div className="rounded-md border border-[var(--line)] bg-white p-5">
                <h3 className="font-black">Trabajador</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Crea cuenta, elegi rol trabajador, completa tu perfil y postulate a trabajos abiertos.
                </p>
                <div className="mt-4">
                  <PrimaryButton href="/worker/jobs" icon={ArrowRight}>
                    Buscar como trabajador
                  </PrimaryButton>
                </div>
              </div>
              <div className="rounded-md border border-[var(--line)] bg-white p-5">
                <h3 className="font-black">Antes de pagos</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  El piloto valida seguridad, demanda y flujo. No presentes pagos online como activos.
                </p>
                <div className="mt-4">
                  <PrimaryButton href="/pricing" icon={ArrowRight}>
                    Ver ofertas piloto
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <TrustSafetyNotice />
        </section>
      </main>
    </AppShell>
  );
}