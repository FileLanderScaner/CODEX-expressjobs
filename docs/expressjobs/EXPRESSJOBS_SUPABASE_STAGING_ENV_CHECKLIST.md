# ExpressJobs Supabase Staging Env Checklist

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`SUPABASE_STAGING_STATUS=BLOCKED_SUPABASE_ACCESS`

## Env Checklist

| Variable | Scope | Required | Safe To Expose In Browser | Notes |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | public | yes | yes | Staging project URL only. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | yes | yes | Public anon/publishable key only. |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only | setup only | no | Staging user setup only. |
| `APP_ENV` | app | yes | yes | Must be `staging` or `preview`. |
| `NEXT_PUBLIC_APP_URL` | public | yes | yes | Preview URL. |
| `ALLOWED_ORIGINS` | server | yes | no | Include exact Preview origin. |
| `ENABLE_PAYMENTS` | app | yes | yes | Must be `false`. |
| `ENABLE_AI_AGENTS` | app | yes | yes | Must be `false`. |
| `AI_KILL_SWITCH` | app | yes | yes | Must be `true`. |
| `ENABLE_ADMIN_PANEL` | app | yes | yes | `false` unless protected. |

## Validation Command

```bash
npm run staging:check
```

Expected result with complete env:

```text
ExpressJobs staging env check passed.
```

Expected result without credentials:

```text
BLOCKED_SUPABASE_ACCESS
```
