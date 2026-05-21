# Cycle ExpressJobs Full Site Supabase Completion

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_FULL_SITE_SUPABASE_CONNECTIONS_AND_WEBAPP_COMPLETION`

## Branch

`codex/expressjobs-full-site-supabase-completion`

## Initial Structure Detected

- Next.js App Router with TypeScript and Tailwind was already present.
- Supabase client, Auth callback, staging checks, RLS smoke scripts, production guards and Vercel headers were already present.
- Public routes already present: `/`, `/auth`, `/client`, `/worker`, `/worker/jobs`, `/client/jobs/new`, `/ofertas`, `/landing-negocios`, `/sponsor`, `/pricing`, `/privacy`, `/terms`, `/production-paused`.
- Private route surface was partial: `/dashboard/client`, `/dashboard/worker`, and `/admin` existed, but broader dashboard pages and internal APIs were incomplete.
- Supabase local schema already includes the expected `ej_*` tables and RLS migrations.

## Added Or Completed

- Public routes: `/contacto`, `/contact`, `/como-funciona`, `/seguridad`, `/precios`, `/legal/privacy`, `/legal/terms`, `/login`, `/signup`, and demo routes under `/demo/[slug]`.
- Private routes: `/dashboard`, `/dashboard/profile`, `/dashboard/jobs`, `/dashboard/applications`, `/dashboard/messages`, `/dashboard/settings`.
- Internal APIs: `/api/health`, `/api/contact`, `/api/jobs`, `/api/jobs/[id]`, `/api/applications`, `/api/applications/[id]`, `/api/messages`, `/api/profile`.
- Supabase SSR helper modules under `src/lib/supabase/*`.
- Zod validation schemas and consistent JSON response helpers.
- Local non-destructive migration `202605210001_complete_marketplace_connections.sql`.
- SEO files: `robots.ts` and `sitemap.ts`.
- QA, security and deploy docs for Preview activation.

## Supabase Tables Expected

- `ej_profiles`
- `ej_worker_profiles`
- `ej_jobs`
- `ej_job_applications`
- `ej_job_messages`
- `ej_job_reviews`
- `ej_job_events`
- `ej_categories`
- `ej_payment_records`
- `ej_admin_audit_logs`

## APIs

- Existing before cycle: PayPal sandbox route handlers.
- Added this cycle: health, contact, jobs, applications, messages and profile.
- All added mutating handlers use server-side Supabase session context and do not accept owner IDs from the client.

## Risks

- Real Supabase Preview smoke still requires external env values loaded outside git.
- The new migration is local and prepared; it was not applied remotely in this cycle.
- Full real-user browser QA remains pending until Preview envs are configured.
- PR #37 branch protection remains separate and was not bypassed.

## NEXT_CODEX_PROMPT

`EXPRESSJOBS_SUPABASE_REAL_PREVIEW_ACTIVATION_AND_QA`
