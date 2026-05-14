# ExpressJobs GitHub Rulesets Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

- `RULESETS_PLAN=READY`
- `RULESETS_APPLIED=false`

## Recommended Ruleset

Target:

- Default branch.
- Release branches if added later.

Rules:

- Require PR.
- Require conversation resolution.
- Require CODEOWNERS review.
- Require checks:
  - `expressjobs-pr-check`
  - `expressjobs-security-gate`
  - `expressjobs-production-no-go`
  - `expressjobs-docs-check`
- Block force push.
- Block deletion.

## Optional Rules

- Require signed commits later.
- Require linear history if branch strategy stays simple.
- Require deployment protection only after production approval exists.

## Not Automated

Rulesets were not applied because `gh` is unavailable and ruleset changes can block the owner if misconfigured.
