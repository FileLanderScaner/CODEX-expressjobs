import { describe, expect, it, vi } from "vitest";
import {
  getPayPalConfigStatus,
  getSafePayPalPublicStatus,
  type PayPalConfig,
} from "@/lib/payments/paypal-config";
import {
  canGrantPremiumFromCreateSubscription,
  classifyPayPalEvent,
  isPremiumActiveForState,
} from "@/lib/payments/subscription-state";
import {
  createPayPalSandboxSubscription,
  getPayPalWebhookHeaders,
  hasRequiredPayPalWebhookHeaders,
  verifyPayPalWebhookSignature,
} from "@/lib/payments/paypal-client";

const safeEnv = {
  APP_ENV: "preview",
  VERCEL_ENV: "preview",
  ENABLE_PAYMENTS: "true",
  PAYPAL_ENVIRONMENT: "sandbox",
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: "sandbox-client-id",
  PAYPAL_CLIENT_SECRET: "sandbox-client-secret",
  PAYPAL_WEBHOOK_ID: "sandbox-webhook-id",
  PAYPAL_PLAN_ID: "sandbox-plan-id",
  PAYPAL_API_BASE: "https://api-m.sandbox.paypal.com",
  NEXT_PUBLIC_APP_URL: "https://preview.example",
};

const config: PayPalConfig = {
  status: "PAYPAL_CONFIG_READY",
  environment: "sandbox",
  apiBase: safeEnv.PAYPAL_API_BASE,
  clientId: safeEnv.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  clientSecret: safeEnv.PAYPAL_CLIENT_SECRET,
  webhookId: safeEnv.PAYPAL_WEBHOOK_ID,
  planId: safeEnv.PAYPAL_PLAN_ID,
  appUrl: safeEnv.NEXT_PUBLIC_APP_URL,
  enablePayments: true,
};

function jsonResponse(body: unknown, ok = true) {
  return {
    ok,
    json: async () => body,
  } as Response;
}

describe("PayPal sandbox payment gates", () => {
  it("blocks live PayPal environment", () => {
    expect(getPayPalConfigStatus({ ...safeEnv, PAYPAL_ENVIRONMENT: "live" })).toBe("PAYPAL_CONFIG_BLOCKED_LIVE");
  });

  it("blocks live PayPal API base", () => {
    expect(getPayPalConfigStatus({ ...safeEnv, PAYPAL_API_BASE: "https://api-m.paypal.com" })).toBe(
      "PAYPAL_CONFIG_BLOCKED_LIVE",
    );
  });

  it("blocks production app environment", () => {
    expect(getPayPalConfigStatus({ ...safeEnv, APP_ENV: "production" })).toBe("PAYPAL_CONFIG_BLOCKED_PRODUCTION");
  });

  it("blocks missing env without exposing secret values", () => {
    const status = getSafePayPalPublicStatus({ ...safeEnv, PAYPAL_CLIENT_SECRET: undefined });
    expect(status.status).toBe("PAYPAL_CONFIG_BLOCKED_MISSING_ENV");
    expect(status.missingEnv).toEqual(["PAYPAL_CLIENT_SECRET"]);
    expect(JSON.stringify(status)).not.toContain("sandbox-client-secret");
  });

  it("blocks payment flow when ENABLE_PAYMENTS is false", () => {
    expect(getPayPalConfigStatus({ ...safeEnv, ENABLE_PAYMENTS: "false" })).toBe(
      "PAYPAL_CONFIG_BLOCKED_PAYMENTS_DISABLED",
    );
  });

  it("classifies subscription and payment events safely", () => {
    expect(classifyPayPalEvent("BILLING.SUBSCRIPTION.CREATED")).toMatchObject({
      state: "created",
      premiumActive: false,
      recognized: true,
    });
    expect(classifyPayPalEvent("BILLING.SUBSCRIPTION.ACTIVATED")).toMatchObject({
      state: "active",
      premiumActive: true,
      recognized: true,
    });
    expect(classifyPayPalEvent("BILLING.SUBSCRIPTION.PAYMENT.FAILED")).toMatchObject({
      state: "payment_failed",
      premiumActive: false,
      recognized: true,
    });
    expect(classifyPayPalEvent("UNKNOWN.EVENT")).toMatchObject({
      state: "unknown",
      premiumActive: false,
      recognized: false,
    });
  });

  it("never grants premium from frontend or create-subscription", () => {
    expect(canGrantPremiumFromCreateSubscription()).toBe(false);
    expect(isPremiumActiveForState("created")).toBe(false);
    expect(isPremiumActiveForState("pending")).toBe(false);
    expect(isPremiumActiveForState("active")).toBe(true);
  });

  it("rejects webhooks without required PayPal signature headers", () => {
    const headers = getPayPalWebhookHeaders(new Headers());
    expect(hasRequiredPayPalWebhookHeaders(headers)).toBe(false);
  });

  it("does not verify invalid webhook signature responses", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ access_token: "sandbox-access-token" }))
      .mockResolvedValueOnce(jsonResponse({ verification_status: "FAILURE" }));

    const verified = await verifyPayPalWebhookSignature(
      config,
      {
        authAlgo: "SHA256withRSA",
        certUrl: "https://api-m.sandbox.paypal.com/certs/test",
        transmissionId: "transmission-id",
        transmissionSig: "signature",
        transmissionTime: "2026-05-15T00:00:00Z",
      },
      { id: "event-id", event_type: "BILLING.SUBSCRIPTION.ACTIVATED" },
      fetchMock,
    );

    expect(verified).toBe(false);
  });

  it("creates a sandbox subscription without granting premium", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ access_token: "sandbox-access-token" }))
      .mockResolvedValueOnce(
        jsonResponse({
          id: "I-SANDBOX",
          status: "APPROVAL_PENDING",
          links: [{ rel: "approve", href: "https://www.sandbox.paypal.com/checkoutnow?token=redacted" }],
        }),
      );

    const subscription = await createPayPalSandboxSubscription(config, fetchMock);

    expect(subscription).toEqual({
      id: "I-SANDBOX",
      status: "APPROVAL_PENDING",
      approvalUrl: "https://www.sandbox.paypal.com/checkoutnow?token=redacted",
    });
    expect(canGrantPremiumFromCreateSubscription()).toBe(false);
  });
});
