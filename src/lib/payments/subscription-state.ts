export const subscriptionStates = [
  "none",
  "pending",
  "created",
  "active",
  "payment_failed",
  "cancelled",
  "suspended",
  "expired",
  "unknown",
] as const;

export type SubscriptionState = (typeof subscriptionStates)[number];

export type PayPalEventClassification = {
  eventType: string;
  state: SubscriptionState;
  premiumActive: boolean;
  recognized: boolean;
};

const eventStateMap: Record<string, SubscriptionState> = {
  "BILLING.SUBSCRIPTION.CREATED": "created",
  "BILLING.SUBSCRIPTION.ACTIVATED": "active",
  "BILLING.SUBSCRIPTION.CANCELLED": "cancelled",
  "BILLING.SUBSCRIPTION.SUSPENDED": "suspended",
  "BILLING.SUBSCRIPTION.EXPIRED": "expired",
  "BILLING.SUBSCRIPTION.PAYMENT.FAILED": "payment_failed",
  "PAYMENT.SALE.COMPLETED": "active",
  "PAYMENT.SALE.REFUNDED": "payment_failed",
  "PAYMENT.SALE.REVERSED": "payment_failed",
  "PAYMENT.CAPTURE.COMPLETED": "active",
  "PAYMENT.CAPTURE.DENIED": "payment_failed",
  "PAYMENT.CAPTURE.DECLINED": "payment_failed",
};

export function isPremiumActiveForState(state: SubscriptionState) {
  return state === "active";
}

export function classifyPayPalEvent(eventType: string | undefined): PayPalEventClassification {
  const normalized = eventType?.trim().toUpperCase() ?? "";
  const state = eventStateMap[normalized] ?? "unknown";

  return {
    eventType: normalized || "UNKNOWN",
    state,
    premiumActive: isPremiumActiveForState(state),
    recognized: state !== "unknown",
  };
}

export function canGrantPremiumFromCreateSubscription() {
  return false;
}
