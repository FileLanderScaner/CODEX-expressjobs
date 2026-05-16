# ExpressJobs RLS Role Hardening Post-Apply Snapshot

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Result

`POST_APPLY_SNAPSHOT=NOT_CREATED_APPLY_BLOCKED`

The staging migration was not applied in this cycle because Supabase remote write capability was not available safely. Therefore there is no post-apply database state to capture.

## Apply Status

| Item | Status |
| --- | --- |
| Approved migration | `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql` |
| Migration applied to staging | `no` |
| Other migrations applied | `no` |
| Supabase production touched | `false` |
| RLS disabled or relaxed | `false` |
| Secrets printed | `false` |

## Verification Status

| Verification | Status |
| --- | --- |
| Broad `UPDATE` revoked from `authenticated` on `ej_profiles` | `NOT_VERIFIED_APPLY_BLOCKED` |
| `authenticated` blocked from updating `role` | `NOT_VERIFIED_APPLY_BLOCKED` |
| Safe profile field updates preserved | `NOT_VERIFIED_APPLY_BLOCKED` |
| `profiles_update_own_safe_fields` exists | `NOT_VERIFIED_APPLY_BLOCKED` |
| Old `profiles_update_own` replaced | `NOT_VERIFIED_APPLY_BLOCKED` |
| `ej_profiles_prevent_role_self_update` trigger exists | `NOT_VERIFIED_APPLY_BLOCKED` |
| Trigger function has explicit `search_path` | `NOT_VERIFIED_APPLY_BLOCKED` |
| RLS remains enabled | `NOT_VERIFIED_APPLY_BLOCKED` |

## Decision

- `RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY`
- `RLS_ROLE_ESCALATION_FIX=PREPARED_LOCAL_NOT_APPLIED`
- `RLS_REAL_SMOKE_AFTER_APPLY=NOT_RUN_APPLY_BLOCKED`
- `FIRST_10_TESTERS=NO-GO_UNTIL_RLS_ROLE_HARDENING_APPLIED_AND_SMOKE_PASS`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
