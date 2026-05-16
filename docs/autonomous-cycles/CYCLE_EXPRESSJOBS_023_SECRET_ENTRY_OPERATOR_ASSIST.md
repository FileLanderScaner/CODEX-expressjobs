# Cycle ExpressJobs 023 Secret Entry Operator Assist

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_SECURITY_AUDIT`

## Objetivo

Abrir PowerShell en el repo Git real para que el operador agregue secretos staging/preview sin exponerlos en Codex chat ni commitearlos.

## Resultado

- PowerShell interactiva abierta en `C:\CODEX-expressjobs-repo`.
- Se confirmó que el repo real contiene `.git`, `.vercel`, `.env.example`, `.env.rls.example` y scripts de staging/RLS.
- No se pidió ni se imprimió ningún secreto.
- Producción permanece en `NO-GO_PRODUCTION`.

## Instrucciones seguras para secretos

1. Rotar primero cualquier `SUPABASE_SERVICE_ROLE_KEY` previamente expuesta en chat.
2. Usar solo credenciales del proyecto Supabase staging `gnsfyvsodslnehszanra`.
3. Crear/editar `.env.local` desde `.env.example`; no commitear.
4. Crear/editar `.env.rls` desde `.env.rls.example`; no commitear.
5. Cargar Vercel solo en Preview, nunca Production.
6. Mantener pagos y agentes desactivados.

## Bloqueos

- `BLOCKED_SECURITY_RISK_SECRET_EXPOSED_ROTATION_REQUIRED`
- `SUPABASE_ACCESS_TOKEN_MISSING`
- `NEXT_PUBLIC_SUPABASE_URL_MISSING`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY_MISSING`
- `SUPABASE_SERVICE_ROLE_KEY_MISSING`

## Checks

- `npm run secret:scan`: PASS
- `npm run test:rls:static`: PASS
- `npm run production:check`: PASS
- `git diff --check`: PASS
- `npm run staging:check`: BLOCKED, missing staging env vars
- `npm run rls:smoke`: NOT RUN, depends on rotated staging credentials

## Próximo modo elegido

`EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS`

## NEXT_CODEX_PROMPT

Ejecutar `EXPRESSJOBS_SUPABASE_RLS_SMOKE_TESTS` en `C:\CODEX-expressjobs-repo`. Antes de cualquier escritura remota, verificar que la service-role key expuesta fue rotada y que `.env.local` / `.env.rls` existen fuera de git con credenciales staging del proyecto `gnsfyvsodslnehszanra`. No imprimir secretos. No usar `vercel --prod`, no usar `vercel promote`, no modificar Vercel Production, no activar pagos live, mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`. Ejecutar checks seguros (`npm run secret:scan`, `npm run test:rls:static`, `npm run production:check`, `npm run staging:check`, `git diff --check`). Si las credenciales staging estan presentes y rotadas, crear usuarios staging con `EXPRESSJOBS_ALLOW_STAGING_MUTATIONS=true` solo durante setup, volverlo a `false`, ejecutar `npm run rls:smoke`, registrar evidencia redacted y actualizar `docs/EXPRESSJOBS_DIRECTOR_STATUS.md`, `docs/expressjobs-director-status.json` y un nuevo `docs/autonomous-cycles/CYCLE_EXPRESSJOBS_XXX_REPORT.md`. Si falta cualquier credencial o hay duda de rotacion, reportar bloqueo y no escribir remoto.
