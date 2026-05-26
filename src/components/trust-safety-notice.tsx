import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { publicBrand } from "@/lib/expressjobs-data";

export function TrustSafetyNotice() {
  return (
    <aside className="rounded-2xl border border-[rgba(123,193,67,0.28)] bg-[var(--ej-accent-soft)] p-4 text-sm leading-6 text-[#d9f7bd]">
      <div className="flex items-start gap-3">
        <ShieldCheck aria-hidden="true" className="mt-0.5 text-[var(--ej-accent)]" size={20} />
        <p>
          {publicBrand.productName} esta en preview privado. Coordina dentro de la plataforma, revisa reputacion y no compartas datos sensibles. No hay pagos reales activos, empleo garantizado ni ingresos garantizados.{" "}
          <Link className="font-black underline decoration-[var(--ej-accent)] underline-offset-4" href="/seguridad">
            Ver reglas de seguridad
          </Link>
          .
        </p>
      </div>
    </aside>
  );
}
