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

`SUPABASE_LINK_STATUS=LINKED_LOCAL_METADATA_PRESENT_REMOTE_COMMANDS_BLOCKED_TOKEN`

Local Supabase metadata now points to:

- Project ref: `gnsfyvsodslnehszanra`
- Project name: `supabase-expressjobs`
- Region reported by user CLI output: East US (North Virginia)

Remote commands from the Codex process remain blocked because `SUPABASE_ACCESS_TOKEN` is not available in this process.

Attempted remote commands:

```bash
npx supabase link --project-ref gnsfyvsodslnehszanra
npx supabase migration list
npx supabase db push --dry-run
```

Result:

```text
Access token not provided.
```

The environment variable `SUPABASE_ACCESS_TOKEN` was checked in the Codex process and was not present. No token value was printed or stored.

Security note: a Supabase access token was pasted into chat during this workflow. Treat that token as compromised and revoke/rotate it before continuing with real operations.

## Project

Requested project ref:

`gnsfyvsodslnehszanra`

Local link metadata identifies this project as `supabase-expressjobs`. It was not modified by Codex because remote commands were blocked by the missing token in this process. Treat staging/non-production confirmation as incomplete until a rotated token is loaded and remote inspection succeeds.

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

- Remote Supabase commands failed due missing access token in the Codex process.
- Project could not be fully confirmed as staging/non-production from Codex.

## Staging Users

Not created.

Reason:

- Supabase link/auth unavailable.
- No staging credentials were available in the environment.

## RLS Real Smoke

Not executed against Supabase real staging.

Reason:

- `SUPABASE_ACCESS_TOKEN` missing in the Codex process for remote commands.
- Staging env values and staging user credentials are not loaded.

Final command results:

- `npm run staging:check`: `BLOCKED_SUPABASE_ACCESS`
- `npm run rls:smoke`: `BLOCKED_SUPABASE_ACCESS`

## Next Required Action

Revoke/rotate the token that appeared in chat. Then load the new Supabase access token outside Git and rerun:

```powershell
$env:SUPABASE_ACCESS_TOKEN = "<rotated token from Supabase dashboard>"
npx supabase link --project-ref gnsfyvsodslnehszanra
npx supabase migration list
```

Do not paste the token into documentation, Git, or chat logs.

After successful link, confirm the project is staging/non-production before applying any migration.
