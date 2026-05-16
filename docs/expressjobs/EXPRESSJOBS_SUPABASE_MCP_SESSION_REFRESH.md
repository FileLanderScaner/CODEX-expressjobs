# ExpressJobs Supabase MCP Session Refresh

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Result From Cycle 019

Supabase MCP tools were available in this Codex session after tool discovery.

Status:

- `supabase_mcp_status`: `CONNECTED_READ_ONLY`
- `supabase_mcp_tools_available_in_session`: `true`
- `supabase_project_ref`: `gnsfyvsodslnehszanra`
- Blocking issue from the prior session, `SUPABASE_MCP_TOOLS_NOT_EXPOSED_IN_SESSION`, is resolved for read-only inspection.

## If Tools Disappear Again

Use this recovery checklist:

1. Refresh or restart the Codex session.
2. Re-run tool discovery for Supabase.
3. Confirm the connected project ref remains `gnsfyvsodslnehszanra`.
4. Confirm the MCP server remains read-only unless the session is explicitly prepared for controlled writes.
5. Run only read-only catalog inspection first.

Do not use missing MCP tools as a reason to guess remote schema status. If tools are not exposed, record:

`SUPABASE_MCP_TOOLS_NOT_EXPOSED_IN_SESSION`

Then use the CLI token plan only after an operator provides a local `SUPABASE_ACCESS_TOKEN` in the shell process.

## Read-Only Verification Queries

Allowed read-only checks:

- list tables in `public`
- query `pg_policies` for `public.ej_%`
- query `pg_proc` for `public.ej_%`
- query enum values for `public.ej_%`
- run Supabase security advisors

Never run schema-changing SQL while the task is scoped to inspection.
