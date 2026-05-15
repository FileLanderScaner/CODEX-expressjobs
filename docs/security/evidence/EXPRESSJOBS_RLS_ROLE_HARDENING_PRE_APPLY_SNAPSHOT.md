# ExpressJobs RLS Role Hardening Pre-Apply Snapshot

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Result

`PRE_APPLY_SNAPSHOT=BLOCKED_SUPABASE_WRITE_CAPABILITY`

The pre-apply remote snapshot could not be captured because the active Supabase MCP session returned `Auth required`, and no safe local database write/read capability was available in the Codex process.

## Target

- Expected Supabase staging project ref: `gnsfyvsodslnehszanra`
- Expected project name: `supabase-expressjobs`
- Local Supabase URL ref match: `yes`
- Migration approved for apply: `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`

## Capability Check

| Capability | Status |
| --- | --- |
| Supabase MCP tools visible | `PRESENT` |
| Supabase MCP authenticated | `BLOCKED_AUTH_REQUIRED` |
| `SUPABASE_ACCESS_TOKEN` in local process/env files | `MISSING` |
| Direct Postgres URL in local process/env files | `MISSING` |
| Supabase CLI | `AVAILABLE_2.98.2` |
| Safe remote write capability | `MISSING` |

## Env Presence

Values were not printed.

| Name | Presence |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `PRESENT` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `PRESENT` |
| `SUPABASE_SERVICE_ROLE_KEY` | `MISSING` |
| `EXPRESSJOBS_STAGING_CLIENT_EMAIL` | `PRESENT` |
| `EXPRESSJOBS_STAGING_CLIENT_PASSWORD` | `PRESENT` |
| `EXPRESSJOBS_STAGING_WORKER_EMAIL` | `PRESENT` |
| `EXPRESSJOBS_STAGING_WORKER_PASSWORD` | `PRESENT` |
| `EXPRESSJOBS_STAGING_ADMIN_EMAIL` | `PRESENT` |
| `EXPRESSJOBS_STAGING_ADMIN_PASSWORD` | `PRESENT` |

## Intended Snapshot Queries

Not executed due to missing authenticated Supabase remote capability:

- Current `public.ej_profiles` RLS enabled state.
- Current `public.ej_profiles` policies.
- Current `public.ej_profiles` grants and column grants.
- Current `public.ej_is_admin()` definition.
- Current `public.ej_profiles` role-protection trigger state.

## Decision

No migration was applied. The correct status is:

- `RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY`
- `RLS_ROLE_ESCALATION_FIX=PREPARED_LOCAL_NOT_APPLIED`
- `FIRST_10_TESTERS=NO-GO_UNTIL_RLS_ROLE_HARDENING_APPLIED_AND_SMOKE_PASS`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
