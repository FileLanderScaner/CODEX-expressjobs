# ExpressJobs Vercel Preview Evidence

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`VERCEL_PREVIEW=READY_PROTECTED`

PR #40 created a Vercel Git Preview deployment. Public unauthenticated HTTP smoke is blocked by Vercel Deployment Protection with `401`, which is expected for a protected Preview without bypass credentials.

Preview URL is recorded only as `<PREVIEW_URL_REDACTED>`.

## Safety

- `vercel --prod`: NOT_USED
- `vercel promote`: NOT_USED
- Production env mutation: NOT_USED
- Production deployment target: NOT_USED
- Vercel Git Preview status: PASS
- Supabase Preview branch status: BLOCKED_CONCURRENT_BRANCH_LIMIT
- Public curl smoke: BLOCKED_PREVIEW_AUTH_401
- Vercel CLI protected access attempt: PARTIAL, project access available but full route body smoke not captured as evidence

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
