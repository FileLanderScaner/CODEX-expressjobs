import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

for (const file of [".env.local", ".env.preview.local"]) {
  if (existsSync(file)) {
    loadEnvFile(file);
  }
}

const required = [
  "NEXT_PUBLIC_PAYPAL_CLIENT_ID",
  "PAYPAL_CLIENT_SECRET",
  "PAYPAL_WEBHOOK_ID",
  "PAYPAL_PLAN_ID",
  "PAYPAL_API_BASE",
  "NEXT_PUBLIC_APP_URL",
];

function isLiveApiBase(value) {
  if (!value) return false;
  try {
    return new URL(value).hostname === "api-m.paypal.com";
  } catch {
    return value.includes("api-m.paypal.com");
  }
}

if (process.env.APP_ENV === "production" || process.env.VERCEL_ENV === "production") {
  console.error("PAYPAL_SANDBOX_SMOKE_BLOCKED_PRODUCTION");
  process.exit(3);
}

if (process.env.PAYPAL_ENVIRONMENT === "live" || isLiveApiBase(process.env.PAYPAL_API_BASE)) {
  console.error("PAYPAL_SANDBOX_SMOKE_BLOCKED_LIVE");
  process.exit(3);
}

const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`BLOCKED_EXTERNAL_CREDENTIALS: missing PayPal sandbox env names: ${missing.join(", ")}`);
  process.exit(2);
}

if (process.env.ENABLE_PAYMENTS !== "true") {
  console.log("PAYPAL_SANDBOX_SMOKE_READY_NOT_RUN: ENABLE_PAYMENTS is not true.");
  process.exit(0);
}

if (process.env.EXPRESSJOBS_PAYPAL_SANDBOX_SMOKE_CREATE !== "true") {
  console.log("PAYPAL_SANDBOX_SMOKE_READY_NOT_RUN: set EXPRESSJOBS_PAYPAL_SANDBOX_SMOKE_CREATE=true to create a sandbox approval flow.");
  process.exit(0);
}

console.log("PAYPAL_SANDBOX_SMOKE_READY_FOR_MANUAL_SANDBOX_EXECUTION");
