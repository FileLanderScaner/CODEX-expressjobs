# Cycle ExpressJobs 010 Preview UI Smoke Closeout

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_POST_MERGE_PREVIEW_UI_SMOKE_AND_RELEASE_CLOSEOUT`

## Scope

Classify the current Vercel Git Preview access state and smoke the main user-facing routes when a safe local Deployment Protection bypass is available.

## Preview Target

`https://codex-expressjobs-git-codex-expressjob-e5dea8-akuma424-projects.vercel.app`

## Result Without Bypass

All checked routes returned `401`.

Decision:

`REMOTE_PREVIEW_UI_SMOKE_WITHOUT_BYPASS=BLOCKED_BY_DEPLOYMENT_PROTECTION`

This is a Vercel Deployment Protection access condition, not evidence of app route failure.

## Result With Safe Local Bypass Header

The local environment had a Vercel Deployment Protection bypass secret available. Codex used it only as an HTTP header and did not print the value.

All checked routes returned `200`:

- `/`
- `/jobs`
- `/jobs/not-real-smoke`
- `/pricing`
- `/auth`
- `/register`
- `/dashboard/worker`
- `/dashboard/worker/profile`
- `/dashboard/worker/applications`
- `/dashboard/client`
- `/dashboard/client/profile`
- `/dashboard/client/jobs`
- `/dashboard/client/jobs/new`
- `/admin`
- `/admin/jobs`
- `/admin/users`
- `/production-paused`

Decision:

`REMOTE_PREVIEW_UI_SMOKE_WITH_BYPASS=PASS`

## Supabase MCP Recheck

Supabase MCP migration list succeeded for project `gnsfyvsodslnehszanra` and confirmed applied migration history through:

- `20260523030408_fix_ej_is_admin_rls_recursion`
- `20260523030830_add_admin_select_policy_for_job_messages`
- `20260523031500_fix_chat_admin_rls_smoke`
- `20260523093000_marketplace_core_profiles_reports`
- `20260523110500_harden_security_definer_rpc_exposure`

Local repo migration history intentionally keeps separate local files for the two remote chat/admin fixes:

- `supabase/migrations/20260523030408_fix_ej_is_admin_rls_recursion.sql`
- `supabase/migrations/20260523030830_add_admin_select_policy_for_job_messages.sql`

## Advisor Findings

Security advisors still report WARN items:

- Public/signed-in roles can execute some `SECURITY DEFINER` functions.
- Leaked password protection is disabled.

Performance advisors still report INFO/WARN items:

- Unindexed foreign keys.
- RLS auth initplan warnings.
- Multiple permissive SELECT policies on some tables.
- Unused indexes.

No migration was applied in this cycle. These findings require a dedicated, reviewed follow-up.

## Production Safety

- `vercel --prod`: NOT RUN
- `vercel promote`: NOT RUN
- Vercel Production env mutation: NO
- Supabase production mutation: NO
- PayPal live: OFF
- Real payments: OFF
- Secrets printed: NO

## Decision

`REMOTE_PREVIEW_UI_SMOKE=PASS_WITH_SAFE_BYPASS_HEADER`

`REMOTE_PREVIEW_UI_SMOKE_WITHOUT_BYPASS=BLOCKED_BY_DEPLOYMENT_PROTECTION`

Next safe mode:

`EXPRESSJOBS_SUPABASE_SECURITY_ADVISOR_CLOSEOUT`
