# ExpressJobs Supabase CLI Setup Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Purpose

Prepare Supabase CLI access for ExpressJobs staging without storing secrets in the repository.

## Current State

`supabase` CLI was not available in the local shell during the activation cycle.

## Install

Install Supabase CLI using an official method for Windows. Keep installation and authentication outside the repo.

After installation, verify:

```bash
supabase --version
supabase --help
```

## Authenticate

Use the official login flow. Do not paste access tokens into documentation or commit them.

Expected:

```bash
supabase login
```

## Link Staging Only

Link only to the non-production staging project:

- `expressjobs-staging`
- or `trabajos-rapidos-staging`

Do not link to production or any AhorroYA project.

## Migration Application

Migration:

```text
supabase/migrations/202605120001_expressjobs_mvp_schema.sql
```

Before applying:

- Confirm staging project name/ref.
- Confirm SQL contains only `ej_*` objects for ExpressJobs.
- Confirm no destructive SQL.
- Confirm RLS is enabled.

After applying:

- Verify tables.
- Verify RLS.
- Verify policies.
- Create staging users.
- Run real smoke tests.

## Environment

Use local shell env or ignored local env files only:

- `.env.staging.local`
- `.env.rls.local`

Never commit:

- `SUPABASE_SERVICE_ROLE_KEY`
- database passwords
- JWT secret
- full connection strings
- staging user passwords

## Success Criteria

- `npm run staging:check` passes.
- `npm run rls:smoke` prints `EXPRESSJOBS_RLS_STAGING_PASS`.
- Redacted evidence is committed.

## Failure Criteria

- CLI points to production.
- RLS is disabled.
- Service role appears in client code.
- Smoke test needs policy weakening to pass.
