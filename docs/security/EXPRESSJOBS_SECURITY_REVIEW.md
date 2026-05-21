# ExpressJobs Security Review

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current Controls

- Production access remains neutralized by middleware.
- CSP, HSTS, frame, content-type, referrer and permissions headers are configured in `vercel.json`.
- Added API handlers return sanitized JSON errors without stack traces.
- Mutating APIs derive user identity from Supabase SSR session, not from client-supplied owner fields.
- Profile update API does not accept privileged role edits.
- Payments and AI agents remain disabled by feature flags.

## RLS

Local migrations enable RLS for the `ej_*` tables. The latest local migration hardens application accept/reject against already resolved applications and non-open jobs.

## Secrets

No secret values are documented. Use placeholders only:

- `<REDACTED>`
- `<SET_IN_VERCEL_PREVIEW>`
- `<SET_IN_LOCAL_ENV>`

## Remaining Risks

- Real Preview Supabase smoke requires external credentials.
- Rate limiting for public contact remains a documented follow-up.
- Remote migration apply was not performed.
- Supabase Preview branch for PR #40 is blocked by concurrent branch limit.
- Public Vercel Preview smoke is blocked by Deployment Protection until authenticated/bypass access is available.
