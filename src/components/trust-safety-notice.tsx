import { ShieldCheck } from "lucide-react";

export function TrustSafetyNotice() {
  return (
    <aside className="rounded-md border border-[#c8d8cf] bg-[#eef7f1] p-4 text-sm leading-6">
      <div className="flex items-start gap-3">
        <ShieldCheck aria-hidden="true" className="mt-0.5 text-[var(--brand)]" size={20} />
        <p>
          Coordina dentro de ExpressJobs, revisa reputacion y no compartas datos sensibles. La plataforma no promete empleo ni ingresos garantizados.
        </p>
      </div>
    </aside>
  );
}
