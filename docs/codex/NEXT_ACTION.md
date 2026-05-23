# ExpressJobs - Next Action for Codex

## Run this next

`EXPRESSJOBS_PR44_REVIEW_OR_SAFE_MERGE_DECISION_GATE`

## Why

Codex is temporarily unavailable until May 26, so ChatGPT acted as a safe Director substitute and documented two additional PR #44 validation cycles.

The current PR #44 branch has:
- `CYCLE_EXPRESSJOBS_014_CHATGPT_SUBSTITUTE_PR44_AUDIT.md`
- `CYCLE_EXPRESSJOBS_015_PR44_POST_PUSH_VALIDATION.md`

Latest validated branch head:
`054e8e5fe9cd41e81a475e19d78ae94cb108757c`

Local/post-push validation passed:
- `npm run production:check`: PASS
- `npm run staging:check`: PASS
- `npm run test:rls:static`: PASS, 12 tests
- `npm run rls:smoke:messages`: PASS

Production remains:
`NO-GO_PRODUCTION`

## Branch / PR

Use branch:

`codex/expressjobs-supabase-security-advisor-closeout`

PR:

`https://github.com/FileLanderScaner/CODEX-expressjobs/pull/44`

Do not push directly to `main`.

## Critical Supabase branch-capacity rule

The user confirmed the Supabase Free tier branch limit must be respected.

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

## Required source files to read first

1. `docs/EXPRESSJOBS_DIRECTOR_STATUS.md`
2. `docs/expressjobs-director-status.json`
3. `docs/autonomous-cycles/CYCLE_EXPRESSJOBS_014_CHATGPT_SUBSTITUTE_PR44_AUDIT.md`
4. `docs/autonomous-cycles/CYCLE_EXPRESSJOBS_015_PR44_POST_PUSH_VALIDATION.md`
5. `docs/autonomous-cycles/CYCLE_EXPRESSJOBS_013_SUPABASE_ADVISOR_STAGING_APPLY_AND_RECHECK.md`
6. `supabase/migrations/20260523064307_advisor_security_performance_closeout.sql`
7. `supabase/migrations/20260523064405_fix_job_messages_admin_private_helper.sql`
8. `supabase/migrations/20260523065010_advisor_company_reports_policy_reapply.sql`
9. `supabase/migrations/20260523120500_advisor_company_reports_policy_reapply.sql`
10. `src/__tests__/supabase-rls-static.test.ts`
11. `scripts/expressjobs-rls-smoke-messages.mjs`

## Tasks

1. Confirm PR #44 remote checks for head `054e8e5fe9cd41e81a475e19d78ae94cb108757c`.
2. Confirm Vercel remains PASS.
3. Confirm local status is clean.
4. Confirm production remains `NO-GO_PRODUCTION`.
5. Before any Supabase action, run branch-capacity preflight.
6. Do not apply new migrations.
7. Do not reset/delete Supabase branches unless explicitly authorized.
8. Decide whether PR #44 is ready for human review or safe merge planning.
9. Keep remaining accepted exceptions documented:
   - `ej_set_profile_role` authenticated SECURITY DEFINER RPC until API redesign.
   - Auth leaked password protection Dashboard action.
   - Realtime policy initplan warnings.
   - Unused index notices until real usage data exists.
   - Multiple permissive category/worker profile policy warnings until safe consolidation is reviewed.

## Expected output

A Director Report that says one of:

- `PR44_READY_FOR_REVIEW_NO_PRODUCTION`
- or `PR44_SAFE_MERGE_PLANNING_NO_PRODUCTION`
- or `BLOCKED_SUPABASE_BRANCH_CAPACITY`
- or `BLOCKED_DASHBOARD_ACTION_REQUIRED`
- or `BLOCKED_SUPABASE_ACCESS`
- or `BLOCKED_VERCEL_ACCESS`
- or `BLOCKED_SECURITY_RISK`

Production remains `NO-GO_PRODUCTION`.
