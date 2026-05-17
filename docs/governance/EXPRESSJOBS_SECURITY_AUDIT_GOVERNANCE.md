# ExpressJobs Security Audit Governance

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Summary

Mode: `EXPRESSJOBS_SECURITY_AUDIT_GOVERNANCE`

Date: 2026-05-17

Repository: `FileLanderScaner/CODEX-expressjobs`

Audit branch: `codex/expressjobs-security-audit-governance`

Base branch: `main`

Base commit: `e90db33 Keep Google login visible on auth page`

Pull request: `https://github.com/FileLanderScaner/CODEX-expressjobs/pull/32`

## Main State

- Local `main` was clean and synchronized with `origin/main`.
- No open PRs were found.
- PR #30 and PR #31 are merged.
- Issue #16 was audited, commented, and closed as `not planned` because its public demo objective was superseded by the merged no-demo product direction.

## GitHub Findings

- `main` is not protected. GitHub returned `Branch not protected`.
- `delete_branch_on_merge=false`.
- Repository is public and active.
- Merge commit, squash merge, and rebase merge are all enabled.
- Recent checks for `e90db33` are successful:
  - `Vercel`: success
  - `Supabase Preview`: success
  - `production-no-go`: success

## Vercel Findings

Read-only Vercel inspection found recent Production deployments for project `codex-expressjobs`.

Recent deployments included:

| Deployment | Target | Status | Created |
| --- | --- | --- | --- |
| `https://codex-expressjobs-3pauph0dx-akuma424-projects.vercel.app` | production | Ready | 2026-05-16 22:48:25 -0300 |
| `https://codex-expressjobs-o2t4nmkrk-akuma424-projects.vercel.app` | production | Ready | 2026-05-16 20:41:08 -0300 |
| `https://codex-expressjobs-ervp21yn3-akuma424-projects.vercel.app` | production | Ready | 2026-05-16 20:34:26 -0300 |
| `https://codex-expressjobs-jossgjn0n-akuma424-projects.vercel.app` | production | Ready | 2026-05-16 18:19:07 -0300 |
| `https://codex-expressjobs-l7onmioxe-akuma424-projects.vercel.app` | preview | Ready | 2026-05-16 22:22:07 -0300 |

The latest inspected production deployment has aliases:

- `https://codex-expressjobs.vercel.app`
- `https://codex-expressjobs-akuma424-projects.vercel.app`
- `https://codex-expressjobs-git-main-akuma424-projects.vercel.app`

No deployment was created, promoted, removed, or modified in this cycle.

`VERCEL_PRODUCTION_DEPLOYMENT_RISK=FOUND`

## Supabase / RLS State

- `npm run staging:check`: PASS.
- `npm run rls:smoke`: PASS (`EXPRESSJOBS_RLS_STAGING_PASS`).
- No Supabase production action was performed.
- No remote migration was applied in this cycle.

## Actions Taken

- Removed `.github/FUNDIN.yml` because it was a typo file with only placeholder funding template values.
- Created `docs/governance/EXPRESSJOBS_GITHUB_BRANCH_PROTECTION_PLAN.md`.
- Created `docs/governance/EXPRESSJOBS_REPO_SETTINGS_RECOMMENDATIONS.md`.
- Created `docs/governance/EXPRESSJOBS_REMOTE_BRANCH_CLEANUP_PLAN.md`.
- Created `docs/governance/EXPRESSJOBS_SECURITY_AUDIT_GOVERNANCE_STATUS.json`.
- Commented on and closed issue #16 as superseded/not planned.

## Actions Not Taken For Safety

- Did not enable branch protection because `EXPRESSJOBS_GITHUB_GOVERNANCE_WRITE_ALLOWED=true` was not present.
- Did not change `delete_branch_on_merge`.
- Did not delete remote branches.
- Did not deploy to Vercel.
- Did not promote deployments.
- Did not delete deployments.
- Did not modify Vercel Production env vars.
- Did not touch Supabase production.
- Did not activate PayPal live or real payments.
- Did not print secrets.

## Risks

- `VERCEL_PRODUCTION_DEPLOYMENT_RISK=FOUND`: Vercel has Ready Production deployments and aliases for `codex-expressjobs`.
- `GITHUB_BRANCH_PROTECTION=PLAN_READY`: `main` is currently unprotected.
- `DELETE_BRANCH_ON_MERGE=PLAN_READY`: merged branches are not automatically deleted.
- `REMOTE_BRANCH_CLEANUP=PLAN_READY_MANUAL`: stale remote branches remain.

## PR Remote Checks

Latest observed PR check state for #32:

- `pr-check`: success.
- `security-gate`: success.
- `production-no-go`: success.
- `docs-check`: success.
- `Supabase Preview`: success.
- `Vercel`: success.

An intermediate Vercel Preview deployment failed during status documentation, but the latest observed PR HEAD returned Vercel success. No Vercel deploy, promote, deletion, or Production env mutation was performed manually.

## Recommendations

1. Human owner should confirm whether the current Vercel Production deployment must remain active while product status is `NO-GO_PRODUCTION`.
2. Enable `main` branch protection with required checks before further production-adjacent work.
3. Enable `delete_branch_on_merge=true`.
4. Manually clean merged stale remote branches after review.
5. Keep production public launch blocked until an explicit release gate passes.

## GO/NO-GO

- `CODE_STATUS=PASS`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`
- `GITHUB_BRANCH_PROTECTION=PLAN_READY`
- `DELETE_BRANCH_ON_MERGE=PLAN_READY`
- `REMOTE_BRANCH_CLEANUP=PLAN_READY_MANUAL`
- `VERCEL_PRODUCTION_DEPLOYMENT_RISK=FOUND`
- `SECURITY_AUDIT_GOVERNANCE=BLOCKED_BY_PRODUCTION_DEPLOYMENT_RISK`
- `PR_32_REMOTE_CHECKS=PASS`
