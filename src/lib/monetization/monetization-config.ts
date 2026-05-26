const truthy = new Set(["1", "true", "yes", "on"]);

export const publicSalesContact = {
  ownerName: "Ronald Gonzalez",
  whatsappNumber: "59897045305",
  email: "trabajosrapidos.uy@gmail.com",
} as const;

export const uruguayRevenuePrices = [
  { label: "Landing basica", price: "1500 UYU", kind: "landing" },
  { label: "Landing + textos + WhatsApp", price: "2500 UYU", kind: "landing" },
  { label: "Landing + banner + publicacion inicial", price: "3500 UYU", kind: "landing" },
  { label: "Banner fundador 7 dias", price: "500 UYU", kind: "banner" },
  { label: "Banner fundador 30 dias", price: "1500 UYU", kind: "banner" },
  { label: "Publicacion manual de trabajo", price: "500 UYU", kind: "manual-job" },
  { label: "Publicacion + filtro de interesados", price: "1000 UYU", kind: "manual-job" },
  { label: "Urgente 24 hs", price: "1500 UYU", kind: "manual-job" },
];

export const latamRevenuePrices = [
  { label: "Landing basica", price: "USD 39", kind: "landing" },
  { label: "Landing + textos + WhatsApp", price: "USD 69", kind: "landing" },
  { label: "Landing + banner", price: "USD 99", kind: "landing" },
  { label: "Banner 7 dias", price: "USD 15", kind: "banner" },
  { label: "Banner 30 dias", price: "USD 39", kind: "banner" },
  { label: "Publicacion manual", price: "USD 15", kind: "manual-job" },
  { label: "Publicacion + filtro", price: "USD 29", kind: "manual-job" },
  { label: "Urgente", price: "USD 39", kind: "manual-job" },
];

function flag(name: string, fallback = false) {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }

  return truthy.has(value.toLowerCase());
}

export function monetizationConfig() {
  const appEnv = process.env.APP_ENV ?? "staging";
  const isProduction = appEnv === "production";

  return {
    appEnv,
    manualPaidListingsEnabled: !isProduction && flag("ENABLE_MANUAL_PAID_LISTINGS", appEnv === "staging" || appEnv === "preview"),
    sponsoredBannersEnabled: !isProduction && flag("ENABLE_SPONSORED_BANNERS", false),
    adSlotsEnabled: !isProduction && flag("ENABLE_AD_SLOTS", false),
    affiliateLinksEnabled: !isProduction && flag("ENABLE_AFFILIATE_LINKS", false),
    whatsappSalesLink: process.env.NEXT_PUBLIC_WHATSAPP_SALES_LINK || "",
    sponsorIntakeLink: process.env.NEXT_PUBLIC_SPONSOR_INTAKE_LINK || "",
    inAppPaymentsEnabled: false,
    paypalLiveEnabled: false,
  };
}

export function defaultWhatsAppSalesHref() {
  const text = encodeURIComponent("Hola, quiero consultar por Trabajos Rapidos / ExpressJobs.");
  return `https://wa.me/${publicSalesContact.whatsappNumber}?text=${text}`;
}

export function salesCtaHref() {
  const config = monetizationConfig();
  return config.whatsappSalesLink || config.sponsorIntakeLink || defaultWhatsAppSalesHref();
}