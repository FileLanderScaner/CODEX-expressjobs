# ExpressJobs Vercel Preview Setup

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

Prepare Preview only. Do not run `vercel --prod`, do not run `vercel promote`, and do not mutate Production env vars.

## Preview Variables

- `NEXT_PUBLIC_SUPABASE_URL=<SET_IN_VERCEL_PREVIEW>`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=<SET_IN_VERCEL_PREVIEW>`
- `NEXT_PUBLIC_APP_URL=<PREVIEW_URL_REDACTED>`
- `APP_ENV=preview`
- `ALLOWED_ORIGINS=<PREVIEW_URL_REDACTED>`
- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`
- `ENABLE_ADMIN_PANEL=false`

Server-only only if strictly required:

- `SUPABASE_SERVICE_ROLE_KEY=<SET_IN_VERCEL_PREVIEW_SERVER_ONLY>`

## Preview Smoke

- `GET /`
- `GET /ofertas`
- `GET /landing-negocios`
- `GET /sponsor`
- `GET /auth`
- `GET /api/health`
- Anonymous `/dashboard` redirects or blocks safely.
- Contact form validates input.

## Production

Production remains paused and must continue to show `NO-GO_PRODUCTION`.
