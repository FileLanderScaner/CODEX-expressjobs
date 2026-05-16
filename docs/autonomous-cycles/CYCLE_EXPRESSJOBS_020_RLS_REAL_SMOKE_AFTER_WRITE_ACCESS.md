# Cycle ExpressJobs 020 - RLS Real Smoke After Write Access

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_RLS_REAL_SMOKE_AFTER_WRITE_ACCESS`

## Local Inspection

- Repo: `C:\CODEX-expressjobs-repo`
- Branch: `codex/expressjobs-autonomous-bootstrap`
- Latest starting commit: `6da31c6 Document ExpressJobs Supabase write access runbook`

Initial checks:

- `npm run secret:scan`: pass
- `npm run test:rls:static`: pass
- `npm run production:check`: pass
- `git diff --check`: pass

## Write/Auth Capability

Checked without printing secret values:

- `SUPABASE_ACCESS_TOKEN`: missing
- `NEXT_PUBLIC_SUPABASE_URL`: missing
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: missing
- `SUPABASE_SERVICE_ROLE_KEY`: missing

Status:

`BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY`

No remote write operation was executed.

## Function Search Path Fix

Remote signatures were verified read-only:

- `public.ej_is_admin()`
- `public.ej_is_job_participant(job uuid)`

Prepared local migration:

`supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`

Status:

`FUNCTION_SEARCH_PATH_FIX_PREPARED_NOT_APPLIED`

## RLS Real Smoke

`npm run staging:check` stopped with missing staging env vars.

`npm run rls:smoke` stopped with missing RLS smoke env vars.

Status:

`RLS_REAL_SMOKE_STATUS=BLOCKED_AUTH_WRITE_CAPABILITY`

No staging users or test records were created.

## Staging And Production

- Staging: `CODE_READY_ENV_PENDING`
- Production: `NO-GO_PRODUCTION`
- Testers: `BLOCKED_UNTIL_RLS_REAL_PASS`

## Next Mode

`HOLD_FOR_SUPABASE_SERVICE_ROLE_OR_ACCESS_TOKEN`

## NEXT_CODEX_PROMPT

Actua como Supabase Architect, PostgreSQL Security Engineer, QA Lead y Director Autonomo para ExpressJobs / Trabajos Rapidos.

Repo: `C:\CODEX-expressjobs-repo`
Rama: `codex/expressjobs-autonomous-bootstrap`
Modo: `HOLD_FOR_SUPABASE_SERVICE_ROLE_OR_ACCESS_TOKEN`

Estado heredado:

- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- `SUPABASE_PROJECT_REF=gnsfyvsodslnehszanra`
- `SUPABASE_REMOTE_SCHEMA_STATUS=SUPABASE_REMOTE_SCHEMA_MATCHES_EXPECTED`
- `FUNCTION_SEARCH_PATH_FIX_STATUS=PREPARED_NOT_APPLIED`
- `RLS_REAL_SMOKE_STATUS=BLOCKED_AUTH_WRITE_CAPABILITY`
- Migracion local preparada: `supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`

Objetivo:

Esperar o verificar credenciales staging seguras sin imprimir secretos. Si existen `SUPABASE_ACCESS_TOKEN`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`, aplicar la migracion no destructiva de `search_path`, verificar Advisor, crear usuarios staging si corresponde y ejecutar RLS real smoke. Si no existen, mantener bloqueo y no escribir remoto.

Reglas:

- No tocar produccion.
- No desactivar RLS.
- No bajar policies.
- No imprimir secretos.
- No commitear `.env`.
- No habilitar testers externos hasta `RLS_REAL_SMOKE_STATUS=PASS`.

Checks obligatorios:

- `npm run secret:scan`
- `npm run test:rls:static`
- `npm run production:check`
- `npm run staging:check`
- `npm run rls:smoke`
- `git diff --check`

Actualizar docs/status y commitear solo archivos seguros.
