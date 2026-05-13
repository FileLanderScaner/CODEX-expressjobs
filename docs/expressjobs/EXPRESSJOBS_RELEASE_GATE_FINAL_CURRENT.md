# ExpressJobs Release Gate Final Current

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Decision

Current release gate decision for ExpressJobs / Trabajos Rapidos:

- Code: `CODE_READY`
- Staging: `CODE_READY_ENV_PENDING`
- Supabase: `BLOCKED_SUPABASE_ACCESS`
- Vercel: `BLOCKED_VERCEL_ACCESS`
- First testers: `NO-GO_PUBLIC_COHORT_UNTIL_PREVIEW_AND_RLS_PASS`
- Production: `NO-GO_PRODUCTION`
- Payments: `PAYMENTS_DISABLED_SAFE`
- AI agents: `AI_AGENTS_DISABLED_SAFE`

This means the repository is ready for non-production Supabase and Vercel Preview activation, but no public tester cohort, production deploy, live payment flow, or AI-agent feature is authorized.

## GO/NO-GO Matrix

| Area | Decision | Evidence | Required Before GO |
| --- | --- | --- | --- |
| Local development | GO | `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` pass locally. | Continue normal local development. |
| Static RLS review | GO | `npm run test:rls:static` passes. | Keep static tests passing on every schema/RLS change. |
| Documentation readiness | GO | Preview, Supabase, RLS, tester, and production blocker runbooks exist. | Keep docs aligned with env changes. |
| Supabase staging real | NO-GO | `npm run staging:check` returns `BLOCKED_SUPABASE_ACCESS`. | Provide staging Supabase env vars, apply migration, create staging users, and pass live smoke tests. |
| Vercel Preview | NO-GO | Vercel access/env vars and Preview URL are not available in this environment. | Configure Preview env vars and produce a Preview URL with build/browser evidence. |
| First 10 controlled testers | NO-GO | Preview URL and real RLS smoke evidence are missing. | Validate Preview and staging RLS before inviting external testers. |
| First 100 users | NO-GO | First 10 tester gate is not open. | Complete controlled pilot and release review. |
| Production | NO-GO | `npm run production:check` confirms production guard. | Separate production go/no-go after staging gates pass. |
| Payments live | NO-GO | Payment feature flag remains disabled. | Payment provider, legal, support, and staging payment tests. |
| AI agents production | NO-GO | AI feature flag disabled and kill switch required. | Separate security and product review. |

## Checks Recorded

Local checks executed for this gate:

- `npm run secret:scan`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test`: PASS
- `npm run test:rls:static`: PASS
- `npm run build`: PASS
- `npm run production:check`: PASS
- `npm run staging:check`: BLOCKED_SUPABASE_ACCESS
- `npm run rls:smoke`: BLOCKED_SUPABASE_ACCESS
- `git diff --check`: PASS

`BLOCKED_SUPABASE_ACCESS` is not a pass. It is the expected external environment blocker until staging credentials, staging users, migration evidence, and live RLS smoke evidence exist.

## Human Actions Required

Supabase staging:

- Provide a dedicated non-production Supabase Project URL through secure env management.
- Provide a public anon key through secure env management.
- Provide a service role key only in server-side or local secure setup scope.
- Confirm the Supabase project is not production and not an AhorroYA database.
- Provide staging users for client, worker, and admin, or authorize creation through the staging setup script.
- Apply `supabase/migrations/202605120001_expressjobs_mvp_schema.sql` to staging.
- Save evidence that `ej_*` tables exist and RLS is enabled.
- Run and save evidence for `npm run staging:check` and `npm run rls:smoke`.

Vercel Preview:

- Connect the Vercel project to the GitHub repository.
- Configure Preview-only env vars.
- Create or provide a Preview deployment URL for branch `codex/expressjobs-autonomous-bootstrap`.
- Set `ALLOWED_ORIGINS` to the exact Preview origin.
- Save build/deploy evidence.
- Run browser smoke against the Preview URL with no console errors.

Do not place real secret values in documentation, Git history, chat output, screenshots, or client-side environment variables.

## Final Current Gate

`CODE_READY_ENV_PENDING`

`NO-GO_PRODUCTION`
