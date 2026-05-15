import { ArrowRight, BadgeDollarSign, Building2, ClipboardList, Megaphone, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ManualPaidListingCta } from "@/components/monetization/manual-paid-listing-cta";
import { SponsoredBanner } from "@/components/monetization/sponsored-banner";
import { WhatsAppCta } from "@/components/monetization/whatsapp-cta";
import { latamRevenuePrices, monetizationConfig, uruguayRevenuePrices } from "@/lib/monetization/monetization-config";

const offerCards = [
  {
    icon: Building2,
    title: "Landing para negocios",
    text: "Pagina simple con oferta, textos, zona y llamada directa a WhatsApp.",
  },
  {
    icon: Megaphone,
    title: "Banner fundador",
    text: "Espacio patrocinado manual para comercios que quieren visibilidad temprana.",
  },
  {
    icon: ClipboardList,
    title: "Publicacion manual",
    text: "Armado manual de trabajos o pedidos para validar demanda sin pagos in-app.",
  },
];

export default function SponsorPage() {
  const config = monetizationConfig();

  return (
    <AppShell>
      <main>
        <section className="border-b border-[var(--line)] bg-[#f7f6f2]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase text-[var(--brand)]">Piloto comercial manual</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Vende tu negocio con una pieza simple y accionable.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                ExpressJobs esta validando ofertas manuales para negocios en Uruguay y LatAm. No procesamos pagos dentro de la app y no prometemos produccion publica completa.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <WhatsAppCta />
                <a className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold text-[var(--foreground)] shadow-sm hover:bg-[#eef4ef]" href="#precios">
                  Ver precios
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              {offerCards.map((offer) => (
                <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm" key={offer.title}>
                  <offer.icon aria-hidden="true" className="text-[var(--brand)]" size={24} />
                  <h2 className="mt-3 text-xl font-black">{offer.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{offer.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ManualPaidListingCta />

        <section className="mx-auto max-w-6xl px-4 py-10" id="precios">
          <div className="flex items-center gap-2">
            <BadgeDollarSign aria-hidden="true" className="text-[var(--brand)]" size={26} />
            <h2 className="text-3xl font-black">Precios de piloto</h2>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <PriceTable title="Uruguay" rows={uruguayRevenuePrices} />
            <PriceTable title="LatAm" rows={latamRevenuePrices} />
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-white">
          <div className="mx-auto grid max-w-6xl gap-5 px-4 py-10 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck aria-hidden="true" className="text-[var(--brand)]" size={24} />
                <h2 className="text-2xl font-black">Aviso honesto</h2>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                Esta es una etapa de piloto manual. Los pagos se coordinan fuera de la app por un humano, la entrega se confirma por mensaje y la plataforma mantiene produccion bloqueada hasta completar los gates tecnicos.
              </p>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-[var(--muted)]">
                <li>No ingreses datos de tarjeta en ExpressJobs.</li>
                <li>No hay PayPal live activo.</li>
                <li>No hay garantia de ventas, trabajadores o trafico publico.</li>
              </ul>
            </div>
            <SponsoredBanner />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10" id="sponsor-intake">
          <h2 className="text-2xl font-black">Datos para solicitar paquete</h2>
          <div className="mt-5 grid gap-3 rounded-md border border-[var(--line)] bg-white p-5 text-sm text-[var(--muted)]">
            <p>Nombre del negocio: [placeholder]</p>
            <p>Rubro: [placeholder]</p>
            <p>Zona: [placeholder]</p>
            <p>WhatsApp: usar link publico provisto por humano fuera del repo</p>
            <p>Texto corto: [placeholder]</p>
            <p>Logo opcional: [placeholder]</p>
            <p>Paquete elegido: [placeholder]</p>
            <p>Duracion: [placeholder]</p>
            <p>Estado de pago: manual fuera de la app</p>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase text-[var(--muted)]">
            CTA externo configurado: {config.whatsappSalesLink ? "si" : "no"}
          </p>
        </section>
      </main>
    </AppShell>
  );
}

function PriceTable({ title, rows }: { title: string; rows: Array<{ label: string; price: string }> }) {
  return (
    <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      <h3 className="text-xl font-black">{title}</h3>
      <div className="mt-4 divide-y divide-[var(--line)]">
        {rows.map((row) => (
          <div className="flex items-center justify-between gap-4 py-3 text-sm" key={`${title}-${row.label}`}>
            <span className="font-semibold text-[var(--muted)]">{row.label}</span>
            <span className="font-black text-[var(--foreground)]">{row.price}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
