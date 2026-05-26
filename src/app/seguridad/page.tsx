import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";

export const metadata: Metadata = {
  title: "Seguridad | Trabajos Rapidos",
  description: "Reglas de seguridad, limites del piloto y buenas practicas para usar Trabajos Rapidos.",
};

const rules = [
  "No compartas documentos, claves, tarjetas, codigos ni informacion sensible por chat.",
  "Coordina tareas simples, legales y verificables.",
  "No hay pagos online activos ni garantias comerciales durante el piloto.",
  "No aceptes trabajos peligrosos, ilegales, ambiguos o fuera del alcance acordado.",
  "Reporta publicaciones sospechosas, spam, abuso o intentos de fraude.",
];

const faqs = [
  {
    question: "¿Hay pagos reales dentro de la app?",
    answer: "No. El piloto mantiene pagos online y PayPal live apagados. Cualquier coordinacion economica debe tratarse como validacion manual fuera del checkout de la app.",
  },
  {
    question: "¿La plataforma garantiza empleo o ingresos?",
    answer: "No. Trabajos Rapidos ayuda a conectar clientes y trabajadores, pero no garantiza contratacion, ingresos, disponibilidad ni resultado comercial.",
  },
  {
    question: "¿Puedo publicar cualquier trabajo?",
    answer: "No. Las publicaciones deben ser legales, claras, seguras y concretas. No se aceptan tareas peligrosas, abusivas, engañosas o ilegales.",
  },
  {
    question: "¿Por que el Preview puede pedir acceso?",
    answer: "Porque el ambiente de prueba usa Vercel Deployment Protection. Eso protege el piloto antes de abrirlo publicamente.",
  },
];

export default function SeguridadPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="rounded-md border border-[var(--line)] bg-[#f7f6f2] p-6">
          <p className="text-sm font-black uppercase tracking-wide text-[var(--brand)]">Confianza y seguridad</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">Usa Trabajos Rapidos con reglas claras.</h1>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">
            Esta pagina resume los limites del piloto, buenas practicas y advertencias para clientes y trabajadores.
          </p>
        </section>

        <section className="mt-6">
          <TrustSafetyNotice />
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-md border border-[var(--line)] bg-white p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck aria-hidden="true" className="text-[var(--brand)]" size={24} />
              <h2 className="text-2xl font-black">Reglas basicas</h2>
            </div>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
              {rules.map((rule) => (
                <li className="flex gap-2" key={rule}>
                  <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-[var(--brand)]" size={16} />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-md border border-[#e2b8b1] bg-[#fff4f2] p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle aria-hidden="true" className="text-[var(--danger)]" size={24} />
              <h2 className="text-2xl font-black">No presentar como activo</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              No presentes pagos online, verificacion de identidad, garantias comerciales, soporte 24/7,
              empleo garantizado o ingresos garantizados como funciones activas del piloto.
            </p>
          </article>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black">Preguntas frecuentes</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article className="rounded-md border border-[var(--line)] bg-white p-5" key={faq.question}>
                <h3 className="font-black">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}