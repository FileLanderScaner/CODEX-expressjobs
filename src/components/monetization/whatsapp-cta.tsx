import { MessageCircle } from "lucide-react";
import { salesCtaHref } from "@/lib/monetization/monetization-config";

export function WhatsAppCta({ label = "Consultar por WhatsApp" }: { label?: string }) {
  return (
    <a
      className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[var(--brand-dark)]"
      href={salesCtaHref()}
    >
      {label}
      <MessageCircle aria-hidden="true" size={18} />
    </a>
  );
}
