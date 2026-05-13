# ExpressJobs Environment Pending Actions

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Supabase Staging Pending Actions

Status: `BLOCKED_SUPABASE_ACCESS`

Required secure inputs and evidence:

- Dedicated staging Supabase Project URL.
- Public anon key for staging.
- Server-only service role key for staging setup.
- Confirmation that the project is not production.
- Confirmation that the project is not shared with AhorroYA data.
- Staging client, worker, and admin users, or permission to create them with the setup script.
- Migration evidence for `supabase/migrations/202605120001_expressjobs_mvp_schema.sql`.
- Evidence that `ej_*` tables exist.
- Evidence that RLS remains enabled.
- Passing output for `npm run staging:check`.
- Passing output for `npm run rls:smoke`.

Do not store real secrets in this repository. Use secure local env files, Supabase dashboard secrets, Vercel Preview env vars, or a password manager.

## Vercel Preview Pending Actions

Status: `BLOCKED_VERCEL_ACCESS`

Required secure configuration and evidence:

- Vercel project connected to `https://github.com/FileLanderScaner/CODEX-expressjobs.git`.
- Preview deployment from branch `codex/expressjobs-autonomous-bootstrap`.
- Preview env vars configured only for Preview.
- `ALLOWED_ORIGINS` set to the exact Preview origin.
- `ENABLE_PAYMENTS=false`.
- `ENABLE_AI_AGENTS=false`.
- `AI_KILL_SWITCH=true`.
- `ENABLE_ADMIN_PANEL=false` unless separately protected.
- Build log evidence.
- Preview URL.
- Browser smoke evidence for `/`, `/pricing`, `/client`, `/client/jobs/new`, `/worker/jobs`, `/admin`, `/terms`, and `/privacy`.

Forbidden:

- `vercel --prod`
- `vercel promote`
- Production env edits
- Live payment credentials
- AI agent production credentials

## Safe Work While Blocked

- Prepare first 10 tester dry-run package.
- Improve copy and onboarding docs.
- Review trust/safety flows.
- Improve non-secret runbooks.
- Keep local checks green.

## Unsafe Work While Blocked

- External tester cohort.
- Public launch.
- Production deployment.
- Claims of live persistence, live RLS validation, or active payment handling.
