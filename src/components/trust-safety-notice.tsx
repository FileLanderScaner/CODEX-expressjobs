import { ShieldCheck } from "lucide-react";
import { publicBrand } from "@/lib/expressjobs-data";

export function TrustSafetyNotice() {
  return (
    <aside className="rounded-md border border-[#c8d8cf] bg-[#eef7f1] p-4 text-sm leading-6">
      <div className="flex items-start gap-3">
        <ShieldCheck aria-hidden="true" className="mt-0.5 text-[var(--brand)]" size={20} />
        <p>
          {publicBrand.productName} esta en preview privado. Coordina dentro de la plataforma, revisa reputacion y no compartas datos sensibles. No hay pagos reales activos, empleo garantizado ni ingresos garantizados.
        </p>
      </div>
    </aside>
  );
}
