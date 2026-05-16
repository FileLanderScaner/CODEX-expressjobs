# ExpressJobs PayPal Sandbox Credential Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Purpose

Load and validate PayPal sandbox credentials without exposing values, committing env files, activating live payments, or touching production.

## Required Env Names

Values must remain secret and uncommitted.

```text
PAYPAL_ENVIRONMENT=sandbox
NEXT_PUBLIC_PAYPAL_CLIENT_ID=[sandbox client id]
PAYPAL_CLIENT_SECRET=[sandbox client secret]
PAYPAL_WEBHOOK_ID=[sandbox webhook id]
PAYPAL_PLAN_ID=[sandbox plan id]
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com
ENABLE_PAYMENTS=true
EXPRESSJOBS_PAYPAL_SANDBOX_SMOKE_CREATE=true
```

## Safe Loading Paths

- Local ignored env file for developer-only smoke.
- Vercel Preview environment only, never Production.
- Secure shell process env for one-time local validation.

Do not paste values into chat, docs, GitHub issues, screenshots, logs, or committed files.

## Validation Commands

```text
npm run paypal:sandbox:smoke
npm run secret:scan
npm run production:check
git diff --check
```

## Hard Stop Conditions

Stop immediately if:

- `PAYPAL_ENVIRONMENT=live`
- `PAYPAL_API_BASE=https://api-m.paypal.com`
- `VERCEL_ENV=production`
- `APP_ENV=production`
- Any required env is missing.
- Any secret appears in logs, docs, console output, screenshots, or Git diff.

## Expected Result

The smoke may create only a sandbox approval flow. It must not grant premium. Premium can become effective only after a verified PayPal webhook event maps subscription state to `active`.
