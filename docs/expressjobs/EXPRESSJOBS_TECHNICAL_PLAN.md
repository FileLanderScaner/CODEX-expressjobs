# ExpressJobs Technical Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth/Postgres/RLS
- Vercel Preview/Staging

## Architecture

- `src/app`: routes and UI surfaces.
- `src/components`: reusable interface elements.
- `src/lib`: typed constants, environment gates, Supabase client, tracking, WhatsApp share helpers.
- `supabase/migrations`: schema and RLS.
- `docs/expressjobs`: operating and release documentation.

## Near-Term Work

- Wire real Supabase Auth UI.
- Replace demo jobs with RLS-backed queries.
- Add server actions or route handlers for mutations.
- Add RLS integration tests against a staging Supabase project.
- Add E2E smoke tests after staging env is configured.
