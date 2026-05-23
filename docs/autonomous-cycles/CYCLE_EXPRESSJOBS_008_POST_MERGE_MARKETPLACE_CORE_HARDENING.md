# Cycle ExpressJobs 008 — Post-Merge Production Neutralization and Marketplace Core Hardening

## Mode

`EXPRESSJOBS_POST_MERGE_PRODUCTION_NEUTRALIZATION_AND_MARKETPLACE_CORE_HARDENING`

## Repository

- Repository: `FileLanderScaner/CODEX-expressjobs`
- Base branch: `main`
- Working branch: `codex/post-merge-marketplace-core-hardening`
- Starting commit: `d8ade316826bd71247d18a4aadd5d5a4c2c10f68`

## Prior Merge

PR #41 was merged into `main` by squash merge.

- Merge commit: `d8ade316826bd71247d18a4aadd5d5a4c2c10f68`
- Scope merged: pricing/monetization pilot, staging RLS smoke evidence, Vercel Preview validation docs, and related status documents.

## Production Safety

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Confirmed safety policy for this cycle:

- No `vercel --prod`
- No `vercel promote`
- No Vercel Production env mutation
- No Supabase production mutation
- No PayPal live
- No real payments
- No checkout activation
- No secrets printed or committed

## Production Neutralization Verification

Code-level verification on `main` confirms that production remains neutralized:

- `middleware.ts` checks `process.env.VERCEL_ENV`.
- When `VERCEL_ENV === "production"`, all non-asset/non-framework paths are redirected to `/production-paused`.
- `/production-paused` is explicitly allowed through the middleware.
- `src/app/production-paused/page.tsx` displays `PRODUCTION_STATUS=NO-GO_PRODUCTION` and states that no online payments are active.

The connected Vercel fetch tool could not inspect the public alias due to scope authorization restrictions, so this cycle records code-level verification as the available evidence from this environment.

## Implemented Product Hardening

This cycle moved beyond documentation and added real public marketplace entry points while keeping all data operations inside the existing Supabase/RLS-controlled flows.

New routes:

- `src/app/trabajos/page.tsx`
  - Public marketplace job-search entry.
  - Reuses `WorkerJobsClient` so job loading remains governed by existing Supabase client/RLS behavior.
  - Links users to registration and job publishing.

- `src/app/publicar/page.tsx`
  - Public job-publishing entry for clients/businesses.
  - Reuses `JobForm`, preserving existing auth checks, role preparation through RPC, and insert behavior into `ej_jobs`.
  - Keeps WhatsApp assistance as manual sales/support path.

- `src/app/registro/page.tsx`
  - Public registration entry route.
  - Reuses `AuthEmailForm` and `SocialAuthButtons`.
  - Preserves safe `next` path handling and directs users toward `/role` by default.

Navigation hardening:

- `src/components/app-shell.tsx` now points main navigation to `/trabajos` and `/publicar` instead of internal role-specific routes.
- Header login entry now points to `/registro`, reducing friction for first-time users.

Test coverage:

- `src/__tests__/real-product-public-surface.test.ts` now verifies that `/trabajos`, `/publicar`, and `/registro` exist and that the navigation points to those public routes.

## Marketplace Core Hardening Direction

The next product objective is to continue making ExpressJobs behave more like a real marketplace/job platform, while staying in controlled staging/preview mode.

Priority modules still pending or partially implemented:

1. Stronger profile completion for client and worker.
2. Worker profile editing and availability/service radius UX.
3. Client dashboard action shortcuts and better job lifecycle controls.
4. Public job filtering/search by category/location.
5. Application status visibility for workers.
6. Messaging UI backed by Supabase instead of static service fallback.
7. Reviews/reputation backed by Supabase instead of static fallback.
8. Admin/moderation read-only safety surface.
9. Audit event visibility for admin-safe review.
10. Preview smoke for `/trabajos`, `/publicar`, and `/registro`.

## Known Safe Baselines

- Manual Preview from PR #41 was validated before merge.
- Vercel Git-integrated Preview for PR #41 turned green before merge.
- Supabase staging RLS smoke was previously reported as `EXPRESSJOBS_RLS_STAGING_PASS`.
- Production remains `NO-GO_PRODUCTION`.
- PayPal live and real payments remain off.

## Risks

- The Vercel connector used by ChatGPT could not fetch production alias status because it lacks authorization for the Vercel scope.
- Any future merge to `main` may trigger Vercel Git Integration automatically; production remains neutralized by middleware but must be checked after every merge.
- Marketplace core completion must not weaken RLS or rely on client-side role trust.
- Supabase Preview Branch limits must be monitored after the previous `Database branch limit reached` blocker.
- Runtime checks, build, staging check, RLS smoke, and Preview smoke must still be run by Codex/local environment because this ChatGPT connector cannot execute npm commands in the repo checkout.

## Current Gate Decision

- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- `PUBLIC_MARKETPLACE_ENTRY_ROUTES=IMPLEMENTED`
- `NAVIGATION_PUBLIC_MARKETPLACE=IMPLEMENTED`
- `REAL_PAYMENTS=OFF`
- `PAYPAL_LIVE=OFF`
- `SUPABASE_PRODUCTION_MUTATION=NO`
- `VERCEL_PRODUCTION_MUTATION=NO`
- `CHECKS_LOCAL_RUNTIME=NOT_RUN_IN_CHATGPT_CONNECTOR`

## Next Gate

`EXPRESSJOBS_MARKETPLACE_CORE_RUNTIME_VALIDATION_AND_DASHBOARD_HARDENING`

## Next Codex Prompt

Run `EXPRESSJOBS_MARKETPLACE_CORE_RUNTIME_VALIDATION_AND_DASHBOARD_HARDENING` in `C:\CODEX-expressjobs-repo` on branch `codex/post-merge-marketplace-core-hardening`. Keep `PRODUCTION_STATUS=NO-GO_PRODUCTION`. Do not use `vercel --prod`; do not use `vercel promote`; do not mutate Vercel Production env vars; do not touch Supabase production; do not enable PayPal live or real payments; do not print secrets. Pull latest branch, run full checks: `npm run secret:scan`, `npm run production:check`, `npm run guard:no-production-deploy`, `npm run test:rls:static`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run staging:check`, and `npm run rls:smoke` if credentials are available. Then smoke `/trabajos`, `/publicar`, `/registro`, `/pricing`, `/role`, `/auth`, worker job detail, client job detail, and dashboards in Preview with safe bypass if available. Fix any build/test failures. Next product hardening target: dashboard UX, profile completion, worker application visibility, client lifecycle controls, and Supabase-backed messaging/reviews without weakening RLS. Update docs/status and PR #43.