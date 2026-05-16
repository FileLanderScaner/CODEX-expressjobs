# ExpressJobs PayPal Live Gate

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `PAYPAL_LIVE=OFF`
- `LIVE_GATE=BLOCKED`
- `REAL_PAYMENTS_CREATED=false`

## Requirements Before Live

- Sandbox create-subscription smoke passes.
- Sandbox webhook signature verification passes.
- Supabase subscription/event persistence is approved and tested.
- RLS protects paid state.
- Refund, dispute, cancellation, and failed payment runbooks exist.
- Legal/tax review is complete.
- Support process is ready.
- Production release gate passes.
- Human approval is recorded.

## Blocked Values

- `PAYPAL_ENVIRONMENT=live`
- `PAYPAL_API_BASE=https://api-m.paypal.com`
- production deployment
- production promotion

No live PayPal credential should be added until the human live gate is approved.
