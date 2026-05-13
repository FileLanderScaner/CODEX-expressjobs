# Cycle ExpressJobs 003 RLS Smoke Tests

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## Completed Safely In Repo

- Added static RLS migration smoke tests.
- Added `npm run test:rls:static`.
- Verified the migration keeps `ej_*` tables, RLS enabled, required policy names, and no AhorroYA references.

## Blocked Externally

`BLOCKED_SUPABASE_ACCESS`

Live Supabase RLS smoke tests require:

- Non-production Supabase project.
- Staging project URL and publishable/anon key.
- Staging user accounts for client, worker, and admin.
- Permission to apply the migration to staging.

## Do Not Execute

- Do not apply migrations to production.
- Do not use production env vars.
- Do not disable RLS.
