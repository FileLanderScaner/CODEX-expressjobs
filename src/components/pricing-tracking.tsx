"use client";

import { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import type { PilotOffer } from "@/lib/expressjobs-data";
import { publicSalesContact } from "@/lib/monetization/monetization-config";
import { trackEvent } from "@/lib/tracking";

export function PricingViewTracker() {
  useEffect(() => {
    trackEvent("commission_info_viewed", { surface: "pricing", model: "pilot-offers" });
    trackEvent("pricing_viewed", { surface: "pricing", model: "pilot-offers" });
  }, []);

  return null;
}

export function PilotOfferWhatsAppCta({ offer }: { offer: PilotOffer }) {
  const message = `Hola, quiero info sobre ${offer.name} de ExpressJobs (${offer.uyPrice} / ${offer.usdPrice}). Entrega: ${offer.delivery}.`;

  return (
    <a
      className="focus-ring ej-btn-primary w-full text-sm"
      href={`https://wa.me/${publicSalesContact.whatsappNumber}?text=${encodeURIComponent(message)}`}
      onClick={() => {
        trackEvent("offer_selected", {
          surface: "pricing",
          offer: offer.id,
          uyPrice: offer.uyPrice,
          usdPrice: offer.usdPrice,
        });
        trackEvent("whatsapp_lead_clicked", {
          surface: "pricing",
          offer: offer.id,
        });
        trackEvent("premium_cta_clicked", {
          surface: "pricing",
          offer: offer.id,
          uyPrice: offer.uyPrice,
          usdPrice: offer.usdPrice,
        });
      }}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden="true" size={18} />
      Consultar por WhatsApp
    </a>
  );
}
