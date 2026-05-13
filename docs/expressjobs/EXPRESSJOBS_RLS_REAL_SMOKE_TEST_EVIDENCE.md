# ExpressJobs RLS Real Smoke Test Evidence

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`RLS_REAL_SMOKE_STATUS=BLOCKED_SUPABASE_ACCESS`

Latest retry status:

`SUPABASE_LINK_STATUS=LINKED_LOCAL_METADATA_PRESENT_REMOTE_COMMANDS_BLOCKED_TOKEN`

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

## 2026-05-13 Cycle 027 RLS Smoke Gate

`RLS_REAL_SMOKE_STATUS=BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY`

Path selected:

`BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY`

Credential and capability presence was checked without printing secret values:

- `.env.local`: present and ignored by Git
- `.env.rls`: missing
- `SUPABASE_SERVICE_ROLE_KEY`: not present in `.env.rls`
- Supabase MCP write/apply: read-only
- Supabase Auth anon signup: blocked by email confirmation/rate limit

Commands and results:

```bash
npm run secret:scan
npm run test:rls:static
npm run production:check
npm run staging:check
git diff --check
npm run rls:bootstrap-anon-users
npm run rls:smoke
```

Results:

- `npm run secret:scan`: PASS
- `npm run test:rls:static`: PASS
- `npm run production:check`: PASS
- `npm run staging:check`: PASS
- `git diff --check`: PASS
- `npm run rls:bootstrap-anon-users`: AUTH_FAILURE, Supabase Auth signup did not produce confirmed sessions
- `npm run rls:smoke`: ENV_CONFIGURATION_ERROR / TEST_DATA_SETUP_ERROR, confirmed RLS user credentials are missing

Remote read evidence:

- Supabase project ref: `gnsfyvsodslnehszanra`
- Auth staging signup users created by anon bootstrap attempts: 1
- Confirmed staging signup users: 0
- REST/Data API read against `ej_categories`: PASS in the previous cycle with the publishable key

Matrix status:

1. Anonymous user cannot modify data: NOT RUN, missing confirmed RLS users
2. Client creates and manages only own jobs: NOT RUN, missing confirmed RLS users
3. Worker sees open jobs: NOT RUN, missing confirmed RLS users
4. Worker creates own applications: NOT RUN, missing confirmed RLS users
5. Worker cannot accept/reject own application: NOT RUN, missing confirmed RLS users
6. Client sees applications only for own jobs: NOT RUN, missing confirmed RLS users
7. Client accepts/rejects applications for own jobs: NOT RUN, missing confirmed RLS users
8. Only participants see messages: NOT RUN, missing confirmed RLS users
9. Third parties do not read private messages: NOT RUN, missing confirmed RLS users
10. Only participants of completed jobs create reviews: NOT RUN, missing confirmed RLS users
11. Admin with valid role sees audit table: NOT RUN, missing confirmed RLS users
12. Normal user does not see audit table: NOT RUN, missing confirmed RLS users

Pending migration:

`supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`

Remote migrations currently include only `202605120001_expressjobs_mvp_schema`; the `search_path` fix remains unapplied because MCP is read-only and no safe CLI/service-role write capability is available.

## 2026-05-13 Retry Note

Supabase CLI was available through `npx supabase` and local `supabase init` completed. Local link metadata now points to project ref `gnsfyvsodslnehszanra` / `supabase-expressjobs`, but remote commands from Codex still fail because `SUPABASE_ACCESS_TOKEN` is not present in the Codex process. A token was pasted into chat and must be revoked/rotated before continuing. No migration or user creation was attempted.

## 2026-05-13 Cycle 020 Note

`RLS_REAL_SMOKE_STATUS=BLOCKED_AUTH_WRITE_CAPABILITY`

Credential presence was checked without printing values:

- `SUPABASE_ACCESS_TOKEN`: missing
- `NEXT_PUBLIC_SUPABASE_URL`: missing
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: missing
- `SUPABASE_SERVICE_ROLE_KEY`: missing

Commands attempted:

```bash
npm run staging:check
npm run rls:smoke
```

Both commands stopped before reaching Supabase because required staging/auth env vars were missing. No staging users, jobs, applications, messages, reviews, or audit records were created.

The function `search_path` advisory fix was prepared locally but not applied remotely:

`supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`

## 2026-05-13 Cycle 021 Note

`RLS_REAL_SMOKE_STATUS=BLOCKED_AUTH_WRITE_CAPABILITY`

Credential presence was checked again without printing values:

- `SUPABASE_ACCESS_TOKEN`: missing
- `NEXT_PUBLIC_SUPABASE_URL`: missing
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: missing
- `SUPABASE_SERVICE_ROLE_KEY`: missing

Because the token and staging/auth envs are still missing, Codex did not run `supabase link`, did not apply the local migration, did not create staging users, and did not write any smoke-test data.

## 2026-05-13 Secret Exposure Note

`BLOCKED_SECURITY_RISK_SECRET_EXPOSED_ROTATION_REQUIRED`

A Supabase service-role credential was pasted into the conversation. The value is not repeated here and must be considered compromised. No Supabase write, staging user creation, migration apply, or RLS smoke test may use that credential. Rotate it in Supabase before resuming.
