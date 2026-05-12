# ExpressJobs RLS Policies

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Policy Summary

- Users can select, insert, and update their own `ej_profiles` rows.
- Workers can manage their own `ej_worker_profiles`.
- Active categories are readable.
- Open jobs are readable by workers.
- Clients can create and manage their own jobs.
- Workers can create applications only for open jobs.
- Clients can view applications for their jobs.
- Workers can view their own applications.
- Messages are visible only to participants or admins.
- Reviews can be inserted only by participants of completed jobs.
- Admin audit logs are admin-only.

## Required Validation

Run the migration in a non-production Supabase project and test with separate client, worker, and admin accounts before any staging release sign-off.

## Smoke Test Matrix

| Area | Expected |
| --- | --- |
| Profiles | User reads/updates own profile; admin reads all. |
| Jobs | Authenticated users read open jobs; client manages own jobs; accepted worker reads assigned job. |
| Applications | Worker creates and reads own applications; client reads and updates applications on own jobs. |
| Messages | Only job participants read/send; admin can audit with valid role. |
| Reviews | Only participants of completed jobs create reviews. |
| Events | Authenticated users write safe events; admin reads all. |
