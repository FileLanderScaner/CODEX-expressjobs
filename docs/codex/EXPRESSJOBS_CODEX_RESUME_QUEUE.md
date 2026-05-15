# ExpressJobs — Codex Resume Queue

## Purpose

Codex was unavailable for several hours, so this document preserves the current execution queue, priorities, and ready-to-run prompts.

The immediate goal is no longer adding more commercial assets. The closest goal is:

`REACH_SAFE_PRODUCTION_FAST_PATH`

Production remains blocked until the RLS role hardening migration is applied to Supabase staging and real RLS smoke passes.

---

## Current state

- Repo: `C:\CODEX-expressjobs-repo`
- Branch: `codex/expressjobs-autonomous-bootstrap`
- Latest reported commit: `b2c0118 Prepare ExpressJobs revenue execution system`
- Production: `NO-GO_PRODUCTION`
- Manual revenue: `READY_TO_EXECUTE`
- Revenue execution system: `READY_MANUAL_SALES_ONLY`
- Main blocker: `RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY`

Prepared migration:

`supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql`

Main GitHub issues:

- `#10` RLS role escalation blocker
- `#17` Production closeout fast path
- `#18` Supabase write capability unblock
- `#16` Demo landing examples, lower priority until production gate is moving

---

## Priority order

### P0 — Supabase write capability unblock and RLS apply

Mode:

`EXPRESSJOBS_SUPABASE_WRITE_CAPABILITY_UNBLOCK_AND_RLS_APPLY`

Goal:

Restore secure write capability for Supabase staging, apply only the prepared RLS hardening migration, then run real RLS smoke.

Why P0:

Production cannot safely proceed until this passes.

### P1 — Production closeout fast path

Mode:

`EXPRESSJOBS_PRODUCTION_CLOSEOUT_FAST_PATH`

Goal:

Prepare final Preview/Production gate with payments disabled and safe flags after RLS is verified.

### P2 — Final Preview and Production Env Gate

Mode:

`EXPRESSJOBS_FINAL_PREVIEW_AND_PRODUCTION_ENV_GATE`

Goal:

Run final preview smoke, verify Vercel production env matrix, and prepare final human approval for production deploy.

### P3 — Demo landing examples

Mode:

`EXPRESSJOBS_DEMO_LANDING_EXAMPLES`

Goal:

Create demo pages for online sales. This is useful but not the closest production blocker.

---

# P0 Prompt — Supabase write capability unblock and RLS apply

```text
CODEX_PROMPT — EXPRESSJOBS_SUPABASE_WRITE_CAPABILITY_UNBLOCK_AND_RLS_APPLY

Repo:
C:\CODEX-expressjobs-repo

GitHub issues:
#10 — RLS role escalation blocker
#17 — Production closeout fast path
#18 — Supabase unblock: restore staging write capability for RLS hardening apply

Producción:
NO-GO_PRODUCTION

Contexto:
La meta actual es llegar a producción segura lo antes posible.

El bloqueo exacto es:
RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY

Migración preparada:
supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql

Reglas:
- No producción.
- No vercel --prod.
- No vercel promote.
- No PayPal live.
- No tocar Supabase production.
- No aplicar otras migraciones.
- No desactivar RLS.
- No relajar policies.
- No imprimir secretos.
- No commitear .env, .env.local, .env.rls, .vercel, logs, zips ni credenciales.
- Mantener PRODUCTION_STATUS=NO-GO_PRODUCTION hasta que RLS smoke pase.

Objetivo:
Restaurar capacidad segura de write en Supabase staging, aplicar únicamente la migración RLS hardening preparada y correr smoke real.

Proyecto staging esperado:
gnsfyvsodslnehszanra / supabase-expressjobs

Fase 1 — Diagnóstico
1. Confirmar git status.
2. Confirmar rama.
3. Confirmar migración existe.
4. Confirmar Supabase access mode:
   - MCP authenticated yes/no
   - CLI available yes/no
   - SUPABASE_ACCESS_TOKEN present/missing sin imprimir valor
   - staging project linked yes/no

Fase 2 — Si NO hay write capability
1. No aplicar nada.
2. Documentar BLOCKED_SUPABASE_WRITE_CAPABILITY.
3. Indicar exactamente cuál de estas opciones falta:
   - Supabase CLI token local
   - MCP auth refresh
   - SQL manual apply
4. Actualizar docs y issue #18.
5. Mantener production NO-GO.

Fase 3 — Si SÍ hay write capability
1. Aplicar únicamente:
   supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql

2. No aplicar otras migraciones.
3. Ejecutar:
   npm run secret:scan
   npm run staging:check
   npm run test:rls:static
   npm run rls:smoke
   npm run production:check
   git diff --check

4. Validar:
   - client self-promotion a admin bloqueado
   - worker self-promotion a admin bloqueado
   - usuario normal no lee admin audit logs
   - usuario puede editar campos seguros propios
   - RLS smoke general PASS

5. Si pasa:
   - actualizar issue #10 como ready for human review / verified
   - actualizar issue #17
   - actualizar issue #18
   - marcar RLS_ROLE_ESCALATION_FIX=APPLIED_AND_SMOKE_PASS
   - preparar siguiente gate: EXPRESSJOBS_FINAL_PREVIEW_AND_PRODUCTION_ENV_GATE

6. Si falla:
   - documentar error exacto sin secretos
   - mantener production NO-GO
   - preparar fix prompt

Crear/actualizar:
docs/production/EXPRESSJOBS_SUPABASE_WRITE_CAPABILITY_UNBLOCK.md
docs/security/EXPRESSJOBS_RLS_ROLE_ESCALATION_FIX.md
docs/autonomous-cycles/CYCLE_EXPRESSJOBS_SUPABASE_WRITE_CAPABILITY_UNBLOCK_AND_RLS_APPLY.md
docs/EXPRESSJOBS_DIRECTOR_STATUS.md
docs/expressjobs-director-status.json

Commit:
git add docs
git commit -m "Document ExpressJobs Supabase write capability gate"
git push

Salida:
# ExpressJobs Director Report

Debe incluir:
- Modo ejecutado
- Commit final
- Supabase access mode
- Write capability: yes/no
- Migration applied: yes/no
- RLS smoke result
- Estado issue #10
- Estado issue #17
- Estado issue #18
- Production decision
- Único próximo bloqueo si NO-GO
- NEXT_CODEX_PROMPT completo
```

---

# P1 Prompt — Production closeout fast path

```text
CODEX_PROMPT — EXPRESSJOBS_PRODUCTION_CLOSEOUT_FAST_PATH

Repo:
C:\CODEX-expressjobs-repo

GitHub issue:
#17 — Production closeout: reach safe public production without skipping RLS gate

Producción actual:
NO-GO_PRODUCTION

Meta:
Llegar a producción pública segura lo antes posible, sin seguir agregando features que no sean necesarias para producción.

Contexto:
El usuario corrigió la prioridad: la meta inmediata ya no es ventas manuales ni más assets comerciales. La meta inmediata es producción segura.

Estado actual:
- Código MVP: PASS
- Google Auth Preview: PASS
- Browser smoke Preview previo: PASS
- RLS smoke real previo: PASS
- Revenue manual: READY, pero no es prioridad ahora
- Producción: NO-GO_PRODUCTION

Bloqueo principal:
RLS_ROLE_ESCALATION_RISK

Migración ya preparada:
supabase/migrations/20260515132404_harden_expressjobs_profile_role_updates.sql

Estado:
- RLS_ROLE_ESCALATION_FIX=PREPARED_LOCAL_NOT_APPLIED
- RLS_ROLE_HARDENING_APPLY=BLOCKED_SUPABASE_WRITE_CAPABILITY
- Supabase MCP: Auth required
- PayPal sandbox/live: bloqueado por credenciales externas
- PayPal live: OFF

Decisión:
Producción puede salir sin PayPal si:
- ENABLE_PAYMENTS=false
- PayPal live OFF
- premium/payment CTAs ocultos o desactivados
- no hay cobros dentro de la app

Reglas obligatorias:
- No agregar features nuevas salvo que desbloqueen producción.
- No producción hasta cerrar gate RLS.
- No vercel --prod sin aprobación humana final explícita.
- No vercel promote sin aprobación humana final explícita.
- No PayPal live.
- No pagos reales dentro de la app.
- No imprimir secretos.
- No commitear .env, .env.local, .env.rls, .vercel, logs, zips ni credenciales.
- No modificar Supabase production.
- No relajar RLS.
- No desactivar RLS.
- Mantener AI agents OFF.
- Mantener PRODUCTION_STATUS=NO-GO_PRODUCTION hasta el último gate aprobado.

Objetivo del ciclo:
Preparar y ejecutar el fast path de producción, cerrando primero el bloqueo RLS en staging.

Crear/actualizar:
docs/production/EXPRESSJOBS_PRODUCTION_CLOSEOUT_FAST_PATH.md
docs/production/EXPRESSJOBS_PRODUCTION_GO_NO_GO.md
docs/production/EXPRESSJOBS_PRODUCTION_ENV_MATRIX.md
docs/production/EXPRESSJOBS_FINAL_PREVIEW_SMOKE.md
docs/production/EXPRESSJOBS_PAYMENTS_OFF_PRODUCTION_PLAN.md
docs/autonomous-cycles/CYCLE_EXPRESSJOBS_PRODUCTION_CLOSEOUT_FAST_PATH.md
docs/EXPRESSJOBS_DIRECTOR_STATUS.md
docs/expressjobs-director-status.json

Checks obligatorios:
npm run secret:scan
npm run staging:check
npm run test:rls:static
npm run rls:smoke
npm run lint
npm run typecheck
npm run test
npm run build
npm run production:check
git diff --check

Commit:
git add docs
git commit -m "Prepare ExpressJobs production closeout fast path"
git push

Salida obligatoria:
# ExpressJobs Director Report

Debe incluir:
- Modo ejecutado
- Commit final
- Estado issue #10
- Estado issue #17
- Supabase write capability
- RLS apply: APPLIED / BLOCKED
- RLS smoke result
- Production readiness result
- Vercel readiness result
- PayPal production decision
- Google Auth production decision
- Env presence PRESENT/MISSING sin valores
- Checks
- Decisión PRODUCTION_GO / NO-GO
- Si NO-GO: único bloqueo exacto y acción humana exacta requerida
- Si GO: comando final recomendado y pedir aprobación humana explícita antes de ejecutar
- NEXT_CODEX_PROMPT completo
```

---

# P3 Prompt — Demo landing examples

Only execute after the production closeout path is no longer blocked, or if the user explicitly switches back to revenue/demo work.

```text
CODEX_PROMPT — EXPRESSJOBS_DEMO_LANDING_EXAMPLES

Repo:
C:\CODEX-expressjobs-repo

GitHub issue:
#16 — Growth push: demo landing examples for online sales

Producción:
NO-GO_PRODUCTION

Contexto:
ExpressJobs ya tiene sistema comercial manual listo:
- REVENUE_EXECUTION_SYSTEM=READY_MANUAL_SALES_ONLY
- MANUAL_REVENUE=READY_TO_EXECUTE
- Páginas existentes: /ofertas, /landing-negocios, /sponsor

Objetivo:
Crear ejemplos demo de páginas simples para rubros vendibles.

Crear páginas:
- src/app/demo/peluqueria/page.tsx
- src/app/demo/estetica/page.tsx
- src/app/demo/tecnico-reparaciones/page.tsx
- src/app/demo/limpieza/page.tsx
- src/app/demo/delivery/page.tsx

Reglas:
- No producción.
- No pagos dentro de la app.
- No datos reales de negocios.
- No hardcodear teléfono personal.
- Mantener PRODUCTION_STATUS=NO-GO_PRODUCTION.

Checks:
npm run secret:scan
npm run lint
npm run typecheck
npm run test
npm run build
npm run production:check
git diff --check

Commit:
git add src docs
git commit -m "Add ExpressJobs demo landing examples"
git push
```

---

## Director decision

Current closest goal:

`RLS hardening apply + real smoke PASS`

Do not drift to revenue/demo tasks unless explicitly requested after the production blocker is clear.
