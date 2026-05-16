# Cycle ExpressJobs 069 Real Marketplace Flow Hardening

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_REAL_MARKETPLACE_FLOW_HARDENING`

## Objective

Convert the client/worker marketplace loop from mostly visual to real Supabase-backed MVP flow while preserving RLS, staging-only validation, and production NO-GO.

## Changes

- Added `supabase/migrations/20260516223000_harden_real_marketplace_flow.sql`.
- Worker detail now submits real applications to `ej_job_applications`.
- Worker apply ensures role through `ej_set_profile_role('worker')` and blocks self-apply in UI plus RLS migration.
- Client detail now loads real applications and calls `ej_accept_job_application` / `ej_reject_job_application`.
- Client accept RPC sets the accepted application, rejects other submitted applications, and updates `ej_jobs.status` plus `accepted_worker_id`.
- `/worker/jobs` reads open/accepted Supabase jobs, with demo fallback only when Supabase is unavailable or empty.
- `/client` reads the authenticated user's Supabase jobs and gates signed-out users to `/auth`.
- `/role` uses the safe public role RPC for `client` and `worker`; it never exposes `admin`.
- `/auth` now preserves `?next=` through OTP/OAuth callback redirects.
- Added marketplace flow tests and expanded static RLS tests.

## Checks

| Check | Result |
| --- | --- |
| `npm run secret:scan` | `PASS` |
| `npm run lint` | `PASS` |
| `npm run typecheck` | `PASS` |
| `npm run test` | `PASS` |
| `npm run build` | `PASS` |
| `npm run production:check` | `PASS_SAFE_NO_GO` |
| `npm run test:rls:static` | `PASS` |
| `npm run staging:check` | `PASS` |
| `npm run rls:smoke` | `PASS_EXPRESSJOBS_RLS_STAGING_PASS` |
| localhost HTTP smoke | `PASS` |
| in-app browser smoke | `PASS_BASIC_RENDER` |
| GitHub PR #29 `docs-check` | `PASS` |
| GitHub PR #29 `pr-check` | `PASS` |
| GitHub PR #29 `security-gate` | `PASS` |
| GitHub PR #29 `production-no-go` | `PASS` |
| GitHub PR #29 Vercel Preview | `SUCCESS` |
| GitHub PR #29 Supabase Preview | `SUCCESS` |

## Autoevaluation

- MVP progress: yes. The app now has a real publish -> apply -> accept/reject path wired to Supabase from the UI.
- Technical risk reduced: yes. Acceptance is handled through RPC, self-apply is blocked by UI and migration, and auth `next` redirects reduce broken protected flows.
- Security maintained: yes. No service-role key in client, no secrets printed, no RLS relaxed, no production touched.
- Checks passed: yes, including local build and current staging/RLS smoke.
- Blocked: the new migration was not manually applied to the canonical staging environment; full real-user browser smoke needs staging migration confirmation and tester sessions.
- Highest-impact next step: deploy Preview from PR, apply the migration to staging after human approval, then run the full real-user browser smoke.

## Staging Status

Current existing staging RLS smoke still passes. New migration `20260516223000_harden_real_marketplace_flow.sql` is in PR #29 and was validated by Supabase Preview, but it was not manually applied to the canonical staging environment in this cycle.

## Production Status

`NO-GO_PRODUCTION`

No `vercel --prod`, no `vercel promote`, no Production env mutation, no Supabase production action, no PayPal live, and no real payments.

## Blockers

- `BLOCKED_PRODUCTION_RISK`: production remains explicitly blocked.
- `BLOCKED_EXTERNAL_CREDENTIALS`: PayPal paid pilot remains blocked.
- `BLOCKED_MISSING_ACCESS`: full Preview pipeline still depends on GitHub/Vercel/Supabase operational access.
- `STAGING_MIGRATION_NOT_APPLIED`: marketplace RPC/RLS migration needs staging apply before full real-user smoke.
- `FULL_REAL_USER_BROWSER_SMOKE_NOT_RUN`: needs canonical staging migration confirmation and real test sessions.

## Next Mode

`EXPRESSJOBS_PREVIEW_DEPLOYMENT`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_PREVIEW_DEPLOYMENT` en `C:\CODEX-expressjobs-repo` desde la rama `codex/real-marketplace-flow-hardening`. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`; no usar `vercel --prod`; no usar `vercel promote`; no modificar Vercel Production env vars; no tocar Supabase production; no activar PayPal live; no activar pagos reales; no imprimir secrets. Abrir PR contra `main`, confirmar GitHub checks PASS y Vercel Preview SUCCESS. No aplicar la migracion a produccion. Aplicar `supabase/migrations/20260516223000_harden_real_marketplace_flow.sql` solo a Supabase staging tras aprobacion humana/credencial segura, luego correr `npm run staging:check`, `npm run test:rls:static`, `npm run rls:smoke`, y browser smoke real: signup/login -> /role -> publicar trabajo -> worker apply -> client accept. Actualizar docs/status con GO/NO-GO y mantener produccion bloqueada.
