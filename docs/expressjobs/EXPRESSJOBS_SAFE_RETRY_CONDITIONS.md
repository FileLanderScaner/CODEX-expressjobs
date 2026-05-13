# ExpressJobs Safe Retry Conditions

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Safe Retry Status

`SAFE_RETRY_ALLOWED=false`

## Required Before Supabase Retry

- Supabase access via MCP, CLI, or dashboard.
- Dedicated staging project selected or created.
- Project confirmed non-production.
- Project confirmed not AhorroYA.
- Staging env values available outside Git.
- Service role key kept server-only.
- Migration reviewed immediately before apply.

## Required Before Vercel Retry

- Vercel production branch confirmed safe.
- `codex/expressjobs-autonomous-bootstrap` confirmed not production branch.
- Preview env vars configured only for Preview/Development.
- Git auto-deploy reconnect checklist passed.
- Deployment method explicitly creates Preview.
- Deployment target inspection planned before URL sharing.

## Required Before First 10 Testers

- Supabase staging configured.
- `npm run staging:check` PASS.
- `npm run rls:smoke` PASS.
- Vercel Preview target confirmed.
- Browser smoke PASS.
- Release gate updated.

## Immediate Stop Conditions

- Any deployment target is production.
- Any production env is modified.
- Any service role key appears in client scope.
- RLS must be disabled to pass.
- Any secret appears in Git status or diff.
