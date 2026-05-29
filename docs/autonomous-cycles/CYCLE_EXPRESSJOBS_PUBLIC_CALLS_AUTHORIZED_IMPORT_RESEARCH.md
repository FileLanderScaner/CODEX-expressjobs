# Cycle: ExpressJobs Public Calls Authorized Import Research

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_PUBLIC_CALLS_AUTHORIZED_IMPORT_RESEARCH`

## Branch

`codex/public-calls-authorized-import-research`

## Context

PR #60 added the public `/llamados-publicos` radar and Caso Claro preparation CTA. PR #60 was merged into `main` with required remote checks passing and `Supabase Preview` skipped because there were no Supabase changes.

This continuation researched whether the next step should be automated import. The answer is no for now: the product should keep manual/curated public-call references until an official API, RSS feed, open-data file, or explicit permission path is verified.

## Findings

- No official public Uruguay Concursa active-listing API was confirmed.
- gub.uy describes Uruguay Concursa as the portal entry point for public administration contests.
- gub.uy documentation states that organism contest pages can receive concours data by RSS from ONSC when the organism has contests loaded in Uruguay Concursa.
- The Catalogo Nacional de Datos Abiertos has organism-level "Llamados y concursos" datasets with downloadable resources in formats such as CSV, XLSX, XML, and JSON.
- ONSC references a structured "Convocatorias a concursos" database, but this cycle did not confirm a public automated access method.
- `catalogodatos.gub.uy/robots.txt` disallows `/api/` for crawlers and sets `Crawl-Delay: 10`.
- `uruguayconcursa.gub.uy/robots.txt` returned application HTML instead of clear robots directives.

## Decision

Keep V1 manual and safe:

- no scraping;
- no crawler;
- no cron import;
- no hidden external API route;
- no login bypass;
- no copied call content;
- no official affiliation claim;
- every public card keeps visible source attribution;
- human verification remains required.

## Documentation Added

- `docs/EXPRESSJOBS_PUBLIC_CALLS_AUTHORIZED_IMPORT_RESEARCH.md`

## Checks

- `npm run secret:scan`: PASS
- `npm run production:check`: PASS
- `npm run guard:no-production-deploy`: PASS
- `npm run test:rls:static`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test`: PASS
- `npm run build`: PASS
- `npm run staging:check`: PASS
- `npm run rls:smoke`: PASS
- `git diff --check`: PASS
- JSON parse: PASS

## Production Safety

No production action was performed:

- no `vercel --prod`;
- no `vercel promote`;
- no Vercel Production env mutation;
- no Supabase production mutation;
- no PayPal live;
- no real payments;
- no AI Gateway activation;
- no secrets printed;
- no service-role client exposure;
- no RLS relaxation.

## Final State

`PUBLIC_CALLS_AUTHORIZED_IMPORT_RESEARCH_READY_NO_SCRAPING`

## NEXT_CODEX_PROMPT

Modo: `EXPRESSJOBS_PUBLIC_CALLS_ADMIN_REVIEW_QUEUE_DESIGN`

Repo: `C:\CODEX-expressjobs-repo`

Branch sugerida: `codex/public-calls-admin-review-queue-design`

Objetivo: disenar, sin implementar import automatico aun, una cola admin segura para futuros llamados publicos importados o cargados manualmente. Mantener `/llamados-publicos` publico como manual/curado hasta que exista una fuente autorizada.

Reglas de seguridad:

- Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`.
- No usar `vercel --prod`.
- No usar `vercel promote`.
- No tocar Production env vars.
- No activar PayPal live ni pagos reales.
- No activar AI Gateway.
- No usar service-role en cliente.
- No relajar RLS.
- No crear scraping, crawler, cron ni importador externo real.
- No copiar contenido completo de terceros.
- No afirmar afiliacion con organismos publicos.

Tareas:

1. Revisar modelos actuales de admin/dashboard y RLS.
2. Proponer estructura de datos para `public_call_sources` y `public_call_drafts` con campos de fuente, licencia, estado, auditoria y revision humana.
3. Si es seguro y consistente con el repo, preparar migracion idempotente solo para preview/staging.
4. Crear UI/admin minima o documentar wireframe si faltan permisos.
5. Actualizar docs/status/cycle report.
6. Ejecutar checks completos aplicables.
7. Abrir PR contra `main`.

Criterio GO/NO-GO:

- GO solo si no hay scraping/import automatico y RLS/admin review quedan seguros.
- NO-GO si faltan permisos Supabase, si se requiere tocar produccion, si se necesita credencial externa, o si no se puede validar RLS.
