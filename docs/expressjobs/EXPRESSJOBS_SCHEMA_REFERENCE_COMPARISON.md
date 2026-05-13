# ExpressJobs Schema Reference Comparison

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Decision

Keep `ej_*` as the official schema/table prefix.

## AI Studio `tr_*`

The prototype included:

- `tr_profiles`
- `tr_worker_profiles`
- `tr_jobs`
- `tr_job_applications`

Useful concepts:

- `onboarding_completed` profile flag.
- Worker profile extension.
- Application offer/message fields.

Rejected as replacement:

- Simpler job statuses miss ExpressJobs lifecycle states.
- RLS is less strict than current `ej_*` model.
- No messages, reviews, events, payment records, or admin audit logs.
- Public "jobs viewable by everyone" policy is too broad for later private states.

## Current `ej_*`

The current schema keeps:

- Required ExpressJobs MVP tables.
- Full job lifecycle.
- Participant-only message policy.
- Admin audit table.
- Payment records disabled/simulated.
- Static RLS smoke tests.

## Future Optional Adaptation

Add `onboarding_completed` to `ej_profiles` in a future migration if Supabase staging validation confirms it is useful.
