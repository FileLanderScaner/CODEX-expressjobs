# ExpressJobs First 100 Cohort Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Purpose

Give the operator a controlled way to run cohorts without Codex contacting users or handling personal data.

## Before Each Cohort

- Confirm current cohort gate.
- Confirm Preview URL without bypass token in docs.
- Confirm no live payments.
- Confirm no production deploy.
- Confirm no AI agents production.
- Confirm no sensitive personal data requested.
- Confirm feedback form and triage board are ready.

## During Sessions

- Use placeholders in shared docs.
- Do not request unnecessary identity documents, payment cards, bank info, or private addresses.
- Ask testers to use staging-safe examples.
- Record only issue category, route, device/browser, severity, and task outcome.

## After Sessions

- Summarize feedback.
- Classify bugs by severity.
- Retest fixes before expansion.
- Update GO/NO-GO matrix.
- Keep production blocked unless a separate production gate passes.

## Cohort Decisions

- Advance only with evidence.
- Hold if feedback is inconclusive.
- Return to fix mode for P0/P1 issues.
- Never treat paid pilot readiness as production readiness.
