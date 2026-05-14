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
Cycle 029 retried after `.env.rls` was provided with all six RLS smoke credential variables present. `npm run rls:smoke` reached Supabase Auth and failed on the first client login with invalid credentials, so RLS policy execution was not reached.
Cycle 030 repeated the Auth-users-created RLS gate. Pre-checks and secret scans passed, but `npm run rls:smoke` again failed on the first client login with invalid credentials. RLS policies were not exercised.
Cycle 031 resolved the client Auth blocker through staging-safe signup/profile setup and `npm run rls:smoke` returned `EXPRESSJOBS_RLS_STAGING_PASS`. Full local checks passed. A Vercel Preview deployment was created without `--prod`, but browser HTTP smoke is blocked by Vercel Authentication 401.
Cycle 032 retried Preview access/browser smoke. No local/CI bypass secret was available, shareable protected access was unavailable, and all critical Preview routes returned 401. Production remains untouched.
Cycle 033 used the local/user Vercel automation bypass secret through the `x-vercel-protection-bypass` header. Preview browser smoke passed on all critical routes, full gate passed, and first 10 testers are now `GO_CONTROLLED_INTERNAL_ONLY` while Production remains `NO-GO_PRODUCTION`.
Cycle 033 first-10 continuation prepared the controlled internal tester package with onboarding, messages, feedback capture, triage board, and post-pilot GO/NO-GO criteria. No tester contact was sent and Production remains `NO-GO_PRODUCTION`.
Cycle 034 executed a First 10 dry-run with placeholder testers, simulated feedback, and simulated triage. No real testers were contacted, no real personal data was used, `SEARCH_PATH_FIX=APPLIED`, and only Security Advisor recheck remains `PENDING_OR_NOT_RECHECKED`.
Cycle 035 prepared the human-approved manual contact package for First 10 internal testers, including approval checklist, assignment template, session runbook, final copy messages, live monitoring runbook, and post-test decision matrix. No real testers were contacted.
Cycle 036 added Social Auth Phase 1 code for Google and Facebook through Supabase Auth, guarded by disabled-by-default feature flags and a whitelisted OAuth helper. Instagram remains `RESEARCH_PENDING`; provider configuration is manual and production remains `NO-GO_PRODUCTION`.
Cycle 037 deployed a new Vercel Preview without production promotion, enabled Google social-auth flag only for the Preview branch, and verified `/auth` with protected bypass header. Google OAuth starts but is blocked by Google `redirect_uri_mismatch`; Facebook remains disabled and Instagram remains research-only.
Cycle 038 rechecked Google OAuth after the manual redirect URI fix. The `redirect_uri_mismatch` is resolved, Google OAuth reaches the Google account sign-in screen, and callback/session validation is now blocked only by controlled manual login with a staging/test Google account.
Cycle 039 confirmed the staging/test Google account is authorized per operator statement, revalidated that Google OAuth reaches the Google sign-in screen, and marked the flow `READY_FOR_HUMAN_BROWSER_TEST`. No credentials, cookies, tokens, user IDs, or account details were recorded.
Cycle 040 diagnosed the Supabase Auth callback failure after human Google login. The previous redirect URI issue is resolved, but Supabase reported `invalid_client` because the Google Client Secret configured in Supabase was invalid. No secret values were recorded.
Cycle 041 rechecked after the operator reported the Client Secret was corrected. Codex can still only reach the Google sign-in screen without human credentials, so session creation remains `not_tested` until a human completes login and reports sanitized callback/session status.
Cycle 042 fixed the Preview Google OAuth `redirect_to` construction. The app now uses the browser origin for OAuth redirects in Preview instead of the local fallback URL. A new Preview deployment is READY, `/auth` loads with bypass header, Google starts OAuth, and the intercepted sanitized authorize request points to the current Preview `/auth/callback`.
Cycle 043 recorded the human browser verification for Google OAuth. The operator completed login and reached `/role`, which confirms callback exchange, session creation, and safe profile creation/presence in the current callback flow.

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
- Google/Facebook OAuth code path behind feature flags
- OAuth callback that creates safe default client profiles
- Google OAuth Preview redirect_to fix

## Not Active

- Production deploy
- Live payments
- AI agents in production
- Admin panel by default
- Social providers in production
- Instagram login

## Next Gate

Run `EXPRESSJOBS_RELEASE_GATE_GO_NO_GO`: consolidate the current MVP gates after Google OAuth Preview PASS, keep Production `NO-GO_PRODUCTION`, and decide whether First 10 controlled internal testing remains allowed.

## Current Operator Action

Current fastest safe next step: run the release gate GO/NO-GO review for controlled internal testing. Google OAuth Preview is PASS. Supabase `search_path` fix is applied; Security Advisor recheck remains pending or not rechecked. Production remains blocked.
