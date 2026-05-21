import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Seguridad | Trabajos Rapidos",
  description: "Estado de seguridad, RLS y limites del piloto de Trabajos Rapidos.",
};

export default function SeguridadPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-black">Seguridad del piloto</h1>
        <div className="mt-6 grid gap-4">
          {[
            ["Produccion pausada", "El acceso publico de produccion sigue neutralizado con NO-GO_PRODUCTION."],
            ["RLS obligatorio", "Las tablas ej_* usan politicas de acceso por usuario, rol y participacion."],
            ["Pagos apagados", "No hay pagos live ni PayPal live activos en este ciclo."],
            ["Datos sensibles", "No compartas contrasenas, documentos, datos bancarios ni tokens en formularios."],
          ].map(([title, text]) => (
            <article className="rounded-md border border-[var(--line)] bg-white p-5" key={title}>
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-2 leading-7 text-[var(--muted)]">{text}</p>
            </article>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
