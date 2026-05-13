# ExpressJobs Next Steps Master Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Step 1: Supabase Access

Goal: create a real, non-production staging backend and validate RLS.

1. Install Supabase CLI or enable Supabase MCP/tooling.
2. Create or select staging project:
   - `expressjobs-staging`
   - or `trabajos-rapidos-staging`
3. Confirm the project is not production.
4. Confirm the project is not AhorroYA.
5. Load env values outside Git.
6. Apply migration:
   - `supabase/migrations/202605120001_expressjobs_mvp_schema.sql`
7. Verify `ej_*` tables exist.
8. Verify RLS is enabled.
9. Create staging users:
   - client
   - worker
   - admin
10. Run:
   - `npm run staging:check`
   - `npm run rls:smoke`
11. Save redacted evidence.

Do not store service role keys, passwords, connection strings, or JWT secrets in Git.

## Step 2: Vercel Preview Safety

Goal: produce a valid Preview deployment that is not production.

1. Review Vercel project `codex-expressjobs`.
2. Confirm Production Branch.
3. Ensure `codex/expressjobs-autonomous-bootstrap` is not Production Branch.
4. Configure env vars only for Preview/Development.
5. Keep Production envs untouched.
6. Complete `EXPRESSJOBS_VERCEL_RECONNECT_GIT_CHECKLIST.md`.
7. Reconnect Git only after branch targeting is verified.
8. Execute Preview deploy only.
9. Inspect deployment target.
10. Confirm target is Preview, not production.
11. Configure `NEXT_PUBLIC_APP_URL` and `ALLOWED_ORIGINS`.
12. Run browser smoke.

Do not run `vercel --prod` or `vercel promote`.

## Step 3: First 10 Internal Testers Gate

Only proceed if:

- RLS real smoke is PASS.
- Preview browser smoke is PASS.
- No misleading payment, employment, or income claims exist.
- Trust/safety copy is visible.
- Release gate is updated.

Run the prepared first 10 tester package as a controlled, non-public pilot only.

## Step 4: First 25/100 Users

Only proceed after first 10 feedback is reviewed.

- Expand to 25 only if first 10 criteria pass.
- Expand to 100 only after marketplace balance and trust risks are understood.
- Keep production `NO-GO_PRODUCTION` unless a future release gate changes it.

## Current Stop Rule

`SAFE_RETRY_ALLOWED=false`

Retry is blocked until Supabase access and Vercel branch targeting are both fixed.
