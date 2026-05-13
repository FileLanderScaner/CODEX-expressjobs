# Cycle ExpressJobs 022 - Supabase Secret Rotation Blocker

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`HOLD_FOR_SUPABASE_SERVICE_ROLE_OR_ACCESS_TOKEN`

## Event

A Supabase service-role credential was pasted into the conversation. The value is not included in this report.

Security classification:

`BLOCKED_SECURITY_RISK_SECRET_EXPOSED_ROTATION_REQUIRED`

## Env Capability

The Codex process checked credential presence without printing values:

- `SUPABASE_ACCESS_TOKEN`: missing
- `NEXT_PUBLIC_SUPABASE_URL`: missing
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: missing
- `SUPABASE_SERVICE_ROLE_KEY`: missing

Even if the exposed key becomes available later, it must not be used. Rotation is required first.

## Actions Not Taken

- Did not run `npx supabase link`.
- Did not apply the prepared function `search_path` migration.
- Did not create staging users.
- Did not run RLS real smoke against Supabase.
- Did not touch production.

## Checks

- `npm run secret:scan`: pass
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
- `BLOCKED_SECURITY_RISK_SECRET_EXPOSED_ROTATION_REQUIRED`

Objetivo:

Continuar solo despues de confirmar que la service-role key expuesta fue rotada en Supabase y que las credenciales nuevas existen en el entorno local sin imprimir valores. Si existen credenciales nuevas y rotadas, linkear solo `gnsfyvsodslnehszanra`, aplicar solo `supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`, verificar Supabase Advisor, crear/validar usuarios staging y ejecutar RLS real smoke. Si falta rotacion o falta alguna credencial, no escribir remoto y mantener bloqueo documentado.

Reglas:

- No usar credenciales expuestas en chat.
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
