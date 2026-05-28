import { BadgeDollarSign, BriefcaseBusiness, Building2, CheckCircle2, Mail, Megaphone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { OfferContactForm } from "@/components/monetization/offer-contact-form";
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
      <main className="ej-page">
        <section className="ej-container py-12">
          <p className="ej-badge"><BadgeDollarSign aria-hidden="true" size={15} /> Ofertas manuales</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">Servicios piloto para validar demanda con contacto humano.</h1>
          <p className="ej-muted mt-5 max-w-2xl text-lg leading-8">
            ExpressJobs mantiene produccion publica y pagos online bloqueados. Estas ofertas se coordinan por contacto directo y confirmacion manual.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppCta label="Consultar oferta" />
            <a className="focus-ring ej-btn-secondary text-sm" href="#contacto-oferta">
              Ver datos de contacto
            </a>
          </div>
        </section>

        <section className="ej-dark-section py-10">
          <div className="ej-container grid gap-4 md:grid-cols-3">
            {offers.map((offer) => (
              <RevenuePricingCard ctaHref="#contacto-oferta" key={offer.title} {...offer} />
            ))}
          </div>
        </section>

        <section className="ej-container py-10" id="contacto-oferta">
          <div className="ej-card grid gap-5 p-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="ej-badge">Contacto</p>
              <h2 className="mt-3 text-3xl font-black">Como pedir una oferta</h2>
              <p className="ej-muted mt-3 text-sm leading-6">
                Elegi el servicio, prepara el nombre del negocio, rubro, zona y que queres vender o publicar.
              </p>
              <p className="mt-3 text-sm font-bold text-[var(--ej-text)]">
                WhatsApp: 097045305 - Email: {publicSalesContact.email}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <WhatsAppCta label="Enviar WhatsApp" />
                <a
                  className="focus-ring ej-btn-secondary text-sm"
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
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-3" key={item}>
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 text-[var(--ej-accent)]" size={18} />
                  <p className="text-sm font-semibold leading-6">{item}</p>
                </div>
              ))}
              <OfferContactForm />
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
