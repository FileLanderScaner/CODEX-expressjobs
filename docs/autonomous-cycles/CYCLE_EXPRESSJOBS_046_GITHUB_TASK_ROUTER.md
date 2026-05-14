# Cycle ExpressJobs 046 GitHub Task Router

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Mode

`EXPRESSJOBS_GITHUB_TASK_ROUTER_IMPLEMENTATION`

## Objective

Set up GitHub as the operational task router for ExpressJobs so ideas, bugs, risks, payment work, Auth/RLS work, Preview gates, and production gates flow through issues, labels, PRs, checks, and evidence.

## GitHub CLI

- `GH_CLI=MISSING`
- `GH_AUTH=BLOCKED`
- `REPO=FOUND_FROM_GIT_REMOTE`
- `DEFAULT_BRANCH=UNKNOWN`

No labels or seed issues were created because `gh` is not available in the current shell.

## Created

- Issue templates for feature, bug, security, payment, auth, RLS, release gate, and production gate.
- Pull request template.
- CODEOWNERS.
- Dependabot config.
- GitHub Actions gates:
  - `expressjobs-pr-check`
  - `expressjobs-security-gate`
  - `expressjobs-release-gate`
  - `expressjobs-production-no-go`
  - `expressjobs-docs-check`
- GitHub docs:
  - task router
  - label taxonomy
  - issue routing
  - branch protection plan
  - rulesets plan
  - Project board blueprint
  - seed issue manual commands

## Decision

- `GITHUB_TASK_ROUTER=READY`
- `GITHUB_LABELS=DOCUMENTED`
- `GITHUB_ISSUE_TEMPLATES=READY`
- `GITHUB_PR_TEMPLATE=READY`
- `GITHUB_CODEOWNERS=READY`
- `GITHUB_ACTIONS_GATES=READY`
- `DEPENDABOT=READY`
- `BRANCH_PROTECTION_PLAN=READY`
- `GITHUB_PROJECT_BLUEPRINT=READY`
- `SEED_ISSUES=DOCUMENTED`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Safety

- No production deploy.
- No production promotion.
- No Vercel Production env changes.
- No PayPal live.
- No real payments.
- No real users contacted.
- No secrets printed.
- No RLS relaxation.
- No Supabase remote writes.

## Next Mode

`EXPRESSJOBS_PAYPAL_SANDBOX_SUBSCRIPTION_SMOKE`
