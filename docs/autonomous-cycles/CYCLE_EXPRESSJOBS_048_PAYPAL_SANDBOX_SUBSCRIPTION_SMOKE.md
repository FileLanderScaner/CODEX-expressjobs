# Cycle ExpressJobs 048 PayPal Sandbox Subscription Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_PAYPAL_SANDBOX_SUBSCRIPTION_SMOKE`

## Implemented

- Server-only PayPal sandbox config helper.
- Server-side PayPal client helper.
- PayPal subscription state machine.
- `POST /api/payments/paypal/create-subscription`.
- `POST /api/payments/paypal/webhook`.
- `npm run paypal:sandbox:smoke`.
- Unit tests for live blocks, missing env, event classification, webhook verification, and no frontend premium grant.

## Safety

- Live PayPal blocked.
- Production blocked.
- Create-subscription does not grant premium.
- Frontend cannot grant premium.
- Webhook requires PayPal signature verification.
- Supabase remote mutation skipped safely until approved.
- No real payments created.
- No real users contacted.
- No secrets printed.

## Status

- `PAYPAL_SANDBOX_IMPLEMENTATION=READY_BLOCKED_EXTERNAL_CREDENTIALS`
- `WEBHOOK_SIGNATURE_VERIFICATION=READY`
- `CREATE_SUBSCRIPTION_ROUTE=READY`
- `WEBHOOK_ROUTE=READY`
- `SUBSCRIPTION_STATE_MACHINE=READY`
- `PAYPAL_SANDBOX_SMOKE=BLOCKED_EXTERNAL_CREDENTIALS`
- `ISSUE_7_UPDATED=yes`
- `ISSUE_7_CLOSED=no`
- `ISSUE_7_STATUS=BLOCKED_EXTERNAL_CREDENTIALS`

## Remaining Blockers

- `PAYPAL_SANDBOX_CLIENT_ID`
- `PAYPAL_SANDBOX_CLIENT_SECRET`
- `PAYPAL_SANDBOX_WEBHOOK_ID`
- `PAYPAL_SANDBOX_PLAN_ID`
- `VERCEL_PREVIEW_ENV`
- `SUPABASE_WRITE_APPROVAL`

## Next Mode

`EXPRESSJOBS_PAYPAL_SANDBOX_CREDENTIALS_CLOSEOUT`
