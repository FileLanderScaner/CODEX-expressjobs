# ExpressJobs Vercel Preview Evidence

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`VERCEL_PREVIEW=FAIL`

PR #40 initially created a protected Vercel Git Preview deployment. After the latest QA evidence commit, the current Vercel Preview deployment failed with target `preview`; no Production deployment was used.

Preview URL is recorded only as `<PREVIEW_URL_REDACTED>`.

## Safety

- `vercel --prod`: NOT_USED
- `vercel promote`: NOT_USED
- Production env mutation: NOT_USED
- Production deployment target: NOT_USED
- Vercel Git Preview status: FAIL_CURRENT_DEPLOYMENT
- Supabase Preview branch status: BLOCKED_CONCURRENT_BRANCH_LIMIT
- Public curl smoke: BLOCKED_PREVIEW_AUTH_401
- Vercel CLI protected access attempt: PARTIAL, project access available but full route body smoke not captured as evidence
- Vercel inspect: TARGET_PREVIEW_STATUS_ERROR_LOGS_UNAVAILABLE

## Expected Preview Smoke

- `GET /`
- `GET /ofertas`
- `GET /landing-negocios`
- `GET /sponsor`
- `GET /demo/peluqueria`
- `GET /demo/estetica`
- `GET /demo/tecnico-reparaciones`
- `GET /demo/limpieza`
- `GET /demo/delivery`
- `GET /auth`
- `GET /api/health`
- anonymous `/dashboard` blocks or redirects

Preview URL must be documented as `<PREVIEW_URL_REDACTED>`.
