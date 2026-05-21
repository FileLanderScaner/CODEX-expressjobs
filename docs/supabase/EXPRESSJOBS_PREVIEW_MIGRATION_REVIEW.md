# ExpressJobs Preview Migration Review

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

Reviewed local migrations only. No remote migration was applied in this cycle.

## Migrations Detected

- `202605120001_expressjobs_mvp_schema.sql` - initial `ej_*` schema, RLS and policies.
- `20260513081258_fix_expressjobs_function_search_path.sql` - helper function search path.
- `20260515132404_harden_expressjobs_profile_role_updates.sql` - prevents user self-promotion.
- `20260516210500_add_safe_profile_role_selection.sql` - safe client/worker role selection.
- `20260516223000_harden_real_marketplace_flow.sql` - application/client-worker flow hardening.
- `202605210001_complete_marketplace_connections.sql` - local non-destructive completion migration for application transitions and message insert policy.

## Safety Review

- Destructive patterns scan: PASS.
- No `drop table`, `drop schema`, `truncate`, `delete from`, `disable row level security`, `using (true)`, or `with check (true)` detected.
- New migration affects functions and policies only; it does not delete data.

## Apply Decision

`SUPABASE_MIGRATION_APPLY=BLOCKED_EXTERNAL_CREDENTIALS`

Reason:

- `SUPABASE_ACCESS_TOKEN` is not present in the active process or local env file presence audit.
- `SUPABASE_SERVICE_ROLE_KEY` is not present for server-side/admin smoke setup.
- Remote target verification for migration apply was not performed.

No migration was applied remotely.
