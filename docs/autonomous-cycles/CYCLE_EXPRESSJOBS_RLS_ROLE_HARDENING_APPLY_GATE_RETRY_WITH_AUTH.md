# Cycle ExpressJobs RLS Role Hardening Apply Gate Retry With Auth

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_SUPABASE_RLS_ROLE_HARDENING_APPLY_GATE_RETRY_WITH_AUTH_FULL_AUTONOMOUS`

## Objective

Retry the staging apply gate for the prepared RLS role hardening migration after fixing local staging flags and checking whether secure Supabase write capability is available.

## Migration Target

`supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`

## Migration Safety Review

`MIGRATION_STATIC_SAFETY_REVIEW=PASS`

The migration only targets `public.ej_profiles` update privileges, the safe update policy, and a defensive trigger/function for role self-update prevention.

No forbidden patterns were found:

- no `disable row level security`
- no `drop table`
- no `truncate`
- no mass `delete`
- no `using (true)`
- no `with check (true)`
- no unrelated destructive DDL

## Staging Flags

`STAGING_FLAGS=PASS_LOCAL_IGNORED_ENV_NORMALIZED`

`.env.local` is ignored by Git. It was normalized locally without printing secrets so that:

- `APP_ENV` is staging/preview safe.
- `ENABLE_PAYMENTS` is safe.
- `ENABLE_AI_AGENTS` is safe.
- `AI_KILL_SWITCH` is safe.
- `ENABLE_ADMIN_PANEL` is safe.

The file was also rewritten as UTF-8 without BOM because Node could not parse the first env key after local normalization.

## Supabase Write Capability

`RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY`

Supabase remote mutation is still blocked:

- Supabase MCP query returned `Auth required`.
- `SUPABASE_ACCESS_TOKEN` is missing.
- Direct Postgres URL envs are missing.
- `SUPABASE_SERVICE_ROLE_KEY` is missing in the Codex process/env files.

No migration was applied.

## Checks

| Check | Result |
| --- | --- |
| `npm run secret:scan` | `PASS` |
| `npm run staging:check` | `PASS` |
| `npm run test:rls:static` | `PASS` |
| `npm run rls:smoke` | `NOT_RUN_APPLY_BLOCKED` |
| `npm run lint` | `PASS` |
| `npm run typecheck` | `PASS_AFTER_BUILD_CACHE_REGEN` |
| `npm run test` | `PASS` |
| `npm run build` | `PASS` |
| `npm run production:check` | `PASS_SAFE_NO_GO` |
| `git diff --check` | `PASS` |

## Decisions

- `FIRST_10_TESTERS=NO-GO_UNTIL_RLS_ROLE_HARDENING_APPLIED_AND_SMOKE_PASS`
- `FIRST_25_TESTERS=NO-GO`
- `PAID_PILOT=NO-GO`
- `PRODUCTION=NO-GO_PRODUCTION`

## Next Safe Step

Authenticate Supabase MCP or provide a safe staging-only write capability without printing secrets. Then retry this apply gate and run `npm run rls:smoke`.
