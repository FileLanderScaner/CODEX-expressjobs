# ExpressJobs Security Audit

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Date: 2026-05-12

## Mode

`EXPRESSJOBS_SECURITY_AUDIT`

## Summary

Static security audit completed for the current MVP foundation. No production systems were touched.

## Checks Performed

- Secret scan.
- RLS static tests.
- Search for service role usage in client code.
- Search for destructive SQL patterns.
- Search for AhorroYA references in executable code and migration.
- Audit of feature flags for payments and AI agents.
- `npm audit --audit-level=high`.

## Findings

### P1: Live RLS validation is blocked

Status: Open  
Blocker: `BLOCKED_SUPABASE_ACCESS`

The migration and static RLS tests are prepared, but real RLS behavior must be validated against a non-production Supabase project with client, worker, and admin users.

### P2: Preview deployment validation is blocked

Status: Open  
Blocker: `BLOCKED_VERCEL_ACCESS`

Vercel Preview configuration is documented, but no Preview deploy was executed because env vars/access are not available.

### P2: Moderate dependency advisory remains

Status: Open

`npm audit --audit-level=high` passes, but npm reports 2 moderate issues through Next/PostCSS. The suggested fix uses `--force` and would downgrade Next to a breaking version, so it was not applied.

## Confirmed Boundaries

- No `service_role` key is used in browser code.
- Supabase public URL and anon/publishable key are the only client-side Supabase envs.
- `SUPABASE_SERVICE_ROLE_KEY` is only referenced in a staging user setup script and docs.
- Payment flags remain disabled.
- AI agent flags remain disabled and kill switch remains enabled.
- RLS is enabled for all required `ej_*` tables.
- The migration does not reference AhorroYA tables.

## Required Before Production

- Live RLS smoke tests pass.
- Vercel Preview deploy passes.
- Auth, chat, applications, reviews, and admin audit flows are validated in staging.
- Dependency advisory is reassessed when upstream package fix is available.
- Production release gate stays `NO-GO` until a separate approval cycle.
