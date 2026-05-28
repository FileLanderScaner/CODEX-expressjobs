# ExpressJobs Controlled Staging User Commercial Pilot Execution

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_CONTROLLED_STAGING_USER_COMMERCIAL_PILOT_EXECUTION`

Branch: `codex/controlled-staging-user-commercial-pilot`

Updated: `2026-05-28T20:04:47-03:00`

## Scope

Prepare the safe operator package for controlled staging users and manual commercial lead capture after the PR #55 visual polish and PR #56 closeout. This cycle does not contact real users, activate public production, create live payments, mutate Production env vars, or write to Supabase production/default.

## Starting State

- PR #54 is closed and not merged.
- PR #55 is merged into `main`.
- PR #56 is merged into `main`.
- `main` contains the PR #55 visual polish and PR #56 preview/commercial closeout.
- Production remains `NO-GO_PRODUCTION`.

## Changes

- Added `docs/testing/EXPRESSJOBS_CONTROLLED_STAGING_USER_PILOT_MATRIX.md`.
- Added `docs/testing/EXPRESSJOBS_CONTROLLED_USER_FEEDBACK_FORM.md`.
- Added `docs/sales/EXPRESSJOBS_SANITIZED_LEAD_REGISTER_TEMPLATE.md`.
- Added `scripts/expressjobs-commercial-pilot-check.mjs`.
- Added `npm run commercial:pilot:check`.
- Linked the new pilot artifacts from the existing manual sales and authenticated smoke docs.

## Commercial Safety

Manual pilot remains the only enabled commercial path:

- `/pricing` and `/ofertas` use WhatsApp/email contact.
- `inAppPaymentsEnabled` remains `false`.
- `paypalLiveEnabled` remains `false`.
- No checkout live is introduced.
- No payment links or payment data are stored in git.
- The lead register is explicitly sanitized and human-owned.

## Controlled User Pilot

The operator package now defines:

- Client, worker, local business, and reviewer/admin pilot roles.
- Required route smoke before inviting testers.
- Human pilot script.
- GO/NO-GO criteria.
- Sanitized feedback capture.
- Sanitized lead validity and redaction rules.

## Checks

Local route smoke:

- PASS: 20 Playwright checks on desktop `1360x900` and mobile `390x844`.
- Routes: `/`, `/jobs`, `/worker/jobs`, `/client/jobs/new`, `/pricing`, `/ofertas`, `/dashboard/client`, `/dashboard/worker`, `/dashboard/worker/applications`, `/admin`.
- Evidence: no HTTP 5xx, no horizontal overflow, no app error boundary, no browser console errors, `NO-GO_PRODUCTION` visible on required routes, and `/pricing` plus `/ofertas` expose WhatsApp/email contact without live payment hrefs.

Final rerun:

- `npm run commercial:pilot:check`: PASS.
- `npm run secret:scan`: PASS.
- `npm run production:check`: PASS.
- `npm run guard:no-production-deploy`: PASS.
- `npm run test:rls:static`: PASS.
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm test`: PASS.
- `npm run build`: PASS.
- `npm run staging:check`: PASS.
- `npm run rls:smoke`: PASS.
- `git diff --check`: PASS.

## Blockers

No blocker prevents controlled staging users or manual commercial pilot operation under human control.

Production remains blocked by:

- `BLOCKED_PRODUCTION_RISK`
- `BLOCKED_VERCEL_PRODUCTION_ENVS_MISSING`
- `BLOCKED_CUSTOM_DOMAIN_ACCESS`
- `BLOCKED_BACKUP_PITR_EVIDENCE`
- `BLOCKED_PAYMENT_PROVIDER`
- `BLOCKED_SUPABASE_MAIN_GATE_EVIDENCE`

## Current State

`CONTROLLED_STAGING_USER_COMMERCIAL_PILOT_OPERATOR_HANDOFF_READY`

## Next Mode

`EXPRESSJOBS_CONTROLLED_STAGING_PILOT_FEEDBACK_LOOP`

Rationale: after the operator package is validated, the next safe step is to collect sanitized human feedback from controlled users and convert it into prioritized product fixes, without automatic outreach or production changes.

## NEXT_CODEX_PROMPT

Actua como equipo autonomo senior para ExpressJobs / Trabajos Rapidos.

Repo: `C:\CODEX-expressjobs-repo`

Branch sugerida: `codex/controlled-staging-pilot-feedback-loop`

Modo: `EXPRESSJOBS_CONTROLLED_STAGING_PILOT_FEEDBACK_LOOP`

Objetivo: convertir feedback sanitizado de usuarios controlados en mejoras priorizadas de producto, sin contactar usuarios reales automaticamente, sin produccion publica y sin pagos live.

Contexto:

- PR #55 visual polish esta mergeado.
- PR #56 preview/commercial closeout esta mergeado.
- Existe kit de piloto controlado y registro manual sanitizado.
- Produccion sigue `NO-GO_PRODUCTION`.

Reglas:

- No usar `vercel --prod`.
- No usar `vercel promote`.
- No tocar Production env vars.
- No activar PayPal live.
- No crear pagos reales.
- No imprimir secretos ni PII.
- No tocar Supabase production/default destructivamente.
- No relajar RLS.
- No contactar usuarios reales automaticamente.

Tareas:

1. Leer solo feedback sanitizado provisto por el humano o templates vacios si no hay feedback.
2. Clasificar issues por cliente, trabajador, negocio y reviewer/admin.
3. Priorizar cambios por impacto en MVP real y riesgo.
4. Implementar fixes seguros dentro del repo si no requieren credenciales ni produccion.
5. Verificar rutas criticas y checks completos.
6. Actualizar docs/status/JSON/cycle report.
7. Abrir PR con evidencia y `NO-GO_PRODUCTION`.

Checks:

- `npm run commercial:pilot:check`
- `npm run secret:scan`
- `npm run production:check`
- `npm run guard:no-production-deploy`
- `npm run test:rls:static`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run staging:check`
- `npm run rls:smoke`
- `git diff --check`

Criterio:

- GO solo si las mejoras se validan con checks y no introducen live payments, PII, production deploys, Production env changes, RLS relaxation, or unverified production claims.
