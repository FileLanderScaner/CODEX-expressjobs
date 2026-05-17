import Link from "next/link";

export default function ProductionPausedPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] px-4 py-10 text-[var(--foreground)]">
      <section className="mx-auto max-w-2xl rounded-md border border-[var(--line)] bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">Trabajos Rapidos</p>
        <h1 className="mt-3 text-3xl font-black">Acceso publico pausado</h1>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          ExpressJobs esta en modo MVP controlado. La version publica de produccion permanece bloqueada hasta completar la aprobacion humana de seguridad, soporte y operacion.
        </p>
        <div className="mt-5 rounded-md border border-[var(--line)] bg-[#f7f6f2] p-4 text-sm leading-6 text-[var(--muted)]">
          <strong className="text-[var(--foreground)]">PRODUCTION_STATUS=NO-GO_PRODUCTION.</strong> No hay pagos online activos, no se debe usar como produccion publica y el acceso se mantiene neutralizado de forma reversible.
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
          <Link className="focus-ring rounded-md bg-[var(--brand)] px-4 py-3 text-white" href="mailto:akuma_g1@hotmail.com">
            Contactar por email
          </Link>
          <Link className="focus-ring rounded-md border border-[var(--line)] px-4 py-3" href="https://wa.me/59897045305">
            Consultar por WhatsApp
          </Link>
        </div>
      </section>
    </main>
  );
}
