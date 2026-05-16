# ExpressJobs PayPal Audit

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Audit Result

- `PAYPAL_AUDIT=BLOCKED_IMPLEMENTATION_MISSING`
- `PAYPAL_ENVIRONMENT=unknown`
- `PAYPAL_LIVE=OFF`
- `WEBHOOK_ENDPOINT=MISSING`
- `WEBHOOK_SIGNATURE_VERIFICATION=MISSING`
- `SUBSCRIPTION_FLOW=MISSING`
- `PREMIUM_STATE_STORAGE=PARTIAL_SCHEMA_ONLY`
- `RISK_OF_REAL_CHARGE=LOW_CURRENTLY_NO_PAYPAL_CODE`

## Current Code Findings

No PayPal runtime integration was found in `src`, `scripts`, `package.json`, or app routes.

| Area | Status | Evidence |
| --- | --- | --- |
| PayPal SDK/package | `MISSING` | No PayPal dependency in `package.json`. |
| PayPal buttons | `MISSING` | `/pricing` shows proposal copy only. |
| PayPal checkout/subscription API | `MISSING` | No create-subscription/order endpoint exists. |
| PayPal webhook endpoint | `MISSING` | No `/api/paypal/webhook` or equivalent route exists. |
| Webhook signature verification | `MISSING` | No PayPal verification implementation exists. |
| Sandbox/live separation | `MISSING` | No PayPal env contract exists yet. |
| Premium/subscription storage | `PARTIAL` | `public.ej_payment_records` exists with RLS select policy, but no subscription table or webhook writes exist. |
| Success/cancel URL | `MISSING` | No checkout flow exists. |
| Tests/scripts sandbox | `MISSING` | No PayPal sandbox smoke exists. |

## Expected Environment Variables

These are names only. Do not commit values.

- `PAYPAL_ENVIRONMENT`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`
- `PAYPAL_PLAN_ID_WORKER_PREMIUM`
- `PAYPAL_PLAN_ID_COMPANY`
- `PAYPAL_SUCCESS_URL`
- `PAYPAL_CANCEL_URL`
- `ENABLE_PAYMENTS`

Required safe defaults before any beta:

- `PAYPAL_ENVIRONMENT=sandbox`
- `ENABLE_PAYMENTS=false` until a human explicitly approves a sandbox-only payment smoke
- `PAYMENTS_LIVE=OFF`

## Minimum PayPal Events

Based on PayPal's current webhook event documentation:

| Requirement | PayPal event | Current status |
| --- | --- | --- |
| Subscription activated | `BILLING.SUBSCRIPTION.ACTIVATED` | `MISSING` |
| Subscription cancelled | `BILLING.SUBSCRIPTION.CANCELLED` | `MISSING` |
| Payment completed for subscription | `PAYMENT.SALE.COMPLETED` | `MISSING` |
| Subscription payment failed | `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | `MISSING` |
| Refund | `PAYMENT.SALE.REFUNDED` | `FUTURE_REQUIRED` |
| Reversal/dispute-like handling | `PAYMENT.SALE.REVERSED` plus dispute events | `FUTURE_REQUIRED` |
| One-time capture completed | `PAYMENT.CAPTURE.COMPLETED` | `FUTURE_IF_ONE_TIME_PAYMENTS` |
| One-time capture declined | `PAYMENT.CAPTURE.DECLINED` | `FUTURE_IF_ONE_TIME_PAYMENTS` |

Sources:

- PayPal webhook event names: https://developer.paypal.com/api/rest/webhooks/event-names/
- PayPal subscriptions webhooks: https://developer.paypal.com/docs/subscriptions/reference/webhooks/
- PayPal webhooks API: https://developer.paypal.com/docs/api/webhooks/v1/

## Decision

`PAYPAL_AUDIT=BLOCKED`

Reason: PayPal is not integrated yet. This is safe because there is no live charge path, but paid pilot readiness needs sandbox-only implementation and webhook verification before any money flow.
