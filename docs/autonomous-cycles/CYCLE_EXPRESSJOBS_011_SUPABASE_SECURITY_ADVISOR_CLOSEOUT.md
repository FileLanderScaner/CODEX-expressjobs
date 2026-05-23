# Cycle ExpressJobs 011 Supabase Security Advisor Closeout

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_SUPABASE_SECURITY_ADVISOR_CLOSEOUT`

## Branch

`codex/expressjobs-supabase-security-advisor-closeout`

## Pull Request

PR #44: `https://github.com/FileLanderScaner/CODEX-expressjobs/pull/44`

## Scope

Prepare a safe local closeout for Supabase Advisor findings without touching production and without applying broad RLS/helper changes remotely before review.

## Supabase Project

- Project: `supabase-expressjobs`
- Project ref: `gnsfyvsodslnehszanra`
- Environment: staging / non-production

## Advisor Recheck

Supabase MCP migration list: PASS.

Security advisors before local apply still report:

- `anon_security_definer_function_executable` for `public.ej_is_admin()`
- `anon_security_definer_function_executable` for `public.ej_job_messages_broadcast_trigger()`
- `authenticated_security_definer_function_executable` for `public.ej_is_admin()`
- `authenticated_security_definer_function_executable` for `public.ej_job_messages_broadcast_trigger()`
- `authenticated_security_definer_function_executable` for `public.ej_set_profile_role(text, text)`
- `auth_leaked_password_protection`

Performance advisors before local apply still report:

- Unindexed foreign keys on several `ej_*` tables.
- RLS initplan warnings for policies using `auth.uid()` or helper calls directly.
- Multiple permissive authenticated SELECT policies on `ej_job_messages`.
- Multiple permissive SELECT policies on `ej_worker_profiles`.
- Unused index notices.

## Local Migration Prepared

Created:

`supabase/migrations/20260523113000_advisor_security_performance_closeout.sql`

The migration is idempotent and non-destructive. It prepares:

- `private.ej_is_admin()` as the admin helper used by RLS policies, outside the exposed `public` RPC surface.
- Revocation of direct execution on `public.ej_is_admin()` from `public`, `anon`, and `authenticated`.
- Conditional revocation of direct execution on `public.ej_job_messages_broadcast_trigger()` if present.
- RLS policy rewrites using `(select auth.uid())` and `(select private.ej_is_admin())` where appropriate.
- Consolidation of `ej_job_messages` authenticated SELECT policies into `job_messages_select_participants_or_admin`.
- Foreign-key covering indexes for Advisor-reported FK columns.

## Deliberate Non-Closure

`public.ej_set_profile_role(text, text)` remains an authenticated SECURITY DEFINER RPC in the current app design. Revoking authenticated execute would break public role selection. Full closure requires one of:

- redesign role selection through a server-only route or private schema RPC pattern, then update app code; or
- accept and document this as a reviewed exception until the redesign is implemented.

`auth_leaked_password_protection` remains Dashboard-only.

Unused-index notices were not fixed by dropping indexes because there is not enough real usage data.

## Tooling Note

Attempted `npx supabase migration new advisor_security_performance_closeout`, but the Windows process exited with crash code `-1073741819` and no output. The migration was created manually using the repo's existing timestamped migration format.

## Checks

- `npm run test:rls:static`: PASS, 1 file / 12 tests after adding the Advisor closeout assertions.
- JSON status parse: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run secret:scan`: PASS
- `npm run guard:no-production-deploy`: PASS
- `npm run production:check`: PASS, `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- `npm run staging:check`: PASS
- `npm run rls:smoke:messages`: PASS
- `npm run test`: PASS, 9 files / 54 tests
- `npm run build`: PASS, Next.js 16.2.6, 36 static pages
- `git diff --check`: PASS

## Remote PR Checks

PR #44 remote checks:

- `docs-check`: PASS
- `pr-check`: PASS
- `security-gate`: PASS
- `production-no-go`: PASS
- `Supabase Preview`: PASS
- `Vercel Preview Comments`: PASS
- `Vercel`: FAIL

Vercel failure details:

- Deployment: `dpl_2ZWihjeiWhKsRVMAu53D2N5a8u5o`
- Target: Preview
- Status: Error
- `npx vercel inspect dpl_2ZWihjeiWhKsRVMAu53D2N5a8u5o --logs`: returned only `status Error`.
- `npx vercel inspect dpl_2ZWihjeiWhKsRVMAu53D2N5a8u5o --scope akuma424-projects`: confirmed Preview target and URL, but no actionable build logs.

Classification:

`BLOCKED_VERCEL_ACCESS`

## Production Safety

- `vercel --prod`: NOT RUN
- `vercel promote`: NOT RUN
- Vercel Production env mutation: NO
- Supabase production mutation: NO
- Supabase staging mutation: NOT APPLIED IN THIS CYCLE
- PayPal live: OFF
- Real payments: OFF
- Secrets printed: NO

## Decision

`SUPABASE_SECURITY_ADVISOR_CLOSEOUT=PASS_LOCAL_READY_PR_OPEN_REMOTE_APPLY_PENDING_REVIEW`

`REMOTE_PR_CHECKS=PASS_EXCEPT_VERCEL_PREVIEW`

Next safe gate:

`EXPRESSJOBS_SUPABASE_ADVISOR_STAGING_APPLY_AND_RECHECK`
