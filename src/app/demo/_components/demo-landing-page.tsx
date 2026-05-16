import { ArrowRight, BadgeCheck, CalendarDays, CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export type DemoLandingContent = {
  businessName: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  services: string[];
  benefits: string[];
  proofPoints: string[];
  audience: string;
};

export function DemoLandingPage({ demo }: { demo: DemoLandingContent }) {
  const salesHref = process.env.NEXT_PUBLIC_WHATSAPP_SALES_LINK || "/landing-negocios";

  return (
    <AppShell>
      <main className="bg-[#f7f6f2]">
        <section className="border-b border-[var(--line)] bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[#eef4ef] px-3 py-1 text-xs font-black uppercase tracking-wide text-[var(--brand)]">
                <Sparkles aria-hidden="true" size={14} />
                Demo
              </div>
              <p className="mt-5 text-sm font-bold uppercase tracking-wide text-[var(--brand)]">{demo.eyebrow}</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">{demo.headline}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">{demo.subheadline}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[var(--brand-dark)]" href={salesHref}>
                  <MessageCircle aria-hidden="true" size={18} />
                  Quiero una página así
                </a>
                <a className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold text-[var(--text)] shadow-sm hover:bg-[#f7f6f2]" href="#servicios">
                  Ver servicios
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
              </div>
            </div>

            <aside className="rounded-md border border-[var(--line)] bg-[#f7f6f2] p-5 shadow-sm">
              <div className="rounded-md border border-[var(--line)] bg-white p-5">
                <p className="text-xs font-black uppercase tracking-wide text-[var(--brand)]">{demo.audience}</p>
                <h2 className="mt-2 text-2xl font-black">{demo.businessName}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Página demo con contenido ficticio para mostrar cómo se vería una landing simple de venta online.</p>
                <div className="mt-5 grid gap-3">
                  {demo.proofPoints.map((item) => (
                    <div className="flex items-start gap-3 rounded-md border border-[var(--line)] bg-[#eef4ef] p-3" key={item}>
                      <BadgeCheck aria-hidden="true" className="mt-0.5 text-[var(--brand)]" size={18} />
                      <p className="text-sm font-semibold leading-6">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10" id="servicios">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-md border border-[var(--line)] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[var(--brand)]">
                <CalendarDays aria-hidden="true" size={22} />
                <h2 className="text-2xl font-black text-[var(--text)]">Servicios destacados</h2>
              </div>
              <div className="mt-5 grid gap-3">
                {demo.services.map((service) => (
                  <div className="flex items-start gap-3 rounded-md border border-[var(--line)] bg-[#f7f6f2] p-3" key={service}>
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 text-[var(--brand)]" size={18} />
                    <p className="text-sm font-semibold leading-6">{service}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-md border border-[var(--line)] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[var(--brand)]">
                <ShieldCheck aria-hidden="true" size={22} />
                <h2 className="text-2xl font-black text-[var(--text)]">Por qué esta página ayuda a vender</h2>
              </div>
              <div className="mt-5 grid gap-3">
                {demo.benefits.map((benefit) => (
                  <div className="rounded-md border border-[var(--line)] bg-[#eef4ef] p-4" key={benefit}>
                    <p className="text-sm font-semibold leading-6">{benefit}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-[var(--line)] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="rounded-md border border-[var(--line)] bg-[#eef4ef] p-6 text-center">
              <p className="text-sm font-black uppercase tracking-wide text-[var(--brand)]">Demo comercial</p>
              <h2 className="mt-3 text-3xl font-black">¿Querés vender una página simple como esta?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">Esta pantalla usa datos ficticios y sirve como ejemplo para vender páginas simples por rubro. No procesa pagos reales ni usa información privada.</p>
              <a className="focus-ring mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[var(--brand-dark)]" href={salesHref}>
                <MessageCircle aria-hidden="true" size={18} />
                Quiero una página así
              </a>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
