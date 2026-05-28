"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="ej-page grid min-h-screen place-items-center px-4 py-10">
      <section className="ej-card w-full max-w-lg p-6 text-center">
        <AlertTriangle aria-hidden="true" className="mx-auto text-red-200" size={34} />
        <p className="ej-danger-badge mx-auto mt-4">NO-GO_PRODUCTION</p>
        <h1 className="mt-4 text-3xl font-black">Algo no cargo bien</h1>
        <p className="ej-muted mt-3 text-sm leading-6">El piloto sigue protegido. Podes reintentar o volver al inicio sin ejecutar acciones de produccion.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="focus-ring ej-btn-primary text-sm" onClick={reset} type="button">Reintentar</button>
          <Link className="focus-ring ej-btn-secondary text-sm" href="/">Inicio</Link>
        </div>
      </section>
    </main>
  );
}
