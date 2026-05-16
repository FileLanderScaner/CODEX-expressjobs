# ExpressJobs Supabase Auth Review

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`SUPABASE_AUTH_REVIEW=PASS_WITH_RLS_ROLE_SOURCE_BLOCKER`

## Auth Findings

- Google Auth Preview is documented as `PASS`.
- OAuth callback exchanges code for session server-side.
- OAuth callback creates/fetches profile with default role `client`.
- Public OAuth helper does not allow `admin` provider/role assignment.
- Facebook remains config-pending.
- Instagram remains research-only.
- RLS smoke users exist and `npm run rls:smoke` passes.

## Authorization Source Risk

The current admin helper checks `public.ej_profiles.role`. Because users can update their own profile row under the current `profiles_update_own` policy, the authorization source is not protected enough.

## Required Auth/RLS Hardening

- Prevent user-controlled profile updates from changing `role`.
- Keep admin assignment in a controlled admin path.
- Add test coverage for attempted self-promotion.
- Re-run real RLS smoke after applying the staging migration.

## Service Role

`SUPABASE_SERVICE_ROLE_KEY` is referenced only as a placeholder/docs/setup-script variable. It is not used in frontend code and no service-role value was printed.
