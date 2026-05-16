import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Hammer, Scissors, Sparkles, SprayCan, Truck } from "lucide-react";
import { AppShell } from "@/components/app-shell";

const demoCards = [
  {
    href: "/demo/peluqueria",
    title: "Peluquería",
    description: "Ejemplo para vender agenda, cortes, coloración y tratamientos capilares.",
    icon: Scissors,
  },
  {
    href: "/demo/estetica",
    title: "Estética",
    description: "Ejemplo prudente para tratamientos faciales, corporales y bienestar.",
    icon: Sparkles,
  },
  {
    href: "/demo/tecnico-reparaciones",
    title: "Técnico / Reparaciones",
    description: "Ejemplo para presupuestos, servicios a domicilio y zonas de atención.",
    icon: Hammer,
  },
  {
    href: "/demo/limpieza",
    title: "Limpieza",
    description: "Ejemplo para limpieza semanal, profunda, oficinas y final de obra liviano.",
    icon: SprayCan,
  },
  {
    href: "/demo/delivery",
    title: "Delivery local",
    description: "Ejemplo para mandados, retiros, entregas y horarios de atención.",
    icon: Truck,
  },
];

export default function DemoIndexPage() {
  return (
    <AppShell>
      <main className="bg-[#f7f6f2]">
        <section className="border-b border-[var(--line)] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[#eef4ef] px-3 py-1 text-xs font-black uppercase tracking-wide text-[var(--brand)]">
              <BriefcaseBusiness aria-hidden="true" size={14} />
              Demo hub
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              Ejemplos listos para vender páginas simples por rubro.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Usá estas demos para mostrarle a un potencial cliente cómo podría verse su página comercial antes de pedirle una decisión.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demoCards.map((demo) => {
              const Icon = demo.icon;
              return (
                <Link
                  className="focus-ring group rounded-md border border-[var(--line)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-md"
                  href={demo.href}
                  key={demo.href}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-md border border-[var(--line)] bg-[#eef4ef] p-3 text-[var(--brand)]">
                      <Icon aria-hidden="true" size={22} />
                    </div>
                    <ArrowRight aria-hidden="true" className="text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-[var(--brand)]" size={20} />
                  </div>
                  <h2 className="mt-5 text-xl font-black">{demo.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{demo.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-t border-[var(--line)] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="rounded-md border border-[var(--line)] bg-[#eef4ef] p-6">
              <p className="text-sm font-black uppercase tracking-wide text-[var(--brand)]">Uso comercial</p>
              <h2 className="mt-3 text-2xl font-black">Cómo usar estas demos</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                Enviá el link del rubro más parecido al negocio del cliente y ofrecé adaptar textos, servicios, contacto y estilo visual. Todos los ejemplos usan datos ficticios y no procesan pagos reales.
              </p>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
