import Link from "next/link";

export default function ProductionPausedPage() {
  return (
    <main className="ej-page px-4 py-10">
      <section className="ej-card mx-auto max-w-2xl p-6">
        <p className="ej-badge">Trabajos Rapidos</p>
        <h1 className="mt-3 text-3xl font-black">Acceso publico pausado</h1>
        <p className="ej-muted mt-4 leading-7">
          ExpressJobs esta en modo MVP controlado. La version publica de produccion permanece bloqueada hasta completar la aprobacion humana de seguridad, soporte y operacion.
        </p>
        <div className="mt-5 rounded-lg border border-[rgba(239,68,68,0.32)] bg-[var(--ej-danger-soft)] p-4 text-sm leading-6 text-red-200">
          <strong>PRODUCTION_STATUS=NO-GO_PRODUCTION.</strong> No hay pagos online activos, no se debe usar como produccion publica y el acceso se mantiene neutralizado de forma reversible.
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
          <Link className="focus-ring ej-btn-primary text-sm" href="mailto:akuma_g1@hotmail.com">
            Contactar por email
          </Link>
          <Link className="focus-ring ej-btn-secondary text-sm" href="https://wa.me/59897045305">
            Consultar por WhatsApp
          </Link>
        </div>
      </section>
    </main>
  );
}
