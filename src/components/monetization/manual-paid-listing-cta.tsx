import { ArrowRight, ClipboardList } from "lucide-react";
import { salesCtaHref } from "@/lib/monetization/monetization-config";

export function ManualPaidListingCta() {
  return (
    <section className="ej-dark-section">
      <div className="ej-container grid gap-5 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList aria-hidden="true" className="text-[var(--ej-accent)]" size={22} />
            <h2 className="text-2xl font-black">Publicacion manual paga</h2>
          </div>
          <p className="ej-muted mt-2 max-w-3xl text-sm leading-6">
            Piloto manual para negocios y clientes que quieren publicar ofertas, banners o tareas sin esperar pagos dentro de la app.
          </p>
        </div>
        <a
          className="focus-ring ej-btn-primary text-sm"
          href={salesCtaHref()}
        >
          Consultar paquete
          <ArrowRight aria-hidden="true" size={18} />
        </a>
      </div>
    </section>
  );
}
