# ExpressJobs Vercel Preview Deploy Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`VERCEL_PREVIEW_STATUS=BLOCKED_VERCEL_ACCESS`

## Allowed Deploy Methods

- GitHub/Vercel automatic Preview deploy from branch.
- `vercel` CLI without `--prod`, if Vercel access is available and project is linked to Preview.

## Forbidden Commands

```bash
vercel --prod
vercel promote
```

## Pre-Deploy Checks

```bash
npm run secret:scan
npm run lint
npm run typecheck
npm run test
npm run test:rls:static
npm run build
npm run staging:check
```

`npm run staging:check` requires Preview/Staging env vars.

## Preview Smoke Tests

After Preview deploy:

- Open `/`.
- Open `/pricing`.
- Open `/client`.
- Open `/client/jobs/new`.
- Open `/worker/jobs`.
- Open `/admin`.
- Open `/terms`.
- Confirm `NO-GO_PRODUCTION` remains visible.
- Confirm no claims of active payments.
- Confirm no console errors.

## Evidence To Save

- Preview URL.
- Build log status.
- Commit SHA.
- Browser smoke notes/screenshots.
- RLS smoke status.
- Known blockers.

## Rollback

Preview rollback can use Vercel deployment history or branch revert. Do not promote any Preview deployment to production.
