# ExpressJobs RLS Role Escalation Fix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`RLS_ROLE_ESCALATION_FIX=PREPARED_LOCAL_NOT_APPLIED`

`RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY`

## Fix Summary

The local migration blocks normal authenticated users from changing `ej_profiles.role` while preserving safe profile field updates.

## Defense Layers

1. Table-level broad update revoked from `anon` and `authenticated`.
2. Column-level update grant allows only safe fields for `authenticated`.
3. RLS policy keeps ownership checks for profile updates.
4. Trigger blocks `role` changes when `auth.role() = 'authenticated'`.
5. Trigger function has explicit `search_path`.
6. Direct function execute is revoked from `anon` and `authenticated`.

## Smoke Additions

`scripts/expressjobs-rls-smoke.mjs` now includes post-apply cases:

- Client cannot change own role to admin.
- Worker cannot change own role to admin.
- Normal user cannot read admin audit logs after self-promotion attempt.
- Own safe profile fields can still be edited.
- Existing normal RLS workflow still passes.

## Apply Gate Attempt

The apply gate attempted to verify remote staging capability before applying the approved migration:

`supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`

No migration was applied because the active Supabase MCP call returned `Auth required`, `SUPABASE_ACCESS_TOKEN` was missing, and no direct Postgres URL was present in the local process or ignored env files.

Additional local blocker:

`npm run staging:check` returned `BLOCKED_SECURITY_RISK: unsafe feature flags for staging.`

This local staging flag blocker was corrected in ignored `.env.local` without printing secrets. The remaining blocker is Supabase staging write capability:

- Supabase MCP query returned `Auth required`.
- `SUPABASE_ACCESS_TOKEN` is missing.
- Direct Postgres URL envs are missing.
- No migration has been applied to staging.

## Decision

- `FIRST_10_TESTERS=NO-GO_UNTIL_RLS_ROLE_HARDENING_APPLIED_AND_SMOKE_PASS`
- `FIRST_25_TESTERS=NO-GO`
- `PAID_PILOT=NO-GO`
- `PRODUCTION=NO-GO_PRODUCTION`
