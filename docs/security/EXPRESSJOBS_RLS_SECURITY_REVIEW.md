# ExpressJobs RLS Security Review

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`RLS_SECURITY=PASS`

## Evidence

- `npm run test:rls:static`: `PASS`
- `npm run rls:smoke`: `EXPRESSJOBS_RLS_STAGING_PASS`
- RLS remains enabled for all required `public.ej_*` tables.
- No `disable row level security` statement is present in the migration.
- No dangerous `using (true)` policy was found in the `ej_*` policies.

## Validated Matrix

- Anonymous profile insert blocked.
- Client creates and manages own jobs.
- Worker sees open jobs.
- Worker creates own applications.
- Worker cannot accept or reject own application.
- Client sees applications for own jobs.
- Client accepts applications for own jobs.
- Messages are limited to accepted job participants and admins.
- Third parties cannot read private messages.
- Completed-job reviews require valid participants.
- Admin sees audit logs.
- Normal user cannot see audit logs.

## Residual Risk

`SECURITY_ADVISOR_RECHECK=PENDING_OR_NOT_RECHECKED`

The function search path fix is documented as applied, but a fresh Supabase Security Advisor recheck is still pending.
