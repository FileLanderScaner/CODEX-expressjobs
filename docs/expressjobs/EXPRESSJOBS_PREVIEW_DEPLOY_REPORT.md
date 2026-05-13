# ExpressJobs Preview Deploy Report

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`EXPRESSJOBS_PREVIEW_BLOCKED_VERCEL_ACCESS`

No Vercel Preview deploy was executed in this cycle because Preview env vars and Vercel access are not available in the local environment.

## Ready Locally

- `vercel.json` is present.
- Build command is `npm run build`.
- Next.js build passes locally.
- Preview env var checklist exists.
- Production deploy commands remain forbidden.

## Required Before Preview Deploy

- Vercel project linked to ExpressJobs.
- Preview environment variables configured.
- Supabase staging project configured.
- RLS smoke test run against staging.
- Deployment Protection reviewed if enabled.

## Forbidden

- `vercel --prod`
- `vercel promote`
- Production env edits
