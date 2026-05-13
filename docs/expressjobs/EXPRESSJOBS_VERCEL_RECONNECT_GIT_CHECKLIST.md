# ExpressJobs Vercel Reconnect Git Checklist

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current Gate

Do not reconnect Git until this checklist is complete.

Git reconnect is considered high-risk because multiple pushes produced production-target deployments while the project was intended for Preview only.

## Checklist

- [ ] Supabase staging is available or frontend-only Preview is explicitly approved.
- [ ] Production Branch has been reviewed.
- [ ] `codex/expressjobs-autonomous-bootstrap` is not Production Branch.
- [ ] Preview env vars are configured only for Preview/Development.
- [ ] No Production env vars are configured for this gate.
- [ ] Payments remain disabled.
- [ ] AI agents remain disabled.
- [ ] Git reconnect owner understands auto-deploy behavior.
- [ ] First deployment after reconnect will be inspected before sharing.
- [ ] Any deployment with `target: production` will be removed immediately.
- [ ] Vercel project has been checked after a push and no automatic production-target deployment appears.

## Reconnect Rule

Reconnect Git only after the branch targeting runbook passes. Do not reconnect as part of a broad activation cycle.

## Post-Reconnect Required Evidence

- Project settings screenshot or redacted note.
- Deployment target inspection.
- Preview URL.
- Browser smoke report.
- `NO-GO_PRODUCTION` visible.
- No secrets exposed.
