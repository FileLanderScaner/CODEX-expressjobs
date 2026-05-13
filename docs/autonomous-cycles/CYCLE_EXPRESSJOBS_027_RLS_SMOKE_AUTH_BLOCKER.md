# Cycle ExpressJobs 027 RLS Smoke Auth Blocker

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## Camino usado

`BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY`

## Resultado

The RLS real smoke gate was executed as far as the safe environment allows.

- `.env.local`: present and ignored by Git
- `.env.rls`: missing
- Service-role key: not present locally
- Supabase MCP write/apply: read-only
- Anon bootstrap: blocked by Supabase Auth email confirmation/rate limit
- Confirmed staging RLS users: missing

## Checks

- `npm run secret:scan`: PASS
- `npm run test:rls:static`: PASS
- `npm run production:check`: PASS
- `npm run staging:check`: PASS
- `git diff --check`: PASS
- `npm run rls:bootstrap-anon-users`: AUTH_FAILURE
- `npm run rls:smoke`: ENV_CONFIGURATION_ERROR / TEST_DATA_SETUP_ERROR

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

## Pending Migration

`supabase/migrations/20260513081258_fix_expressjobs_function_search_path.sql`

Status: prepared locally, not applied remotely.

Reason: MCP is read-only and `SUPABASE_ACCESS_TOKEN` / safe write capability is not available.

## Estado staging

`STAGING_STATUS=STAGING_ENV_PASS_AUTH_USERS_PENDING`

## Estado testers

`FIRST_10_TESTERS=NO-GO_UNTIL_RLS_REAL_PASS_AND_PREVIEW_PASS`

## Estado producción

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS` en `C:\CODEX-expressjobs-repo` despues de desbloquear una capacidad Auth segura. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`; no usar `vercel --prod`; no usar `vercel promote`; no modificar Vercel Production; no reconectar Git auto-deploy; no activar pagos live; no activar AI agents; no imprimir secretos; no commitear `.env`, `.env.local`, `.env.rls`, `.vercel`, logs, zips ni capturas con secretos. Usar el primer camino disponible: si Supabase Auth staging tiene Confirm Email desactivado y el rate limit expiro, ejecutar `npm run rls:bootstrap-anon-users`; si existe `SUPABASE_SERVICE_ROLE_KEY` rotada en `.env.rls`, verificar presencia sin imprimirla y ejecutar `npm run rls:create-staging-users`. Luego ejecutar `npm run secret:scan`, `npm run test:rls:static`, `npm run production:check`, `npm run staging:check`, `git diff --check`, `npm run rls:smoke`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, y actualizar evidencia redacted. Si RLS smoke pasa, marcar `RLS_REAL_SMOKE_STATUS=PASS`, `STAGING_STATUS=RLS_REAL_PASS_PREVIEW_PENDING`, `FIRST_10_TESTERS=NO-GO_UNTIL_PREVIEW_PASS`, `PRODUCTION_STATUS=NO-GO_PRODUCTION`. Si falla, clasificar cada fallo como `AUTH_FAILURE`, `POLICY_TOO_STRICT`, `POLICY_TOO_LOOSE`, `TEST_DATA_SETUP_ERROR` o `ENV_CONFIGURATION_ERROR`.
