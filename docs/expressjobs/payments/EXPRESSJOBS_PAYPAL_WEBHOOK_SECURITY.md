# ExpressJobs PayPal Webhook Security

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `WEBHOOK_ENDPOINT=MISSING`
- `WEBHOOK_SIGNATURE_VERIFICATION=MISSING`
- `WEBHOOK_SECURITY_STATUS=BLOCKED_IMPLEMENTATION_REQUIRED`

## Required Webhook Rules

The PayPal webhook handler must:

- Accept only `POST`.
- Read the raw JSON payload.
- Require PayPal transmission headers.
- Verify the webhook signature with PayPal before mutating Supabase.
- Match the expected `PAYPAL_WEBHOOK_ID`.
- Deduplicate event IDs.
- Store sanitized event audit records.
- Update subscription state only after verification succeeds.
- Return 2xx only after durable processing or durable queueing.
- Never trust frontend success screens for premium access.

## Required Headers

Do not log full values.

- `PAYPAL-AUTH-ALGO`
- `PAYPAL-CERT-URL`
- `PAYPAL-TRANSMISSION-ID`
- `PAYPAL-TRANSMISSION-SIG`
- `PAYPAL-TRANSMISSION-TIME`

## Required Event Handling

- `BILLING.SUBSCRIPTION.ACTIVATED`: mark subscription active.
- `BILLING.SUBSCRIPTION.CANCELLED`: mark cancelled.
- `BILLING.SUBSCRIPTION.SUSPENDED`: mark suspended.
- `BILLING.SUBSCRIPTION.PAYMENT.FAILED`: mark payment failure and restrict paid feature renewal.
- `PAYMENT.SALE.COMPLETED`: record successful subscription payment.
- `PAYMENT.SALE.REFUNDED`: record refund.
- `PAYMENT.SALE.REVERSED`: freeze paid status pending review.

## Decision

No paid pilot can proceed until webhook signature verification is implemented and tested in sandbox.
