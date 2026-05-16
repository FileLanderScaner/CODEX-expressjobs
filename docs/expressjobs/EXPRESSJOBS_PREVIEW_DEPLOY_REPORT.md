# ExpressJobs Preview Deploy Report

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`EXPRESSJOBS_PREVIEW_READY_PROTECTED_401`

Vercel Preview deploy was executed without `--prod` and reached `READY`.

Preview URL:

`https://codex-expressjobs-ijhf7g5hu-akuma424-projects.vercel.app`

Deployment ID:

`dpl_4z4bkBR3Zto23hPippo3YWatwFGG`

HTTP smoke result:

`READY_PROTECTED_401`

Routes checked:

- `/`: 401
- `/jobs/open`: 401
- `/pricing`: 401
- `/auth`: 401

The deployment is protected by Vercel Authentication. No production deploy, promote, or Production environment change was performed.

## Ready Locally

- `vercel.json` is present.
- Build command is `npm run build`.
- Next.js build passes locally.
- Preview env var checklist exists.
- Production deploy commands remain forbidden.

## Required Before Preview Deploy

- Vercel project linked to ExpressJobs. DONE.
- Preview environment variables configured. PARTIAL, existing Preview envs present.
- Supabase staging project configured. DONE.
- RLS smoke test run against staging. DONE.
- Deployment Protection reviewed if enabled. BLOCKED, deployment returns 401 and share URL creation was unavailable.

## Forbidden

- `vercel --prod`
- `vercel promote`
- Production env edits
