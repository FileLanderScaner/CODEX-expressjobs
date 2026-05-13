# ExpressJobs RLS Real Smoke Test Evidence

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`RLS_REAL_SMOKE_STATUS=BLOCKED_SUPABASE_ACCESS`

## Command

```bash
npm run rls:smoke
```

## Result

The command did not run against a real Supabase project. It stopped with:

```text
BLOCKED_SUPABASE_ACCESS
```

## Missing Inputs

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `APP_ENV`
- `EXPRESSJOBS_STAGING_CLIENT_EMAIL`
- `EXPRESSJOBS_STAGING_CLIENT_PASSWORD`
- `EXPRESSJOBS_STAGING_WORKER_EMAIL`
- `EXPRESSJOBS_STAGING_WORKER_PASSWORD`
- `EXPRESSJOBS_STAGING_ADMIN_EMAIL`
- `EXPRESSJOBS_STAGING_ADMIN_PASSWORD`

These values must be supplied through secure local or platform environment configuration. They must not be committed.

## Matrix Pending Real Validation

1. Anonymous user cannot modify data.
2. Client creates and manages only own jobs.
3. Worker sees open jobs.
4. Worker creates own applications.
5. Worker cannot accept/reject own application.
6. Client sees applications only for own jobs.
7. Client accepts/rejects applications for own jobs.
8. Only participants see messages.
9. Third parties do not read private messages.
10. Only participants of completed jobs create reviews.
11. Admin with valid role sees audit table.
12. Normal user does not see audit table.

## Decision

Do not authorize testers. Real RLS smoke has not passed.
