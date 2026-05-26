import { Loader2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export default function Loading() {
  return (
    <AppShell>
      <main className="ej-page grid min-h-[70vh] place-items-center px-4 py-10">
        <section className="ej-card w-full max-w-md p-6 text-center">
          <Loader2 aria-hidden="true" className="mx-auto animate-spin text-[var(--ej-accent)]" size={30} />
          <h1 className="mt-4 text-2xl font-black">Cargando Trabajos Rapidos</h1>
          <p className="ej-muted mt-2 text-sm">Preparando una experiencia segura del piloto.</p>
        </section>
      </main>
    </AppShell>
  );
}
