# ExpressJobs Supabase Staging Status

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current Status

`SUPABASE_STAGING_STATUS=STAGING_ENV_PASS_AUTH_USERS_PENDING`

Remote schema status:

`SUPABASE_REMOTE_SCHEMA_STATUS=SUPABASE_REMOTE_SCHEMA_MATCHES_EXPECTED`

RLS real smoke status:

`RLS_REAL_SMOKE_STATUS=BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY`

## Missing Capability

The current blocking capability is:

- Confirmed staging users for client, worker, and admin roles.
- A safe service-role or Auth Admin write path to create confirmed users.
- Supabase MCP write/apply capability for the pending function `search_path` migration.

`.env.local` is present and staging env validation passes. `.env.rls` is not present.

Anon signup was attempted but Supabase Auth did not produce confirmed sessions because email confirmation/rate limit blocks the flow.

## 2026-05-13 Cycle 028 Retry

RLS user bootstrap was retried with anon signup.

Result:

`AUTH_EMAIL_CONFIRMATION_REQUIRED_FOR_ANON_SIGNUP`

Observed blocker:

`email rate limit exceeded`

Remote read evidence shows 1 staging signup user from previous bootstrap attempts and 0 confirmed staging signup users. Real RLS smoke remains blocked before policy execution because the required client, worker, and admin sessions cannot be created safely.

## Pending Work

- Provide a rotated service-role key only through `.env.rls`, or disable email confirmation in staging only and rerun anon bootstrap.
- Apply `supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`.
- Verify Supabase Advisor warnings are resolved.
- Create or validate staging users through safe scripts.
- Run real RLS smoke tests.
- Keep first 10 testers blocked until real RLS smoke passes.

## Production Guard

Production remains blocked:

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

No Vercel production action, payment activation, AI agent activation, or external tester enablement is allowed from this state.
