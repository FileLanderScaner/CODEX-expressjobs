# Cycle ExpressJobs 028 RLS Smoke Auth Rate Limit Blocker

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## Camino usado

`BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY`

## Objetivo

Retry the real Supabase RLS smoke gate after the operator requested another run, checking whether Confirm Email was disabled in staging.

## Resultado

The anon bootstrap path is still blocked. Supabase Auth returned:

`email rate limit exceeded`

Remote readback shows:

- Staging signup users from bootstrap attempts: 1
- Confirmed staging signup users: 0

Because no confirmed client, worker, and admin staging users exist, `npm run rls:smoke` stops before policy execution.

## Checks

- `npm run secret:scan`: PASS
- `npm run test:rls:static`: PASS
- `npm run production:check`: PASS
- `npm run staging:check`: PASS
- `npm run rls:bootstrap-anon-users`: AUTH_FAILURE
- `npm run rls:smoke`: ENV_CONFIGURATION_ERROR / TEST_DATA_SETUP_ERROR
- `git diff --check`: PASS

## RLS Matrix

All matrix items remain `NOT_RUN` because confirmed client, worker, and admin users are missing:

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

- `RLS_REAL_SMOKE_STATUS=BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY`
- `STAGING_STATUS=STAGING_ENV_PASS_AUTH_USERS_PENDING`
- `FIRST_10_TESTERS=NO-GO_UNTIL_RLS_REAL_PASS_AND_PREVIEW_PASS`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS` en `C:\CODEX-expressjobs-repo` cuando exista una capacidad Auth segura. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`; no usar `vercel --prod`; no usar `vercel promote`; no modificar Vercel Production; no reconectar Git auto-deploy; no activar pagos live; no activar AI agents; no imprimir secretos; no commitear `.env`, `.env.local`, `.env.rls`, `.vercel`, logs, zips ni screenshots con secretos. Si Supabase Auth staging tiene Confirm Email desactivado y el rate limit expiro, ejecutar `npm run rls:bootstrap-anon-users`; si existe `SUPABASE_SERVICE_ROLE_KEY` rotada en `.env.rls`, verificar presencia sin imprimirla y ejecutar `npm run rls:create-staging-users`. Luego ejecutar `npm run secret:scan`, `npm run test:rls:static`, `npm run production:check`, `npm run staging:check`, `npm run rls:smoke`, `git diff --check`, registrar evidencia redacted y actualizar los documentos obligatorios. Si RLS smoke pasa, marcar `RLS_REAL_SMOKE_STATUS=PASS`, `STAGING_STATUS=RLS_REAL_PASS_PREVIEW_PENDING`, `FIRST_10_TESTERS=NO-GO_UNTIL_PREVIEW_PASS`, `PRODUCTION_STATUS=NO-GO_PRODUCTION`.
