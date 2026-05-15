# ExpressJobs Branch and PR Policy

## Branching

- `main` is protected by process and must represent reviewable stable state only.
- `codex/*` branches are allowed for autonomous or assisted implementation cycles.
- Production deploy branches are not allowed until a human changes `PRODUCTION_STATUS` from `NO-GO_PRODUCTION`.

## Pull requests

All implementation branches should be merged by PR, not directly into `main`.

PRs must include:

- summary
- safety checklist
- required checks
- external checks when applicable
- release decisions
- linked issues

## Required checks before merge

- `npm run secret:scan`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:rls:static`
- `npm run build`
- `npm run production:check`
- `git diff --check`

## External checks when applicable

- `npm run staging:check`
- `npm run rls:smoke`
- `npm run paypal:sandbox:smoke`
- Preview browser smoke

## Hard stop labels

A PR should not merge while any of these apply:

- `status-blocked`
- `risk-production`
- `risk-payment-live`
- `codex-human-gate-required` without explicit approval

## Current hard stop

PR #5 is blocked until issue #10 is fixed and verified.
