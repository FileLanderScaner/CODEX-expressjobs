# Cycle ExpressJobs 024 RLS Smoke Env Visibility Check

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## Objetivo

Continuar despues de que el operador reporto APIs rotadas y validar si Codex puede ejecutar staging RLS smoke tests sin exponer secretos.

## Resultado

No se pudo avanzar a escritura staging ni smoke RLS real porque las credenciales rotadas no estan visibles para el proceso que ejecuta Codex.

Verificaciones sin imprimir valores:

- `.env.local`: ausente
- `.env.rls`: ausente
- `SUPABASE_ACCESS_TOKEN`: no visible en Process/User/Machine env
- `NEXT_PUBLIC_SUPABASE_URL`: no visible en Process/User/Machine env
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: no visible en Process/User/Machine env
- `SUPABASE_SERVICE_ROLE_KEY`: no visible en Process/User/Machine env
- flags de staging/preview: no visibles en Process/User/Machine env

## Seguridad

- No se imprimieron secretos.
- No se escribio contra Supabase remoto.
- No se creo ningun usuario staging.
- No se ejecuto deploy Vercel.
- Produccion permanece `NO-GO_PRODUCTION`.

## Checks

- Supabase changelog revisado para cambios recientes relevantes.
- Env visibility check: BLOCKED, secrets not available to Codex.
- `staging:check`: no reejecutado en este ciclo porque ya se confirmo ausencia de env vars.
- `rls:smoke`: NOT RUN, blocked by missing rotated staging credentials in Codex process.

## Bloqueos

- `BLOCKED_EXTERNAL_CREDENTIALS`
- `SUPABASE_ACCESS_TOKEN_MISSING`
- `NEXT_PUBLIC_SUPABASE_URL_MISSING`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY_MISSING`
- `SUPABASE_SERVICE_ROLE_KEY_MISSING`
- `STAGING_ENV_FILES_NOT_VISIBLE_TO_CODEX`

## Proximo modo elegido

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS` en `C:\CODEX-expressjobs-repo` despues de confirmar que `.env.local` y `.env.rls` existen localmente y no estan en git, o que las variables requeridas estan visibles para el proceso de Codex. No imprimir secretos. Verificar solo presencia/redaccion. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`. No usar `vercel --prod`, no usar `vercel promote`, no modificar Vercel Production, no activar pagos live. Ejecutar `npm run secret:scan`, `npm run test:rls:static`, `npm run production:check`, `npm run staging:check`, `git diff --check`. Si las credenciales staging rotadas estan presentes, crear usuarios staging solo si es necesario con `EXPRESSJOBS_ALLOW_STAGING_MUTATIONS=true` durante el setup, volver a bloquear mutaciones, ejecutar `npm run rls:smoke`, registrar evidencia redacted y actualizar los documentos obligatorios. Si faltan credenciales, mantener bloqueo externo sin intentar escritura remota.
