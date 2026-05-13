# ExpressJobs RLS Real Smoke Test Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`SUPABASE_STAGING_STATUS=BLOCKED_SUPABASE_ACCESS`

## Purpose

Validate real Supabase RLS behavior in a staging-only project.

## Prerequisites

- Dedicated Supabase staging project.
- Migration applied to staging.
- `.env.rls` or shell env with real staging values, not committed.
- Client, worker, and admin staging users.

## Commands

Validate env:

```bash
npm run staging:check
```

Create staging users:

```bash
npm run rls:create-staging-users
```

Run RLS smoke test:

```bash
npm run rls:smoke
```

## Expected Passing Result

```text
EXPRESSJOBS_RLS_STAGING_PASS
```

## Smoke Matrix

1. Anonymous user cannot modify data.
2. Client creates and manages only own jobs.
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

## Evidence To Save

- Command outputs with secrets redacted.
- Timestamp.
- Supabase staging project name/ref.
- Any failing RLS policy name.
- Follow-up fix commit if needed.

## Do Not Do

- Do not run against production.
- Do not paste service role into browser env.
- Do not disable RLS to make tests pass.
- Do not commit real `.env.rls`.
