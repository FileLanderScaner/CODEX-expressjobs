# Cycle ExpressJobs 005 Marketplace Core Workflows

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_MARKETPLACE_CORE_WORKFLOWS`

## Repo

`C:\CODEX-expressjobs-repo`

Branch: `codex/expressjobs-marketplace-core-workflows`

Base: `codex/expressjobs-rls-smoke-staging` at `30b990f`

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
| Vercel Preview | PENDING | local build PASS | branch push/deployment pending |
| Produccion | NO-GO_PRODUCTION | production guard PASS | human approval required |

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

`MARKETPLACE_CORE_PARTIAL`. Code is ready for Preview smoke after branch push. Supabase remote apply is blocked by staging write access.

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
