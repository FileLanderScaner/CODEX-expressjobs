# ExpressJobs Supabase Write Access Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

This runbook documents the safe path from read-only Supabase inspection to controlled write access for ExpressJobs / Trabajos Rapidos.

Project:

- Supabase project ref: `gnsfyvsodslnehszanra`
- Supabase project name: `supabase-expressjobs`
- Region: East US / North Virginia
- Current MCP status: `CONNECTED_READ_ONLY`
- Current write status: `BLOCKED_UNTIL_TOKEN_OR_WRITE_TOOL`

No step in this runbook authorizes production changes, live payments, AI agents, disabling RLS, or committing local secrets.

## Current Read-Only Finding

In the Codex session for cycle 019, Supabase MCP tools were exposed and callable after tool discovery.

Read-only inspection found the expected `public.ej_*` MVP schema already present remotely:

- `ej_profiles`
- `ej_worker_profiles`
- `ej_jobs`
- `ej_job_applications`
- `ej_job_messages`
- `ej_job_reviews`
- `ej_job_events`
- `ej_categories`
- `ej_payment_records`
- `ej_admin_audit_logs`

All ten tables have RLS enabled. The expected helper functions are present:

- `public.ej_is_admin()`
- `public.ej_is_job_participant(job uuid)`

The minimum expected policies are present. Supabase Security Advisor reported `function_search_path_mutable` warnings for both helper functions. This is not a blocker for read-only verification, but it should be fixed in the next safe schema migration by setting an explicit `search_path`.

Remote schema classification:

`SUPABASE_REMOTE_SCHEMA_MATCHES_EXPECTED`

## Camino A - MCP Expuesto Read-Only

Use this path when Codex exposes Supabase MCP tools but the project is configured read-only.

1. Confirm the target project ref is `gnsfyvsodslnehszanra`.
2. List `public` tables and verify all expected `ej_*` tables exist.
3. Verify RLS is enabled on each `ej_*` table.
4. Query `pg_policies` for `public.ej_*` policies.
5. Query `pg_proc` for `public.ej_is_admin` and `public.ej_is_job_participant`.
6. Compare the remote result against `supabase/migrations/202605120001_expressjobs_mvp_schema.sql`.
7. If schema is missing or partial, do not write through read-only MCP. Move to Camino B or enable a deliberately write-capable tool in a controlled session.
8. If schema matches, move to real RLS smoke testing only after safe write/auth capability is available.

Allowed MCP operations in this path:

- `list_tables`
- read-only `execute_sql` catalog queries
- `get_advisors`

Forbidden MCP operations in this path:

- `apply_migration`
- schema-changing SQL through `execute_sql`
- user/data creation
- RLS policy modification
- disabling RLS

## Camino B - CLI With Local Token

Use this path only when an operator can provide a local Supabase access token outside git.

1. Load the token only in the current PowerShell process:

   ```powershell
   $env:SUPABASE_ACCESS_TOKEN="TOKEN_LOCAL_NO_GIT"
   ```

2. Confirm the token is not written to `.env`, docs, logs, shell scripts, or git-tracked files.
3. Link the project:

   ```powershell
   npx supabase link --project-ref gnsfyvsodslnehszanra
   ```

4. Confirm link status without printing secrets:

   ```powershell
   npx supabase projects list
   npx supabase migration list
   ```

5. Inspect remote status before any apply:

   ```powershell
   npx supabase db diff --linked
   ```

6. Apply migrations only if all of these are true:

   - The linked project is confirmed as staging for `supabase-expressjobs`.
   - `PRODUCTION_STATUS=NO-GO_PRODUCTION` remains unchanged.
   - The migration diff is reviewed.
   - No live payment or production variables are active.

7. If apply is needed, use the existing migration file only:

   ```powershell
   npx supabase db push
   ```

8. Run post-apply checks:

   ```powershell
   npm run staging:check
   npm run rls:smoke
   npm run secret:scan
   npm run production:check
   ```

9. Save redacted evidence only. Never include access tokens, JWTs, refresh tokens, service-role keys, `.env` files, or raw auth artifacts.

## Recommended Next Step

Because read-only MCP inspection shows the remote MVP schema matches the local migration, the next highest-impact mode is:

`EXPRESSJOBS_RLS_REAL_SMOKE_AFTER_WRITE_ACCESS`

This next step remains blocked until safe write/auth capability is available. It must not be executed from this read-only runbook cycle.
