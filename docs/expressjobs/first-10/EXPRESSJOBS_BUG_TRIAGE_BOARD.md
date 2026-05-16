# ExpressJobs Bug Triage Board

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Columns

- `New`
- `Repro Needed`
- `Confirmed`
- `In Progress`
- `Fixed`
- `Retest`
- `Closed`
- `Won't Fix`

## Severities

- `P0 blocker`: security risk, data leak, production confusion, or core app unusable.
- `P1 critical`: client or worker core path fails with no reasonable workaround.
- `P2 major`: important flow degraded but workaround exists.
- `P3 minor`: isolated issue or small UX defect.
- `P4 polish`: copy, alignment, visual polish, or non-blocking improvement.

## Bug Card Template

- ID:
- Title:
- Severity:
- Status:
- Route:
- Role:
- Device/browser:
- Steps to reproduce:
- Expected:
- Actual:
- Evidence:
- Owner:
- Fix link:
- Retest notes:

## Triage Rules

- P0 blocks all tester expansion.
- P1 blocks moving to 25 testers unless explicitly accepted by the project owner.
- P2 must be reviewed before expansion.
- P3/P4 can be batched if no safety or trust issue exists.
- Any issue involving sensitive data, credentials, payments, or production confusion escalates to P0 until proven otherwise.
