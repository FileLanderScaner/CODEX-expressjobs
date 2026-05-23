# Cycle ExpressJobs 011 Supabase Migration History Alignment

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_SUPABASE_MIGRATION_HISTORY_ALIGNMENT`

## Scope

Align the local Supabase migration files in `main` with the migration versions already applied in the connected Supabase staging project.

## Supabase Project

- Project: `supabase-expressjobs`
- Project ref: `gnsfyvsodslnehszanra`
- Environment: staging / non-production

## Problem

Supabase CLI reported a migration history drift condition:

`remote migration versions not found in local migrations directory`

Remote migration history contained these applied versions:

- `20260523030408_fix_ej_is_admin_rls_recursion`
- `20260523030830_add_admin_select_policy_for_job_messages`

The local repo had recorded both changes as a single grouped migration:

- `20260523031500_fix_chat_admin_rls_smoke.sql`

That grouped timestamp did not exist in the remote migration history and could appear as a duplicate pending migration locally.

## Action Taken

Created local migration file matching remote version `20260523030408`:

- `supabase/migrations/20260523030408_fix_ej_is_admin_rls_recursion.sql`

Created local migration file matching remote version `20260523030830`:

- `supabase/migrations/20260523030830_add_admin_select_policy_for_job_messages.sql`

Removed grouped local migration:

- `supabase/migrations/20260523031500_fix_chat_admin_rls_smoke.sql`

## Behavior Change

No runtime behavior change was intended. This cycle only aligns migration history.

The SQL content preserves the already-applied chat/admin RLS fixes:

1. `public.ej_is_admin()` remains a `SECURITY DEFINER` helper with `search_path = public` to avoid recursive RLS evaluation through `ej_profiles`.
2. `job_messages_select_admin_only` remains available so authenticated admins can select job messages and verify admin UPDATE/DELETE via Supabase/PostgREST returning rows.

## Validation Context

Before this alignment, `main` had already passed:

- `npm run lint`: PASS / 0 warnings
- `npm run typecheck`: PASS
- `npm run secret:scan`: PASS
- `npm run guard:no-production-deploy`: PASS
- `npm run rls:smoke:messages`: PASS
- `npm run test`: PASS, 53/53
- `npm run build`: PASS, `BUILD_EXIT_CODE=0`
- `git status --short`: clean

## Production Safety

- `vercel --prod`: NOT RUN
- `vercel promote`: NOT RUN
- Vercel Production env mutation: NO
- Supabase production mutation: NO
- PayPal live: OFF
- Real payments: OFF

## Decision

`SUPABASE_MIGRATION_HISTORY_ALIGNMENT=PASS`

The local migration directory now matches the two remote migration versions that were applied separately through Supabase MCP.

## Next Mode

`EXPRESSJOBS_SUPABASE_MIGRATION_LIST_RECHECK`

Recommended local command:

```powershell
supabase migration list
```

Expected result: no error about remote migration versions missing from the local migrations directory.
