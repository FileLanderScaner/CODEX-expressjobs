# Cycle ExpressJobs 064 RLS Hardening and GitHub Actions Enablement

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_RLS_HARDENING_AND_GITHUB_ACTIONS_ENABLEMENT`

## Git State

- Branch: `codex/expressjobs-autonomous-bootstrap`
- Working tree at start: clean
- Expected commits present:
  - `920acc0` `Clarify ExpressJobs preview pipeline activation`
  - `80ac562` `Add ExpressJobs GitHub preview pipeline`

## RLS Migration Review

Migration reviewed:

`supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`

`MIGRATION_STATIC_SAFETY_REVIEW=PASS`

Confirmed:

- No `DROP TABLE`
- No `TRUNCATE`
- No `disable row level security`
- No `using (true)`
- No `with check (true)`
- No mass destructive `DELETE`
- Revokes broad `UPDATE` on `public.ej_profiles` from `anon` and `authenticated`
- Grants `authenticated` updates only on `full_name`, `phone`, `city`, and `updated_at`
- Replaces `profiles_update_own` with a safe own-row update policy
- Adds `ej_prevent_profile_role_self_update()` trigger to block authenticated role changes

## Supabase Apply Status

`SUPABASE_WRITE_CAPABILITY=BLOCKED`

`RLS_HARDENING_APPLY=BLOCKED_EXTERNAL_CREDENTIALS`

The migration was not applied. Reasons:

- `SUPABASE_ACCESS_TOKEN` is absent in the Codex process.
- Direct Postgres write URL env vars are absent.
- `npx supabase projects list` failed with access token missing.

No Supabase production action was attempted.

## Safe Manual Apply Instructions

Use exactly one secure staging-only path. Do not paste secrets into GitHub, chat, or committed files.

### Supabase Dashboard SQL Editor

1. Open Supabase Dashboard.
2. Select staging project `gnsfyvsodslnehszanra`.
3. Open SQL Editor.
4. Paste only the contents of `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`.
5. Run once.
6. Save sanitized evidence: timestamp, project ref, and success/failure only.
7. Return to Codex and run the post-apply checks.

### Supabase CLI Local Session

1. Generate or use a local Supabase access token securely.
2. Set it only in the local shell session as `SUPABASE_ACCESS_TOKEN`.
3. Do not print it.
4. Confirm the target project is `gnsfyvsodslnehszanra`.
5. Apply only `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`.
6. Run `npm run staging:check`, `npm run test:rls:static`, and `npm run rls:smoke`.

## GitHub Actions Enablement

`GITHUB_PIPELINE=BLOCKED`

`DEFAULT_BRANCH_WORKFLOW=BLOCKED_PRODUCTION_AUTODEPLOY_RISK`

Findings:

- Default branch is `main`.
- Branch protection API returned `Branch not protected`.
- PR #5 targets `main`, is currently `CONFLICTING`, and has Vercel/production gate failures.
- Vercel project is linked locally, but Vercel MCP access returned `403 Forbidden`.
- Vercel Git integration is active on PR #5, so default branch changes may trigger Vercel automation.

No merge, cherry-pick to `main`, `vercel --prod`, `vercel promote`, or Production env mutation was performed.

## GitHub Actions Secrets

`GITHUB_ACTIONS_SECRETS=NONE_VISIBLE_FROM_GH_SECRET_LIST`

`gh secret list` and the Actions secrets API returned zero visible repo secrets.

Required secrets still blocked:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `EXPRESSJOBS_STAGING_CLIENT_EMAIL`
- `EXPRESSJOBS_STAGING_CLIENT_PASSWORD`
- `EXPRESSJOBS_STAGING_WORKER_EMAIL`
- `EXPRESSJOBS_STAGING_WORKER_PASSWORD`
- `EXPRESSJOBS_STAGING_ADMIN_EMAIL`
- `EXPRESSJOBS_STAGING_ADMIN_PASSWORD`

Optional:

- `SUPABASE_SERVICE_ROLE_KEY`

## Checks

| Check | Result |
| --- | --- |
| `git branch --show-current` | `PASS` |
| `git status --short` | `PASS_CLEAN_AT_START` |
| migration forbidden-pattern scan | `PASS` |
| `npx supabase --version` | `PASS_2.98.2` |
| `npx supabase projects list` | `BLOCKED_SUPABASE_ACCESS_TOKEN_MISSING` |
| `gh secret list` | `ZERO_VISIBLE_SECRETS` |
| Vercel project inspection via MCP | `BLOCKED_403_FORBIDDEN` |
| default branch protection check | `UNPROTECTED` |
| PR #5 status check | `CONFLICTING_WITH_FAILURES` |
| `npm run secret:scan` | `PASS` |
| `npm run staging:check` | `PASS` |
| `npm run test:rls:static` | `PASS` |
| `npm run lint` | `PASS` |
| `npm run typecheck` | `PASS` |
| `npm run test` | `PASS` |
| `npm run build` | `PASS` |
| `npm run production:check` | `PASS_SAFE_NO_GO` |
| `npm run guard:no-production-deploy` | `PASS` |
| `git diff --check` | `PASS` |
| `npm run rls:smoke` | `NOT_RUN_APPLY_BLOCKED` |

## Current Results

- `RLS_ROLE_ESCALATION_RISK=BLOCKED_UNTIL_MIGRATION_APPLIED`
- `RLS_SMOKE=BLOCKED`
- `GITHUB_PIPELINE=BLOCKED`
- `DEFAULT_BRANCH_WORKFLOW=BLOCKED_PRODUCTION_AUTODEPLOY_RISK`
- `VERCEL_PREVIEW=BLOCKED_GITHUB_ACTIONS_VERCEL_SECRETS_MISSING`
- `SUPABASE_STAGING=BLOCKED_SUPABASE_WRITE_CAPABILITY`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_SUPABASE_RLS_HARDENING_APPLY_GATE_RETRY_WITH_AUTH` en `C:\CODEX-expressjobs-repo`. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`. No usar `vercel --prod`, no usar `vercel promote`, no modificar Vercel Production env vars, no tocar Supabase production, no activar PayPal live, no activar pagos reales, no activar AI agents y no imprimir secretos. Primero confirmar que existe una capacidad segura de escritura contra Supabase staging `gnsfyvsodslnehszanra` sin mostrar valores. Aplicar solo `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`. Luego ejecutar `npm run secret:scan`, `npm run staging:check`, `npm run test:rls:static`, `npm run rls:smoke`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run production:check`, `npm run guard:no-production-deploy` y `git diff --check`. Si `RLS_SMOKE=PASS`, preparar una habilitacion segura del workflow en default branch sin merge automatico y sin Production deploy; si Vercel auto-deploy a main sigue activo o no verificable, mantener `DEFAULT_BRANCH_WORKFLOW_ENABLEMENT=BLOCKED_PRODUCTION_AUTODEPLOY_RISK`.
