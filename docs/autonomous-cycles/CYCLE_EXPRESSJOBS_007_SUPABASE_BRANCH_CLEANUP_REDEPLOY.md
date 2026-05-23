# Cycle ExpressJobs 007 — Supabase Branch Cleanup and PR41 Redeploy

## Mode

`EXPRESSJOBS_SUPABASE_PREVIEW_BRANCH_CLEANUP_AND_PR41_REDEPLOY`

## Purpose

Trigger a new Vercel Git-integrated Preview attempt for PR #41 after the operator reported that Supabase Preview Branch cleanup was completed.

## Production Safety

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

This commit is documentation-only and intentionally does not change runtime application code.

Confirmed safety policy:

- No `vercel --prod`
- No `vercel promote`
- No Vercel Production env mutation
- No Supabase production mutation
- No PayPal live
- No real payments
- No checkout activation
- No secrets printed or committed

## Prior Failure

The previous Vercel Git-integrated Preview failed during integration provisioning, not during the Next.js build.

Confirmed failing phase from Vercel UI:

- `Provisioning Integrations`
- `supabase-expressjobs: Supabase Preview Branch`
- `Database branch limit reached`

## Operator Action Reported

The operator reported that the Supabase branch cleanup action is complete.

## Retry Action

This documentation-only commit is created to force GitHub/Vercel to attempt a fresh Preview deployment for PR #41 after the Supabase branch limit blocker was reportedly resolved.

Expected result:

- Vercel should create/provision the Supabase Preview Branch successfully.
- Vercel Git-integrated Preview should proceed past `Provisioning Integrations`.
- If the application build then runs, any remaining failure should be treated as a new build/runtime issue, not the prior branch limit blocker.

## Current Baselines Before Redeploy

Manual Preview baseline from the previous cycle:

- URL: `https://codex-expressjobs-h1zrj3byu-akuma424-projects.vercel.app`
- Deployment: `dpl_4ZnMJ53ppQtUz4RV6G4F5DjFhczF`
- Target: `preview`
- `/pricing` smoke: `PASS_WITH_SAFE_BYPASS_HEADER`

Supabase/RLS baseline:

- `npm run staging:check`: `PASS`
- `npm run rls:smoke`: `PASS`
- Result: `EXPRESSJOBS_RLS_STAGING_PASS`

## Decision Gate

If this new Vercel Git-integrated Preview passes, the next gate is:

`EXPRESSJOBS_PR41_HUMAN_REVIEW_AND_MERGE_PREP`

If it fails again with `Database branch limit reached`, the Supabase cleanup was insufficient or the plan limit still needs to be increased.

If it fails later during app build, inspect build logs and treat it as a separate build issue.

## Next Codex Prompt

Run `EXPRESSJOBS_PR41_POST_CLEANUP_STATUS_RECHECK` in `C:\CODEX-expressjobs-repo`. Keep `PRODUCTION_STATUS=NO-GO_PRODUCTION`. Do not use `vercel --prod`; do not use `vercel promote`; do not mutate Vercel Production env vars; do not touch Supabase production; do not enable PayPal live or real payments; do not print secrets. Inspect PR #41 status checks after this docs-only redeploy trigger, confirm whether the new Vercel Git-integrated Preview passed provisioning, repeat `/pricing` Preview smoke with safe bypass header, re-run `staging:check` and `rls:smoke`, and keep merge blocked until required human review is satisfied.