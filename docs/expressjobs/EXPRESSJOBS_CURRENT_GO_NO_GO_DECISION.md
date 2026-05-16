# ExpressJobs Current GO/NO-GO Decision

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current Decision

ExpressJobs / Trabajos Rapidos is currently:

- `CODE_READY`
- `RLS_READY_PREVIEW_PROTECTED`
- `NO-GO_PUBLIC_COHORT_UNTIL_PREVIEW_BROWSER_PASS`
- `NO-GO_PRODUCTION`

## What Is Approved

- Local development.
- Documentation refinement.
- Internal demos that clearly state data may be local or mock-backed.
- Supabase staging setup preparation.
- Vercel Preview setup preparation.
- Tester dry-run material preparation.

## What Is Not Approved

- Public launch.
- First external tester cohort.
- Production deploy.
- Vercel production promotion.
- Production env changes.
- Live payments.
- AI agents in production.
- Any claim that public Preview browser QA passed before Vercel Authentication access is resolved.

## Blocking Items

- `BLOCKED_PREVIEW_BROWSER_SMOKE_AUTH_401`
- `BLOCKED_SEARCH_PATH_FIX_APPLY_WRITE_CAPABILITY`

## Required Gate To Open First 10 Testers

The first 10 controlled testers remain blocked until all of the following are true:

- Supabase staging project is confirmed non-production. DONE.
- `ej_*` migration is applied to staging. DONE.
- Client, worker, and admin staging users exist. DONE.
- `npm run staging:check` passes with real staging env. DONE.
- `npm run rls:smoke` returns `EXPRESSJOBS_RLS_STAGING_PASS`. DONE.
- Vercel Preview deploy exists for the working branch. DONE.
- Preview browser smoke passes. BLOCKED by Vercel Authentication 401.
- No critical trust/safety issue is open.

## Production Rule

Production remains `NO-GO_PRODUCTION` even after Preview and RLS pass. Production requires a separate release gate.
