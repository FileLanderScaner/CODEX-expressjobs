import { NextRequest, NextResponse } from "next/server";
import {
  classifyVerifiedPayPalWebhook,
  getPayPalWebhookHeaders,
  hasRequiredPayPalWebhookHeaders,
  updateSubscriptionStateAfterVerifiedWebhook,
  verifyPayPalWebhookSignature,
  type PayPalWebhookEvent,
} from "@/lib/payments/paypal-client";
import { getPayPalConfig, getSafePayPalPublicStatus, PayPalConfigError } from "@/lib/payments/paypal-config";

export async function POST(request: NextRequest) {
  const headers = getPayPalWebhookHeaders(request.headers);

  if (!hasRequiredPayPalWebhookHeaders(headers)) {
    return NextResponse.json({ error: "PAYPAL_WEBHOOK_SIGNATURE_HEADERS_MISSING" }, { status: 400 });
  }

  let event: PayPalWebhookEvent;
  try {
    event = (await request.json()) as PayPalWebhookEvent;
  } catch {
    return NextResponse.json({ error: "PAYPAL_WEBHOOK_INVALID_JSON" }, { status: 400 });
  }

  try {
    const config = getPayPalConfig();
    const verified = await verifyPayPalWebhookSignature(config, headers, event);

    if (!verified) {
      return NextResponse.json({ error: "PAYPAL_WEBHOOK_SIGNATURE_INVALID" }, { status: 401 });
    }

    const classification = classifyVerifiedPayPalWebhook(event);
    const persistence = await updateSubscriptionStateAfterVerifiedWebhook();

    return NextResponse.json({
      received: true,
      verified: true,
      eventType: classification.eventType,
      subscriptionState: classification.state,
      premiumActive: classification.premiumActive,
      recognized: classification.recognized,
      persistence,
    });
  } catch (error) {
    if (error instanceof PayPalConfigError) {
      return NextResponse.json({ error: error.status, paypal: getSafePayPalPublicStatus() }, { status: 403 });
    }

    return NextResponse.json({ error: "PAYPAL_WEBHOOK_PROCESSING_BLOCKED" }, { status: 502 });
  }
}
