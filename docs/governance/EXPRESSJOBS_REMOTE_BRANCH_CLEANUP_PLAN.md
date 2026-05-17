# ExpressJobs Remote Branch Cleanup Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

Repository: `FileLanderScaner/CODEX-expressjobs`

Audit date: 2026-05-17

No remote branches were deleted in this cycle.

## A. Safe Candidates - Merged In `main`

These remote branches are already merged into `origin/main` and are candidates for manual cleanup after human confirmation:

- `origin/codex/demo-index-page`
- `origin/codex/demo-landing-examples-clean`
- `origin/codex/google-auth-diagnostics`
- `origin/codex/google-login-error-visibility`
- `origin/codex/home-demo-link`
- `origin/codex/offers-functional-intake`
- `origin/codex/onboarding-auth-offers-flow`
- `origin/codex/sql-migration-hotfix`

Suggested manual command pattern:

```bash
git push origin --delete <branch-name>
```

## B. Review Required - Not Merged In `main`

These branches are not fully merged into `origin/main` and must not be deleted without review:

- `origin/codex/demo-landing-examples-github`
- `origin/codex/expressjobs-autonomous-bootstrap`
- `origin/codex/github-governance-hardening`
- `origin/codex/github-governance-hardening-clean`
- `origin/codex/google-login-visible`
- `origin/codex/real-marketplace-flow-hardening`
- `origin/codex/remove-demos-real-product-flow`

Notes:

- `codex/real-marketplace-flow-hardening` appears superseded by PR #30, but review before deletion.
- `codex/remove-demos-real-product-flow` was merged through PR #30, but remote comparison still reports it as not fully merged because it has a later branch-only commit. Review before deletion.
- `codex/google-login-visible` was merged through PR #31, but remote comparison still reports it as not fully merged because it has branch-only history. Review before deletion.
- Governance branches may contain docs that should be compared against the new governance plan before deletion.

## C. Protected / Keep

- `origin/main`
- `origin/HEAD -> origin/main`
- Any branch with an active PR, if one exists in the future.
- Any branch tied to an active deployment or staging investigation until confirmed obsolete.

## GO/NO-GO

`REMOTE_BRANCH_CLEANUP=PLAN_READY_MANUAL`

Production remains `NO-GO_PRODUCTION`.
