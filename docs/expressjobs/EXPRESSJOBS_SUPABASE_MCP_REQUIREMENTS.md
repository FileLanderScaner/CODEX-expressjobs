# ExpressJobs Supabase MCP Requirements

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current State

Supabase MCP tools were not exposed in the activation cycle.

## Required Capabilities

To retry activation safely through MCP, Codex needs tools that can:

- List Supabase projects.
- Create or select a non-production project.
- Identify project name, region, and redacted ref.
- Execute SQL against a selected staging project.
- Inspect tables.
- Inspect RLS enabled status.
- Inspect policies.
- Manage staging Auth users or support a secure handoff to CLI/dashboard.

## Required Safety Controls

The MCP/tooling must allow:

- Project selection confirmation before SQL execution.
- Redacted output for project refs where possible.
- No secret printing.
- No automatic production selection.
- Clear error reporting if access is insufficient.

## Not Required

The tool does not need to expose service role keys to Codex. User setup can be completed through secure local env or dashboard workflows.

## Retry Gate

Do not retry Supabase activation until at least one path exists:

- Supabase MCP tools exposed in Codex.
- Supabase CLI installed and authenticated.
- Manual dashboard staging project created with secure env values available outside Git.
