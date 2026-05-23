# ExpressJobs - Next Action for Codex

## Run this next

`EXPRESSJOBS_SUPABASE_SECURITY_ADVISOR_CLOSEOUT`

## Why

Post-merge `main` validation is PASS, realtime chat RLS smoke is PASS, build is PASS, and Preview UI smoke is PASS with the safe Vercel Deployment Protection bypass header.

Remaining safe release risk is Supabase Advisor closeout:

- SECURITY DEFINER RPC exposure warnings still appear for `ej_is_admin`, `ej_job_messages_broadcast_trigger`, and `ej_set_profile_role`.
- Auth leaked password protection remains a Dashboard action.
- Performance advisors report unindexed foreign keys, auth initplan warnings, multiple permissive policies, and unused indexes.

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

## Suggested branch

`codex/expressjobs-supabase-security-advisor-closeout`

## Required source files to read first

1. `docs/EXPRESSJOBS_DIRECTOR_STATUS.md`
2. `docs/expressjobs-director-status.json`
3. `docs/autonomous-cycles/CYCLE_EXPRESSJOBS_010_PREVIEW_UI_SMOKE_CLOSEOUT.md`
4. `supabase/migrations/20260523110500_harden_security_definer_rpc_exposure.sql`
5. `scripts/expressjobs-rls-smoke-messages.mjs`
6. `src/__tests__/supabase-rls-static.test.ts`

## Expected output

A Director Report that says one of:

- `SUPABASE_SECURITY_ADVISOR_CLOSEOUT=PASS_LOCAL_READY_REMOTE_APPLY_READY`
- or `BLOCKED_SUPABASE_ACCESS`
- or `BLOCKED_DASHBOARD_ACTION_REQUIRED`

Production remains `NO-GO_PRODUCTION`.
