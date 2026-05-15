# ExpressJobs — Next Action for Codex

## Run this next

`EXPRESSJOBS_SUPABASE_WRITE_CAPABILITY_UNBLOCK_AND_RLS_APPLY`

## Why

Production is blocked by:

`RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY`

Prepared migration waiting for staging apply:

`supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`

## Do not do yet

- Do not create more sales/demo assets.
- Do not add new features.
- Do not deploy production.
- Do not use PayPal live.
- Do not modify Supabase production.

## Required source files to read first

1. `AGENTS.md`
2. `docs/codex/EXPRESSJOBS_CODEX_RESUME_QUEUE.md`
3. `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`
4. `scripts/expressjobs-rls-smoke.mjs`
5. `src/__tests__/supabase-rls-static.test.ts`

## Expected output

A Director Report that says one of:

- `RLS_ROLE_ESCALATION_FIX=APPLIED_AND_SMOKE_PASS`
- or `BLOCKED_SUPABASE_WRITE_CAPABILITY` with exact missing human action

Production remains `NO-GO_PRODUCTION` until RLS smoke passes after apply.
