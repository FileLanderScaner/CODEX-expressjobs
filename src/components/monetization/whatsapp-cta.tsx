import { MessageCircle } from "lucide-react";
import { salesCtaHref } from "@/lib/monetization/monetization-config";

export function WhatsAppCta({ label = "Consultar por WhatsApp" }: { label?: string }) {
  return (
    <a
      className="focus-ring ej-btn-primary text-sm"
      href={salesCtaHref()}
    >
      {label}
      <MessageCircle aria-hidden="true" size={18} />
    </a>
  );
}
