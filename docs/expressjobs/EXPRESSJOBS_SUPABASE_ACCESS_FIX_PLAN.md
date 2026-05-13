# ExpressJobs Supabase Access Fix Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current Status

`SUPABASE_STAGING_STATUS=BLOCKED_SUPABASE_ACCESS`

Current blockers:

- No Supabase MCP tools were exposed to Codex in the activation cycle.
- Supabase CLI was not installed in the local shell.
- Neon was available, but Neon is not the selected MVP backend.
- No Supabase staging project was created or modified.
- No real RLS smoke test was executed.

## Recommended Staging Project

Use one dedicated non-production Supabase project:

- `expressjobs-staging`
- or `trabajos-rapidos-staging`

Rules:

- Do not use an AhorroYA project.
- Do not use production.
- Do not mix ExpressJobs tables with unrelated product data.
- Use the existing `ej_*` schema/table prefix.

## Safe Unlock Options

### Option A: Enable Supabase MCP/tooling in Codex

Use this if a Supabase connector is available in the Codex app session. The tool must support at least:

- List accessible Supabase projects.
- Create or select a staging project.
- Execute SQL safely against the staging project.
- Manage or inspect Auth users without printing secrets.

### Option B: Install Supabase CLI locally

Install and authenticate Supabase CLI outside the repository. Do not save access tokens or credentials in Git.

Required after installation:

- Confirm CLI version.
- Authenticate through Supabase-supported flow.
- Link only to a non-production staging project.
- Apply migration only to staging.

### Option C: Create staging manually in Supabase Dashboard

Create or select `expressjobs-staging` manually in the dashboard, then apply the migration through Supabase SQL editor or CLI.

Only record redacted evidence:

- Project name.
- Region.
- Project ref partially redacted.
- Migration timestamp.
- RLS smoke status.

### Option D: Secure local env loading

Use `.env.staging.local` or `.env.rls.local` only if ignored by Git. Do not commit env files.

## Steps After Access Exists

1. Confirm project is staging-only.
2. Apply `supabase/migrations/202605120001_expressjobs_mvp_schema.sql`.
3. Verify `ej_*` tables exist.
4. Verify RLS is enabled.
5. Create staging users:
   - client
   - worker
   - admin
6. Load staging env outside Git.
7. Run `npm run staging:check`.
8. Run `npm run rls:smoke`.
9. Save redacted evidence.

## Do Not Do

- Do not use production.
- Do not paste service role keys into browser code.
- Do not store service role keys in Git.
- Do not print connection strings.
- Do not disable RLS.
- Do not weaken policies to pass smoke tests.
- Do not use Neon as a substitute unless the database provider decision is formally revisited.
