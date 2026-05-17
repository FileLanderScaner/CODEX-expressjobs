# ExpressJobs Repository Settings Recommendations

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

Repository: `FileLanderScaner/CODEX-expressjobs`

Audit date: 2026-05-17

## Current GitHub Settings

Read-only audit result:

- `default_branch`: `main`
- `private`: `false`
- `archived`: `false`
- `disabled`: `false`
- `allow_merge_commit`: `true`
- `allow_squash_merge`: `true`
- `allow_rebase_merge`: `true`
- `delete_branch_on_merge`: `false`

No repository settings were changed in this cycle because `EXPRESSJOBS_GITHUB_GOVERNANCE_WRITE_ALLOWED=true` was not present.

## Findings

`delete_branch_on_merge=false` is causing stale branch accumulation. This increases PR triage noise and makes it easier to accidentally revive obsolete work.

The file `.github/FUNDIN.yml` was present but GitHub expects `.github/FUNDING.yml`. It contained only placeholder funding template values, so it was removed rather than renamed.

## Recommendations

- Enable automatic branch deletion after merge.
- Keep PR workflow mandatory through branch protection.
- Prefer squash merge for feature branches once branch protection is active.
- Leave production deploy approval outside automatic merge rules.

## Suggested Apply Command

Do not run this automatically. Run only after explicit human approval.

```bash
gh api repos/FileLanderScaner/CODEX-expressjobs \
  -X PATCH \
  -f delete_branch_on_merge=true
```

Optional merge-strategy hardening after team agreement:

```bash
gh api repos/FileLanderScaner/CODEX-expressjobs \
  -X PATCH \
  -f allow_squash_merge=true \
  -f allow_merge_commit=false \
  -f allow_rebase_merge=false
```

## GO/NO-GO

`DELETE_BRANCH_ON_MERGE=PLAN_READY`

Production remains `NO-GO_PRODUCTION`.
