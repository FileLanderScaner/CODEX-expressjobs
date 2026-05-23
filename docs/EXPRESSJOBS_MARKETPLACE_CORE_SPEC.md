# ExpressJobs Marketplace Core Spec

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

This cycle moves ExpressJobs from commercial/pricing readiness toward a usable marketplace flow:

- Public users can reach `/jobs`, `/jobs/[id]`, `/auth`, `/register`, `/pricing`, and the existing home.
- Workers can select role, complete a worker profile, browse jobs, apply, and view the expected applications area.
- Clients can select role, complete a company profile, publish jobs, list owned jobs, and manage applications.
- Admin routes remain read-only/minimal at `/admin`, `/admin/jobs`, and `/admin/users`.

## Data Model

Existing equivalents were preserved:

- `ej_profiles`: auth-linked profile and safe role source.
- `ej_worker_profiles`: worker details.
- `ej_jobs`: client-owned jobs; `open` maps to published.
- `ej_job_applications`: worker applications.
- `ej_admin_audit_logs`: internal audit surface.

New non-destructive migration prepared:

- `ej_company_profiles`: client/company profile details and verification status.
- `ej_job_reports`: basic moderation reports.
- `ej_job_applications.status`: extends review states with `viewed` and `shortlisted`.
- Indexes for job listing and application management.

## RLS

The migration keeps RLS enabled and avoids `using (true)`, `with check (true)`, and `disable row level security`.

Core boundaries:

- Company profiles are selectable/updatable only by the owning profile or admin.
- Company profile insert requires the authenticated user to own the profile and have `client` role.
- Job reports can be inserted by the reporter and read by reporter, owning client, or admin.
- Existing application hardening remains in force: workers cannot apply to their own job, and accept/reject uses invoker RPCs.

## Forms And Validation

Zod schemas were added in `src/lib/marketplace-schemas.ts` for:

- Worker profile.
- Company profile.
- Job publication.
- Job application.

## Current Decision

`MARKETPLACE_CORE_PARTIAL`: code, tests, build, staging check, and RLS smoke pass. Remote Supabase migration apply is blocked until a safe `SUPABASE_ACCESS_TOKEN` or approved staging write path is available in the execution environment.
