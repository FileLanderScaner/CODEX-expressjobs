# ExpressJobs Monetization Prep

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`MONETIZATION_PREP=READY_BLOCKED_EXTERNAL_CREDENTIALS`

The paid pilot can be prepared operationally, but no money can be charged and no sandbox subscription smoke can be completed until PayPal sandbox credentials are loaded through a secure local or Vercel Preview environment.

## Current Readiness

- Google OAuth Preview: `PASS`
- Supabase RLS real smoke: `PASS`
- Preview browser smoke: `PASS`
- First 10 controlled internal testers: `GO_CONTROLLED_INTERNAL_ONLY`
- PayPal sandbox implementation: `READY_BLOCKED_EXTERNAL_CREDENTIALS`
- PayPal live: `OFF`
- Production: `NO-GO_PRODUCTION`

## Paid Pilot Boundary

The paid pilot is not public production. It must remain controlled, internal, and sandbox-only until:

- PayPal sandbox smoke passes.
- Webhook signature verification is observed with sandbox events.
- Premium state changes only after verified webhook events.
- No frontend path can grant premium.
- No live PayPal environment variables are present.
- Production deployment remains blocked.

## Pricing Hypothesis

Use placeholder pricing only until validated:

- Worker premium: visibility, faster matching, saved searches, priority profile completeness.
- Client premium: more active postings, faster applicant review, saved templates.
- Admin/internal: audit and support only, no public paid role assignment.

No paid claim should promise guaranteed jobs, income, hiring, or results.

## Safe Pilot Criteria

Proceed to paid pilot preparation only if:

- `PAYPAL_SANDBOX_SMOKE=PASS`
- `PAYPAL_LIVE=OFF`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- `RLS_REAL_SMOKE_STATUS=PASS`
- `PREVIEW_BROWSER_SMOKE=PASS`
- `SECRET_SCAN=PASS`
- `REAL_PAYMENTS_CREATED=false`

## Blocked Items

- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`
- `PAYPAL_PLAN_ID`
- `PAYPAL_API_BASE`
- `EXPRESSJOBS_PAYPAL_SANDBOX_SMOKE_CREATE`

These must be supplied securely outside chat and outside Git.
