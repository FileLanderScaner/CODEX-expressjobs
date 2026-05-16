# ExpressJobs Supabase MCP Codex Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `SUPABASE_MCP_CODEX_PLAN=READY`
- `CURRENT_MCP_STATUS=MISSING_AUTH_IN_CURRENT_SESSION`

## Safe MCP Use

Allowed after auth is restored:

- Read project metadata.
- List Edge Functions.
- Run Security Advisor.
- List migrations.
- List extensions.
- Inspect schema read-only.

Not allowed without explicit human approval:

- `apply_migration`.
- `execute_sql` that writes data or changes schema.
- Creating branches with cost impact.
- Rotating or pasting secrets.
- Creating Auth users.
- Modifying production.

## Required Setup

1. Authenticate Supabase MCP in Codex.
2. Confirm project ref is `gnsfyvsodslnehszanra`.
3. Confirm environment is staging.
4. Run read-only checks first.
5. Keep output redacted.

## Decision

Use MCP as read-only tooling until a specific migration or sandbox payment implementation is approved.
