# ExpressJobs Preview Pipeline Last Status

- Date: 2026-05-15T17:56:46.117Z
- Branch: unknown
- Commit SHA: unknown
- Task: not_run_local_setup
- Repo checks: not_run_in_github
- Supabase status: blocked_github_secrets_unverified
- RLS smoke status: blocked_rls_role_escalation_active
- Vercel Preview: blocked_github_secrets_unverified
- Vercel Preview URL: not_created
- Production status: NO-GO_PRODUCTION

## Blockers

- GITHUB_ACTIONS_SECRETS_NOT_VERIFIED_FROM_LOCAL_CODEX
- RLS_ROLE_ESCALATION_RISK_UNTIL_HARDENING_MIGRATION_APPLIED_AND_SMOKE_PASSES

## Next Recommended Action

Configure GitHub Actions secrets, keep Production blocked, then run full_preview manually.
