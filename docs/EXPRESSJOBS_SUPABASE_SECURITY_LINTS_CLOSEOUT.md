# ExpressJobs Supabase Security Lints Closeout

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

This document closes or classifies the Supabase security lints referenced for PR #42.

## Advisor Items

| Lint | Status | Resolution |
|---|---|---|
| `anon_security_definer_function_executable` | LOCAL_FIX_READY_REMOTE_APPLY_BLOCKED | Added migration `20260523110500_harden_security_definer_rpc_exposure.sql` to revoke `PUBLIC` and `anon` execution from sensitive `SECURITY DEFINER` functions. |
| `authenticated_security_definer_function_executable` | PARTIAL_ACCEPTED_TEMPORARY | `ej_set_profile_role(text, text)` remains callable by `authenticated` because the app uses it for role selection after login. It is hardened to reject `admin`, require `auth.uid()`, pin `search_path`, validate name length, and block role switching after marketplace activity. |
| `auth_leaked_password_protection` | BLOCKED_DASHBOARD_ACTION_REQUIRED | Must be enabled manually in Supabase Dashboard. No CLI/write path is available in this Codex process. |

## Function Audit

### `public.ej_prevent_profile_role_self_update()`

- Purpose: internal trigger function for `public.ej_profiles`.
- App usage: no direct app call found.
- RPC exposure: should not be callable by `PUBLIC`, `anon`, or `authenticated`.
- Current local closeout: migration revokes execute from `PUBLIC`, `anon`, and `authenticated`.
- Remote status: not applied to current staging write path in this cycle.

### `public.ej_set_profile_role(requested_role text, requested_full_name text)`

- Purpose: safe marketplace role selection after authentication.
- App usage: `src/lib/marketplace.ts` calls `supabase.rpc("ej_set_profile_role")`; `/register`, role selector, job form, and application form depend on that helper.
- Admin risk: local migration keeps `requested_role not in ('client', 'worker')`, so `admin` is rejected.
- Escalation risk: function operates only on `auth.uid()` and blocks role changes after the user has marketplace activity.
- Exposure decision: `PUBLIC` and `anon` are revoked. `authenticated` remains temporarily granted because this is still the app's current role-selection path.
- Longer-term option: replace the browser RPC with a server action or dedicated server route and revoke `authenticated` too.

## Marketplace Migration Status

`supabase/migrations/20260523093000_marketplace_core_profiles_reports.sql` remains local/prepared. It is non-destructive, enables RLS on new `ej_*` tables, avoids `using (true)` and `with check (true)`, and does not disable RLS. It still needs explicit current-staging apply/verification through a safe write path.

## Leaked Password Protection

Action required:

1. Open Supabase Dashboard.
2. Go to Authentication security/password protection settings.
3. Enable leaked password protection.
4. Re-run Supabase Security Advisor and document evidence.

No PASS is claimed without dashboard evidence.

## Decision

`SECURITY_LINTS_PARTIAL_LOCAL_FIX_READY_REMOTE_APPLY_BLOCKED`

The codebase now contains the hardening migration and static tests. Current staging remains blocked for migration apply because no safe `SUPABASE_ACCESS_TOKEN`, direct DB URL, or approved writable MCP path is available in this Codex process.

## Verification

- Static RLS test after hardening migration: PASS, 11 tests.
- Staging check: PASS.
- Real RLS smoke: PASS, `EXPRESSJOBS_RLS_STAGING_PASS`.
- Remote apply of the two pending migrations: NOT RUN, blocked by missing safe write path.
