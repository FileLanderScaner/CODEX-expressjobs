# ExpressJobs RLS Role Escalation Fix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`RLS_ROLE_ESCALATION_FIX=PREPARED_LOCAL_NOT_APPLIED`

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

## Decision

- `FIRST_10_TESTERS=NO-GO_UNTIL_RLS_ROLE_HARDENING_APPLIED_AND_SMOKE_PASS`
- `FIRST_25_TESTERS=NO-GO`
- `PAID_PILOT=NO-GO`
- `PRODUCTION=NO-GO_PRODUCTION`
