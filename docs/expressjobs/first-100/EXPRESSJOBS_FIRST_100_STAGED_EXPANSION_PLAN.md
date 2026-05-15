# ExpressJobs First 100 Staged Expansion Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Status

`FIRST_100_USERS_PREP=READY_PLAN_ONLY`

This plan prepares staged expansion only. It does not contact users, does not open production, does not activate live payments, and does not approve paid pilot.

## Current Gate

- First 10 controlled internal testers: `GO_CONTROLLED_INTERNAL_ONLY`
- First 25 testers: `NO-GO_UNTIL_FIRST_10_RESULTS_AND_RETEST`
- First 50 testers: `NO-GO_UNTIL_FIRST_25_PASS`
- First 100 testers: `NO-GO_UNTIL_FIRST_50_PASS`
- Production: `NO-GO_PRODUCTION`

## Expansion Ladder

| Cohort | Status | Entry criteria | Exit criteria |
| --- | --- | --- | --- |
| First 10 | `GO_CONTROLLED_INTERNAL_ONLY` | Security audit pass, RLS pass, Preview pass, human manual approval. | 0 P0, no secrets, no production, at least 7/10 complete primary task. |
| First 25 | `NO-GO` | First 10 evidence reviewed and retest pass. | 0 P0, max 1 mitigated P1, satisfaction average >= 4/5. |
| First 50 | `NO-GO` | First 25 pass and support load acceptable. | Marketplace balance visible and no critical trust/safety incidents. |
| First 100 | `NO-GO` | First 50 pass and monitoring/triage operating smoothly. | Decide production-readiness path, still no automatic production. |

## Role Mix

- Clients: 40%
- Workers: 45%
- Admin/observer/support: 5%
- Mixed evaluators: 10%

## Required Evidence Before First 25

- First 10 feedback summary.
- Bug triage board updated.
- Retest evidence for P0/P1 fixes.
- Security audit remains valid.
- `npm run secret:scan` pass.
- `npm run rls:smoke` pass.
- Preview smoke pass.

## Stop Conditions

- Any P0 safety, privacy, Auth, RLS, or payment issue.
- Any secret exposure.
- Any production deployment requirement.
- Any live payment setting.
- Any confusing claim that implies guaranteed jobs, guaranteed income, or public production.
