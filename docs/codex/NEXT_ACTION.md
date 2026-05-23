# ExpressJobs - Next Action for Codex

## Run this next

`EXPRESSJOBS_PR44_PROVIDER_ACCESS_CLOSEOUT_NO_PRODUCTION`

## Why

The Supabase Advisor closeout migrations were applied to staging and `npm run rls:smoke:messages` is PASS after the job-message admin private-helper fix.

Current safe gate is provider-access closeout for PR #44 while keeping production blocked. Supabase Preview still reports `MIGRATIONS_FAILED` after restoring the compatibility migration and running a safe rebase. Vercel Preview deployment `dpl_8TPK9CMp3DaGNjweCZUn4VXBEXrQ` failed before build because Vercel could not fetch required Git information.

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
4. `supabase/migrations/20260523064307_advisor_security_performance_closeout.sql`
5. `supabase/migrations/20260523064405_fix_job_messages_admin_private_helper.sql`
6. `supabase/migrations/20260523065010_advisor_company_reports_policy_reapply.sql`
7. `supabase/migrations/20260523120500_advisor_company_reports_policy_reapply.sql`
8. `src/__tests__/supabase-rls-static.test.ts`
9. `scripts/expressjobs-rls-smoke-messages.mjs`

## Tasks

1. Confirm PR #44 remote checks after the Supabase migration-order fix.
2. Before any new deploy/Preview workflow, list Supabase branches and verify only one non-main branch exists, leaving capacity under the user's main-plus-two-branches limit.
3. If Supabase Preview remains `MIGRATIONS_FAILED`, do not reset/delete the branch without explicit authorization; document `BLOCKED_SUPABASE_ACCESS`.
4. If Vercel cannot fetch required Git information, document `BLOCKED_VERCEL_ACCESS` and do not create production deploys.
5. Do not merge if a merge would trigger unsafe production behavior.
6. Keep remaining accepted exceptions documented:
   - `ej_set_profile_role` authenticated SECURITY DEFINER RPC until API redesign.
   - Auth leaked password protection Dashboard action.
   - Realtime policy initplan warnings.
   - Unused index notices until real usage data exists.
   - Multiple permissive category/worker profile policy warnings until a safe consolidation is reviewed.

## Expected output

A Director Report that says one of:

- `PR44_PROVIDER_ACCESS_CLOSEOUT=READY_NO_PRODUCTION`
- or `BLOCKED_SUPABASE_ACCESS`
- or `BLOCKED_VERCEL_ACCESS`
- or `BLOCKED_DASHBOARD_ACTION_REQUIRED`
- or `BLOCKED_SECURITY_RISK`

Production remains `NO-GO_PRODUCTION`.
