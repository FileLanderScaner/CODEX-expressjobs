# Cycle ExpressJobs 005 Marketplace Core Workflows

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_MARKETPLACE_CORE_WORKFLOWS`

## Repo

`C:\CODEX-expressjobs-repo`

Branch: `codex/expressjobs-marketplace-core-workflows`

Base: `codex/expressjobs-rls-smoke-staging` at `30b990f`

Commit: `2120811`

PR: `https://github.com/FileLanderScaner/CODEX-expressjobs/pull/42`

Manual Preview: `https://codex-expressjobs-2efi536fi-akuma424-projects.vercel.app` (`target=preview`)

## Changes

- Added marketplace Zod schemas.
- Added worker and company profile forms.
- Added public `/jobs`, `/jobs/[id]`, `/register`.
- Added dashboard routes for worker profile/applications and client profile/jobs/new/applications.
- Added admin route aliases `/admin/jobs` and `/admin/users`.
- Added non-destructive Supabase migration for `ej_company_profiles`, `ej_job_reports`, indexes, and expanded application review statuses.
- Updated static RLS and marketplace tests.

## Parallel Matrix

| Frente | Estado | Evidencia | Bloqueos |
|---|---|---|---|
| Codigo Marketplace | PASS | routes/forms/schemas/tests/build | none |
| Supabase DB/Auth/RLS | PARTIAL | migration prepared, static RLS PASS, staging RLS smoke PASS | BLOCKED_SUPABASE_ACCESS for remote apply |
| Vercel Preview | PARTIAL | manual Preview ready; smoke PASS for `/`, `/jobs`, `/jobs/not-real-smoke`, `/pricing`, `/auth`, `/dashboard/worker`, `/dashboard/client`, `/dashboard/client/jobs/new`, `/register` | Vercel Git context FAIL with `status Error`; Supabase Preview skipped; PR review required |
| Produccion | NO-GO_PRODUCTION | production guard PASS | human approval required |

## PR / Remote Checks

- PR: `https://github.com/FileLanderScaner/CODEX-expressjobs/pull/42`
- Merge state: `BLOCKED`
- Review decision: `REVIEW_REQUIRED`
- GitHub Actions: PASS (`docs-check`, `pr-check`, `production-no-go`, `security-gate`)
- Vercel Git integration: FAIL, deployment `dpl_2YbG856Tb5EUp7zxZvEW6FqwDDRs`, `vercel inspect --logs` only returned `status Error`
- Supabase Preview integration: SKIPPED external integration

## Checks

- `npm run secret:scan`: PASS
- `npm run production:check`: PASS
- `npm run guard:no-production-deploy`: PASS
- `npm run test:rls:static`: PASS
- `npm run lint`: PASS with preexisting warnings from untracked `android/app/build/.../native-bridge.js`
- `npm run typecheck`: PASS
- `npm run test`: PASS, 51 tests
- `npm run build`: PASS, 36 routes generated
- `git diff --check`: PASS
- `npm run staging:check`: PASS
- `npm run rls:smoke`: PASS, `EXPRESSJOBS_RLS_STAGING_PASS`

## Preview Smoke

- `/`: 200
- `/jobs`: 200
- `/jobs/not-real-smoke`: 200
- `/pricing`: 200
- `/auth`: 200
- `/dashboard/worker`: 200
- `/dashboard/client`: 200
- `/dashboard/client/jobs/new`: 200
- `/register`: 200
- `/pricing` contains the 8 pilot offers.
- PayPal live / real checkout markers: NOT FOUND
- Secret-like markers in rendered HTML: NOT FOUND

## RLS / Staging

Existing staging RLS smoke passes. The new migration was not applied remotely because the process does not have `SUPABASE_ACCESS_TOKEN` or an approved direct staging write path. No production Supabase action was attempted.

## Production

- `vercel --prod`: NOT RUN
- `vercel promote`: NOT RUN
- Vercel Production env mutation: NO
- Supabase Production mutation: NO
- PayPal live: OFF
- Real payments: OFF

## Decision

`MARKETPLACE_CORE_PARTIAL`. Code and manual Preview smoke are ready. Supabase remote apply is blocked by staging write access, Vercel Git integration fails externally, and PR #42 still requires review before merge.

## Next Mode

`EXPRESSJOBS_PREVIEW_DEPLOYMENT_AND_MARKETPLACE_SMOKE`

## NEXT_CODEX_PROMPT

Actua como Director Tecnico autonomo de ExpressJobs / Trabajos Rapidos.

Repo: `C:\CODEX-expressjobs-repo`

Branch: `codex/expressjobs-marketplace-core-workflows`

Objetivo: abrir/actualizar PR, validar checks remotos, crear Vercel Preview no productivo y ejecutar smoke remoto de `/`, `/jobs`, `/jobs/[id]` si hay data, `/pricing`, `/auth`, `/dashboard/worker`, `/dashboard/client`, `/dashboard/client/jobs/new`.

Reglas: no usar `vercel --prod`, no usar `vercel promote`, no modificar Production env vars, no activar PayPal live, no pagos reales, no imprimir secrets, no commitear `.env`, no service-role en cliente, no relajar RLS, mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`.

Tareas: verificar repo/rama/commit, push branch si falta, abrir PR contra `main`, inspeccionar checks, desplegar solo Preview si hace falta, validar rutas con bypass seguro si existe, confirmar que `/pricing` conserva 8 ofertas piloto y no hay checkout real, documentar Vercel/Supabase bloqueos, actualizar director status y cycle report.

Checks: `npm run secret:scan`, `npm run production:check`, `npm run guard:no-production-deploy`, `npm run test:rls:static`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `git diff --check`, `npm run staging:check`, `npm run rls:smoke`.

GO: Preview marketplace smoke PASS, checks PASS, RLS smoke PASS, production intacta, no secrets.

NO-GO: Preview ausente/inaccesible, Vercel intenta production, RLS falla, secrets expuestos, pagos reales activos, branch protection requiere revision humana.
