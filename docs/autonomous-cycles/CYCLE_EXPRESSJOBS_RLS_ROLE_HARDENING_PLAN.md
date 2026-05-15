# Cycle ExpressJobs RLS Role Hardening Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_SUPABASE_RLS_ROLE_HARDENING_PLAN`

## Migration

`supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`

## Changes

- Revoked broad profile update grants.
- Added safe column-level profile update grant.
- Replaced `profiles_update_own` with `profiles_update_own_safe_fields`.
- Added trigger/function to block authenticated role self-update.
- Added static tests for hardening migration.
- Added real smoke cases for post-apply validation.

## Checks

| Check | Result |
| --- | --- |
| `secret:scan` | `PASS` |
| `test:rls:static` | `PASS` |
| `lint` | `PASS` |
| `typecheck` | `PASS_AFTER_BUILD_REGENERATED_NEXT_TYPES` |
| `test` | `PASS` |
| `build` | `PASS` |
| `production:check` | `PASS_SAFE_NO_GO` |
| `git diff --check` | `PASS` |

## Remote Apply

`NOT_APPLIED`

No remote Supabase changes were made.

## Decision

- `FIRST_10_TESTERS=NO-GO_UNTIL_RLS_ROLE_HARDENING_APPLIED_AND_SMOKE_PASS`
- `FIRST_25_TESTERS=NO-GO`
- `PAID_PILOT=NO-GO`
- `PRODUCTION=NO-GO_PRODUCTION`

## Next Mode

`EXPRESSJOBS_SUPABASE_RLS_ROLE_HARDENING_APPLY_GATE`
