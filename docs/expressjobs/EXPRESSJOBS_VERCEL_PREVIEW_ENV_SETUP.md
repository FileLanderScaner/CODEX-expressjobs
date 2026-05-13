# ExpressJobs Vercel Preview Env Setup

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`VERCEL_PREVIEW_STATUS=BLOCKED_VERCEL_ACCESS`

## Expected Project

- Vercel project: ExpressJobs / Trabajos Rapidos.
- Git branch: `codex/expressjobs-autonomous-bootstrap`.
- Environment: Preview only.

## Required Preview Variables

Public:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

Server-only:

- `SUPABASE_SERVICE_ROLE_KEY`
- `ALLOWED_ORIGINS`

App flags:

- `APP_ENV=preview`
- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`
- `ENABLE_ADMIN_PANEL=false`

## ALLOWED_ORIGINS

Set to the exact Vercel Preview origin after the first preview URL exists. If using multiple preview URLs, use the strictest comma-separated allowlist supported by backend code.

## Deployment Protection

If Vercel Deployment Protection is enabled:

- Record whether auth is required to view preview.
- Create a temporary authenticated share URL only if policy allows.
- Do not disable protection for convenience.

## Do Not Configure

- Production env vars.
- Live payment credentials.
- AI agent production keys.
