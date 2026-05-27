import Link from "next/link";
import { SearchX } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export default function NotFound() {
  return (
    <AppShell>
      <main className="ej-page grid min-h-[70vh] place-items-center px-4 py-10">
        <section className="ej-card w-full max-w-lg p-6 text-center">
          <SearchX aria-hidden="true" className="mx-auto text-[var(--ej-accent)]" size={34} />
          <p className="ej-badge mx-auto mt-4">NO-GO_PRODUCTION</p>
          <h1 className="mt-4 text-3xl font-black">No encontramos esta pagina</h1>
          <p className="ej-muted mt-3 text-sm leading-6">Volvi al marketplace o crea una publicacion nueva dentro del piloto controlado.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link className="focus-ring ej-btn-primary text-sm" href="/">Inicio</Link>
            <Link className="focus-ring ej-btn-secondary text-sm" href="/jobs">Ver trabajos</Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
