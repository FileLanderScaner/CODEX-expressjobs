"use client";

import { MessageCircle } from "lucide-react";
import { salesCtaHref } from "@/lib/monetization/monetization-config";
import { trackEvent } from "@/lib/tracking";

export function WhatsAppCta({ label = "Consultar por WhatsApp" }: { label?: string }) {
  return (
    <a
      className="focus-ring ej-btn-primary text-sm"
      href={salesCtaHref()}
      onClick={() => trackEvent("whatsapp_lead_clicked", { surface: "manual-offer-cta", label })}
    >
      {label}
      <MessageCircle aria-hidden="true" size={18} />
    </a>
  );
}
