# ExpressJobs RLS Role Hardening Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Result

`RLS_ROLE_HARDENING_PLAN=READY_LOCAL_NOT_APPLIED`

This cycle prepared a local migration and tests to prevent profile role self-escalation. It did not apply any remote Supabase change.

## Problem

`profiles_update_own` allowed authenticated users to update their own full `ej_profiles` row, including `role`. Because `public.ej_is_admin()` checks `ej_profiles.role = 'admin'`, this created a direct API self-promotion risk.

## Local Migration

`supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`

## Planned Changes

- Revoke broad `UPDATE` on `public.ej_profiles` from `anon`.
- Revoke broad `UPDATE` on `public.ej_profiles` from `authenticated`.
- Grant `authenticated` column-scoped `UPDATE` only for:
  - `full_name`
  - `phone`
  - `city`
  - `updated_at`
- Drop unsafe `profiles_update_own`.
- Create `profiles_update_own_safe_fields` with ownership-only row checks.
- Add trigger `ej_profiles_prevent_role_self_update`.
- Add function `public.ej_prevent_profile_role_self_update()` with explicit `search_path`.
- Revoke direct execute on the trigger function from `anon` and `authenticated`.

## Not Changed Remotely

- No remote migration applied.
- No Supabase remote SQL executed.
- No service role value printed.
- No production changes.

## Apply Gate

Apply only after explicit human approval for staging. After apply:

```text
npm run secret:scan
npm run test:rls:static
npm run rls:smoke
npm run production:check
git diff --check
```

Do not mark First 10 GO until the post-apply RLS smoke passes.
