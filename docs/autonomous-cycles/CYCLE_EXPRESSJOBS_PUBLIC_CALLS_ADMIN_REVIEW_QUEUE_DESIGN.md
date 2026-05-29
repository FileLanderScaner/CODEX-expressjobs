# Cycle: ExpressJobs Public Calls Admin Review Queue Design

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_PUBLIC_CALLS_ADMIN_REVIEW_QUEUE_DESIGN`

## Branch

`codex/public-calls-admin-review-queue-design`

## PR

`https://github.com/FileLanderScaner/CODEX-expressjobs/pull/62`

## Objective

Prepare a secure admin review queue for future public-call references loaded manually or from explicitly authorized sources. This cycle does not enable automatic imports.

## Implementation

Added:

- `supabase/migrations/20260529024000_public_calls_admin_review_queue.sql`
- `src/lib/public-calls-admin-queue.ts`
- `src/app/admin/llamados-publicos/page.tsx`
- admin entry link from `src/app/admin/page.tsx`
- static RLS/product-surface tests
- `docs/EXPRESSJOBS_PUBLIC_CALLS_ADMIN_REVIEW_QUEUE_DESIGN.md`

## Security Design

- RLS enabled on `public_call_sources`, `public_call_drafts`, and `public_call_review_events`.
- Common users cannot insert/update/delete sources or drafts.
- Public reads are restricted to drafts where `review_status = approved` and `publication_status = published`.
- Admin reads/writes use `(select private.ej_is_admin())`.
- Delete grants/policies are intentionally absent.
- Audit triggers record source and draft changes.
- Trigger functions revoke direct client execution.
- A draft cannot be published before approval.

## UX Design

Admin route:

- `/admin/llamados-publicos`

The route:

- blocks signed-out users;
- blocks non-admin users;
- lists queue metrics;
- shows sources, authorization and robots review status;
- shows draft review/publication state;
- highlights risk flags;
- keeps approve/reject/publish buttons disabled until server actions and staging RLS smoke are added.

## Explicit Non-Goals

- No scraping.
- No crawler.
- No cron.
- No automatic import.
- No AI Gateway.
- No production deployment.
- No live payments.
- No source without authorization.

## Checks

- `npm run secret:scan`: PASS
- `npm run production:check`: PASS
- `npm run guard:no-production-deploy`: PASS
- `npm run test:rls:static`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test`: PASS
- `npm run build`: PASS
- `npm run staging:check`: PASS
- `npm run rls:smoke`: PASS
- JSON parse: PASS
- `git diff --check`: PASS
- Browser smoke: PASS local desktop 1360 and mobile 390 for `/`, `/llamados-publicos`, `/admin`, and `/admin/llamados-publicos`
- Remote Preview smoke: PASS for `/`, `/llamados-publicos`, `/admin`, and `/admin/llamados-publicos`

## Remote Checks

- `docs-check`: PASS
- `pr-check`: PASS
- `production-no-go`: PASS
- `security-gate`: PASS
- `Supabase Preview`: PASS
- `Vercel`: PASS
- `Vercel Agent Review`: PASS
- `Vercel Preview Comments`: PASS

## Current State

`PUBLIC_CALLS_ADMIN_REVIEW_QUEUE_DESIGNED_SAFE`

## NEXT_CODEX_PROMPT

Modo: `EXPRESSJOBS_PUBLIC_CALLS_ADMIN_ACTIONS_AND_RLS_SMOKE`

Repo: `C:\CODEX-expressjobs-repo`

Branch sugerida: `codex/public-calls-admin-actions-rls-smoke`

Objetivo: habilitar acciones admin auditadas para crear fuente, crear borrador, enviar a revision, aprobar, rechazar y publicar llamados publicos, solo despues de confirmar que la migracion de cola admin aplica en Preview/Staging y que RLS bloquea usuarios comunes.

Reglas de seguridad:

- Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`.
- No usar `vercel --prod`.
- No usar `vercel promote`.
- No tocar Production env vars.
- No activar PayPal live ni pagos reales.
- No activar AI Gateway.
- No usar service-role en cliente.
- No relajar RLS.
- No crear scraping, crawler, cron ni importador automatico.
- No usar datos externos no autorizados.

Tareas:

1. Confirmar que la migracion de cola admin aplica en Preview/Supabase branch o documentar bloqueo.
2. Agregar server actions o API routes admin-only para crear/revisar/publicar.
3. Asegurar que cada accion escriba auditoria.
4. Agregar RLS smoke especifico para usuario comun vs admin si hay credenciales seguras.
5. Mantener `/llamados-publicos` publico sin leer borradores no publicados.
6. Ejecutar checks completos.
7. Actualizar docs/status/cycle report y abrir PR.

Criterio GO/NO-GO:

- GO solo si acciones admin quedan auditadas, RLS bloquea usuarios comunes y no hay import automatico.
- NO-GO si falta aplicar migracion segura, credenciales, permisos, fuente autorizada o se requiere tocar produccion.
