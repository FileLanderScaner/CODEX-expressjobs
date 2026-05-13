# ExpressJobs Supabase Staging Setup

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`SUPABASE_STAGING_STATUS=BLOCKED_SUPABASE_ACCESS`

## Goal

Prepare a non-production Supabase project for ExpressJobs / Trabajos Rapidos staging validation.

## Required Project

- Use a dedicated non-production Supabase project.
- Recommended project name: `expressjobs-staging` or `trabajos-rapidos-staging`.
- Do not use an AhorroYA database.
- Do not use production credentials.

## Required Variables

Public:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Server-only:

- `SUPABASE_SERVICE_ROLE_KEY`

App:

- `APP_ENV=staging`
- `NEXT_PUBLIC_APP_URL`
- `ALLOWED_ORIGINS`

Feature flags:

- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`
- `ENABLE_ADMIN_PANEL=false`

## Apply Migration Safely

Migration file:

`supabase/migrations/202605120001_expressjobs_mvp_schema.sql`

Rules:

- Apply only to staging.
- Review SQL before applying.
- Confirm all tables use `ej_*`.
- Confirm RLS is enabled.
- Do not run destructive SQL.
- Do not disable RLS.
- Do not paste `SUPABASE_SERVICE_ROLE_KEY` into client code.

## Staging Users

Required users:

- `client`
- `worker`
- `admin`

Use local env based on `.env.rls.example`. Keep real values outside Git.

Command after setting real local env values:

```bash
npm run rls:create-staging-users
```

Set `EXPRESSJOBS_ALLOW_STAGING_MUTATIONS=true` only while creating non-production staging users.

## Evidence To Save

- Supabase project ref/name, not secrets.
- Migration applied timestamp.
- List of `ej_*` tables.
- Confirmation RLS is enabled.
- Staging user role IDs or tester codes, not passwords.
- Output of `npm run staging:check`.
- Output of `npm run rls:smoke`.

## Do Not Do

- Do not touch production.
- Do not use production project.
- Do not print secrets.
- Do not commit `.env`.
- Do not use service role in browser code.
- Do not disable RLS.
