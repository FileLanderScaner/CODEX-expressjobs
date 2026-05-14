# Cycle ExpressJobs 031 RLS Pass Preview Protected

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## Resultado

Supabase/Auth/RLS staging blocker resolved.

`npm run rls:smoke` returned:

```text
EXPRESSJOBS_RLS_STAGING_PASS
```

Vercel Preview was deployed without `--prod`:

`https://codex-expressjobs-ijhf7g5hu-akuma424-projects.vercel.app`

Deployment:

`dpl_4z4bkBR3Zto23hPippo3YWatwFGG`

Preview status:

`READY_PROTECTED_401`

## Checks

- `npm run rls:smoke`: PASS
- `npm run secret:scan`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test`: PASS
- `npm run build`: PASS
- `npm run production:check`: PASS
- `git diff --check`: PASS
- Vercel Preview deploy: READY
- Preview HTTP smoke: BLOCKED, Vercel Authentication 401

## RLS Matrix

1. Anonymous user cannot modify data: PASS
2. Client creates and manages only own jobs: PASS
3. Worker sees open jobs: PASS
4. Worker creates own applications: PASS
5. Worker cannot accept/reject own application: PASS
6. Client sees applications only for own jobs: PASS
7. Client accepts/rejects applications for own jobs: PASS
8. Only participants see messages: PASS
9. Third parties do not read private messages: covered by participant-only message checks; no loose message access observed
10. Only participants of completed jobs create reviews: PASS
11. Admin with valid role sees audit table: PASS
12. Normal user does not see audit table: PASS

## Seguridad

- No production deploy.
- No `vercel --prod`.
- No `vercel promote`.
- No Vercel Production env changes.
- No live payments.
- No AI agents activated in production.
- No secrets printed.
- `.env.local`, `.env.rls`, `.vercel`, logs, and zips remain uncommitted.

## Decision

- `RLS_REAL_SMOKE_STATUS=PASS`
- `STAGING_STATUS=RLS_READY_PREVIEW_PROTECTED`
- `FIRST_10_TESTERS=NO-GO_UNTIL_PREVIEW_BROWSER_PASS`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_PREVIEW_DEPLOYMENT` en `C:\CODEX-expressjobs-repo`. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`; no usar `vercel --prod`; no usar `vercel promote`; no modificar Vercel Production; no reconectar Git auto-deploy; no activar pagos live; no activar AI agents en production; no imprimir secretos; no commitear `.env`, `.env.local`, `.env.rls`, `.vercel`, logs, zips ni screenshots con secretos. Resolver acceso seguro al Vercel Preview `https://codex-expressjobs-ijhf7g5hu-akuma424-projects.vercel.app` sin exponer Production; si es posible generar share URL o desactivar solo protección de Preview, hacerlo. Ejecutar browser smoke en `/`, `/auth`, `/jobs/open`, `/pricing`, `/client/jobs/new`, `/worker/jobs`; verificar que no haya errores críticos. Si pasa, marcar `PREVIEW_BROWSER_SMOKE=PASS`, `FIRST_10_TESTERS=GO_CONTROLLED_INTERNAL_ONLY`, `PRODUCTION_STATUS=NO-GO_PRODUCTION`; si sigue 401, mantener `BLOCKED_PREVIEW_BROWSER_SMOKE_AUTH_401`.
