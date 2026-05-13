# ExpressJobs Vercel Preview Activation Report

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`VERCEL_PREVIEW_STATUS=PREVIEW_FAIL`

## Project Created

Project: `codex-expressjobs`

Scope: `akuma424-projects`

Project ID: `prj_5wt...wR59`

The project was initially connected to:

`https://github.com/FileLanderScaner/CODEX-expressjobs.git`

After a Git push triggered another deployment inspected as `target: production`, the Git connection was disconnected to prevent additional automatic production-target deployments.

## Env Vars Configured

Preview branch-scoped feature flags were configured for `codex/expressjobs-autonomous-bootstrap`:

- `APP_ENV=preview`
- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`
- `ENABLE_ADMIN_PANEL=false`

Supabase values were not configured because Supabase staging access was unavailable:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `ALLOWED_ORIGINS`

No production env vars were intentionally configured.

## Deployment Attempt

Command used:

```bash
vercel deploy --yes --target preview --logs --scope akuma424-projects
```

The command completed a deployment, but Vercel inspection reported:

```text
target: production
status: Ready
```

Because this violated the intended Preview-only gate, the deployment was removed immediately.

Removed deployment:

`dpl_4E2...SW8`

## Automatic Deployment Mitigation

After the evidence commit was pushed, Vercel created another deployment from the Git connection. Inspection reported:

```text
target: production
status: Building
```

That deployment was removed immediately.

Removed deployment:

`dpl_12E...rfRM`

The Vercel project was then disconnected from GitHub so future pushes do not auto-deploy.

## Active Deployments

After removal:

```text
No deployments found under akuma424-projects.
```

## Decision

Vercel project setup partially advanced, but Preview is not ready and Git auto-deploy is disabled for safety.

Do not use any Vercel URL from this cycle as staging or production evidence.

## Required Next Actions

- Configure Supabase staging first, or explicitly decide to deploy a frontend-only Preview.
- Review Vercel project framework/build settings.
- Create a Git-triggered Preview deployment from branch `codex/expressjobs-autonomous-bootstrap`.
- Before reconnecting Git, configure Vercel production branch/settings so this branch cannot deploy as production.
- Confirm inspected deployment `target` is not `production`.
- Configure `NEXT_PUBLIC_APP_URL` and `ALLOWED_ORIGINS` after the valid Preview URL exists.
- Run browser smoke on valid Preview only.
