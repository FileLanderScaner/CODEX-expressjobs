# ExpressJobs PayPal Sandbox Credentials Closeout

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Result

`PAYPAL_SANDBOX_CREDENTIALS_CLOSEOUT=BLOCKED_EXTERNAL_CREDENTIALS`

PayPal sandbox code is ready, but Codex cannot run the real sandbox smoke because the required sandbox env values are not present in the local process or loaded ignored env files. No values were printed or requested in chat.

## Canonical Env Names

Use these exact names. Older `PAYPAL_SANDBOX_*` aliases are not used by the implementation.

| Variable | Current status |
| --- | --- |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | `MISSING` |
| `PAYPAL_CLIENT_SECRET` | `MISSING` |
| `PAYPAL_WEBHOOK_ID` | `MISSING` |
| `PAYPAL_PLAN_ID` | `MISSING` |
| `PAYPAL_API_BASE` | `MISSING` |
| `ENABLE_PAYMENTS` | `PRESENT` |
| `EXPRESSJOBS_PAYPAL_SANDBOX_SMOKE_CREATE` | `MISSING` |

Required sandbox values must be loaded through a secure local untracked env file or Vercel Preview env configuration. Do not paste values into chat, docs, screenshots, logs, or committed files.

## Smoke Evidence

Command:

```text
npm run paypal:sandbox:smoke
```

Result:

```text
BLOCKED_EXTERNAL_CREDENTIALS
```

## Security Decision

- `PAYPAL_LIVE=OFF`
- `REAL_PAYMENTS_CREATED=false`
- `PREMIUM_GRANTED_FROM_FRONTEND=false`
- `PREMIUM_GRANTED_ONLY_AFTER_VERIFIED_WEBHOOK=true`
- `VERCEL_PRODUCTION_TOUCHED=false`
- `SUPABASE_REMOTE_MUTATED=false`

## Next Safe Action

Load sandbox-only credentials into a secure local or Vercel Preview environment, then rerun:

```text
npm run paypal:sandbox:smoke
```

The smoke must remain blocked if any required variable is missing or if any live/production marker appears.
