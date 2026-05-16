# ExpressJobs PayPal Environment Variables

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Sandbox Variables

Names only. Do not commit values.

```text
PAYPAL_ENVIRONMENT=sandbox
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
PAYPAL_WEBHOOK_ID=your_sandbox_webhook_id
PAYPAL_PLAN_ID=your_sandbox_plan_id
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com
ENABLE_PAYMENTS=false
EXPRESSJOBS_PAYPAL_SANDBOX_SMOKE_CREATE=false
```

These are the canonical names used by the implementation. Do not use older `PAYPAL_SANDBOX_CLIENT_ID`, `PAYPAL_SANDBOX_CLIENT_SECRET`, `PAYPAL_SANDBOX_WEBHOOK_ID`, or `PAYPAL_SANDBOX_PLAN_ID` aliases; they are not read by the current code.

## Visibility

| Variable | Visibility | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | public | Sandbox client ID for frontend button later. |
| `PAYPAL_CLIENT_SECRET` | server-only | Never expose to browser, docs, screenshots, logs, or chat. |
| `PAYPAL_WEBHOOK_ID` | server-only | Used for signature verification. |
| `PAYPAL_PLAN_ID` | server-only for now | Does not grant premium by itself. |
| `PAYPAL_API_BASE` | server-only | Must remain sandbox in this cycle. |
| `ENABLE_PAYMENTS` | server/client gate | Must remain `false` until human-approved sandbox smoke. |
| `EXPRESSJOBS_PAYPAL_SANDBOX_SMOKE_CREATE` | local smoke gate | Must be explicitly set to `true` only for approved sandbox smoke. |

## Hard Blocks

- `PAYPAL_ENVIRONMENT=live` is blocked.
- `PAYPAL_API_BASE=https://api-m.paypal.com` is blocked.
- `APP_ENV=production` is blocked.
- `VERCEL_ENV=production` is blocked.
