# ExpressJobs Dispute And Incident Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Incident Levels

| Level | Examples | Action |
| --- | --- | --- |
| Critical | Safety threat, payment confusion with real money, harassment, illegal work | Stop cohort expansion immediately. |
| High | User cannot complete key flow, privacy concern, severe trust confusion | Fix before next cohort. |
| Medium | Copy confusion, category mismatch, uncertain next step | Add to UX backlog. |
| Low | Polish issue | Batch for later. |

## Response Steps

1. Pause the affected test.
2. Record anonymous tester code, route, role, and issue.
3. Do not collect unnecessary personal data.
4. If content is unsafe, remove or hide it in staging when tooling exists.
5. Update safety copy, rules, or QA checklist.
6. Re-run relevant checks before expanding cohort.

## Escalation

Critical incidents force `NO-GO` for the next cohort until reviewed.
