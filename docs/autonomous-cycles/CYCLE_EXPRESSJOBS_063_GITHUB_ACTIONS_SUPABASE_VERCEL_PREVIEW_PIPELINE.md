# Cycle ExpressJobs 063 GitHub Actions Supabase Vercel Preview Pipeline

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_GITHUB_ACTIONS_SUPABASE_VERCEL_PREVIEW_PIPELINE`

## Objective

Prepare a safe GitHub Actions pipeline that can manually run repo checks, Supabase staging validation, RLS smoke, Vercel Preview deploy, and an automatic status summary without touching production.

## Implemented

- `.github/workflows/expressjobs-preview-pipeline.yml`
- `scripts/assert-no-production-deploy.mjs`
- `scripts/smoke-preview.mjs`
- `scripts/github-actions-status-summary.mjs`
- `docs/github-actions/EXPRESSJOBS_GITHUB_TO_SUPABASE_VERCEL_PIPELINE.md`
- `docs/github-actions/EXPRESSJOBS_PREVIEW_PIPELINE_STATUS.json`
- `docs/github-actions/EXPRESSJOBS_PREVIEW_PIPELINE_LAST_STATUS.md`

## Autoevaluation

- MVP progress: improved release operations by enabling a manual GitHub Actions path for Preview/Staging validation.
- Technical risk: reduced by codifying checks and blocking production deploy commands before Vercel Preview deploy.
- Security: maintained; no production deploy, no secret printing, no remote migrations, no PayPal live, and no AI agents.
- Checks: local required checks passed.
- Blocked: live GitHub execution is not verified from Codex because the new workflow is not on the default branch and GitHub Actions secrets cannot be inspected locally.
- Highest-impact next step: configure required GitHub Actions secrets, apply RLS hardening safely to staging, then run `full_preview`.

## Checks

| Check | Result |
| --- | --- |
| JSON parse | `PASS` |
| `npm run secret:scan` | `PASS` |
| `npm run lint` | `PASS` |
| `npm run typecheck` | `PASS` |
| `npm run test` | `PASS` |
| `npm run test:rls:static` | `PASS` |
| `npm run build` | `PASS` |
| `npm run production:check` | `PASS_SAFE_NO_GO` |
| `npm run guard:no-production-deploy` | `PASS` |
| `npm run staging:check` | `PASS` |
| `git diff --check` | `PASS` |
| guard negative test `--prod` | `PASS_BLOCKED` |
| guard negative test `vercel promote` | `PASS_BLOCKED` |

## Staging Status

`SUPABASE_STAGING=READY_WORKFLOW_BLOCKED_UNTIL_SUPABASE_SECRETS_EXIST`

The workflow creates temporary `.env.local` and `.env.rls` files inside GitHub Actions only. It does not print secret values.

## RLS Status

`RLS_SMOKE=READY_WORKFLOW_BLOCKED_BY_RLS_ROLE_ESCALATION_UNTIL_HARDENING_APPLIED`

The current known blocker remains `RLS_ROLE_ESCALATION_RISK` until the prepared hardening migration is applied to staging and `npm run rls:smoke` passes.

## Vercel Preview Status

`VERCEL_PREVIEW=READY_WORKFLOW_BLOCKED_UNTIL_VERCEL_SECRETS_EXIST`

The workflow uses Vercel CLI for Preview only. It does not use `--prod` or `vercel promote`.

## GitHub Actions Activation Status

`GITHUB_PIPELINE=READY_ON_BRANCH_BLOCKED_UNTIL_WORKFLOW_EXISTS_ON_DEFAULT_BRANCH`

The workflow file is committed on `codex/expressjobs-autonomous-bootstrap`. GitHub does not expose the new manual workflow in the Actions UI until the workflow exists on the default branch. Main/default branch was not touched.

## Production Status

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

No production deploy, promotion, Production env mutation, live payments, or AI agent activation was performed.

## Required GitHub Secrets

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

## Next Mode

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS` en `C:\CODEX-expressjobs-repo` despues de configurar los GitHub Actions secrets requeridos y restaurar capacidad segura de escritura Supabase staging. No imprimir secretos. No usar `vercel --prod`, no usar `vercel promote`, no modificar Vercel Production, no tocar Supabase production, no activar pagos live y mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`. Aplicar solo `supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql` contra staging `gnsfyvsodslnehszanra`, ejecutar `npm run rls:smoke` hasta PASS, y luego disparar manualmente GitHub Actions -> `ExpressJobs Preview Pipeline` -> `full_preview` con `allow_supabase_write=false` salvo que exista una operacion de escritura staging revisada. Registrar evidencia redacted y mantener First 10 en NO-GO hasta que RLS pase.
