import { AppShell } from "@/components/app-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad | Trabajos Rapidos",
  description: "Politica inicial de privacidad del piloto Trabajos Rapidos.",
};

export default function PrivacyPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-black">Privacidad</h1>
        <p className="mt-4 leading-7 text-[var(--muted)]">El MVP debe minimizar datos personales, proteger perfiles, trabajos, mensajes y reseñas con RLS, y no exponer claves server-only en el cliente.</p>
      </main>
    </AppShell>
  );
}
