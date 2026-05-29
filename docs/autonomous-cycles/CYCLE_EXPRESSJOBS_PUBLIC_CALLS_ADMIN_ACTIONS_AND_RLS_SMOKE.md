# Cycle: ExpressJobs Public Calls Admin Actions And RLS Smoke

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_PUBLIC_CALLS_ADMIN_ACTIONS_AND_RLS_SMOKE`

## Branch

`codex/public-calls-admin-actions-rls-smoke`

## Pull Request

PR #63: `https://github.com/FileLanderScaner/CODEX-expressjobs/pull/63`

State: `OPEN`, blocked only by required review.

## Objective

Implement audited admin actions for the public-calls review queue while keeping the workflow manual, safe, RLS-protected, and non-production.

## Changes

- Added server actions in `src/app/admin/llamados-publicos/actions.ts`.
- Added action policy checks in `src/lib/public-calls-admin-actions-policy.ts`.
- Added explicit audit event migration in `supabase/migrations/20260529040500_public_calls_admin_action_events.sql`.
- Updated `/admin/llamados-publicos` to operate the workflow.
- Added `npm run rls:smoke:public-calls`.
- Added unit/static tests for admin action policy and no automation/service-role regression.
- Added `/favicon.ico` route so browser smoke has no favicon 404 console error.
- Added this cycle documentation and Director status updates.

## Security

- No scraping.
- No crawler.
- No cron import.
- No automatic import.
- No service-role in public-calls actions or client code.
- No production deploy or promote.
- No Production env mutation.
- No PayPal live.
- No real payments.
- No AI Gateway.
- No RLS relaxation.

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
- `npm run rls:smoke:public-calls`: BLOCKED_SUPABASE_SCHEMA_NOT_APPLIED
- JSON parse: PASS
- `git diff --check`: PASS
- Browser smoke: PASS local desktop 1360 and mobile 390
- Remote PR checks: PASS
- Remote Preview browser smoke: PASS with `VERCEL_LIVE_FEEDBACK_CSP_CAVEAT`

## Browser Smoke

Local target:

- `http://localhost:3020`

Routes:

- `/`
- `/llamados-publicos`
- `/servicios`
- `/admin`
- `/admin/llamados-publicos`

Result:

- Desktop 1360: PASS
- Mobile 390: PASS
- Horizontal overflow: none
- Browser console errors: none
- Signed-out admin pages: protected expected state
- `NO-GO_PRODUCTION`: visible

## Remote Preview

PR #63 remote checks passed:

- `docs-check`
- `pr-check`
- `production-no-go`
- `security-gate`
- `Supabase Preview`
- `Vercel`
- `Vercel Agent Review`
- `Vercel Preview Comments`

Preview URL:

- `https://codex-expressjobs-git-codex-public-cal-019d55-akuma424-projects.vercel.app`

Supabase Preview:

- Project `eqgmsgpaxfdjuclhhwep`
- Database, services, APIs, configurations, migrations, seeding, and edge functions: PASS

Remote browser smoke:

- Desktop 1360: PASS
- Mobile 390: PASS
- Routes: `/`, `/llamados-publicos`, `/servicios`, `/admin`, `/admin/llamados-publicos`
- Horizontal overflow: none
- App console errors: none
- Caveat: Vercel Live Feedback injects `https://vercel.live/_next-live/feedback/feedback.js`, which the app CSP blocks in Preview. This is documented as `VERCEL_LIVE_FEEDBACK_CSP_CAVEAT` and was not treated as an app error.

## RLS Smoke Evidence

`npm run rls:smoke:public-calls` did not pass and was not reported as PASS.

Safe diagnostic result:

- Admin fixture signs in.
- Admin profile returns `role=admin`.
- `public.public_call_sources` returns `PGRST205` in the configured local target.

Conclusion:

- The local target used by `.env.local`/`.env.rls` does not yet have the public-calls migrations applied.
- Supabase Preview for PR #62 previously accepted the migration, but this local RLS smoke targets a different or not-yet-updated DB.

## Current State

`PUBLIC_CALLS_ADMIN_ACTIONS_PREVIEW_CHECKS_PASS_REAL_ACTION_RLS_SMOKE_BLOCKED_LOCAL_SCHEMA_NOT_APPLIED`

## NEXT_CODEX_PROMPT

Modo: `EXPRESSJOBS_PUBLIC_CALLS_PREVIEW_RLS_APPLY_AND_ACTION_SMOKE`

Repo: `C:\CODEX-expressjobs-repo`

Branch sugerida: `codex/public-calls-preview-rls-action-smoke`

Objetivo: verificar las acciones admin de llamados publicos contra el mismo entorno Supabase que tenga aplicadas las migraciones `20260529024000_public_calls_admin_review_queue.sql` y `20260529040500_public_calls_admin_action_events.sql`.

Reglas de seguridad:

- Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`.
- No usar `vercel --prod`.
- No usar `vercel promote`.
- No tocar Production env vars.
- No activar PayPal live ni pagos reales.
- No activar AI Gateway.
- No usar service-role en cliente.
- No relajar RLS.
- No scraping, crawler, cron ni import automatico.

Tareas:

1. Confirmar con evidencia que el target Supabase usado para smoke tiene las tablas `public_call_sources`, `public_call_drafts` y `public_call_review_events`.
2. Si el target no tiene schema, aplicar migraciones solo en Preview/Staging por ruta segura o documentar bloqueo.
3. Ejecutar `npm run rls:smoke:public-calls`.
4. Validar que usuario comun y anonimo no mutan.
5. Validar que admin opera flujo fuente -> draft -> revision -> aprobacion -> publicacion -> archivo.
6. Confirmar que publico solo lee `approved + published`.
7. Actualizar docs/status/cycle report.
8. Ejecutar checks completos y abrir PR.

Criterio GO/NO-GO:

- GO solo si el smoke real de public calls pasa contra un target no productivo.
- NO-GO si falta acceso, el schema no esta aplicado, RLS permite mutacion comun, o cualquier paso requiere produccion.
