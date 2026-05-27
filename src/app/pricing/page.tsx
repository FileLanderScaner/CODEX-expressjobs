import { CircleDollarSign, Clock3, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PilotOfferWhatsAppCta, PricingViewTracker } from "@/components/pricing-tracking";
import { pilotOfferDisclaimer, pilotOffers } from "@/lib/expressjobs-data";

export default function PricingPage() {
  return (
    <AppShell>
      <PricingViewTracker />
      <main className="ej-page px-4 py-10">
        <div className="ej-container">
          <div className="max-w-3xl">
            <p className="ej-badge"><CircleDollarSign aria-hidden="true" size={15} /> Ofertas piloto</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight">Ofertas piloto ExpressJobs</h1>
            <p className="ej-muted mt-3 text-lg leading-8">
              Paginas simples, banners para comercios y publicaciones de trabajos rapidos con precio piloto. Todo se coordina manualmente por WhatsApp; no hay pagos online activos.
            </p>
            <div className="mt-5 rounded-2xl border border-[rgba(255,90,120,0.28)] bg-[var(--ej-danger-soft)] p-4 text-sm font-semibold text-[#ffb4c2]">
              <div className="flex gap-2">
                <ShieldAlert aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
                <p>{pilotOfferDisclaimer}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pilotOffers.map((offer) => (
              <article className="ej-card p-5" key={offer.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-black">{offer.name}</h2>
                    <p className="ej-muted mt-1 text-sm">{offer.includes}</p>
                  </div>
                  <span className="ej-chip text-xs">{offer.priority}</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                    <p className="ej-soft text-xs font-bold uppercase">Uruguay</p>
                    <p className="mt-1 text-xl font-black">{offer.uyPrice}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                    <p className="ej-soft text-xs font-bold uppercase">LatAm</p>
                    <p className="mt-1 text-xl font-black">{offer.usdPrice}</p>
                  </div>
                </div>
                <p className="ej-muted mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                  <Clock3 aria-hidden="true" size={16} />
                  Entrega: {offer.delivery}
                </p>
                <div className="mt-5">
                  <PilotOfferWhatsAppCta offer={offer} />
                </div>
              </article>
            ))}
          </div>
          <p className="ej-soft mt-6 text-sm leading-6">
            Fuente interna de piloto comercial, creada el 2026-05-15. Estas ofertas son piloto y requieren confirmacion manual antes de cualquier cobro fuera de la app.
          </p>
        </div>
      </main>
    </AppShell>
  );
}
