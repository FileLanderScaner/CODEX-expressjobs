const truthy = new Set(["1", "true", "yes", "on"]);

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

export function salesCtaHref() {
  const config = monetizationConfig();
  return config.whatsappSalesLink || config.sponsorIntakeLink || "#sponsor-intake";
}
