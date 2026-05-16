# Cycle ExpressJobs 021 - Supabase Apply Fix And RLS Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`HOLD_FOR_SUPABASE_SERVICE_ROLE_OR_ACCESS_TOKEN`

## Local Inspection

- Repo: `C:\CODEX-expressjobs-repo`
- Branch: `codex/expressjobs-autonomous-bootstrap`
- Latest starting commit: `be02a43 Prepare ExpressJobs RLS real smoke and function search path fix`

Initial checks:

- `npm run secret:scan`: pass
- `npm run test:rls:static`: pass
- `npm run production:check`: pass
- `git diff --check`: pass

## Env Capability

Checked without printing values:

- `SUPABASE_ACCESS_TOKEN`: missing
- `NEXT_PUBLIC_SUPABASE_URL`: missing
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: missing
- `SUPABASE_SERVICE_ROLE_KEY`: missing

Status:

`BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY`

## Supabase Link And Apply

Supabase link was not executed because `SUPABASE_ACCESS_TOKEN` is missing.

The prepared migration was not applied:

`supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`

Status:

`FUNCTION_SEARCH_PATH_FIX_PREPARED_NOT_APPLIED`

## RLS Real Smoke

Real RLS smoke was not run against Supabase because staging/auth envs are missing.

Status:

`RLS_REAL_SMOKE_STATUS=BLOCKED_AUTH_WRITE_CAPABILITY`

## Final Checks

- `npm run secret:scan`: pass
- `npm run test:rls:static`: pass
- `npm run production:check`: pass
- `npm run staging:check`: blocked missing env
- `npm run rls:smoke`: blocked missing env
- `git diff --check`: pass

## Next Mode

`HOLD_FOR_SUPABASE_SERVICE_ROLE_OR_ACCESS_TOKEN`

## NEXT_CODEX_PROMPT

Actua como Supabase Architect, PostgreSQL Security Engineer, QA Lead y Director Autonomo para ExpressJobs / Trabajos Rapidos.

Repo: `C:\CODEX-expressjobs-repo`
Rama: `codex/expressjobs-autonomous-bootstrap`
Modo: `HOLD_FOR_SUPABASE_SERVICE_ROLE_OR_ACCESS_TOKEN`

Estado:

- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- `SUPABASE_PROJECT_REF=gnsfyvsodslnehszanra`
- `SUPABASE_REMOTE_SCHEMA_STATUS=SUPABASE_REMOTE_SCHEMA_MATCHES_EXPECTED`
- `FUNCTION_SEARCH_PATH_FIX_STATUS=PREPARED_NOT_APPLIED`
- `RLS_REAL_SMOKE_STATUS=BLOCKED_AUTH_WRITE_CAPABILITY`
- Missing: `SUPABASE_ACCESS_TOKEN`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

Objetivo:

Verificar si las credenciales staging seguras ya existen sin imprimir valores. Si existen todas, linkear solo `gnsfyvsodslnehszanra`, aplicar solo `supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`, verificar Supabase Advisor, crear/validar usuarios staging y ejecutar RLS real smoke. Si falta alguna credencial, no escribir remoto y mantener bloqueo documentado.

Reglas:

- No tocar produccion.
- No usar Vercel production, `vercel --prod` ni `vercel promote`.
- No imprimir secretos.
- No commitear `.env`, `.env.local` ni `.env.staging.local`.
- No desactivar RLS ni bajar policies.
- No activar pagos live ni agentes IA.
- No habilitar testers externos hasta `RLS_REAL_SMOKE_STATUS=PASS`.

Checks:

- `npm run secret:scan`
- `npm run test:rls:static`
- `npm run production:check`
- `npm run staging:check`
- `npm run rls:smoke`
- `git diff --check`

Actualizar docs/status y commitear solo archivos seguros.
