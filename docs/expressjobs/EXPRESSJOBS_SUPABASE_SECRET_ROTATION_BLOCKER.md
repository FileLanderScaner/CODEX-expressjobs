# ExpressJobs Supabase Secret Rotation Blocker

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`BLOCKED_SECURITY_RISK_SECRET_EXPOSED_ROTATION_REQUIRED`

During the hold-for-credentials cycle, a Supabase service-role credential was pasted into the conversation. The value is intentionally not repeated here.

## Impact

The exposed service-role credential must be treated as compromised. It must not be used for staging writes, user creation, smoke tests, migrations, or any other operation.

The anon key is less privileged, but because it was shared in the same flow, staging credential hygiene should be reviewed before continuing.

## Required Action

Rotate the exposed Supabase credentials in the Supabase dashboard before continuing:

- Rotate/regenerate the service-role key.
- Refresh the anon/publishable key if the project policy requires it.
- Store new values only in a secure local shell or platform environment.
- Do not paste secret values into chat, docs, commits, logs, or screenshots.

## Safe Resume Criteria

Resume only when Codex can verify presence, without printing values, of:

- `SUPABASE_ACCESS_TOKEN`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Additionally, confirm the service-role key was rotated after the exposure event.

## Current Decision

No remote Supabase write, link, migration apply, staging user creation, or RLS smoke test is authorized until rotation is complete.
