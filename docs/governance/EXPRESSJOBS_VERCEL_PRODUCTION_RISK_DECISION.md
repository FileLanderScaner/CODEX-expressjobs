# ExpressJobs Vercel Production Risk Decision

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Date: 2026-05-17

## Current Finding

Vercel has active Production deployments for `codex-expressjobs`.

Latest inspected Production deployment:

- Deployment id: `dpl_8XAPTphi71n52WSoRpXWsU7aM46Z`
- Deployment URL: `https://codex-expressjobs-phdipmyez-akuma424-projects.vercel.app`
- Target: `production`
- Status: `Ready`
- Created: 2026-05-17 01:03:24 -0300
- Public alias: `https://codex-expressjobs.vercel.app`
- Git alias: `https://codex-expressjobs-git-main-akuma424-projects.vercel.app`

This deployment was triggered by the Vercel Git Integration after PR #32 was merged to `main`. Codex did not run `vercel --prod`, did not run `vercel promote`, did not mutate Production environment variables, and did not delete or modify deployments or aliases.

`VERCEL_PRODUCTION_DEPLOYMENT_RISK=FOUND`

## Option A - Keep Production Active But Marked NO-GO

Keep the current Production deployment and aliases active while continuing to classify the product as `NO-GO_PRODUCTION`.

Risk:

- Users can access an app that has not been approved for public production.
- A public URL can be shared, indexed, or used by uncontrolled users.
- Operational expectations can exceed the current MVP readiness.

Minimum conditions:

- No live payments.
- No sensitive data collection beyond necessary account/job data.
- No public marketing push.
- Monitoring is active.
- The visible product does not promise guarantees, protected payments, identity verification, or 24/7 support.

## Option B - Protect Or Neutralize Public Access

Recommended default.

Keep the deployment history intact but prevent uncontrolled public use.

Allowed approaches for a human operator:

- Enable Vercel Deployment Protection or project-level protection for Production.
- Add password/protection through Vercel settings.
- Temporarily point the public alias to a maintenance or controlled-access surface.
- Redirect unauthenticated public traffic to a clear `NO-GO` or waitlist page.
- Disable or guard sensitive routes until the controlled pilot is approved.

Why this is recommended:

- Reduces public exposure without destructive deployment deletion.
- Preserves rollback/audit history.
- Keeps the project available for controlled validation.

## Option C - Remove Production Deployment Or Alias

Strongest containment.

This requires explicit human approval before any action.

Possible human actions:

- Remove the public Production alias.
- Delete or rollback the Production deployment.
- Disable automatic Production deploys from `main`.

Codex must not execute this automatically.

## Recommendation

Choose Option B: protect or neutralize public access without destroying deployments.

This resolves the contradiction between `NO-GO_PRODUCTION` and a public Production alias while preserving deployment history and controlled testing capability.
