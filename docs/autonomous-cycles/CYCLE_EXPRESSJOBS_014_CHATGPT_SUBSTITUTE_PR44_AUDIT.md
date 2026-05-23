# ExpressJobs Director Report

## Modo ejecutado
`CHATGPT_SUBSTITUTE_PR44_SUPABASE_ADVISOR_AND_BRANCH_CAPACITY_AUDIT`

## Contexto
Codex no está disponible hasta el 26 de mayo. ChatGPT tomó rol de Director técnico sustituto para avanzar de forma segura sin tocar producción, sin aplicar migraciones riesgosas y sin exponer secretos.

## Rama local
`codex/expressjobs-supabase-security-advisor-closeout`

## Evidencia local aportada por el usuario
- `git status --short`: clean
- `git branch --show-current`: `codex/expressjobs-supabase-security-advisor-closeout`
- `git log --oneline -5`:
  - `3a5e1f4 Normalize PR 44 status head metadata`
  - `59304cd Update PR 44 remote gate status`
  - `9ce8eaa Document PR 44 provider access blockers`
  - `1c35b96 Restore Supabase preview migration compatibility`
  - `f8ee530 Fix Supabase preview migration ordering`

## Checks ejecutados
- `npm run production:check`: PASS
- `npm run staging:check`: PASS
- `npm run test:rls:static`: PASS, 12 tests
- `npm run rls:smoke:messages`: PASS

## RLS smoke messages
Resultado:
`status=PASS`

Cobertura validada:
- fixture accepted job created: PASS
- worker application created: PASS
- client accepts application: PASS
- client assigns accepted worker: PASS
- job client insert/select: PASS
- accepted worker insert/select: PASS
- random user select/insert blocked: PASS
- non accepted worker select/insert blocked: PASS
- anonymous select/insert blocked: PASS
- sender spoofing blocked: PASS
- normal user update/delete blocked: PASS
- admin update/delete: PASS

## Hallazgo crítico
La seguridad funcional de `ej_job_messages` está validada con sesiones reales de Supabase:
- participantes aceptados pueden leer/enviar;
- usuarios aleatorios no pueden leer/enviar;
- anónimos no pueden leer/enviar;
- spoofing de sender queda bloqueado;
- update/delete normal queda bloqueado;
- admin update/delete pasa.

## Supabase branch capacity rule
El usuario confirmó una restricción operativa del plan Free de Supabase:
solo se permiten 2 branches simultáneas.

Nueva regla obligatoria:
Antes de cualquier migración, DDL apply, Preview Branch, Supabase branch workflow o Advisor closeout apply:
1. listar branches de Supabase;
2. confirmar al menos 1 slot disponible;
3. si no hay slot o existen branches fallidas, detener;
4. reportar `BLOCKED_SUPABASE_BRANCH_CAPACITY`;
5. documentar branch name, branch id, status, parent ref y PR asociado;
6. no aplicar migraciones hasta resolver capacidad.

## Estado Supabase observado desde ChatGPT
Branches visibles previamente:
- `main` — `MIGRATIONS_FAILED`
- `codex/expressjobs-supabase-security-advisor-closeout` — `MIGRATIONS_FAILED`

Por lo tanto:
`SUPABASE_BRANCH_CAPACITY_PREFLIGHT_REQUIRED=true`

## Supabase Advisor observado desde ChatGPT
Security:
- `authenticated_security_definer_function_executable` sigue marcando `public.ej_set_profile_role(requested_role text, requested_full_name text)`.
- `auth_leaked_password_protection` sigue desactivado y requiere acción manual en Dashboard.

Performance:
- `realtime.messages` mantiene warnings `auth_rls_initplan` para `job_chat_receive` y `job_chat_send`.
- `ej_categories` y `ej_worker_profiles` mantienen warnings `multiple_permissive_policies`.
- varios indexes aparecen como unused; se consideran menor prioridad hasta tener tráfico real.

## Decisión
No aplicar nuevas migraciones desde esta fase.
No borrar branches.
No resetear preview.
No tocar producción.

## Estado de producción
`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Confirmaciones:
- No `vercel --prod`
- No `vercel promote`
- No mutación de Vercel Production envs
- No Supabase production mutation
- No PayPal live
- No pagos reales
- No secrets

## Próximo modo recomendado
`EXPRESSJOBS_PR44_REVIEW_BRANCH_CAPACITY_AND_ADVISOR_RECHECK_GATE`

Objetivo:
1. confirmar branch capacity;
2. resolver estado `MIGRATIONS_FAILED`;
3. revisar si PR #44 debe mergearse como reconciliación Git/Supabase;
4. habilitar leaked password protection manualmente en Supabase Dashboard;
5. reconsultar Supabase Advisor;
6. mantener producción NO-GO.
