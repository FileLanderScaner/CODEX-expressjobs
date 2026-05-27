import { Megaphone } from "lucide-react";
import { monetizationConfig, salesCtaHref } from "@/lib/monetization/monetization-config";

export function SponsoredBanner() {
  const config = monetizationConfig();

  if (!config.sponsoredBannersEnabled) {
    return null;
  }

  return (
    <aside className="ej-card p-5">
      <div className="flex items-center gap-2">
        <Megaphone aria-hidden="true" className="text-[var(--ej-accent)]" size={22} />
        <p className="text-sm font-black uppercase">Banner fundador</p>
      </div>
      <h2 className="mt-3 text-xl font-black">Tu negocio visible durante el piloto</h2>
      <p className="ej-muted mt-2 text-sm leading-6">
        Espacio patrocinado manual, sin cobro dentro de la app y sin promesas de produccion publica.
      </p>
      <a className="focus-ring ej-btn-primary mt-4 text-sm" href={salesCtaHref()}>
        Reservar banner
      </a>
    </aside>
  );
}
