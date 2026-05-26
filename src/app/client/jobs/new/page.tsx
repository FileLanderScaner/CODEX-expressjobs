import { CheckCircle2, ClipboardPlus, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { JobForm } from "@/components/job-form";
import { TrustSafetyNotice } from "@/components/trust-safety-notice";

const tips = [
  "Describi la tarea con claridad.",
  "Indica zona aproximada.",
  "Agrega presupuesto estimado.",
  "No compartas datos sensibles.",
];

export default function ClientNewJobPage() {
  return (
    <AppShell>
      <main className="ej-page px-4 py-10">
        <div className="ej-container">
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--ej-accent-soft)] text-[var(--ej-accent)]">
              <ClipboardPlus aria-hidden="true" />
            </span>
            <div>
              <p className="ej-badge">Cliente</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight">Publicar un trabajo</h1>
              <p className="ej-muted mt-3 max-w-2xl text-lg leading-8">Crea una publicacion clara para recibir postulaciones relevantes.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <JobForm />
            <aside className="grid gap-5">
              <section className="ej-glass p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck aria-hidden="true" className="text-[var(--ej-accent)]" />
                  <h2 className="text-xl font-black">Consejos antes de publicar</h2>
                </div>
                <ul className="mt-4 grid gap-3">
                  {tips.map((tip) => (
                    <li className="ej-muted flex gap-2 text-sm leading-6" key={tip}>
                      <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-[var(--ej-accent)]" size={16} />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <TrustSafetyNotice />
            </aside>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
