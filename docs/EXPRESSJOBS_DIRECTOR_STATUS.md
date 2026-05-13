# ExpressJobs Director Status

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

Bootstrap cycle 001 created a clean Next.js MVP in the real Git repository.
Cycle 002 expanded it into a usable MVP foundation with client, worker, admin, onboarding, legal, pricing, services, and QA documentation.
Cycle 003 added static Supabase RLS smoke tests and identified live RLS validation as blocked by external staging Supabase access.
Cycle 004 prepared live staging RLS smoke scripts, Vercel Preview runbooks, env templates, and production blockers without touching production.
Cycle 005 completed a static security audit and confirmed production remains blocked by external staging/preview validation.
Cycle 006 formalized release gate status as `EXPRESSJOBS_CODE_READY_ENV_PENDING` and `EXPRESSJOBS_NO_GO_PRODUCTION`.
Cycle 007 completed a product UX review and documented copy/flow risks before Preview.
Cycle 008 prepared the first 100 users controlled launch package, including tester onboarding, outreach templates, feedback workflow, metrics, and trust/safety notes.
Cycle 009 added anonymous tester feedback tracking and onboarding checklist docs.
AI Studio reference review adapted useful "Trabajos Rapidos" UX/product ideas while keeping ExpressJobs infrastructure, `ej_*` schema, and NO-GO production status.
Cycle 010 hardened trust/safety docs, job content rules, incident handling, and safety copy.
Cycle 011 closed Preview/Staging environment readiness with Supabase and Vercel runbooks, while external access remains blocked.
Cycle 012 updated tester tracker/onboarding gates so public cohorts cannot be confused with local demo or unvalidated staging.
Cycle 013 finalized the current release gate as `CODE_READY_ENV_PENDING` and `NO-GO_PRODUCTION`, with Supabase and Vercel access blockers documented as external requirements.
Cycle 014 prepared the first 10 tester dry-run package with scripts, selection criteria, observation forms, feedback form, safety checklist, and GO/NO-GO rules while keeping external testers blocked.
Cycle 015 attempted Supabase/Vercel activation. Vercel project `codex-expressjobs` was created, but Supabase access remained unavailable. Vercel deployments inspected as production target were removed immediately, and Git auto-deploy was disconnected for safety.
Cycle 016 closed the environment blockers with Supabase access and Vercel Preview safety runbooks. A post-push production-target Vercel deployment was removed, and safe retry remains disabled until Supabase access and Vercel branch targeting are fixed.
Cycle 017 consolidated the current state index, master next steps runbook, status matrix, and future Codex prompts for safe handoff.
Cycle 018 retried Supabase staging activation. Supabase CLI was available through `npx`, local init completed, and local metadata points to `supabase-expressjobs`, but remote commands remained blocked because `SUPABASE_ACCESS_TOKEN` was not present in the Codex process. A pasted token must be revoked/rotated before retry.
Cycle 018 read-only audit confirmed Supabase MCP is configured globally, but callable Supabase MCP tools were not exposed in the active agent process. Remote schema remains unverified.
Cycle 019 confirmed Supabase MCP tools are exposed in this Codex session for read-only work. Remote `public.ej_*` schema matches the local MVP migration at the table/RLS/policy/helper level. Write access remains blocked for real RLS smoke tests, and Supabase Advisor warnings for helper function `search_path` must be handled in a future reviewed migration.
Cycle 020 prepared a non-destructive migration to pin `search_path` for `public.ej_is_admin()` and `public.ej_is_job_participant(uuid)`. Remote apply and real RLS smoke remain blocked because `SUPABASE_ACCESS_TOKEN`, Supabase URL/anon key, and service-role auth capability are not present in the Codex process.
Cycle 021 rechecked secure staging capability. `SUPABASE_ACCESS_TOKEN`, Supabase URL/anon key, and service-role key are still missing, so no remote link, migration apply, staging user creation, or RLS smoke write was attempted.
Cycle 022 recorded a Supabase service-role credential exposure in chat. The credential must be rotated before any staging write, migration apply, user creation, or RLS smoke execution.
Cycle 023 opened a local PowerShell in the Git repo for secure secret entry and prepared operator instructions. No secret values were printed or stored by Codex.
Cycle 024 attempted to continue after the operator reported APIs rotated, but the active Codex process could not see `.env.local`, `.env.rls`, process env vars, user env vars, or machine env vars for Supabase/Vercel staging. No remote write was attempted.
Cycle 025 diagnosed PowerShell process isolation and added `scripts/write-local-env-from-process.ps1` so the operator can safely persist already-pasted process env vars into ignored local env files without printing secrets.
Cycle 026 used Supabase MCP to recover staging project URL and publishable key, created ignored `.env.local`, added automatic env loading to staging/RLS scripts, added anon-signup RLS bootstrap, and passed staging/API checks. Real RLS smoke remains blocked because Supabase Auth requires email confirmation and the MCP/CLI path is read-only for service-role user creation.
Cycle 027 executed the requested RLS smoke gate. Pre-checks passed, but anon bootstrap hit Supabase Auth signup/email limits and `.env.rls` with service-role/confirmed test users is absent, so `npm run rls:smoke` remains blocked before policy execution.
Cycle 028 retried the RLS smoke gate after another operator prompt. Pre-checks still pass, but anon bootstrap returns `email rate limit exceeded`; remote readback shows 1 staging signup user and 0 confirmed staging users. Real RLS smoke remains blocked before policy execution.

## Current Scope

- Landing
- Auth placeholder
- Role selection
- Client dashboard
- Worker dashboard
- Job publication form
- Open jobs list
- Tracking view
- Pricing/monetization page
- Terms/privacy pages
- Read-only admin overview
- Domain service layer with local fallback
- Supabase schema/RLS migration
- Tracking fallback local storage

## Not Active

- Production deploy
- Live payments
- AI agents in production
- Admin panel by default

## Next Gate

Rotate the exposed Supabase service-role credential, then provide secure staging write/auth credentials outside git through `C:\CODEX-expressjobs-repo\.env.local`, `C:\CODEX-expressjobs-repo\.env.rls`, or Vercel Preview secret storage. Only after rotation, apply the prepared function `search_path` migration, verify Supabase Advisor, and run real RLS smoke tests. Keep `PRODUCTION_STATUS=NO-GO_PRODUCTION`.

## Current Operator Action

Use the PowerShell opened at `C:\CODEX-expressjobs-repo` for secret entry. Do not paste secrets into Codex chat. Keep `ENABLE_PAYMENTS=false`, `ENABLE_AI_AGENTS=false`, `AI_KILL_SWITCH=true`, and `ENABLE_ADMIN_PANEL=false`.

The next cycle requires confirmed staging test users. URL/publishable key are now configured locally and staging env checks pass. Rotating the APIs in the provider dashboard is not enough for full RLS smoke unless users can sign in.

If secrets were pasted as `$env:...` into the opened PowerShell, run `.\scripts\write-local-env-from-process.ps1` in that same window. Then Codex can validate `.env.local` and `.env.rls` from this repo without seeing values in chat.

Current fastest unblock: in Supabase staging Auth settings, temporarily disable email confirmation for staging only and rerun `npm run rls:bootstrap-anon-users`, or provide a rotated `SUPABASE_SERVICE_ROLE_KEY` through `.env.rls` so `npm run rls:create-staging-users` can create confirmed staging users.
