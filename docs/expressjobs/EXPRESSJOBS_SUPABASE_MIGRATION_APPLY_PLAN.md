# ExpressJobs Supabase Migration Apply Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current Gate

`SUPABASE_WRITE_STATUS=BLOCKED_READ_ONLY`

No migration may be applied during the read-only audit cycle.

## Preconditions To Apply

- Supabase project `gnsfyvsodslnehszanra` is confirmed staging/non-production.
- Exposed token from prior chat is revoked/rotated.
- A safe write path exists through CLI or non-read-only MCP.
- Remote schema has been inspected read-only.
- No AhorroYA or unrelated production data is present in the target project.
- A migration dry run or migration list has been reviewed.

## Migration

Apply only:

`supabase/migrations/202605120001_expressjobs_mvp_schema.sql`

Expected behavior:

- Create `ej_*` types/tables if missing.
- Enable RLS on all `ej_*` tables.
- Create/update policies.
- Insert default categories idempotently.

## Safe Apply Options

### Option A: Supabase CLI

Use CLI only after token is rotated and loaded outside Git:

```powershell
$env:SUPABASE_ACCESS_TOKEN = "<rotated token>"
npx supabase migration list
npx supabase db push
```

Before running `db push`, verify the linked project ref and project name.

### Option B: Supabase Dashboard SQL Editor

Use the SQL editor only in the staging project. Paste only the reviewed migration SQL.

## Post-Apply Validation

1. Verify all `ej_*` tables exist.
2. Verify RLS is enabled.
3. Verify policies exist.
4. Create staging client/worker/admin users.
5. Run `npm run staging:check`.
6. Run `npm run rls:smoke`.
7. Commit redacted evidence.

## Stop Conditions

- Target project cannot be confirmed as staging.
- Remote schema contains unexpected production data.
- Any required step asks for service role in client/browser scope.
- RLS must be disabled to proceed.
- CLI reports destructive SQL not reviewed in the migration.
