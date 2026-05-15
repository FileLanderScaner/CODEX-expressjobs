import { classifyPayPalEvent } from "@/lib/payments/subscription-state";
import type { PayPalConfig } from "@/lib/payments/paypal-config";

export type PayPalWebhookHeaders = {
  authAlgo: string | null;
  certUrl: string | null;
  transmissionId: string | null;
  transmissionSig: string | null;
  transmissionTime: string | null;
};

export type PayPalWebhookEvent = {
  id?: string;
  event_type?: string;
  resource?: Record<string, unknown>;
  [key: string]: unknown;
};

export function getPayPalWebhookHeaders(headers: Headers): PayPalWebhookHeaders {
  return {
    authAlgo: headers.get("paypal-auth-algo"),
    certUrl: headers.get("paypal-cert-url"),
    transmissionId: headers.get("paypal-transmission-id"),
    transmissionSig: headers.get("paypal-transmission-sig"),
    transmissionTime: headers.get("paypal-transmission-time"),
  };
}

export function hasRequiredPayPalWebhookHeaders(headers: PayPalWebhookHeaders) {
  return Boolean(
    headers.authAlgo &&
      headers.certUrl &&
      headers.transmissionId &&
      headers.transmissionSig &&
      headers.transmissionTime,
  );
}

function buildPayPalAuthHeader(config: PayPalConfig) {
  const encoded = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
  return `Basic ${encoded}`;
}

export async function getPayPalAccessToken(config: PayPalConfig, fetchImpl: typeof fetch = fetch) {
  const response = await fetchImpl(`${config.apiBase}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: buildPayPalAuthHeader(config),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("PAYPAL_ACCESS_TOKEN_FAILED");
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("PAYPAL_ACCESS_TOKEN_MISSING");
  }

  return data.access_token;
}

export async function createPayPalSandboxSubscription(config: PayPalConfig, fetchImpl: typeof fetch = fetch) {
  const accessToken = await getPayPalAccessToken(config, fetchImpl);
  const response = await fetchImpl(`${config.apiBase}/v1/billing/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      plan_id: config.planId,
      application_context: {
        brand_name: "Trabajos Rapidos",
        user_action: "SUBSCRIBE_NOW",
        return_url: new URL("/pricing?paypal=success", config.appUrl).toString(),
        cancel_url: new URL("/pricing?paypal=cancelled", config.appUrl).toString(),
      },
    }),
  });

  if (!response.ok) {
    throw new Error("PAYPAL_SUBSCRIPTION_CREATE_FAILED");
  }

  const data = (await response.json()) as {
    id?: string;
    status?: string;
    links?: Array<{ href?: string; rel?: string; method?: string }>;
  };

  return {
    id: data.id ?? null,
    status: data.status ?? null,
    approvalUrl: data.links?.find((link) => link.rel === "approve")?.href ?? null,
  };
}

export async function verifyPayPalWebhookSignature(
  config: PayPalConfig,
  headers: PayPalWebhookHeaders,
  event: PayPalWebhookEvent,
  fetchImpl: typeof fetch = fetch,
) {
  if (!hasRequiredPayPalWebhookHeaders(headers)) {
    return false;
  }

  const accessToken = await getPayPalAccessToken(config, fetchImpl);
  const response = await fetchImpl(`${config.apiBase}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth_algo: headers.authAlgo,
      cert_url: headers.certUrl,
      transmission_id: headers.transmissionId,
      transmission_sig: headers.transmissionSig,
      transmission_time: headers.transmissionTime,
      webhook_id: config.webhookId,
      webhook_event: event,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as { verification_status?: string };
  return data.verification_status === "SUCCESS";
}

export function classifyVerifiedPayPalWebhook(event: PayPalWebhookEvent) {
  return classifyPayPalEvent(event.event_type);
}

export async function updateSubscriptionStateAfterVerifiedWebhook() {
  return {
    status: "SUPABASE_WRITE_SKIPPED_SAFE" as const,
    reason: "No Supabase remote write is performed without explicit service-role env and human approval.",
  };
}
