# ExpressJobs Function Search Path Fix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Advisory

Supabase Security Advisor reports:

- `function_search_path_mutable` for `public.ej_is_admin`
- `function_search_path_mutable` for `public.ej_is_job_participant`

## Remote Signatures Verified Read-Only

Read-only catalog inspection confirmed:

- `public.ej_is_admin()`
- `public.ej_is_job_participant(job uuid)`

## Prepared Migration

Local migration:

`supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`

SQL:

```sql
alter function public.ej_is_admin() set search_path = public;

alter function public.ej_is_job_participant(uuid) set search_path = public;
```

## Safety Review

The migration is non-destructive:

- Does not touch tables.
- Does not touch AhorroYA objects.
- Does not disable RLS.
- Does not loosen policies.
- Does not create users or data.
- Only pins function `search_path` for existing helper functions.

## Apply Status

`FUNCTION_SEARCH_PATH_FIX_PREPARED_NOT_APPLIED`

Reason:

`SUPABASE_ACCESS_TOKEN` is missing from the Codex process. Remote write capability is not available in this cycle.

## Verification After Future Apply

After applying in staging, run Supabase Security Advisor again and confirm the two `function_search_path_mutable` warnings are gone. If they remain, inspect function definitions and `pg_proc.proconfig` before making any further change.
