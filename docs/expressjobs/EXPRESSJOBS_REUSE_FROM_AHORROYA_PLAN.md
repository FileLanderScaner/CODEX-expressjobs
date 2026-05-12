# ExpressJobs Reuse From AhorroYA Plan

`AHORROYA_TECHNICAL_BASE=C:\CODEX-expressjobs`

## Reusable Directly

- General concept of having docs, release gates, staging gates, and security notes.
- Package script discipline: lint, typecheck, test, build.

## Reusable With Adaptation

- Vercel security headers, adapted for Next.js and without PayPal live domains.
- Supabase client/server separation patterns, adapted to ExpressJobs.
- RLS-first design approach, adapted to `ej_*` marketplace tables.
- Tracking fallback pattern, adapted to ExpressJobs event names.

## Not Reusable

- AhorroYA product docs.
- Price/supermarket schemas.
- Pricing scrapers and catalog logic.
- PayPal live/sandbox implementation.
- AI agent implementation.

## Dangerous Or Not Committed

- `.env` files.
- Logs.
- `test-results/`.
- Zip archives.
- Old audit reports.
- Product documents presenting AhorroYA as the current product.
