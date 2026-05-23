# Cycle ExpressJobs 007 PR42 Human Review Supabase Apply Security Lints

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_PR42_HUMAN_REVIEW_SUPABASE_APPLY_AND_SECURITY_LINTS_CLOSEOUT`

## Repo / PR

- Repo: `C:\CODEX-expressjobs-repo`
- Branch: `codex/expressjobs-marketplace-core-workflows`
- PR: `https://github.com/FileLanderScaner/CODEX-expressjobs/pull/42`
- Starting commit: `64bae34`

## PR #42

- Remote checks at start: PASS for docs, pr, security, production guard, Supabase Preview, Vercel.
- Review decision: `REVIEW_REQUIRED`.
- Merge action: NOT RUN.
- Admin override: NOT USED.
- After commit `7466f52`, GitHub Actions and Supabase Preview passed, but Vercel Git integration failed with `status Error`.
- `vercel inspect dpl_AB6JJDad5WnuV9oo8HnQo2e3ywZX --logs` did not return actionable logs beyond `status Error`.

## Supabase Marketplace Migration

Migration audited:

- `supabase/migrations/20260523093000_marketplace_core_profiles_reports.sql`

Result:

- Non-destructive local migration.
- Adds `ej_company_profiles`, `ej_job_reports`, indexes, and application review states.
- Enables RLS on new tables.
- Does not disable RLS.
- Does not add `using (true)` or `with check (true)`.

Remote apply:

- `BLOCKED_SUPABASE_ACCESS`
- `SUPABASE_ACCESS_TOKEN`, direct DB URL, and writable MCP path were not available in the Codex process.
- No remote write was attempted.

## Supabase Security Lints

Migration created:

- `supabase/migrations/20260523110500_harden_security_definer_rpc_exposure.sql`

Lint status:

- `anon_security_definer_function_executable`: local fix ready, remote apply blocked.
- `authenticated_security_definer_function_executable`: partially accepted temporarily for `ej_set_profile_role`, with hardening and documented replacement path.
- `auth_leaked_password_protection`: `BLOCKED_DASHBOARD_ACTION_REQUIRED`.

## Functions Audited

### `public.ej_prevent_profile_role_self_update()`

- Trigger/internal function: YES.
- App direct usage: NO.
- Remote RPC public callable status: not verified in this cycle.
- Local mitigation: revoke execute from `PUBLIC`, `anon`, and `authenticated`.

### `public.ej_set_profile_role(text, text)`

- Used by app: YES, through `src/lib/marketplace.ts`.
- Used from register/role flow: YES.
- Allows admin: NO.
- Operates on `auth.uid()`: YES.
- Fixed `search_path`: YES.
- Replacement path: server action or server route with same client/worker-only semantics, then revoke authenticated execution.
- Local mitigation: `PUBLIC` and `anon` revoked; `authenticated` kept temporarily; role change locked after marketplace activity.

## RLS / Staging

- `npm run test:rls:static`: PASS after hardening migration, 11 tests.
- `npm run staging:check`: PASS.
- `npm run rls:smoke`: PASS, `EXPRESSJOBS_RLS_STAGING_PASS`.

## Vercel Preview

Known Preview:

- `https://codex-expressjobs-git-codex-expressjob-e5dea8-akuma424-projects.vercel.app`

Manual Preview after security-lint commit:

- `https://codex-expressjobs-6q0aiyzom-akuma424-projects.vercel.app`

Expected smoke routes:

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

Smoke result:

- All listed routes returned HTTP 200 with the safe Preview bypass header on manual Preview.
- Secret-like markers in rendered HTML: NOT FOUND.
- `/pricing` contains 8 pilot offer names.
- PayPal live / real checkout markers: NOT FOUND.

## Local Checks

- `npm run secret:scan`: PASS
- `npm run production:check`: PASS
- `npm run guard:no-production-deploy`: PASS
- `npm run test:rls:static`: PASS
- `npm run lint`: PASS with preexisting warnings in untracked `android/app/build/.../native-bridge.js`
- `npm run typecheck`: PASS
- `npm run test`: PASS, 53 tests
- `npm run build`: PASS
- `git diff --check`: PASS

## Production

- `vercel --prod`: NOT RUN
- `vercel promote`: NOT RUN
- Vercel Production env mutation: NO
- Supabase Production mutation: NO
- PayPal live: OFF
- Real payments: OFF

## Decision

`PARTIAL_SECURITY_LINTS_LOCAL_FIX_READY_REMOTE_APPLY_BLOCKED_VERCEL_GIT_FAIL`

PR #42 is not merged because `reviewDecision=REVIEW_REQUIRED`.

## NEXT_CODEX_PROMPT

Run `EXPRESSJOBS_PR42_SECURITY_LINTS_REMOTE_APPLY_AND_RECHECK` in `C:\CODEX-expressjobs-repo`. Keep `PRODUCTION_STATUS=NO-GO_PRODUCTION`. Do not use `vercel --prod`; do not use `vercel promote`; do not mutate Vercel Production env vars; do not touch Supabase production; do not enable PayPal live or real payments; do not print secrets. If a safe staging write path is available, apply only `20260523093000_marketplace_core_profiles_reports.sql` and `20260523110500_harden_security_definer_rpc_exposure.sql` to staging or the approved Supabase Preview branch, then rerun security advisors, `staging:check`, `rls:smoke`, local checks, and Preview smoke. If no write path is available, keep `BLOCKED_SUPABASE_ACCESS`, keep `auth_leaked_password_protection=BLOCKED_DASHBOARD_ACTION_REQUIRED`, and do not claim GO.
