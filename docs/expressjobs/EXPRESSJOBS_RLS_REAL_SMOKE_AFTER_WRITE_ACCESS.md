# ExpressJobs RLS Real Smoke After Write Access

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`RLS_REAL_SMOKE_STATUS=BLOCKED_AUTH_WRITE_CAPABILITY`

The remote Supabase schema is already verified read-only as:

`SUPABASE_REMOTE_SCHEMA_MATCHES_EXPECTED`

However, this Codex process does not have the credentials required to run real staging writes or authenticated RLS smoke tests.

## Capability Check

Environment capability was checked without printing secret values.

- `SUPABASE_ACCESS_TOKEN`: missing
- `NEXT_PUBLIC_SUPABASE_URL`: missing
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: missing
- `SUPABASE_SERVICE_ROLE_KEY`: missing

Because these are missing, no migration was applied, no staging users were created, and no smoke-test records were written.

## Function Search Path Fix

The advisory warning fix was prepared locally in:

`supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`

It was not applied remotely.

Status:

`FUNCTION_SEARCH_PATH_FIX_PREPARED_NOT_APPLIED`

## RLS Smoke Matrix

The following matrix remains pending real validation:

1. Anonymous user cannot modify data.
2. Client creates and manages only own jobs.
3. Worker sees open jobs.
4. Worker creates own applications.
5. Worker cannot accept/reject own application.
6. Client sees applications only for own jobs.
7. Client accepts/rejects applications of own jobs.
8. Only participants see messages.
9. Third parties do not read private messages.
10. Only participants of completed jobs create reviews.
11. Admin with valid role sees audit table.
12. Normal user does not see audit table.

## Safe Resume Gate

Resume only after secure local or platform env setup provides:

- `SUPABASE_ACCESS_TOKEN`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Do not write these values to git-tracked files.
