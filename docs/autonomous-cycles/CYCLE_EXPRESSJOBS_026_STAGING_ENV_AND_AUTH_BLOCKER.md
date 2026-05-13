# Cycle ExpressJobs 026 Staging Env And Auth Blocker

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## Objetivo

Resolver el bloqueo repetido de anon/service-role keys, configurar staging localmente sin exponer secretos y avanzar hasta el siguiente bloqueo real.

## Resultado

- Supabase MCP recupero la URL del proyecto staging `gnsfyvsodslnehszanra`.
- Supabase MCP recupero una publishable key activa.
- `.env.local` fue creado localmente y esta ignorado por Git.
- `scripts/expressjobs-staging-check.mjs` ahora carga `.env.local`.
- `scripts/expressjobs-rls-smoke.mjs` ahora carga `.env.local` y `.env.rls`.
- Se agrego `npm run rls:bootstrap-anon-users` para crear usuarios RLS de staging sin service-role cuando Auth permite signup con sesion inmediata.
- `npm run staging:check` paso.
- REST/Data API contra `ej_categories` paso con publishable key.

## Bloqueo real actual

`AUTH_EMAIL_CONFIRMATION_REQUIRED_FOR_ANON_SIGNUP`

El intento de bootstrap por anon signup creo un usuario no confirmado, pero Supabase Auth no devolvio sesion porque la confirmacion por email esta activa. Sin sesion no se puede insertar el perfil propio ni ejecutar el smoke RLS real.

MCP tambien esta en modo read-only:

- No pudo aplicar la migracion no destructiva `search_path`.
- No puede crear usuarios confirmados via Auth Admin.

## Checks

- `npm run secret:scan`: PASS
- `npm run test:rls:static`: PASS
- `npm run production:check`: PASS
- `npm run staging:check`: PASS
- REST/Data API `ej_categories`: PASS
- `npm run rls:bootstrap-anon-users`: BLOCKED, email confirmation required
- `npm run rls:smoke`: BLOCKED, missing confirmed staging test users
- `git diff --check`: PASS

## Seguridad

- No se imprimieron passwords ni service-role keys.
- `.env.local` esta ignorado por Git.
- No se ejecuto Vercel deploy.
- No se uso `vercel --prod`.
- No se modifico Production.
- Pagos y AI agents siguen desactivados.

## Proximo modo elegido

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS` en `C:\CODEX-expressjobs-repo`. Usar la configuracion `.env.local` ya creada. Primero verificar que `.env.local` existe y esta ignorado por Git. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`. No usar `vercel --prod`, no usar `vercel promote`, no modificar Vercel Production y no activar pagos live. Para desbloquear usuarios RLS, elegir automaticamente el camino seguro disponible: si Supabase Auth staging tiene email confirmation desactivado, ejecutar `npm run rls:bootstrap-anon-users`; si existe `SUPABASE_SERVICE_ROLE_KEY` rotada en `.env.rls`, ejecutar `npm run rls:create-staging-users`; si ninguno esta disponible, reportar `BLOCKED_SUPABASE_AUTH_WRITE_CAPABILITY`. Luego ejecutar `npm run secret:scan`, `npm run test:rls:static`, `npm run production:check`, `npm run staging:check`, `npm run rls:smoke`, `git diff --check`, registrar evidencia redacted y actualizar los documentos obligatorios.
