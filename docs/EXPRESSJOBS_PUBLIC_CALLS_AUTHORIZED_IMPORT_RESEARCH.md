# ExpressJobs Public Calls Authorized Import Research

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

Mode: `EXPRESSJOBS_PUBLIC_CALLS_AUTHORIZED_IMPORT_RESEARCH`

This document researches safe future import options for the `/llamados-publicos` radar. It does not enable scraping, crawling, cron jobs, API imports, AI Gateway, payments, or production deploys.

## Current Product Decision

V1 stays manual and curated:

- Keep `src/lib/public-calls-data.ts` as a manual seed/reference data source.
- Keep every card linked to an official external source.
- Do not claim currentness unless each listing is manually verified.
- Do not copy full external call content.
- Do not claim affiliation with Uruguay Concursa, ONSC, AGESIC, gub.uy, Udelar, or any public body.

## Official Source Findings

### Uruguay Concursa / gub.uy

The official gub.uy Uruguay Concursa page describes Uruguay Concursa as the state portal entry point for public administration contests and lists categories of calls managed by ONSC or by public organisms.

Research result:

- No official public API for active Uruguay Concursa listings was confirmed in this cycle.
- The official flow appears oriented to portal access, registered users, official call pages, and user postulation.
- Automated extraction from `uruguayconcursa.gub.uy` is not authorized by this research.

Safe use:

- Link to the official page or a manually verified official call URL.
- Keep source name and source URL visible.
- Ask users to verify details in the official source before acting.

### RSS Through gub.uy Organism Sites

gub.uy documentation states that some organism "Concursos" sections receive information by RSS from ONSC when the organism has contests loaded in Uruguay Concursa.

Research result:

- RSS is a promising authorized path only when a public organism exposes an RSS/feed URL or gub.uy publishes a stable feed endpoint.
- This cycle did not identify a canonical global RSS endpoint for all active Uruguay Concursa calls.
- No RSS ingestion was implemented.

Safe future path:

- Create an allowlist of exact official feed URLs.
- Store feed URL, organism, terms, license/source page, last checked timestamp, and retrieval method.
- Rate-limit fetches and keep human review before publication.

### Catalogo Nacional de Datos Abiertos

The Catalogo Nacional de Datos Abiertos contains "Llamados y concursos" datasets by organism, with downloadable resource formats such as CSV, XLSX, XML, and JSON for some publishers.

Research result:

- These datasets are useful for authorized open-data import candidates.
- They may be annual, historical, organism-specific, or not equivalent to a live active call feed.
- Terms require respecting licenses, source attribution, restrictions, data quality limits, and the responsibility of each publisher.

Safe future path:

- Prefer explicit resource download links from dataset pages over undocumented endpoints.
- Do not use catalog `/api/` endpoints until terms, robots, and permission are reviewed for the intended automated use.
- Preserve source metadata, license, publisher, update frequency, and original dataset URL.

### ONSC Database References

An ONSC document references a "Convocatorias a concursos" database for calls published in Uruguay Concursa and managed by ONSC, with fields such as organism, title, quota information, positions, status, and contest modality.

Research result:

- This is evidence that structured data may exist.
- This cycle did not confirm a public API or automated access method for that database.

Safe future path:

- Contact ONSC/AGESIC for an official dataset, API, feed, or collaboration path before automation.
- Treat any non-public or login-only data as out of scope.

## Robots And Terms Notes

- `https://catalogodatos.gub.uy/robots.txt` disallows `/api/` for crawlers and sets `Crawl-Delay: 10`.
- `https://www.uruguayconcursa.gub.uy/robots.txt` returned the application HTML instead of clear robots directives during this cycle.
- `https://www.gub.uy/robots.txt` exists and should be reviewed before any crawler-like behavior.
- gub.uy and Catalogo terms require lawful, non-disruptive, source-aware use and preserve third-party/public-body rights.

Decision:

No crawler, scraper, automated Uruguay Concursa extraction, or cron import is approved.

## Recommended V2 Architecture

1. Keep V1 manual radar live in preview/staging.
2. Add a typed source registry before any import:
   - `sourceType`: `manual`, `official-rss`, `open-data-file`, `official-api`
   - `sourceName`
   - `sourceUrl`
   - `licenseUrl`
   - `publisher`
   - `updateFrequency`
   - `lastVerifiedAt`
   - `retrievalMethod`
   - `humanReviewedAt`
3. Build an admin-only draft importer that writes to a review queue, not directly to public cards.
4. Publish only human-reviewed summaries with attribution and official source links.
5. Keep Caso Claro as preparation help, not as official representation or application submission authority.

## Required Gates Before Any Automated Import

- Official source URL or feed URL verified.
- Terms/license review recorded.
- Robots review recorded where applicable.
- Rate limits defined.
- No login bypass.
- No service-role usage in client code.
- No copying full external content.
- Human review before publication.
- RLS policies for imported/draft records.
- Preview smoke and local checks pass.

## Blockers For Live Import

- `BLOCKED_EXTERNAL_PERMISSION`: no confirmed official Uruguay Concursa API or written authorization for automatic extraction.
- `BLOCKED_SOURCE_LICENSE_REVIEW`: every open-data source needs license and attribution recorded before use.
- `BLOCKED_AUTOMATED_IMPORT_GOVERNANCE`: admin review queue and audit fields do not exist yet.

## Next Step

Run a scoped implementation cycle only after a source is explicitly authorized:

- Start with one official open-data dataset or one official RSS feed.
- Import into a private admin review queue.
- Keep public `/llamados-publicos` manual until QA and legal/source checks pass.
