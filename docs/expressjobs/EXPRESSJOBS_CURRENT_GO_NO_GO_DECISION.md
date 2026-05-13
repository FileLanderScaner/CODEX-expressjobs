# ExpressJobs Current GO/NO-GO Decision

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current Decision

ExpressJobs / Trabajos Rapidos is currently:

- `CODE_READY`
- `CODE_READY_ENV_PENDING`
- `NO-GO_PUBLIC_COHORT_UNTIL_PREVIEW_AND_RLS_PASS`
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
- Any claim that Supabase RLS has passed live staging smoke tests.
- Any claim that a public Preview is ready before Vercel evidence exists.

## Blocking Items

- `BLOCKED_SUPABASE_ACCESS`
- `BLOCKED_VERCEL_ACCESS`

## Required Gate To Open First 10 Testers

The first 10 controlled testers remain blocked until all of the following are true:

- Supabase staging project is confirmed non-production.
- `ej_*` migration is applied to staging.
- Client, worker, and admin staging users exist.
- `npm run staging:check` passes with real staging env.
- `npm run rls:smoke` returns `EXPRESSJOBS_RLS_STAGING_PASS`.
- Vercel Preview deploy exists for the working branch.
- Preview browser smoke passes.
- No critical trust/safety issue is open.

## Production Rule

Production remains `NO-GO_PRODUCTION` even after Preview and RLS pass. Production requires a separate release gate.
