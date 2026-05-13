# ExpressJobs Environment Variables

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

| Variable | Scope | Required | Notes |
| --- | --- | --- | --- |
| `APP_ENV` | server/client | yes | `local`, `preview`, `staging`, or `production` |
| `NEXT_PUBLIC_APP_URL` | client | yes | Public base URL |
| `NEXT_PUBLIC_SUPABASE_URL` | client | staging | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client | staging | Public anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only | later | Never expose to browser |
| `ALLOWED_ORIGINS` | server-only | staging | Comma-separated allowlist |
| `ENABLE_PAYMENTS` | server/client gate | yes | Must remain `false` |
| `ENABLE_AI_AGENTS` | server/client gate | yes | Must remain `false` |
| `AI_KILL_SWITCH` | server/client gate | yes | Must remain `true` |
| `ENABLE_ADMIN_PANEL` | server/client gate | yes | Default `false` |

## Example Files

- `.env.example`: local development placeholders.
- `.env.staging.example`: Vercel Preview/Staging placeholders.
- `.env.rls.example`: local-only template for RLS smoke test credentials.

Do not commit `.env`, `.env.local`, `.env.staging`, `.env.rls`, or any file containing real secrets.

## RLS Smoke Test Variables

These are required only when running non-production Supabase RLS smoke tests:

- `EXPRESSJOBS_STAGING_CLIENT_EMAIL`
- `EXPRESSJOBS_STAGING_CLIENT_PASSWORD`
- `EXPRESSJOBS_STAGING_WORKER_EMAIL`
- `EXPRESSJOBS_STAGING_WORKER_PASSWORD`
- `EXPRESSJOBS_STAGING_ADMIN_EMAIL`
- `EXPRESSJOBS_STAGING_ADMIN_PASSWORD`
- `EXPRESSJOBS_ALLOW_STAGING_MUTATIONS=true` only when creating staging users

`SUPABASE_SERVICE_ROLE_KEY` is server-only and only used by `scripts/expressjobs-create-staging-users.mjs` for staging user setup. It must never be exposed to browser code.
