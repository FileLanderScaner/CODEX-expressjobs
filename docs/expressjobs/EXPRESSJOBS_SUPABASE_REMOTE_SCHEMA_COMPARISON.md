# ExpressJobs Supabase Remote Schema Comparison

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`SUPABASE_REMOTE_SCHEMA_STATUS=SUPABASE_REMOTE_CANNOT_VERIFY_READ_ONLY`

## Comparison Method

Local source of truth:

`supabase/migrations/202605120001_expressjobs_mvp_schema.sql`

Remote source:

Supabase MCP read-only server for project `gnsfyvsodslnehszanra`.

Result:

Remote source could not be queried from this active Codex agent process because Supabase MCP tools were not exposed in the current tool registry.

## Required Tables

| Object | Local Expected | Remote Status | Classification |
| --- | --- | --- | --- |
| `ej_profiles` | Present | Not verified | `CANNOT_VERIFY_READ_ONLY` |
| `ej_worker_profiles` | Present | Not verified | `CANNOT_VERIFY_READ_ONLY` |
| `ej_jobs` | Present | Not verified | `CANNOT_VERIFY_READ_ONLY` |
| `ej_job_applications` | Present | Not verified | `CANNOT_VERIFY_READ_ONLY` |
| `ej_job_messages` | Present | Not verified | `CANNOT_VERIFY_READ_ONLY` |
| `ej_job_reviews` | Present | Not verified | `CANNOT_VERIFY_READ_ONLY` |
| `ej_job_events` | Present | Not verified | `CANNOT_VERIFY_READ_ONLY` |
| `ej_categories` | Present | Not verified | `CANNOT_VERIFY_READ_ONLY` |
| `ej_payment_records` | Present | Not verified | `CANNOT_VERIFY_READ_ONLY` |
| `ej_admin_audit_logs` | Present | Not verified | `CANNOT_VERIFY_READ_ONLY` |

## RLS

| Object | Local Expected | Remote Status | Classification |
| --- | --- | --- | --- |
| All `ej_*` tables | RLS enabled | Not verified | `CANNOT_VERIFY_READ_ONLY` |
| `ej_*` policies | Present in migration | Not verified | `CANNOT_VERIFY_READ_ONLY` |

## Extra Remote Objects

Remote `tr_*`, AhorroYA, and unrelated tables could not be inspected.

Classification:

`CANNOT_VERIFY_READ_ONLY`

## Decision

Do not apply migrations, do not run write smoke tests, and do not authorize testers until remote schema can be inspected.
