import { BadgeDollarSign, BriefcaseBusiness, Building2, Megaphone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RevenuePricingCard } from "@/components/monetization/revenue-pricing-card";
import { WhatsAppCta } from "@/components/monetization/whatsapp-cta";

const offers = [
  {
    title: "Landing para negocios",
    price: "Desde 1500 UYU / USD 39",
    text: "La oferta principal: pagina simple, textos claros y CTA a WhatsApp para vender hoy.",
    icon: Building2,
  },
  {
    title: "Banner fundador",
    price: "Desde 500 UYU / USD 15",
    text: "Espacio patrocinado manual para comercios que quieran presencia temprana en ExpressJobs.",
    icon: Megaphone,
  },
  {
    title: "Publicacion manual",
    price: "Desde 500 UYU / USD 15",
    text: "Publicamos y ordenamos una necesidad de trabajo sin activar pagos dentro de la app.",
    icon: BriefcaseBusiness,
  },
];

export default function OffersPage() {
  return (
    <AppShell>
      <main>
        <section className="border-b border-[var(--line)] bg-[#f7f6f2]">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="flex items-center gap-2">
              <BadgeDollarSign aria-hidden="true" className="text-[var(--brand)]" size={28} />
              <p className="text-sm font-bold uppercase text-[var(--brand)]">Ofertas manuales</p>
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Servicios para vender hoy sin esperar produccion.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              ExpressJobs mantiene pagos in-app y produccion bloqueados. Estas ofertas son entregas manuales coordinadas por WhatsApp Business.
            </p>
            <div className="mt-7">
              <WhatsAppCta label="Consultar oferta" />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-3">
          {offers.map((offer) => (
            <RevenuePricingCard key={offer.title} {...offer} />
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="rounded-md border border-[#e2b8b1] bg-[#fff4f2] p-5 text-sm font-semibold text-[var(--danger)]">
            No ingreses datos de pago en ExpressJobs. El cobro manual se coordina fuera de la app por un humano.
          </div>
        </section>
      </main>
    </AppShell>
  );
}
