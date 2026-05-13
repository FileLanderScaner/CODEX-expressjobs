# ExpressJobs Supabase Staging Activation Retry Report

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_SUPABASE_STAGING_ACTIVATION_RETRY`

## Supabase CLI

Supabase CLI is available through:

```bash
npx supabase
```

Version observed:

```text
2.98.2
```

`npx supabase init` was completed and created local CLI configuration:

- `supabase/config.toml`
- `supabase/.gitignore`

## Link Status

`SUPABASE_LINK_STATUS=BLOCKED_SUPABASE_TOKEN`

Attempted:

```bash
npx supabase link --project-ref gnsfyvsodslnehszanra
```

Result:

```text
Access token not provided.
```

The environment variable `SUPABASE_ACCESS_TOKEN` was checked and was not present. No token value was printed or stored.

## Project

Requested project ref:

`gnsfyvsodslnehszanra`

This project was not linked, inspected, or modified because authentication was unavailable. It is not yet confirmed as staging/non-production from this environment.

## Migration Validation

Migration inspected:

`supabase/migrations/202605120001_expressjobs_mvp_schema.sql`

Findings:

- Uses `public.ej_*` objects.
- Enables RLS on ExpressJobs tables.
- Includes policies for profiles, worker profiles, jobs, applications, messages, reviews, events, payments, and admin audit logs.
- No AhorroYA references found.
- No `disable row level security` statement found.
- No destructive `drop table` or `drop schema` statement found.

## Migration Apply

Not applied.

Reason:

- Supabase link failed due missing access token.
- Project could not be confirmed as staging/non-production.

## Staging Users

Not created.

Reason:

- Supabase link/auth unavailable.
- No staging credentials were available in the environment.

## RLS Real Smoke

Not executed against Supabase real staging.

Reason:

- `SUPABASE_ACCESS_TOKEN` missing for link.
- Staging env values and staging user credentials are not loaded.

Final command results:

- `npm run staging:check`: `BLOCKED_SUPABASE_ACCESS`
- `npm run rls:smoke`: `BLOCKED_SUPABASE_ACCESS`

## Next Required Action

Load the Supabase access token outside Git and rerun:

```powershell
$env:SUPABASE_ACCESS_TOKEN = "<token from Supabase dashboard>"
npx supabase link --project-ref gnsfyvsodslnehszanra
```

Do not paste the token into documentation, Git, or chat logs.

After successful link, confirm the project is staging/non-production before applying any migration.
