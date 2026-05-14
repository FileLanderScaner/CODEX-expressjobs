# ExpressJobs PayPal Live Readiness

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `PAYPAL_LIVE_READINESS=BLOCKED`
- `PAYPAL_LIVE=OFF`
- `PAID_PILOT_READINESS=BLOCKED_PAYPAL_IMPLEMENTATION_MISSING`

## Live Is Not Approved

Do not enable PayPal live until all of these are complete:

- Sandbox subscription creation works.
- Sandbox webhook endpoint exists.
- Sandbox webhook signature verification passes.
- Subscription state is stored server-side in Supabase.
- RLS protects subscription/payment records.
- Refund, failed payment, cancellation, and reversal handling are documented and tested.
- Support and dispute runbooks exist.
- Legal/tax review for the target market is complete.
- Human production go/no-go approval is recorded.

## Required Human Configuration Later

Names only:

- PayPal live app.
- Live `PAYPAL_CLIENT_ID`.
- Live `PAYPAL_CLIENT_SECRET`.
- Live `PAYPAL_WEBHOOK_ID`.
- Live plan IDs.
- Production callback/success/cancel URLs.

No live value belongs in git, docs, screenshots, logs, or chat.

## Decision

`LIVE_READINESS=BLOCKED_UNTIL_SANDBOX_AND_HUMAN_APPROVAL`
