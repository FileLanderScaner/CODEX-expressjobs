# ExpressJobs Next Codex Prompts

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Prompt 1: EXPRESSJOBS_SUPABASE_STAGING_ACTIVATION_RETRY

```text
Actúa como Supabase Architect, Security Engineer, QA Lead y Director Autónomo.

PROYECTO:
ExpressJobs / Trabajos Rapidos

REPO:
C:\CODEX-expressjobs-repo

RAMA:
codex/expressjobs-autonomous-bootstrap

MODO:
EXPRESSJOBS_SUPABASE_STAGING_ACTIVATION_RETRY

PRECONDICIÓN:
Supabase CLI ya está instalado y autenticado, o Supabase MCP/tooling está disponible, o el proyecto staging fue creado manualmente.

OBJETIVO:
Activar Supabase staging real sin tocar producción, aplicar migración `ej_*`, crear usuarios staging y ejecutar RLS real smoke.

NO HACER:
No tocar producción.
No imprimir secretos.
No commitear `.env`.
No usar proyectos AhorroYA.
No desactivar RLS.
No bajar seguridad para pasar tests.
No activar pagos live.
No activar agentes IA.

TAREAS:
1. Confirmar repo/rama.
2. Confirmar proyecto Supabase staging no producción.
3. Aplicar `supabase/migrations/202605120001_expressjobs_mvp_schema.sql`.
4. Verificar tablas `ej_*`, RLS y policies.
5. Crear usuarios staging client/worker/admin sin imprimir passwords.
6. Ejecutar `npm run staging:check`.
7. Ejecutar `npm run rls:smoke`.
8. Documentar evidencia redaccionada.
9. Actualizar director status JSON.
10. Ejecutar `npm run secret:scan`, `npm run test:rls:static`, `git diff --check`.
11. Commit seguro.

Al finalizar, generar NEXT_CODEX_PROMPT.

Mantener:
PRODUCTION_STATUS=NO-GO_PRODUCTION
```

## Prompt 2: EXPRESSJOBS_VERCEL_PREVIEW_SAFE_RETRY

```text
Actúa como Vercel Release Manager, DevOps Engineer, Security Engineer, QA Lead y Director Autónomo.

PROYECTO:
ExpressJobs / Trabajos Rapidos

REPO:
C:\CODEX-expressjobs-repo

RAMA:
codex/expressjobs-autonomous-bootstrap

MODO:
EXPRESSJOBS_VERCEL_PREVIEW_SAFE_RETRY

PRECONDICIÓN:
Vercel Production Branch fue revisada y `codex/expressjobs-autonomous-bootstrap` NO es production branch. Preview env vars están listas solo para Preview/Development.

OBJETIVO:
Crear un Vercel Preview seguro, confirmar target Preview, correr browser smoke y documentar evidencia.

NO HACER:
No usar `vercel --prod`.
No usar `vercel promote`.
No tocar Production envs.
No reconectar Git si branch targeting no está verificado.
No imprimir secretos.
No activar pagos live.
No activar agentes IA.

TAREAS:
1. Confirmar repo/rama.
2. Confirmar checklist Vercel reconnect.
3. Configurar o verificar Preview env vars.
4. Ejecutar deploy Preview solamente.
5. Inspeccionar deployment target.
6. Si target es production, remover deployment y detener.
7. Si target es Preview, correr browser smoke en `/`, `/pricing`, `/auth`, `/onboarding`, `/client`, `/worker`, `/admin`.
8. Confirmar `NO-GO_PRODUCTION` visible y sin secretos.
9. Documentar URL Preview y evidencia.
10. Ejecutar checks y commit seguro.

Al finalizar, generar NEXT_CODEX_PROMPT.

Mantener:
PRODUCTION_STATUS=NO-GO_PRODUCTION
```

## Prompt 3: EXPRESSJOBS_FIRST_10_INTERNAL_TESTERS_GO_GATE

```text
Actúa como Product Engineer, QA Lead, Trust & Safety Lead, Growth Lead y Director Autónomo.

PROYECTO:
ExpressJobs / Trabajos Rapidos

REPO:
C:\CODEX-expressjobs-repo

RAMA:
codex/expressjobs-autonomous-bootstrap

MODO:
EXPRESSJOBS_FIRST_10_INTERNAL_TESTERS_GO_GATE

PRECONDICIÓN:
RLS real smoke PASS y Vercel Preview browser smoke PASS. No claims engañosos abiertos.

OBJETIVO:
Evaluar si se habilita una prueba controlada interna de 10 testers usando el paquete dry-run existente.

NO HACER:
No producción.
No outreach público.
No prometer empleo garantizado.
No prometer ingresos garantizados.
No activar pagos live.
No activar agentes IA.
No recolectar datos personales en Git.

TAREAS:
1. Verificar evidencia RLS real PASS.
2. Verificar Preview browser smoke PASS.
3. Revisar first 10 package y safety checklist.
4. Emitir GO/NO-GO para first 10 internal testers.
5. Si GO, preparar solo ejecución controlada interna.
6. Si NO-GO, documentar bloqueos.
7. Actualizar director status JSON.
8. Ejecutar checks y commit seguro.

Al finalizar, generar NEXT_CODEX_PROMPT.

Mantener:
PRODUCTION_STATUS=NO-GO_PRODUCTION
```
