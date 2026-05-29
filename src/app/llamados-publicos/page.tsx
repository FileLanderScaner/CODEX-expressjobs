import { ArrowRight, ClipboardList, ExternalLink, FileCheck2, FileSearch, FolderCheck, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PublicCallsClient } from "@/components/public-calls-client";
import { publicCalls, publicCallsPilotNotice } from "@/lib/public-calls-data";
import { publicSalesContact } from "@/lib/monetization/monetization-config";

const preparationText = encodeURIComponent(
  "Hola Ronald, quiero preparar una postulacion para un llamado publico. Necesito ordenar requisitos y documentos.",
);

const preparationHref = `https://wa.me/${publicSalesContact.whatsappNumber}?text=${preparationText}`;

const sourceCount = new Set(publicCalls.map((call) => call.sourceName)).size;
const closingSoonCount = publicCalls.filter((call) => call.status === "proximo-cierre").length;

const metrics = [
  { label: "Llamados en radar", value: String(publicCalls.length), helper: "Referencias manuales" },
  { label: "Cierres proximos", value: String(closingSoonCount), helper: "Verificados solo en fuente oficial" },
  { label: "Organismos / fuentes", value: String(sourceCount), helper: "Fuente externa visible" },
  { label: "Postulaciones preparables", value: String(publicCalls.length), helper: "Con checklist documental" },
];

const casoClaroPackages = [
  {
    name: "Revision rapida de llamado",
    price: "UYU 800",
    text: "Lectura de bases, requisitos principales, fechas a controlar y dudas para verificar en la fuente oficial.",
  },
  {
    name: "Preparacion de postulacion",
    price: "UYU 1.500",
    text: "Checklist de documentos, CV/carta o resumen, carpeta inicial y orden de pasos para postular.",
  },
  {
    name: "Carpeta completa para concurso",
    price: "Desde UYU 3.500",
    text: "Carpeta digital organizada, requisitos, documentos, control de fechas y resumen listo para revision.",
  },
] as const;

export default function LlamadosPublicosPage() {
  return (
    <AppShell>
      <main className="ej-page">
        <section className="relative isolate overflow-hidden py-14 lg:py-20">
          <div className="hero-grid-pattern absolute inset-0 -z-10 opacity-35" />
          <div className="ej-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="ej-badge">Radar publico</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl">
                Llamados públicos y oportunidades oficiales en un solo lugar.
              </h1>
              <p className="ej-muted mt-6 max-w-2xl text-lg leading-8">
                Encontra referencias a llamados publicos, concursos y oportunidades oficiales. Guarda el enlace original y prepara tu postulacion con ayuda documental.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="focus-ring ej-btn-primary text-sm uppercase tracking-[0.12em]" href="#llamados">
                  Ver llamados <ArrowRight aria-hidden="true" size={18} />
                </a>
                <a className="focus-ring ej-btn-secondary text-sm uppercase tracking-[0.12em]" href={preparationHref}>
                  Preparar postulación <MessageCircle aria-hidden="true" size={18} />
                </a>
              </div>
              <div className="ej-glass mt-6 max-w-2xl p-4 text-sm leading-6">
                <strong className="text-white">Piloto controlado:</strong> {publicCallsPilotNotice}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {metrics.map((metric) => (
                <article className="rounded-lg border border-[var(--ej-border)] bg-white/[0.06] p-5" key={metric.label}>
                  <p className="text-4xl font-black tracking-tight text-white">{metric.value}</p>
                  <h2 className="mt-3 text-sm font-black uppercase tracking-[0.14em] text-blue-200">{metric.label}</h2>
                  <p className="ej-muted mt-2 text-sm leading-6">{metric.helper}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ej-container py-12">
          <PublicCallsClient calls={publicCalls} />
        </section>

        <section className="ej-dark-section py-12">
          <div className="ej-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="ej-badge">Caso Claro</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Prepará tu postulación con Caso Claro</h2>
              <p className="ej-muted mt-4 text-sm leading-6">
                Servicio de apoyo documental para entender requisitos, ordenar constancias, preparar carpeta y controlar fechas antes de postular en la fuente oficial.
              </p>
              <div className="mt-5 grid gap-3 text-sm text-[var(--ej-text-muted)]">
                {[
                  "revision rapida de requisitos",
                  "checklist de documentos",
                  "carpeta para concurso",
                  "CV, carta o resumen",
                  "control de fechas",
                  "consulta por WhatsApp",
                ].map((item) => (
                  <div className="flex gap-3" key={item}>
                    <FileCheck2 aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--ej-success)]" size={18} />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {casoClaroPackages.map((item) => (
                <article className="ej-card flex min-h-[280px] flex-col justify-between p-6" key={item.name}>
                  <div>
                    <p className="ej-chip text-[11px] uppercase tracking-[0.14em]">{item.name}</p>
                    <h3 className="mt-4 text-3xl font-black tracking-tight text-white">{item.price}</h3>
                    <p className="ej-muted mt-4 text-sm leading-6">{item.text}</p>
                  </div>
                  <a className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-emerald-200" href={preparationHref}>
                    Consultar <MessageCircle aria-hidden="true" size={16} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ej-container py-12">
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="ej-card p-6">
              <ShieldCheck aria-hidden="true" className="text-[var(--ej-success)]" size={28} />
              <h2 className="mt-4 text-xl font-black tracking-tight">Fuente oficial primero</h2>
              <p className="ej-muted mt-3 text-sm leading-6">
                ExpressJobs no administra ni representa llamados publicos externos. La informacion debe verificarse siempre en la fuente oficial.
              </p>
            </article>
            <article className="ej-card p-6">
              <FileSearch aria-hidden="true" className="text-[var(--ej-accent)]" size={28} />
              <h2 className="mt-4 text-xl font-black tracking-tight">Sin extraccion automatica</h2>
              <p className="ej-muted mt-3 text-sm leading-6">
                Este radar usa datos semilla/manuales. No hace scraping, no copia bases completas y no afirma vigencia de llamados sin validar.
              </p>
            </article>
            <article className="ej-card p-6">
              <FolderCheck aria-hidden="true" className="text-amber-200" size={28} />
              <h2 className="mt-4 text-xl font-black tracking-tight">Preparacion documental</h2>
              <p className="ej-muted mt-3 text-sm leading-6">
                El valor de Caso Claro es ayudar a ordenar requisitos, documentos y fechas antes de completar la postulacion oficial.
              </p>
            </article>
          </div>
          <div className="ej-glass mt-6 p-5 text-sm leading-6">
            <strong className="text-white">Aviso importante:</strong> ExpressJobs no administra ni representa llamados publicos externos. La informacion debe verificarse siempre en la fuente oficial. Este radar es una ayuda de organizacion y preparacion documental.
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="focus-ring ej-btn-secondary text-sm uppercase tracking-[0.12em]" href="/servicios">
              Ver Caso Claro <ClipboardList aria-hidden="true" size={17} />
            </Link>
            <a className="focus-ring ej-btn-secondary text-sm uppercase tracking-[0.12em]" href="https://uruguayconcursa.gub.uy/" rel="noreferrer" target="_blank">
              Portal oficial externo <ExternalLink aria-hidden="true" size={17} />
            </a>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
