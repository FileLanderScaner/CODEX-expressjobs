# Cycle ExpressJobs 019 - Supabase Write Access Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_SUPABASE_WRITE_ACCESS_RUNBOOK`

## Local Inspection

- Repo: `C:\CODEX-expressjobs-repo`
- Branch: `codex/expressjobs-autonomous-bootstrap`
- Latest commit before changes: `2d04344 Audit ExpressJobs Supabase project read-only`
- Initial local checks passed:
  - `npm run secret:scan`
  - `npm run test:rls:static`
  - `npm run production:check`
  - `git diff --check`

## Supabase MCP

Supabase MCP tools were exposed in this session after tool discovery.

- MCP status: `CONNECTED_READ_ONLY`
- Tools available in session: `true`
- Project ref: `gnsfyvsodslnehszanra`

No write operation was run.

## Remote Schema

Read-only MCP inspection confirmed the expected MVP tables exist remotely:

- `ej_profiles`
- `ej_worker_profiles`
- `ej_jobs`
- `ej_job_applications`
- `ej_job_messages`
- `ej_job_reviews`
- `ej_job_events`
- `ej_categories`
- `ej_payment_records`
- `ej_admin_audit_logs`

All ten tables have RLS enabled. Expected policies and helper functions are present.

Classification:

`SUPABASE_REMOTE_SCHEMA_MATCHES_EXPECTED`

## Security Notes

Supabase Security Advisor reported `function_search_path_mutable` warnings for:

- `public.ej_is_admin`
- `public.ej_is_job_participant`

This should be fixed in a future reviewed migration by setting explicit `search_path`. It was not changed in this read-only cycle.

## Write Access Plan

Two paths were documented:

- Camino A: read-only MCP inspection and no writes.
- Camino B: local CLI token flow with `SUPABASE_ACCESS_TOKEN`, project link, diff review, guarded apply, and redacted evidence.

## Blockers

- `BLOCKED_WRITE_ACCESS`
- `BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY`

The next mode requires safe write/auth capability to create real RLS smoke-test data or users.

## Next Mode

`EXPRESSJOBS_RLS_REAL_SMOKE_AFTER_WRITE_ACCESS`

Do not execute it until a safe token/write tool is available and the session is explicitly scoped for smoke-test writes.

## NEXT_CODEX_PROMPT

Actua como Supabase Architect, Security Engineer, QA Lead y Director Autonomo para ExpressJobs / Trabajos Rapidos.

Repo: `C:\CODEX-expressjobs-repo`
Rama: `codex/expressjobs-autonomous-bootstrap`
Modo: `EXPRESSJOBS_RLS_REAL_SMOKE_AFTER_WRITE_ACCESS`

Estado heredado:

- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- `SUPABASE_PROJECT_REF=gnsfyvsodslnehszanra`
- `SUPABASE_MCP_STATUS=CONNECTED_READ_ONLY`
- `SUPABASE_REMOTE_SCHEMA_STATUS=SUPABASE_REMOTE_SCHEMA_MATCHES_EXPECTED`
- `SUPABASE_WRITE_STATUS=BLOCKED_UNTIL_TOKEN_OR_WRITE_TOOL`
- Security Advisor warning pendiente: `function_search_path_mutable` en `public.ej_is_admin` y `public.ej_is_job_participant`

Objetivo:

Ejecutar o preparar smoke tests reales de RLS solo si existe write/auth capability segura. No tocar produccion, no activar pagos live, no desactivar RLS, no imprimir secretos y no commitear `.env`.

Fases:

1. Ejecutar inspeccion local: `pwd`, `git status`, `git branch --show-current`, `git log --oneline -10`, `npm run secret:scan`, `npm run test:rls:static`, `npm run production:check`, `git diff --check`.
2. Confirmar si hay herramienta o token seguro para write/auth staging.
3. Si no hay write/auth capability, documentar `BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY` y preparar runbook de smoke real sin ejecutar writes.
4. Si hay capability segura, crear datos minimos de prueba en staging, correr smoke RLS real, limpiar datos de prueba si el plan lo permite, y guardar evidencia redaccionada.
5. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`.
6. Actualizar `docs/EXPRESSJOBS_DIRECTOR_STATUS.md`, `docs/expressjobs-director-status.json` y crear `docs/autonomous-cycles/CYCLE_EXPRESSJOBS_020_RLS_REAL_SMOKE_AFTER_WRITE_ACCESS.md`.
7. Ejecutar checks finales y commitear solo archivos seguros.

No ejecutar ninguna escritura si el entorno sigue read-only o si falta token/capability segura.
