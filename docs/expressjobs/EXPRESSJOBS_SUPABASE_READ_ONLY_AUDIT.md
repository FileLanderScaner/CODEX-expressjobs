# ExpressJobs Supabase Read-Only Audit

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_SUPABASE_READ_ONLY_AUDIT`

## MCP Status

`SUPABASE_MCP_STATUS=CONNECTED_READ_ONLY`

Configured MCP:

- Server name: `supabase`
- Project ref: `gnsfyvsodslnehszanra`
- Mode: `read_only=true`
- Auth: OAuth enabled

Operational limitation in this Codex run:

- `codex mcp list` confirms the server is enabled.
- Tool discovery did not expose callable Supabase MCP tools to this running agent process.
- Supabase CLI remote commands also remain blocked because `SUPABASE_ACCESS_TOKEN` is not available in the Codex process.

## Project

Known from prior local metadata/user CLI output:

- Project ref: `gnsfyvsodslnehszanra`
- Project name: `supabase-expressjobs`
- Region: East US (North Virginia)

Staging/non-production cannot be independently verified from this running agent because the read-only MCP tools were not exposed.

## Remote Audit Decision

`SUPABASE_REMOTE_CANNOT_VERIFY_READ_ONLY`

Reason:

- MCP is configured but not callable from this active agent tool registry.
- CLI lacks a token in this process.
- No remote SQL, schema, Auth, or Storage inspection was possible.

## What Was Not Done

- No Supabase writes.
- No migrations applied.
- No users created.
- No policies modified.
- No RLS disabled.
- No data read from user tables.
- No secrets printed.

## Local Expected Schema

Expected migration:

`supabase/migrations/202605120001_expressjobs_mvp_schema.sql`

Expected tables:

- `ej_profiles`
- `ej_worker_profiles`
- `ej_categories`
- `ej_jobs`
- `ej_job_applications`
- `ej_job_messages`
- `ej_job_reviews`
- `ej_job_events`
- `ej_payment_records`
- `ej_admin_audit_logs`

Expected helper functions:

- `ej_is_admin`
- `ej_is_job_participant`

Expected policies:

- `profiles_select_own_or_admin`
- `profiles_insert_own`
- `profiles_update_own`
- `worker_profiles_select_available`
- `worker_profiles_manage_own`
- `categories_read_active`
- `jobs_select_visible`
- `jobs_client_insert`
- `jobs_client_update`
- `applications_worker_insert`
- `applications_select_parties`
- `applications_update_client_only`
- `messages_select_participants`
- `messages_insert_participants`
- `reviews_select_participants`
- `reviews_insert_completed_participants`
- `events_insert_authenticated`
- `events_select_participants`
- `payment_records_select_own_or_admin`
- `admin_audit_admin_only`

## Next Required Action

Restart or refresh Codex so the newly added Supabase MCP server exposes callable tools in the agent tool registry, then rerun a read-only audit before any migration attempt.
