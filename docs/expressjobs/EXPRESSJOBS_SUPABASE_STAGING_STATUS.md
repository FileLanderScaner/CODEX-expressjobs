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

## 2026-05-14 Cycle 029 Retry

`.env.rls` is now present and ignored by Git, and all six RLS smoke credential variables are present without printing values.

`npm run rls:smoke` reached Supabase Auth and failed on the first login:

`AUTH_FAILURE`

Details:

- First failing role: client
- Error class: invalid login credentials
- RLS policy matrix: not reached

Current staging status:

`STAGING_STATUS=STAGING_ENV_PASS_AUTH_USERS_INVALID`

Required next action: correct or reset the client staging user's email/password in `.env.rls`, verify the user is confirmed in Supabase Auth staging, then rerun the smoke gate.

## 2026-05-14 Cycle 030 Retry

The gate was retried with `.env.rls` present.

Results:

- `AUTH_USERS=PROVIDED_BUT_CLIENT_LOGIN_INVALID`
- `RLS_SMOKE=BLOCKED_AUTH_FAILURE`
- `SEARCH_PATH_FIX=BLOCKED_NOT_APPLIED`
- `STAGING_STATUS=STAGING_ENV_PASS_AUTH_USERS_INVALID`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

`npm run rls:smoke` failed at the first client sign-in with invalid login credentials. The RLS matrix was not reached.

## 2026-05-14 Cycle 031 RLS Smoke Pass

The client Auth blocker was resolved through staging-safe anon signup, and profiles were prepared through normal authenticated user sessions.

Current status:

- `AUTH_USERS=CONFIRMED`
- `RLS_SMOKE=PASS`
- `STAGING_STATUS=RLS_READY_PREVIEW_PROTECTED`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

Command:

```bash
npm run rls:smoke
```

Result:

```text
EXPRESSJOBS_RLS_STAGING_PASS
```

Pending Supabase item:

`SEARCH_PATH_FIX=BLOCKED_NOT_APPLIED`

The prepared migration remains pending because no safe Supabase write/apply capability is currently available in Codex:

```sql
alter function public.ej_is_admin() set search_path = public;
alter function public.ej_is_job_participant(uuid) set search_path = public;
```

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
