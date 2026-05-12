# ExpressJobs Payment Readiness

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Current State

Payments are not active. The product only documents monetization.

## Prepared Models

- Suggested 15% commission on completed jobs.
- Featured jobs.
- Worker premium.
- Company plan.

## Blockers Before Live Payments

- Legal/tax model for Uruguay/LATAM.
- Provider selection.
- Refund and dispute policy.
- Webhook signature validation.
- Support process.
- Production security audit.
- Human go/no-go approval.

## Required Flags

- `ENABLE_PAYMENTS=false`
- `ENABLE_AI_AGENTS=false`
- `AI_KILL_SWITCH=true`

Do not add live provider credentials until production gates are explicitly passed.
