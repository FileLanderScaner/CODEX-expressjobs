import { describe, expect, it } from "vitest";
import { jobStatuses, pilotOfferDisclaimer, pilotOffers, trackingEvents } from "@/lib/expressjobs-data";
import { publicCalls } from "@/lib/public-calls-data";
import { isTrackingEventName } from "@/lib/tracking";
import { buildWhatsAppShareUrl } from "@/lib/whatsapp";

describe("ExpressJobs MVP constants", () => {
  it("keeps the required job lifecycle states", () => {
    expect(jobStatuses).toEqual([
      "draft",
      "open",
      "applied",
      "accepted",
      "in_progress",
      "completed",
      "cancelled",
      "disputed",
    ]);
  });

  it("includes required tracking events", () => {
    expect(trackingEvents).toContain("job_application_accepted");
    expect(trackingEvents).toContain("whatsapp_share_clicked");
    expect(trackingEvents).toContain("whatsapp_lead_clicked");
    expect(trackingEvents).toContain("offer_selected");
    expect(trackingEvents).toContain("premium_cta_clicked");
    expect(trackingEvents).toContain("commission_info_viewed");
    expect(trackingEvents).toContain("pricing_viewed");
    expect(isTrackingEventName("message_sent")).toBe(true);
    expect(isTrackingEventName("unknown")).toBe(false);
  });

  it("matches the 2026-05-15 pilot offer sheet", () => {
    expect(pilotOffers).toHaveLength(8);
    expect(pilotOffers.map((offer) => [offer.name, offer.uyPrice, offer.usdPrice, offer.includes, offer.delivery])).toEqual([
      ["Landing basica", "1500 UYU", "USD 39", "Pagina simple + WhatsApp", "24-48 h"],
      ["Landing completa", "2500 UYU", "USD 69", "Textos + servicios + WhatsApp + formulario", "48 h"],
      ["Landing + banner", "3500 UYU", "USD 99", "Landing + banner + publicacion inicial", "48-72 h"],
      ["Banner fundador 7 dias", "500 UYU", "USD 15", "Banner patrocinado + CTA", "Mismo dia"],
      ["Banner fundador 30 dias", "1500 UYU", "USD 39", "Banner patrocinado por 30 dias", "Mismo dia"],
      ["Publicacion manual", "500 UYU", "USD 15", "Publicar tarea y recibir interesados", "Mismo dia"],
      ["Publicacion + filtro", "1000 UYU", "USD 29", "Publicacion + seleccion inicial", "24 h"],
      ["Urgente 24 h", "1500 UYU", "USD 39", "Coordinacion prioritaria", "24 h"],
    ]);
    expect(pilotOfferDisclaimer).toContain("Pagos reales online no estan activos");
  });

  it("builds a safe WhatsApp share URL", () => {
    expect(buildWhatsAppShareUrl("Trabajo ExpressJobs")).toBe("https://wa.me/?text=Trabajo%20ExpressJobs");
  });

  it("keeps public call references attributed and non-empty", () => {
    expect(publicCalls.length).toBeGreaterThan(0);
    for (const call of publicCalls) {
      expect(call.status).toBe("referencia");
      expect(call.sourceUrl).toMatch(/^https:\/\//);
      expect(call.sourceUrl).not.toContain("#");
      expect(call.sourceName).toBeTruthy();
      expect(call.summary.length).toBeLessThan(260);
      expect(call.requirements.length).toBeGreaterThan(0);
    }
  });
});
