# ExpressJobs Supabase RLS Smoke Test Report

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`EXPRESSJOBS_RLS_READY_BUT_BLOCKED_SUPABASE_ACCESS`

## Local Validation

- Static RLS migration smoke tests pass.
- Migration uses `ej_*` tables.
- RLS is enabled on required tables.
- No AhorroYA table references were found in the migration.
- Application updates are client/admin-only.
- Private messages are limited to client and accepted worker participants.

## Real Staging Validation

Not executed. Requires non-production Supabase project credentials and staging users.

## Prepared Scripts

- `npm run staging:check`
- `npm run production:check`
- `npm run rls:create-staging-users`
- `npm run rls:smoke`

## RLS Smoke Matrix

1. Anonymous user cannot modify data.
2. Client creates and manages own jobs.
3. Worker sees open jobs.
4. Worker creates own applications.
5. Worker cannot accept own application.
6. Client sees applications only for own jobs.
7. Client accepts/rejects applications for own jobs.
8. Only participants see messages.
9. Only participants of completed jobs create reviews.
10. Third parties do not read private messages.
11. Admin with valid role sees audit table.
12. Normal user does not see audit table.
