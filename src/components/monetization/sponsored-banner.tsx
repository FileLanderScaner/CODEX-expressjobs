import { Megaphone } from "lucide-react";
import { monetizationConfig, salesCtaHref } from "@/lib/monetization/monetization-config";

export function SponsoredBanner() {
  const config = monetizationConfig();

  if (!config.sponsoredBannersEnabled) {
    return null;
  }

  return (
    <aside className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Megaphone aria-hidden="true" className="text-[var(--brand)]" size={22} />
        <p className="text-sm font-black uppercase">Banner fundador</p>
      </div>
      <h2 className="mt-3 text-xl font-black">Tu negocio visible durante el piloto</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        Espacio patrocinado manual, sin cobro dentro de la app y sin promesas de produccion publica.
      </p>
      <a className="focus-ring mt-4 inline-flex rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white" href={salesCtaHref()}>
        Reservar banner
      </a>
    </aside>
  );
}
