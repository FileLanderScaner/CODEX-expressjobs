import { CircleDollarSign, Clock3, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PilotOfferWhatsAppCta, PricingViewTracker } from "@/components/pricing-tracking";
import { pilotOfferDisclaimer, pilotOffers } from "@/lib/expressjobs-data";

export default function PricingPage() {
  return (
    <AppShell>
      <PricingViewTracker />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <CircleDollarSign aria-hidden="true" className="text-[var(--brand)]" size={28} />
            <h1 className="text-3xl font-black">Ofertas piloto ExpressJobs</h1>
          </div>
          <p className="mt-3 text-lg leading-8 text-[var(--muted)]">
            Paginas simples, banners para comercios y publicaciones de trabajos rapidos con precio piloto. Todo se coordina manualmente por WhatsApp; no hay pagos online activos.
          </p>
          <div className="mt-5 rounded-md border border-[#e2b8b1] bg-[#fff4f2] p-4 text-sm font-semibold text-[var(--danger)]">
            <div className="flex gap-2">
              <ShieldAlert aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
              <p>{pilotOfferDisclaimer}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {pilotOffers.map((offer) => (
            <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm" key={offer.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black">{offer.name}</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">{offer.includes}</p>
                </div>
                <span className="rounded-md border border-[var(--line)] bg-[#f7f6f2] px-2 py-1 text-xs font-bold">{offer.priority}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-md bg-[#f7f6f2] p-3">
                  <p className="text-xs font-bold uppercase text-[var(--muted)]">Uruguay</p>
                  <p className="mt-1 text-xl font-black">{offer.uyPrice}</p>
                </div>
                <div className="rounded-md bg-[#f7f6f2] p-3">
                  <p className="text-xs font-bold uppercase text-[var(--muted)]">LatAm</p>
                  <p className="mt-1 text-xl font-black">{offer.usdPrice}</p>
                </div>
              </div>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
                <Clock3 aria-hidden="true" size={16} />
                Entrega: {offer.delivery}
              </p>
              <div className="mt-5">
                <PilotOfferWhatsAppCta offer={offer} />
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
          Fuente: Google Drive, hoja &quot;ExpressJobs - Centro Online de Ventas&quot;, pestana &quot;Ofertas&quot;, creada el 2026-05-15. Estas ofertas son piloto y requieren confirmacion manual antes de cualquier cobro fuera de la app.
        </p>
      </main>
    </AppShell>
  );
}
