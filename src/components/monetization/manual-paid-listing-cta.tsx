import { ArrowRight, ClipboardList } from "lucide-react";
import { salesCtaHref } from "@/lib/monetization/monetization-config";

export function ManualPaidListingCta() {
  return (
    <section className="border-y border-[var(--line)] bg-[#eef4ef]">
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList aria-hidden="true" className="text-[var(--brand)]" size={22} />
            <h2 className="text-2xl font-black">Publicacion manual paga</h2>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
            Piloto manual para negocios y clientes que quieren publicar ofertas, banners o tareas sin esperar pagos dentro de la app.
          </p>
        </div>
        <a
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[var(--brand-dark)]"
          href={salesCtaHref()}
        >
          Consultar paquete
          <ArrowRight aria-hidden="true" size={18} />
        </a>
      </div>
    </section>
  );
}
