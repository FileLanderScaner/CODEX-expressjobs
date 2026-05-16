# ExpressJobs RLS Policy Matrix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Matrix

| Table | RLS | Policies | Status |
| --- | --- | --- | --- |
| `ej_profiles` | enabled | select own/admin, insert own, update own | `BLOCKED_ROLE_ESCALATION_RISK` |
| `ej_worker_profiles` | enabled | select available/own/admin, manage own | `PASS_WITH_ROLE_BOUNDARY_NOTE` |
| `ej_jobs` | enabled | select visible, client insert, client/admin update | `PASS_WITH_ROLE_BOUNDARY_NOTE` |
| `ej_job_applications` | enabled | worker insert, parties select, client/admin update | `PASS` |
| `ej_job_messages` | enabled | participants select/insert | `PASS` |
| `ej_job_reviews` | enabled | participants select, completed participants insert | `PASS` |
| `ej_job_events` | enabled | authenticated insert, participants/admin select | `PASS` |
| `ej_payment_records` | enabled | own/admin select | `PASS_READ_ONLY_PAYMENT_STATE` |
| `ej_admin_audit_logs` | enabled | admin only | `BLOCKED_BY_PROFILE_ROLE_ESCALATION_RISK` |
| `ej_categories` | enabled | active/admin select | `PUBLIC_READ_ACCEPTED` |

## Dangerous Policy Search

- `using (true)`: `NOT_FOUND`
- `with check (true)`: `NOT_FOUND`
- `disable row level security`: `NOT_FOUND`
- Unjustified anonymous writes: `NOT_FOUND_IN_SMOKE`

## Blocking Policy

`profiles_update_own` is too broad because it allows role mutation.

Required replacement pattern:

- Separate role from user-editable profile fields, or
- Use a trigger/RLS policy that prevents non-admin updates to `role`, or
- Move admin authorization source to protected `app_metadata`/controlled admin table not writable by users.

## Smoke Coverage

Current real smoke covers the main user workflows but does not yet cover:

- Client self-update to `admin` must be blocked.
- Worker self-update to `admin` must be blocked.
- Normal user cannot access audit logs after attempted self-promotion.
- Worker cannot create client job if strict role separation is required.
- Client cannot create worker profile/application if strict role separation is required.
