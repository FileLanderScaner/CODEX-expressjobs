# ExpressJobs Supabase CLI Token Apply Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Purpose

This plan documents a safe CLI path for controlled Supabase writes if read-only MCP is insufficient.

Current cycle 019 finding:

- MCP read-only tools are available.
- Remote schema matches the expected MVP migration.
- No migration apply is required based on current read-only evidence.
- Real RLS smoke tests remain blocked until safe write/auth capability is available.

## Token Handling

The access token must be loaded only into the active PowerShell process:

```powershell
$env:SUPABASE_ACCESS_TOKEN="TOKEN_LOCAL_NO_GIT"
```

Rules:

- Do not write the token to `.env`.
- Do not commit the token.
- Do not paste the token into docs or reports.
- Do not print the token in command output.
- Revoke and rotate any token that was pasted into chat, docs, logs, or git-tracked files.

## Link And Inspect

```powershell
npx supabase --version
npx supabase link --project-ref gnsfyvsodslnehszanra
npx supabase migration list
npx supabase db diff --linked
```

Expected safe outcome for the current state:

`SUPABASE_REMOTE_SCHEMA_MATCHES_EXPECTED`

If the diff is empty or only contains benign formatting differences, do not apply migrations.

## Apply Gate

Only run `npx supabase db push` when all gates pass:

- The linked project is `gnsfyvsodslnehszanra`.
- The project is confirmed as staging or non-production for ExpressJobs.
- The migration to apply is reviewed.
- No `.env`, token, `.vercel`, log, zip, or `test-results` artifact is staged.
- `npm run secret:scan` passes before the write.
- `PRODUCTION_STATUS=NO-GO_PRODUCTION` remains unchanged.

## Post-Apply Verification

After any future controlled apply:

```powershell
npm run staging:check
npm run rls:smoke
npm run secret:scan
npm run test:rls:static
npm run production:check
git diff --check
```

Store only redacted evidence in docs.

## Pending Security Improvement

Supabase Security Advisor currently warns:

- `function_search_path_mutable` for `public.ej_is_admin`
- `function_search_path_mutable` for `public.ej_is_job_participant`

The next safe schema migration should add explicit `search_path` settings to both helper functions. Do not patch this through an ad hoc production write.
