import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contacto | Trabajos Rapidos",
  description: "Contacto seguro para el piloto controlado de Trabajos Rapidos.",
};

export default function ContactoPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-black">Contacto</h1>
        <p className="mt-3 leading-7 text-[var(--muted)]">Envianos una consulta sin incluir contrasenas, documentos, datos bancarios ni informacion sensible.</p>
        <ContactForm />
      </main>
    </AppShell>
  );
}
