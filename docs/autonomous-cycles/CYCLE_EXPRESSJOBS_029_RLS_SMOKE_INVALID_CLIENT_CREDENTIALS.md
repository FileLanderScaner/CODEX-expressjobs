# Cycle ExpressJobs 029 RLS Smoke Invalid Client Credentials

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## Camino usado

`AUTH_USERS_PROVIDED_BUT_CLIENT_LOGIN_FAILED`

## Objetivo

Run the real RLS smoke gate after the operator reported that client, worker, and admin staging Auth users were created/confirmed and credentials were loaded in `.env.rls`.

## Resultado

`.env.rls` is present, ignored by Git, and contains all six required RLS smoke credential variables.

`npm run rls:smoke` reached Supabase Auth but failed before any RLS policy operation:

`AUTH_FAILURE`

First failing role:

`client`

Failure:

`Invalid login credentials`

## Checks

- `git check-ignore .env.rls`: PASS
- `npm run secret:scan`: PASS
- `npm run staging:check`: PASS
- `npm run test:rls:static`: PASS
- `npm run rls:smoke`: FAIL, `AUTH_FAILURE`
- `git diff --check`: PASS

## RLS Matrix

All matrix items remain `NOT_RUN` because the client login failed before RLS policy execution:

1. Anonymous user cannot modify data.
2. Client creates and manages only own jobs.
3. Worker sees open jobs.
4. Worker creates own applications.
5. Worker cannot accept/reject own application.
6. Client sees applications only for own jobs.
7. Client accepts/rejects applications for own jobs.
8. Only participants see messages.
9. Third parties do not read private messages.
10. Only participants of completed jobs create reviews.
11. Admin with valid role sees audit table.
12. Normal user does not see audit table.

## Decision

- `RLS_REAL_SMOKE_STATUS=AUTH_FAILURE_INVALID_CLIENT_CREDENTIALS`
- `STAGING_STATUS=STAGING_ENV_PASS_AUTH_USERS_INVALID`
- `FIRST_10_TESTERS=NO-GO_UNTIL_RLS_REAL_PASS_AND_PREVIEW_PASS`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS` en `C:\CODEX-expressjobs-repo` despues de corregir/resetear las credenciales del usuario staging client en Supabase Auth y en `.env.rls`. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`; no usar `vercel --prod`; no usar `vercel promote`; no modificar Vercel Production; no activar pagos live; no activar AI agents; no imprimir secretos; no commitear `.env`, `.env.local`, `.env.rls`, `.vercel`, logs, zips ni screenshots con secretos. Ejecutar `git status --short`, `git check-ignore .env.rls`, `npm run secret:scan`, `npm run staging:check`, `npm run test:rls:static`, `npm run rls:smoke`, `npm run secret:scan`, `git diff --check`. Si `rls:smoke` pasa, ejecutar `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run production:check`, documentar `RLS_REAL_SMOKE_STATUS=PASS`, `STAGING_STATUS=RLS_READY`, `FIRST_10_TESTERS=NO-GO_UNTIL_PREVIEW_PASS`, `PRODUCTION_STATUS=NO-GO_PRODUCTION`, y hacer commit seguro solo de docs/status.
