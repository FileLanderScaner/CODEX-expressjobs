# ExpressJobs Supabase Security Verification

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Result

`SUPABASE_SECURITY_VERIFICATION=BLOCKED_RLS_ROLE_ESCALATION_RISK`

Supabase RLS smoke and static tests pass, but this verification found a role-escalation risk in the profile update policy. The project is not approved to expand testers until the staging database is tightened and re-tested.

## Checks

| Command | Result |
| --- | --- |
| `npm run secret:scan` | `PASS` |
| `npm run staging:check` | `PASS` |
| `npm run test:rls:static` | `PASS` |
| `npm run rls:smoke` | `PASS` |
| `npm run lint` | `PASS` |
| `npm run typecheck` | `PASS` |
| `npm run test` | `PASS` |
| `npm run build` | `PASS` |
| `npm run production:check` | `PASS_SAFE_NO_GO` |
| `git diff --check` | `PASS` |

## Critical Finding

`RLS_ROLE_ESCALATION_RISK=FOUND`

Current policy:

```text
profiles_update_own: for update using (id = auth.uid()) with check (id = auth.uid())
```

Because `public.ej_is_admin()` checks `public.ej_profiles.role = 'admin'`, an authenticated user who can update their own `ej_profiles.role` could self-promote to `admin` through direct API access.

## Secondary Finding

`ROLE_BOUNDARY_DB_ENFORCEMENT=PARTIAL`

Ownership boundaries are enforced, but role-type boundaries are not fully enforced at the database layer:

- `ej_jobs` insert checks `client_id = auth.uid()` but does not require profile role `client`.
- `ej_worker_profiles` manage-own checks `user_id = auth.uid()` but does not require profile role `worker`.

This may be acceptable only if mixed-role accounts are intentionally allowed. If client/worker separation is required, RLS must enforce profile roles.

## What Remains Safe

- Anonymous profile insert is blocked by real RLS smoke.
- Client owns and manages own jobs.
- Worker can see open jobs and create own application.
- Worker cannot accept/reject own application in smoke.
- Messages are limited to accepted job participants.
- Reviews require completed job participants.
- Normal user cannot see audit table before role escalation.
- Service role is not used in frontend code.

## Required Fix

Prepare and apply a reviewed staging migration that:

- Prevents normal users from updating `ej_profiles.role`.
- Allows users to update only safe profile fields.
- Keeps admin role assignment limited to controlled admin/server paths.
- Adds static and smoke coverage for self-promotion attempts.
- Optionally enforces `client` role for job creation and `worker` role for worker profile/application actions if strict role separation is required.

No remote migration was applied in this cycle.

## Decision

- `FIRST_10_TESTERS=NO-GO_UNTIL_RLS_ROLE_ESCALATION_FIX`
- `FIRST_25_TESTERS=NO-GO_UNTIL_FIRST_10_RESULTS_AND_RLS_FIX`
- `PAID_PILOT=NO-GO_BLOCKED_EXTERNAL_CREDENTIALS_AND_RLS_FIX`
- `PRODUCTION=NO-GO_PRODUCTION`
