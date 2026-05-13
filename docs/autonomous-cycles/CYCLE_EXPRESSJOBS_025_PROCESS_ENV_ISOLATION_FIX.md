# Cycle ExpressJobs 025 Process Env Isolation Fix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## Objetivo

Resolver el bloqueo donde el operador pego secretos rotados en la PowerShell abierta, pero Codex no puede leerlos porque pertenecen a otro proceso.

## Resultado

Se agrego `scripts/write-local-env-from-process.ps1`. El helper debe ejecutarse en la misma PowerShell donde se pegaron los `$env:...`. Escribe `.env.local` y `.env.rls`, ambos ignorados por Git, sin imprimir valores secretos.

## Seguridad

- No se imprimieron secretos.
- No se leyeron valores secretos.
- No se escribio contra Supabase remoto.
- No se ejecuto Vercel deploy.
- Produccion permanece `NO-GO_PRODUCTION`.

## Checks

- `.env.local`: todavia ausente antes de ejecutar helper.
- `.env.rls`: todavia ausente antes de ejecutar helper.
- Git ignore confirmado para `.env.local` y `.env.rls`.

## Bloqueos

- `BLOCKED_EXTERNAL_CREDENTIALS`
- `STAGING_ENV_FILES_NOT_VISIBLE_TO_CODEX`
- `POWERSHELL_PROCESS_ENV_ISOLATION`

## Proximo modo elegido

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS` en `C:\CODEX-expressjobs-repo` despues de que el operador ejecute `.\scripts\write-local-env-from-process.ps1` en la misma PowerShell donde pego los `$env:...`. Verificar que `.env.local` y `.env.rls` existan y esten ignorados por Git, sin imprimir secretos. Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`. No usar `vercel --prod`, no usar `vercel promote`, no modificar Vercel Production, no activar pagos live. Cargar env local de forma redacted, ejecutar `npm run secret:scan`, `npm run test:rls:static`, `npm run production:check`, `npm run staging:check`, `git diff --check`. Si las credenciales staging rotadas estan presentes, crear usuarios staging solo si es necesario con `EXPRESSJOBS_ALLOW_STAGING_MUTATIONS=true` durante el setup, volver a bloquear mutaciones, ejecutar `npm run rls:smoke`, registrar evidencia redacted y actualizar los documentos obligatorios.
