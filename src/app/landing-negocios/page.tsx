import { ArrowRight, Building2, CheckCircle2, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RevenuePricingCard } from "@/components/monetization/revenue-pricing-card";
import { WhatsAppCta } from "@/components/monetization/whatsapp-cta";

const packages = [
  {
    title: "Landing basica",
    price: "1500 UYU / USD 39",
    text: "Pagina simple con oferta, zona y boton a WhatsApp.",
  },
  {
    title: "Landing + textos + WhatsApp",
    price: "2500 UYU / USD 69",
    text: "Incluye textos comerciales, estructura y CTA manual.",
  },
  {
    title: "Landing + banner",
    price: "3500 UYU / USD 99",
    text: "Suma banner fundador y publicacion inicial para validar demanda.",
  },
];

export default function BusinessLandingPage() {
  return (
    <AppShell>
      <main>
        <section className="ej-dark-section">
          <div className="ej-container grid gap-8 py-12 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <div className="flex items-center gap-2">
                <Building2 aria-hidden="true" className="text-[var(--ej-accent)]" size={28} />
                <p className="ej-badge">Landing para negocios</p>
              </div>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Una pagina clara para que te escriban por WhatsApp.</h1>
              <p className="ej-muted mt-5 max-w-2xl text-lg leading-8">
                Oferta manual para comercios, servicios y emprendedores en Uruguay y LatAm. No es produccion publica final ni procesa pagos en la app.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <WhatsAppCta label="Pedir landing" />
                <a className="focus-ring ej-btn-secondary text-sm" href="#paquetes">
                  Ver paquetes
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
              </div>
            </div>
            <div className="ej-card p-5">
              <MessageCircle aria-hidden="true" className="text-[var(--ej-accent)]" size={28} />
              <h2 className="mt-4 text-2xl font-black">Pensada para cerrar por WhatsApp</h2>
              <ul className="ej-muted mt-4 grid gap-3 text-sm font-semibold">
                <li className="flex gap-2"><CheckCircle2 aria-hidden="true" className="text-[var(--ej-accent)]" size={18} /> Oferta clara.</li>
                <li className="flex gap-2"><CheckCircle2 aria-hidden="true" className="text-[var(--ej-accent)]" size={18} /> Texto corto y directo.</li>
                <li className="flex gap-2"><CheckCircle2 aria-hidden="true" className="text-[var(--ej-accent)]" size={18} /> CTA manual a WhatsApp Business.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="ej-container grid gap-4 py-10 md:grid-cols-3" id="paquetes">
          {packages.map((item) => (
            <RevenuePricingCard key={item.title} {...item} />
          ))}
        </section>
      </main>
    </AppShell>
  );
}
