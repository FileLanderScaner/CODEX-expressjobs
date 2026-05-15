# ExpressJobs PayPal Webhook Security

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `WEBHOOK_ROUTE=READY`
- `WEBHOOK_SIGNATURE_VERIFICATION=READY`
- `SUPABASE_WRITE=SKIPPED_SAFE_UNTIL_APPROVED`

## Required Headers

The webhook rejects requests missing PayPal signature headers:

- `PAYPAL-AUTH-ALGO`
- `PAYPAL-CERT-URL`
- `PAYPAL-TRANSMISSION-ID`
- `PAYPAL-TRANSMISSION-SIG`
- `PAYPAL-TRANSMISSION-TIME`

## Verification

The webhook posts the event and headers to PayPal's verify webhook signature endpoint:

```text
/v1/notifications/verify-webhook-signature
```

Only `verification_status=SUCCESS` is accepted.

## Mutation Rule

No Supabase write is performed unless:

- PayPal signature is verified.
- Sandbox env is configured.
- Production is not active.
- A future cycle explicitly approves server-side writes.

Current implementation returns:

```text
SUPABASE_WRITE_SKIPPED_SAFE
```

This avoids breaking RLS or mutating remote Supabase without human approval.
