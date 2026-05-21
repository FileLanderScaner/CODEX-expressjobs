import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Como funciona | Trabajos Rapidos",
  description: "Flujo cliente trabajador para publicar tareas, postularse y coordinar trabajos locales.",
};

export default function ComoFuncionaPage() {
  const steps = [
    ["Crear cuenta", "Ingresas con email o proveedor social configurado para el ambiente."],
    ["Elegir rol", "Cliente publica trabajos; trabajador revisa oportunidades abiertas."],
    ["Postular o aceptar", "Las postulaciones y aceptaciones se guardan en Supabase con RLS."],
    ["Coordinar", "El chat se limita a participantes autorizados del trabajo aceptado."],
  ];

  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-black">Como funciona</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {steps.map(([title, text]) => (
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
