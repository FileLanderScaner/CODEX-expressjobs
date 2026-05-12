# ExpressJobs Supabase Schema

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Migration: `supabase/migrations/202605120001_expressjobs_mvp_schema.sql`

## Tables

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

## Job Statuses

- `draft`
- `open`
- `applied`
- `accepted`
- `in_progress`
- `completed`
- `cancelled`
- `disputed`

## Notes

The first migration uses `public.ej_*` prefixed tables for compatibility with Supabase Data API defaults while keeping ExpressJobs isolated from AhorroYA.

## MVP Implementation Status

The schema is designed but not applied to production. It must first be applied to a non-production Supabase project and validated with client, worker, and admin users.

## Data Separation

ExpressJobs must not reuse AhorroYA tables, storage, data, migrations, or credentials. If a dedicated `expressjobs` schema is not used, the `ej_*` prefix is mandatory.
