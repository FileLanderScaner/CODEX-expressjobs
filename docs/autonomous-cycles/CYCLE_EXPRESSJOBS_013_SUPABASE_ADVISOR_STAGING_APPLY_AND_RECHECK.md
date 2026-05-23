# Cycle ExpressJobs 013 Supabase Advisor Staging Apply And Recheck

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_SUPABASE_ADVISOR_STAGING_APPLY_AND_RECHECK`

## Scope

Apply the Supabase Advisor closeout migration only to staging project `gnsfyvsodslnehszanra`, re-run realtime chat RLS smoke, and recheck Supabase Advisors.

## Supabase Branch Capacity

User-provided operating constraint: this Supabase setup allows `main` plus two simultaneous branches. Before deploy/Preview workflows, verify there is branch capacity.

Checked before apply:

- `main`: present
- non-main branch: `codex/expressjobs-supabase-security-advisor-closeout` / PR #44
- capacity status: PASS, only one non-main branch existed

## Remote Apply

Applied via Supabase MCP to staging:

- `20260523064307_advisor_security_performance_closeout`
- `20260523064405_fix_job_messages_admin_private_helper`
- `20260523065010_advisor_company_reports_policy_reapply`

Local migration filenames were aligned to those remote migration versions:

- `supabase/migrations/20260523064307_advisor_security_performance_closeout.sql`
- `supabase/migrations/20260523064405_fix_job_messages_admin_private_helper.sql`
- `supabase/migrations/20260523065010_advisor_company_reports_policy_reapply.sql`
- `supabase/migrations/20260523113000_advisor_security_performance_closeout.sql`
- `supabase/migrations/20260523120500_advisor_company_reports_policy_reapply.sql`

The `20260523065010` local file is guarded because that remote MCP version sorts before `20260523093000_marketplace_core_profiles_reports`, which creates `ej_company_profiles` and `ej_job_reports`. The later `20260523120500` file re-applies the same policies after those tables exist in fresh Preview branches. The `20260523113000` no-op compatibility file is retained because the existing PR #44 Supabase Preview branch had already recorded that version before staging migration history was aligned.

## RLS Smoke

First `npm run rls:smoke:messages` after the advisor migration failed at `admin_update_delete`:

`permission denied for function ej_is_admin`

Cause:

An existing job-message admin UPDATE/DELETE policy still used revoked `public.ej_is_admin()`.

Fix:

Applied `fix_job_messages_admin_private_helper`, replacing job-message admin UPDATE/DELETE policies with `private.ej_is_admin()`.

The branch-order compatibility migration was added after Supabase Preview reported `MIGRATIONS_FAILED` for PR #44 while branch capacity was still within limits.

Post-push recheck:

- `supabase/migrations/20260523113000_advisor_security_performance_closeout.sql` was restored as a no-op compatibility migration for the existing PR #44 Preview branch history.
- PR #44 branch remained within the Supabase branch limit: `main` plus one non-main branch.
- A safe Supabase Preview branch rebase returned success.
- Supabase Preview still reported `MIGRATIONS_FAILED` afterward.
- No branch reset or deletion was attempted because those actions can discard branch state and require explicit authorization.
- Vercel Preview deployment `dpl_8TPK9CMp3DaGNjweCZUn4VXBEXrQ` initially failed before app build with: `We were unable to fetch required git information required to complete the deployment.`
- After the docs/status push, GitHub reported Vercel PASS on deployment `AeHDyTmYsJkjtSuvJofaqgY5oDeU`.

Final result:

`npm run rls:smoke:messages`: PASS

## Advisor Recheck

Security advisors now remain only for:

- `public.ej_set_profile_role(requested_role text, requested_full_name text)` authenticated SECURITY DEFINER RPC. This is a current app dependency and requires redesign or accepted exception.
- `auth_leaked_password_protection`, Dashboard action required.

Performance advisors improved:

- Missing FK index warnings are closed.
- Remaining warnings: Realtime `messages` policy initplan, unused-index notices, and multiple permissive policies on `ej_categories` and `ej_worker_profiles`.

## Production Safety

- `vercel --prod`: NOT RUN
- `vercel promote`: NOT RUN
- Vercel Production env mutation: NO
- Supabase production mutation: NO
- PayPal live: OFF
- Real payments: OFF
- Secrets printed: NO

## Decision

`SUPABASE_ADVISOR_STAGING_APPLY_AND_RECHECK=PASS_WITH_REMAINING_DOCUMENTED_EXCEPTIONS`

Remote PR #44 gates:

- Supabase Preview: `BLOCKED_SUPABASE_ACCESS`, existing branch remains `MIGRATIONS_FAILED` after safe rebase.
- Vercel Preview: PASS after follow-up push.

Next safe mode:

`EXPRESSJOBS_PR44_PROVIDER_ACCESS_CLOSEOUT_NO_PRODUCTION`
