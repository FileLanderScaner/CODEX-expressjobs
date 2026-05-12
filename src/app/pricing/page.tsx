import { CircleDollarSign } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { monetizationOptions } from "@/lib/expressjobs-data";

export default function PricingPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center gap-3">
          <CircleDollarSign aria-hidden="true" className="text-[var(--brand)]" size={28} />
          <h1 className="text-3xl font-black">Monetizacion</h1>
        </div>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Pagos reales no estan activos. Esta pagina documenta el modelo comercial de staging.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {monetizationOptions.map((option) => (
            <article className="rounded-md border border-[var(--line)] bg-white p-5" key={option}>
              <h2 className="text-lg font-black">{option}</h2>
            </article>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
