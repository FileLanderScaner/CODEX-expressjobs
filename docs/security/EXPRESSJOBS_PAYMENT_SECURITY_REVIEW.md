# ExpressJobs Payment Security Review

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`PAYMENT_SECURITY=PASS_FOR_CODE_ONLY_BLOCKED_FOR_PAID_PILOT`

## Revalidation

`2026-05-15`: payment security remains code-ready but paid-pilot blocked. No PayPal live env was enabled and no real payment was created.

## Safe Controls

- PayPal live is blocked by config checks.
- Production environment is blocked by config checks.
- Live PayPal API base is blocked.
- Missing sandbox envs block execution.
- `ENABLE_PAYMENTS=false` blocks subscription creation.
- `POST /api/payments/paypal/create-subscription` requires authenticated user.
- Create-subscription returns `premiumGranted=false`.
- Premium cannot be granted by frontend or create-subscription.
- `POST /api/payments/paypal/webhook` requires PayPal signature headers.
- Webhook signature is verified through PayPal before event classification.
- Unrecognized events do not activate premium.
- Supabase write is skipped safely until explicit service-role env and human approval exist.

## Canonical Env Names

- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`
- `PAYPAL_PLAN_ID`
- `PAYPAL_API_BASE`
- `ENABLE_PAYMENTS`
- `EXPRESSJOBS_PAYPAL_SANDBOX_SMOKE_CREATE`

## Blockers Before Paid Pilot

- `PAYPAL_SANDBOX_SMOKE=BLOCKED_EXTERNAL_CREDENTIALS`
- `PAYPAL_WEBHOOK_RESOURCE_BINDING=PENDING`
- `SUPABASE_SUBSCRIPTION_STATE_WRITE=PENDING_APPROVAL`

## Required Fix Before Paid Pilot

Before storing premium/subscription state, the verified webhook handler must validate resource binding:

- Expected sandbox plan ID.
- Expected subscription ID format/state.
- Expected user/customer mapping.
- Duplicate/replay handling.
- Persistence idempotency.

Until then: `PAID_PILOT=NO-GO`.
