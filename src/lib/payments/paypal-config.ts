export type PayPalEnvironment = "sandbox";

export type PayPalConfigStatus =
  | "PAYPAL_CONFIG_READY"
  | "PAYPAL_CONFIG_BLOCKED_MISSING_ENV"
  | "PAYPAL_CONFIG_BLOCKED_LIVE"
  | "PAYPAL_CONFIG_BLOCKED_PRODUCTION"
  | "PAYPAL_CONFIG_BLOCKED_PAYMENTS_DISABLED";

export type PayPalConfig = {
  status: PayPalConfigStatus;
  environment: PayPalEnvironment;
  apiBase: string;
  clientId: string;
  clientSecret: string;
  webhookId: string;
  planId: string;
  appUrl: string;
  enablePayments: boolean;
};

export type PayPalConfigInput = NodeJS.ProcessEnv | Record<string, string | undefined>;

export class PayPalConfigError extends Error {
  constructor(
    public readonly status: PayPalConfigStatus,
    message = status,
  ) {
    super(message);
    this.name = "PayPalConfigError";
  }
}

const requiredEnv = [
  "NEXT_PUBLIC_PAYPAL_CLIENT_ID",
  "PAYPAL_CLIENT_SECRET",
  "PAYPAL_WEBHOOK_ID",
  "PAYPAL_PLAN_ID",
  "PAYPAL_API_BASE",
  "NEXT_PUBLIC_APP_URL",
] as const;

export const paypalRequiredEnvNames = requiredEnv;

function isLiveApiBase(apiBase: string | undefined) {
  if (!apiBase) {
    return false;
  }

  try {
    const url = new URL(apiBase);
    return url.hostname === "api-m.paypal.com";
  } catch {
    return apiBase.includes("api-m.paypal.com");
  }
}

export function getPayPalConfigStatus(env: PayPalConfigInput = process.env): PayPalConfigStatus {
  if (env.APP_ENV === "production" || env.VERCEL_ENV === "production") {
    return "PAYPAL_CONFIG_BLOCKED_PRODUCTION";
  }

  if (env.PAYPAL_ENVIRONMENT === "live" || isLiveApiBase(env.PAYPAL_API_BASE)) {
    return "PAYPAL_CONFIG_BLOCKED_LIVE";
  }

  if (env.ENABLE_PAYMENTS !== "true") {
    return "PAYPAL_CONFIG_BLOCKED_PAYMENTS_DISABLED";
  }

  const missing = requiredEnv.filter((name) => !env[name]);
  if (missing.length) {
    return "PAYPAL_CONFIG_BLOCKED_MISSING_ENV";
  }

  return "PAYPAL_CONFIG_READY";
}

export function getMissingPayPalEnv(env: PayPalConfigInput = process.env) {
  return requiredEnv.filter((name) => !env[name]);
}

export function getSafePayPalPublicStatus(env: PayPalConfigInput = process.env) {
  const status = getPayPalConfigStatus(env);
  return {
    status,
    environment: env.PAYPAL_ENVIRONMENT === "live" ? "live" : "sandbox",
    apiBase: isLiveApiBase(env.PAYPAL_API_BASE) ? "live" : env.PAYPAL_API_BASE ? "sandbox" : "unknown",
    planId: env.PAYPAL_PLAN_ID ? "FOUND" : "MISSING",
    webhookId: env.PAYPAL_WEBHOOK_ID ? "FOUND" : "MISSING",
    missingEnv: getMissingPayPalEnv(env),
  };
}

export function getPayPalConfig(env: PayPalConfigInput = process.env): PayPalConfig {
  const status = getPayPalConfigStatus(env);
  if (status !== "PAYPAL_CONFIG_READY") {
    throw new PayPalConfigError(status);
  }

  return {
    status,
    environment: "sandbox",
    apiBase: env.PAYPAL_API_BASE!,
    clientId: env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    clientSecret: env.PAYPAL_CLIENT_SECRET!,
    webhookId: env.PAYPAL_WEBHOOK_ID!,
    planId: env.PAYPAL_PLAN_ID!,
    appUrl: env.NEXT_PUBLIC_APP_URL!,
    enablePayments: true,
  };
}
