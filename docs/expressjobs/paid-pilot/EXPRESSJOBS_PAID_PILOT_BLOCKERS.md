# ExpressJobs Paid Pilot Blockers

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `PAID_PILOT_READINESS=BLOCKED`
- `PAYPAL_AUDIT=BLOCKED_IMPLEMENTATION_MISSING`
- `GOOGLE_AUTH=PASS`
- `RLS_REAL_SMOKE_STATUS=PASS`
- `PAYMENTS_LIVE=OFF`

## Blockers Before Any Real Money

- `PAYPAL_WEBHOOK_MISSING`
- `PAYPAL_SIGNATURE_VERIFICATION_MISSING`
- `PAYPAL_SUBSCRIPTION_FLOW_MISSING`
- `PAYPAL_SANDBOX_SMOKE_MISSING`
- `PREMIUM_STATE_STORAGE=PARTIAL_SCHEMA_ONLY`
- `SUPPORT_REFUND_DISPUTE_RUNBOOK_MISSING`
- `LEGAL_TAX_REVIEW_MISSING`
- `PRODUCTION_RISK`

## What Is Allowed Next

- Implement sandbox-only PayPal subscription smoke.
- Add server-only PayPal env names to `.env.example` with placeholder values only.
- Add webhook endpoint with signature verification.
- Add tests for event classification and no frontend premium trust.
- Add Supabase migration proposal for subscription/event tables, but do not apply remotely without approval.

## What Is Not Allowed

- PayPal live.
- Real charges.
- Real customer outreach for paid plans.
- Production deploy or promote.
- Committing secrets.
- Disabling RLS.
