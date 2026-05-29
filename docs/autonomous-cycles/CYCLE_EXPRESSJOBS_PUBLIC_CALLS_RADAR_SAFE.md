# ExpressJobs Public Calls Radar Safe

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_PUBLIC_CALLS_RADAR_SAFE`

Branch: `codex/public-calls-radar-caso-claro`

Updated: `2026-05-28T23:23:30-03:00`

## Scope

Add a safe public `/llamados-publicos` page for official/public call references in Uruguay, connected to Caso Claro application preparation services. This cycle does not scrape Uruguay Concursa, does not copy external listings, does not create import automation, and does not claim affiliation with any public body.

## Implementation

- Added `src/lib/public-calls-data.ts` with manual seed references and visible external sources.
- Added `src/components/public-calls-client.tsx` for local-only filters.
- Added `src/app/llamados-publicos/page.tsx`.
- Added `Llamados públicos` to desktop/mobile navigation.
- Added a homepage teaser without removing critical CTAs.
- Added docs at `docs/EXPRESSJOBS_PUBLIC_CALLS_RADAR.md`.
- Updated public surface tests for the new route, navigation, source attribution, no scraping dependencies, and required home CTAs.

## Source Policy

General official sources used as references:

- `https://uruguayconcursa.gub.uy/`
- `https://www.gub.uy/llamados-concursos-publicos`
- `https://www.gub.uy/oficina-nacional-servicio-civil/tramites-y-servicios/servicios/uruguay-concursa`
- `https://udelar.edu.uy/portal/llamados/`

The implementation uses only manually curated reference summaries. It does not assert current openings beyond the official source.

## Safety

- No scraping.
- No crawler.
- No cron.
- No import API route.
- No Puppeteer, Cheerio or Axios dependency.
- No copied external listing content.
- No public-body affiliation claim.
- No PayPal live.
- No real payments.
- No AI Gateway activation.
- No production deploy or promote.

## Checks

Final local validation:

- `npm run secret:scan`: PASS.
- `npm run production:check`: PASS.
- `npm run guard:no-production-deploy`: PASS.
- `npm run test:rls:static`: PASS.
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run test`: PASS.
- `npm run build`: PASS.
- `git diff --check`: PASS.
- Browser smoke: PASS for `/`, `/llamados-publicos`, `/servicios`, mobile navigation, and WhatsApp CTA.

## Current State

`PUBLIC_CALLS_RADAR_READY_FOR_PREVIEW`

## Next Mode

`EXPRESSJOBS_PUBLIC_CALLS_AUTHORIZED_IMPORT_RESEARCH`

Research only. Do not execute scraping.

## NEXT_CODEX_PROMPT

Actua como equipo autonomo senior para ExpressJobs / Trabajos Rapidos.

Repo: `C:\CODEX-expressjobs-repo`

Branch sugerida: `codex/public-calls-authorized-import-research`

Modo: `EXPRESSJOBS_PUBLIC_CALLS_AUTHORIZED_IMPORT_RESEARCH`

Objetivo: investigar una posible integracion autorizada de llamados publicos sin ejecutar scraping ni automatizacion de extraccion.

Reglas:

- No usar `vercel --prod`.
- No usar `vercel promote`.
- No tocar Production env vars.
- No activar PayPal live.
- No activar pagos reales.
- No activar AI Gateway.
- No scrapear Uruguay Concursa ni terceros.
- No crear crawler, cron ni API route de scraping.
- No imprimir secretos.
- Mantener `PRODUCTION_STATUS=NO-GO_PRODUCTION`.

Tareas:

1. Investigar si existe API oficial.
2. Investigar datos abiertos relacionados.
3. Revisar si hay RSS/feed autorizado.
4. Revisar condiciones de uso y `robots.txt`.
5. Proponer alternativa manual o semiautorizada.
6. Proponer camino de convenio/integracion oficial.
7. Documentar riesgos, limites y criterio GO/NO-GO.

Checks:

- `npm run secret:scan`
- `npm run production:check`
- `npm run guard:no-production-deploy`
- `npm run test:rls:static`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `git diff --check`
