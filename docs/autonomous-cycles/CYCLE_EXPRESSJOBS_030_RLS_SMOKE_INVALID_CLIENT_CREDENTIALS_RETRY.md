# Cycle ExpressJobs 030 RLS Smoke Invalid Client Credentials Retry

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## Camino usado

`AUTH_USERS_PROVIDED_BUT_CLIENT_LOGIN_FAILED`

## Resultado

The RLS smoke gate was retried with `.env.rls` present and ignored by Git.

`npm run rls:smoke` reached Supabase Auth but failed before RLS policy execution:

`AUTH_FAILURE`

First failing role:

`client`

Failure:

`Invalid login credentials`

## Checks

- `git status --short`: PASS, only pre-existing `.env.example` modification remains
- `git check-ignore .env.rls`: PASS
- `npm run secret:scan`: PASS before and after smoke attempt
- `npm run staging:check`: PASS
- `npm run test:rls:static`: PASS
- `npm run rls:smoke`: FAIL, `AUTH_FAILURE`
- `git diff --check`: PASS

## Documented Status

- `SEARCH_PATH_FIX=BLOCKED_NOT_APPLIED`
- `AUTH_USERS=PROVIDED_BUT_CLIENT_LOGIN_INVALID`
- `RLS_SMOKE=BLOCKED_AUTH_FAILURE`
- `STAGING_STATUS=STAGING_ENV_PASS_AUTH_USERS_INVALID`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

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

Ejecutar `EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS` en `C:\CODEX-expressjobs-repo` despues de resetear/corregir el usuario staging client y actualizar `.env.rls`. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`; no usar `vercel --prod`; no usar `vercel promote`; no modificar Vercel Production; no tocar RLS policies; no activar pagos live; no activar AI agents; no imprimir secretos; no commitear `.env`, `.env.local`, `.env.rls`, `.vercel`, logs, zips ni screenshots con secretos. Ejecutar `git status --short`, `git check-ignore .env.rls`, `npm run secret:scan`, `npm run staging:check`, `npm run test:rls:static`, `npm run rls:smoke`, `npm run secret:scan`, `git diff --check`. Si `rls:smoke` pasa, ejecutar `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run production:check`, documentar `SEARCH_PATH_FIX=APPLIED` si corresponde, `AUTH_USERS=CONFIRMED`, `RLS_SMOKE=PASS`, `STAGING_STATUS=RLS_READY`, `PRODUCTION_STATUS=NO-GO_PRODUCTION`, y hacer commit seguro solo de docs/status.
