# ExpressJobs GitHub Branch Protection Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

Repository: `FileLanderScaner/CODEX-expressjobs`

Branch: `main`

Audit date: 2026-05-17

## Current State

`main` is not protected. GitHub returned:

`Branch not protected`

The repository currently allows merge commits, squash merges, and rebase merges. Automatic branch deletion after merge is disabled.

No branch protection settings were changed in this cycle because `EXPRESSJOBS_GITHUB_GOVERNANCE_WRITE_ALLOWED=true` was not present.

## Required Protection Rules

Recommended rules for `main`:

- Require a pull request before merging.
- Require status checks before merging.
- Require branches to be up to date before merging if it does not block urgent security fixes.
- Require conversation resolution before merging.
- Block force pushes.
- Block branch deletion.
- Restrict direct pushes to trusted maintainers only.
- Prefer squash merge or linear history for routine work.
- Keep production deployment approval as a separate human gate.

## Required Checks

Minimum required checks:

- `production-no-go`
- `security-gate`
- `pr-check`
- `Vercel`
- `Supabase Preview`

Optional but recommended if exposed as checks:

- `docs-check`
- staging check
- RLS smoke

## Suggested Apply Command

Do not run this automatically. Run only after explicit human approval.

```bash
gh api repos/FileLanderScaner/CODEX-expressjobs/branches/main/protection \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -f required_status_checks.strict=true \
  -f enforce_admins=true \
  -f required_pull_request_reviews.dismiss_stale_reviews=true \
  -f required_pull_request_reviews.required_approving_review_count=1 \
  -f restrictions= \
  -f required_conversation_resolution=true
```

GitHub's branch protection REST shape is strict for nested objects. Before applying, validate the final payload in a dry run or use the GitHub UI for the first setup.

## GO/NO-GO

`GITHUB_BRANCH_PROTECTION=PLAN_READY`

Production remains `NO-GO_PRODUCTION`.
