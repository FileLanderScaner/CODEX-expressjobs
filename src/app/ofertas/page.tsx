import { BadgeDollarSign, BriefcaseBusiness, Building2, CheckCircle2, Mail, Megaphone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RevenuePricingCard } from "@/components/monetization/revenue-pricing-card";
import { WhatsAppCta } from "@/components/monetization/whatsapp-cta";
import { publicSalesContact } from "@/lib/monetization/monetization-config";

const offers = [
  {
    title: "Landing para negocios",
    price: "Desde 1500 UYU / USD 39",
    text: "Pagina simple, textos claros y CTA a WhatsApp para vender hoy.",
    icon: Building2,
    ctaLabel: "Quiero una landing",
  },
  {
    title: "Banner fundador",
    price: "Desde 500 UYU / USD 15",
    text: "Espacio patrocinado manual para comercios que quieran presencia temprana en ExpressJobs.",
    icon: Megaphone,
    ctaLabel: "Quiero un banner",
  },
  {
    title: "Publicacion manual",
    price: "Desde 500 UYU / USD 15",
    text: "Publicamos y ordenamos una necesidad de trabajo sin activar funciones internas de cobro.",
    icon: BriefcaseBusiness,
    ctaLabel: "Quiero publicar",
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
              ExpressJobs mantiene funciones internas avanzadas bloqueadas. Estas ofertas se coordinan por contacto directo.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppCta label="Consultar oferta" />
              <a className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm font-black text-[var(--foreground)] hover:bg-[#f7f6f2]" href="#contacto-oferta">
                Ver datos de contacto
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-3">
          {offers.map((offer) => (
            <RevenuePricingCard ctaHref="#contacto-oferta" key={offer.title} {...offer} />
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10" id="contacto-oferta">
          <div className="grid gap-5 rounded-md border border-[var(--line)] bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[var(--brand)]">Contacto</p>
              <h2 className="mt-3 text-3xl font-black">Como pedir una oferta</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Elegi el servicio, prepara el nombre del negocio, rubro, zona y que queres vender o publicar.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <WhatsAppCta label="Enviar WhatsApp" />
                <a
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm font-black text-[var(--foreground)] hover:bg-[#f7f6f2]"
                  href={`mailto:${publicSalesContact.email}?subject=Consulta Trabajos Rapidos`}
                >
                  Email
                  <Mail aria-hidden="true" size={18} />
                </a>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                "Servicio elegido: landing, banner o publicacion manual.",
                "Nombre del negocio o emprendimiento.",
                "Rubro y zona donde trabaja.",
                "Telefono o WhatsApp para contacto.",
                "Texto breve de lo que quiere vender o publicar.",
              ].map((item) => (
                <div className="flex items-start gap-3 rounded-md border border-[var(--line)] bg-[#eef4ef] p-3" key={item}>
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 text-[var(--brand)]" size={18} />
                  <p className="text-sm font-semibold leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
