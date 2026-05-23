# ExpressJobs - Next Action for Codex

## Run this next

`EXPRESSJOBS_WEBAPP_PUBLIC_ROUTES_QA_NO_DB_CHANGES`

## Why

ChatGPT acted as safe Director substitute while Codex is unavailable and advanced PR #44 with a no-database public UX cycle.

Latest validated branch head:
`073468ab84f6cce4506536d5a26d0aaf92efc8f9`

Cycle 016 added:
- public route `/como-funciona`;
- navigation link `Como funciona`;
- improved `/jobs` pilot/onboarding context;
- improved `/register` safe role-selection guidance;
- Director report `CYCLE_EXPRESSJOBS_016_WEBAPP_UX_NO_DB_CHANGES.md`.

Validation passed:
- `npm run production:check`: PASS
- `npm run staging:check`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS
- Vercel remote status: SUCCESS

Production remains:
`NO-GO_PRODUCTION`

## Branch / PR

Use branch:

`codex/expressjobs-supabase-security-advisor-closeout`

PR:

`https://github.com/FileLanderScaner/CODEX-expressjobs/pull/44`

Do not push directly to `main`.

## Critical Supabase branch-capacity rule

Before any new migration, DDL apply, Supabase Preview Branch workflow, or Advisor closeout apply:

1. List Supabase branches for project `gnsfyvsodslnehszanra`.
2. Confirm available branch capacity.
3. If capacity is full or branches are failed/broken, stop.
4. Report `BLOCKED_SUPABASE_BRANCH_CAPACITY`.
5. Do not reset/delete branches without explicit human authorization.
6. Do not apply new migrations until branch capacity and branch state are resolved.

## Do not do

- Do not deploy production.
- Do not run `vercel --prod`.
- Do not run `vercel promote`.
- Do not mutate Vercel Production env vars.
- Do not activate PayPal live.
- Do not process real payments.
- Do not print secrets.
- Do not relax RLS.
- Do not apply destructive migrations.
- Do not create new Supabase branches without branch-capacity preflight.
- Do not reset/delete Supabase branches without explicit authorization.

## Tasks

1. Keep PR #44 remote checks green.
2. Continue public-route QA without Supabase schema changes.
3. Smoke check `/`, `/como-funciona`, `/jobs`, `/register`, `/auth`, `/pricing`, `/production-paused`.
4. Improve UX only where it does not require database migration.
5. Document every change with production still blocked.
6. Keep remaining accepted exceptions documented:
   - `ej_set_profile_role` authenticated SECURITY DEFINER RPC until API redesign.
   - Auth leaked password protection Dashboard action.
   - Realtime policy initplan warnings.
   - Unused index notices until real usage data exists.
   - Multiple permissive category/worker profile policy warnings until safe consolidation is reviewed.

## Expected output

A Director Report that says one of:

- `WEBAPP_PUBLIC_ROUTES_QA_PASS_NO_PRODUCTION`
- or `WEBAPP_PUBLIC_ROUTES_QA_BLOCKED`
- or `BLOCKED_SUPABASE_BRANCH_CAPACITY`
- or `BLOCKED_DASHBOARD_ACTION_REQUIRED`
- or `BLOCKED_VERCEL_ACCESS`
- or `BLOCKED_SECURITY_RISK`

Production remains `NO-GO_PRODUCTION`.
