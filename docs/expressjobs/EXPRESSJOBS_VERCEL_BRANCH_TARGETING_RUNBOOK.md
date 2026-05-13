# ExpressJobs Vercel Branch Targeting Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Purpose

Prevent `codex/expressjobs-autonomous-bootstrap` from deploying as production.

## Current State

- Vercel project: `codex-expressjobs`.
- Scope: `akuma424-projects`.
- Git auto-deploy: disconnected.
- Active deployments: none approved.

## Required Checks Before Reconnect

1. Open project settings.
2. Find Production Branch.
3. Confirm Production Branch is not `codex/expressjobs-autonomous-bootstrap`.
4. If the project has no intended production branch, set a safe placeholder or main branch policy before reconnecting Git.
5. Confirm branch deployment rules.
6. Confirm Preview deployments are enabled for non-production branches.
7. Confirm no Production env vars are configured for this MVP gate.

## CLI Inspection Commands

Allowed:

```bash
vercel project inspect codex-expressjobs --scope akuma424-projects
vercel list codex-expressjobs --scope akuma424-projects
vercel inspect <deployment-url> --scope akuma424-projects
```

Forbidden:

```bash
vercel --prod
vercel promote
```

## Valid Deployment Evidence

Record:

- Deployment ID redacted.
- URL.
- Target or environment.
- Branch.
- Build status.
- Browser smoke result.

Do not record:

- Secrets.
- Full service role keys.
- Production env values.

## Stop Conditions

Stop immediately if:

- Deployment target is production.
- Vercel assigns production aliases.
- Git auto-deploy starts producing production-target deployments.
- Preview env requires production secrets.
