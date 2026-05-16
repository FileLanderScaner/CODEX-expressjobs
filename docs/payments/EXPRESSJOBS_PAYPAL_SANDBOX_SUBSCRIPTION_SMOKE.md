# ExpressJobs PayPal Sandbox Subscription Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `PAYPAL_SANDBOX_IMPLEMENTATION=READY_BLOCKED_EXTERNAL_CREDENTIALS`
- `PAYPAL_ENVIRONMENT=sandbox`
- `PAYPAL_LIVE=OFF`
- `PAYPAL_API_BASE=sandbox`
- `CREATE_SUBSCRIPTION_ROUTE=READY`
- `WEBHOOK_ROUTE=READY`
- `WEBHOOK_SIGNATURE_VERIFICATION=READY`
- `SUBSCRIPTION_STATE_MACHINE=READY`
- `PAYPAL_SANDBOX_SMOKE=BLOCKED_EXTERNAL_CREDENTIALS`

## Implemented Routes

- `POST /api/payments/paypal/create-subscription`
- `POST /api/payments/paypal/webhook`

## Safety Rules

- Live PayPal is blocked.
- Production is blocked.
- Live PayPal API base is blocked.
- Missing sandbox envs are blocked.
- `ENABLE_PAYMENTS=false` blocks subscription creation.
- Create-subscription does not grant premium.
- Frontend cannot grant premium.
- Premium can become effective only from verified webhook state `active`.
- Supabase remote writes are skipped safely until explicit service-role env and human approval exist.

## Smoke Status

The script exists:

```text
npm run paypal:sandbox:smoke
```

Current expected result without sandbox credentials:

```text
BLOCKED_EXTERNAL_CREDENTIALS
```

Do not paste credentials into chat. Load sandbox envs through local untracked env files or secure Preview env configuration.

## Required External Credentials

- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`
- `PAYPAL_PLAN_ID`
- `PAYPAL_API_BASE`
- `NEXT_PUBLIC_APP_URL`
- `EXPRESSJOBS_PAYPAL_SANDBOX_SMOKE_CREATE` for approved sandbox creation smoke

These are the canonical env names used by the code. `PAYPAL_SANDBOX_CLIENT_ID`, `PAYPAL_SANDBOX_CLIENT_SECRET`, `PAYPAL_SANDBOX_WEBHOOK_ID`, and `PAYPAL_SANDBOX_PLAN_ID` are not current implementation inputs.

## Evidence

- Unit tests mock PayPal token, subscription creation, and webhook verification.
- No live payment was created.
- No real user was contacted.
- No Supabase remote write was performed.
