# Cycle ExpressJobs 006 — Preview Deployment Retry

## Mode

`EXPRESSJOBS_PREVIEW_DEPLOYMENT_RETRY_AND_PLATFORM_PARALLELIZATION`

## Scope

This cycle retries the PR #41 Vercel Git-integrated Preview status without touching production, while keeping the manual Preview and Supabase/RLS staging evidence as the current functional baseline.

## Repository / PR

- Repository: `FileLanderScaner/CODEX-expressjobs`
- Branch: `codex/expressjobs-rls-smoke-staging`
- PR: `#41`
- PR URL: `https://github.com/FileLanderScaner/CODEX-expressjobs/pull/41`
- Previous head before this retry note: `30b990f5c28bc9e6e4e2d36caa171fab6ca51e29`
- Retry commit created by ChatGPT connector: `c4a5b183946bb0ff00ed1f81c1f301b4b4bd8ac7`

## Production Safety

Production remains blocked.

Confirmed policy for this cycle:

- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- No `vercel --prod`
- No `vercel promote`
- No Vercel Production env mutation
- No Supabase production mutation
- No PayPal live
- No real payments
- No checkout activation
- No secrets printed or committed

## GitHub PR Inspection

PR #41 is open and not merged. The PR head before this retry was `30b990f5c28bc9e6e4e2d36caa171fab6ca51e29`.

The combined commit status for that head reported:

- `Vercel`: `failure`
- Vercel target URL: `https://vercel.com/akuma424-projects/codex-expressjobs/A7so5KdUFJyW151d4FvAyix9nA48`

After the docs-only retry commit, GitHub reported a new Vercel attempt:

- New Vercel status URL: `https://vercel.com/akuma424-projects/codex-expressjobs/Ae3RvYYqumBV6t6EXcSvX1kF9zfU`
- Final status from GitHub combined status: `failure`

## Vercel Inspection Attempt

Attempted to inspect the failed Git-integrated deployment logs through the connected Vercel tool.

Result:

- `VERCEL_GIT_LOGS_AVAILABLE=false`
- `VERCEL_CONNECTOR_AUTH=FORBIDDEN_FOR_SCOPE`
- Scope: `akuma424-projects`
- Team ID observed from Vercel error: `team_hxhoCuOTVudxi86gRHOsAuJF`

The connector returned authorization failure for the Vercel scope, so no build logs were available from this environment.

## Root Cause Confirmed From Operator Vercel UI

The operator inspected Vercel deployment `Ae3RvYYqu...` directly in the Vercel UI and reported the deployment failed before the application build during integration provisioning.

Observed Vercel UI details:

- Deployment status: `Build Failed`
- Environment: `Preview`
- Source: `codex/expressjobs-rls-smoke-staging`
- Commit: `c4a5b18`
- Phase: `Provisioning Integrations`
- Integration: `supabase-expressjobs`
- Integration task: `supabase-expressjobs: Supabase Preview Branch`
- Error: `Database branch limit reached`
- Duration: approximately `3s`

Conclusion:

- This is not a Next.js application build failure.
- This is not evidence of broken runtime code.
- The Git-integrated Preview is blocked because the Vercel/Supabase integration cannot create another Supabase Preview Branch due to the database branch limit.
- The manual Vercel Preview remains valid evidence that the app can deploy as Preview when the failing integration provisioning step is not blocking it.

## Required Manual Fix

The next safe action is outside the repo code:

1. Open Supabase project `supabase-expressjobs`.
2. Review database branches / preview branches.
3. Delete old or unused preview branches that are no longer needed.
4. Alternatively increase the Supabase branch limit / project plan if branch cleanup is not possible.
5. Return to Vercel and redeploy the PR #41 Preview deployment.
6. Confirm the Vercel Git-integrated status changes from `failure` to `success`.

Do not modify production.
Do not disable RLS.
Do not delete the main/staging branch.
Do not remove branches unless they are clearly obsolete preview branches.

## Manual Preview Baseline

Manual Preview remains the known-good functional baseline from the previous cycle:

- URL: `https://codex-expressjobs-h1zrj3byu-akuma424-projects.vercel.app`
- Deployment: `dpl_4ZnMJ53ppQtUz4RV6G4F5DjFhczF`
- Target: `preview`
- Status: `Ready`
- `/pricing` smoke: `PASS_WITH_SAFE_BYPASS_HEADER`

Validated previously:

- HTTP 200
- 8 pilot offers visible
- 8 WhatsApp manual CTAs visible
- no-live-payments disclaimer visible
- no PayPal live
- no real checkout active
- no secret patterns in HTML

## Supabase / RLS Baseline

Supabase staging remains the known-good backend baseline from the previous cycle:

- `npm run staging:check`: `PASS`
- `npm run rls:smoke`: `PASS`
- Result: `EXPRESSJOBS_RLS_STAGING_PASS`

No Supabase production mutation was performed in this cycle.

## Retry Action

A docs-only commit was intentionally created on the PR branch to force a new Git-integrated Vercel status attempt without changing application runtime behavior.

Result:

- GitHub Actions rerun expectation: pending/normal GitHub behavior.
- Vercel Git Integration attempted a new Preview deployment.
- The new Preview deployment failed at Supabase integration provisioning due to `Database branch limit reached`.
- Production remained blocked.

## Parallel Platform Tracks

### Track A — Supabase

Keep RLS and staging smoke as the source of truth for marketplace safety. Next implementation cycle should continue validating:

- user registration by role
- client profile
- worker profile
- business/client posting flow
- job publication
- job listing
- application flow
- accept/reject flow
- messaging boundaries
- reviews/reputation
- audit events
- role escalation protection

### Track B — Vercel

Keep Preview as the only deployment target for validation. Next implementation cycle should continue validating:

- `/`
- `/pricing`
- `/trabajos` if present
- `/publicar` if present
- `/registro` or auth equivalent if present
- role dashboards
- protected route behavior
- no checkout live
- no PayPal live
- no production exposure beyond `/production-paused`

## Current Decision

- `MANUAL_PREVIEW=PASS_READY`
- `RLS_STAGING=PASS_EXPRESSJOBS_RLS_STAGING_PASS`
- `GIT_INTEGRATED_PREVIEW=FAIL_SUPABASE_PREVIEW_BRANCH_LIMIT_REACHED`
- `VERCEL_LOGS=BLOCKED_CONNECTOR_AUTH_FOR_SCOPE_BUT_OPERATOR_UI_CONFIRMED_ROOT_CAUSE`
- `PR_REVIEW=BLOCKED_REVIEW_REQUIRED`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Blockers

- `BLOCKED_SUPABASE_PREVIEW_BRANCH_LIMIT_REACHED`
- `BLOCKED_VERCEL_PREVIEW_GIT_INTEGRATION`
- `BLOCKED_REVIEW_REQUIRED`
- `VERCEL_CONNECTOR_AUTH_FOR_SCOPE_REQUIRED` to inspect build logs directly from this environment.

## Next Mode

`EXPRESSJOBS_SUPABASE_PREVIEW_BRANCH_CLEANUP_AND_PR41_REDEPLOY`

## Next Codex Prompt

Run `EXPRESSJOBS_SUPABASE_PREVIEW_BRANCH_CLEANUP_AND_PR41_REDEPLOY` in `C:\CODEX-expressjobs-repo`. Keep `PRODUCTION_STATUS=NO-GO_PRODUCTION`. Do not use `vercel --prod`; do not use `vercel promote`; do not modify Vercel Production env vars; do not touch Supabase production; do not delete Supabase main/staging branches; do not enable PayPal live or real payments; do not print secrets. First, clean up only obsolete Supabase Preview Branches for `supabase-expressjobs` or increase the Supabase branch limit if cleanup is not safe. Then rerun the Vercel Git-integrated Preview deployment for PR #41. Confirm that the failing phase `Provisioning Integrations > supabase-expressjobs: Supabase Preview Branch` no longer fails with `Database branch limit reached`. Recheck GitHub status for PR #41, repeat manual Preview `/pricing` smoke with safe bypass header, re-run `npm run staging:check` and `npm run rls:smoke`, keep `BLOCKED_REVIEW_REQUIRED` until human review is provided, and update docs/status. If Vercel Git-integrated Preview turns green and all checks pass, next mode is `EXPRESSJOBS_PR41_HUMAN_REVIEW_AND_MERGE_PREP`; otherwise keep `NO-GO_PRODUCTION` and document the remaining blocker.