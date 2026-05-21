import { CircleDollarSign } from "lucide-react";
import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { PricingCard } from "@/components/pricing-card";
import { pricingPlans } from "@/lib/expressjobs-data";

export const metadata: Metadata = {
  title: "Precios | Trabajos Rapidos",
  description: "Planes propuestos con pagos reales desactivados.",
};

export default function PricingPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center gap-3">
          <CircleDollarSign aria-hidden="true" className="text-[var(--brand)]" size={28} />
          <h1 className="text-3xl font-black">Monetizacion</h1>
        </div>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Pagos reales no estan activos. Estos planes son propuesta inicial para validar el modelo antes de proveedor live.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.title} title={plan.title} text={plan.description} price={plan.price} badge={plan.badge} features={plan.features} />
          ))}
        </div>
        <p className="mt-6 rounded-md border border-[#e2b8b1] bg-[#fff4f2] p-4 text-sm font-semibold text-[var(--danger)]">
          No ingreses datos de pago. Comision y premium quedan desactivados hasta completar legal, impuestos, disputas, proveedor y release gate.
        </p>
      </main>
    </AppShell>
  );
}
