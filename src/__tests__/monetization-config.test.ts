import { afterEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = process.env;

async function loadConfig(env: Record<string, string | undefined> = {}) {
  vi.resetModules();
  process.env = { ...ORIGINAL_ENV, ...env };
  return import("@/lib/monetization/monetization-config");
}

describe("monetization config", () => {
  afterEach(() => {
    process.env = ORIGINAL_ENV;
    vi.restoreAllMocks();
  });

  it("keeps ads and affiliate links disabled by default", async () => {
    const { monetizationConfig } = await loadConfig({ APP_ENV: "staging" });
    const config = monetizationConfig();

    expect(config.manualPaidListingsEnabled).toBe(true);
    expect(config.sponsoredBannersEnabled).toBe(false);
    expect(config.adSlotsEnabled).toBe(false);
    expect(config.affiliateLinksEnabled).toBe(false);
  });

  it("does not enable in-app payments or PayPal live", async () => {
    const { monetizationConfig } = await loadConfig({
      APP_ENV: "staging",
      ENABLE_PAYMENTS: "true",
      PAYPAL_ENVIRONMENT: "live",
    });
    const config = monetizationConfig();

    expect(config.inAppPaymentsEnabled).toBe(false);
    expect(config.paypalLiveEnabled).toBe(false);
  });

  it("does not hardcode a WhatsApp number fallback", async () => {
    const { salesCtaHref } = await loadConfig({
      APP_ENV: "staging",
      NEXT_PUBLIC_WHATSAPP_SALES_LINK: "",
      NEXT_PUBLIC_SPONSOR_INTAKE_LINK: "",
    });

    expect(salesCtaHref()).toBe("#sponsor-intake");
  });

  it("uses the public WhatsApp sales link only when provided", async () => {
    const { salesCtaHref } = await loadConfig({
      APP_ENV: "staging",
      NEXT_PUBLIC_WHATSAPP_SALES_LINK: "https://wa.me/0000000000",
    });

    expect(salesCtaHref()).toBe("https://wa.me/0000000000");
  });
});
