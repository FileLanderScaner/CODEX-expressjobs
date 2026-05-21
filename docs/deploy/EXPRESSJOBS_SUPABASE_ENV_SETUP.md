# ExpressJobs Supabase Env Setup

Do not paste or commit secrets.

## Local

Use ignored local env files or a secure shell session:

- `NEXT_PUBLIC_SUPABASE_URL=<SUPABASE_PROJECT_URL_REDACTED>`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=<SET_IN_LOCAL_ENV>`
- `APP_ENV=staging`
- `ALLOWED_ORIGINS=http://localhost:3000`

## Preview

Set values in Vercel Preview environment only:

- `NEXT_PUBLIC_SUPABASE_URL=<SET_IN_VERCEL_PREVIEW>`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=<SET_IN_VERCEL_PREVIEW>`

## Server Only

`SUPABASE_SERVICE_ROLE_KEY` must never be exposed to client code. Use it only for approved server-only scripts or admin operations.

## Remote Apply

The migration `supabase/migrations/202605210001_complete_marketplace_connections.sql` is non-destructive but was not applied remotely in this cycle. Apply only through an approved staging-safe path.
