# ExpressJobs - Next Action for Codex

## Run this next

`EXPRESSJOBS_SUPABASE_ADVISOR_STAGING_APPLY_AND_RECHECK`

## Why

The Supabase Advisor closeout migration is prepared locally but not applied remotely. PR #44 checks are now passing, including Vercel Preview after a later Git-triggered Preview deployment completed.

Current safe gate is a reviewed staging-only apply followed by RLS smoke and advisor recheck.

## Branch / PR

Use branch:

`codex/expressjobs-supabase-security-advisor-closeout`

PR:

`https://github.com/FileLanderScaner/CODEX-expressjobs/pull/44`

Do not push directly to `main`.

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

## Required source files to read first

1. `docs/EXPRESSJOBS_DIRECTOR_STATUS.md`
2. `docs/expressjobs-director-status.json`
3. `docs/autonomous-cycles/CYCLE_EXPRESSJOBS_011_SUPABASE_SECURITY_ADVISOR_CLOSEOUT.md`
4. `supabase/migrations/20260523113000_advisor_security_performance_closeout.sql`
5. `src/__tests__/supabase-rls-static.test.ts`
6. `scripts/expressjobs-rls-smoke-messages.mjs`

## Tasks

1. Open a PR from `codex/expressjobs-supabase-security-advisor-closeout` to `main`.
2. After review, apply `20260523113000_advisor_security_performance_closeout.sql` only to staging project `gnsfyvsodslnehszanra`.
3. Run `npm run rls:smoke:messages`.
4. Recheck Supabase security/performance advisors.
5. Document remaining accepted exceptions:
   - `ej_set_profile_role` authenticated SECURITY DEFINER RPC until API redesign.
   - Auth leaked password protection Dashboard action.
   - Unused index notices until real usage data exists.

## Expected output

A Director Report that says one of:

- `SUPABASE_ADVISOR_STAGING_APPLY_AND_RECHECK=PASS`
- or `BLOCKED_SUPABASE_ACCESS`
- or `BLOCKED_DASHBOARD_ACTION_REQUIRED`
- or `BLOCKED_SECURITY_RISK`

Production remains `NO-GO_PRODUCTION`.
