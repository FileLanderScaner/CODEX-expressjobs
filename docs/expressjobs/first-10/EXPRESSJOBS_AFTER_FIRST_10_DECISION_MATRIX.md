# ExpressJobs After First 10 Decision Matrix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

Passing this matrix does not authorize public production. It only decides whether the next controlled cohort can be prepared.

## GO_TO_25_TESTERS

Proceed to a controlled 25-tester cohort only if all are true:

- 0 P0 issues.
- 0 secret leaks.
- 0 visible live payment paths.
- 0 AI agents production active.
- RLS remains PASS.
- Preview remains PASS.
- At least 7 of 10 testers complete the main assigned task.
- Average satisfaction is at least 4/5.
- No critical onboarding blocker.
- No production system was touched.
- Feedback can be triaged within 24-48 hours.

## FIX_AND_RETEST

Return to fix mode and retest if any are true:

- P1 or P2 issues are present but correctable.
- Onboarding is confusing but not unsafe.
- Minor route errors appear with workarounds.
- Feedback is useful but shows repeated friction.
- Auth or Preview problems affect a minority of testers and can be reproduced.
- Pricing copy causes confusion but no live payment path appears.

## NO-GO

Maintain or escalate NO-GO if any are true:

- Any P0 appears.
- RLS fails.
- Auth fails broadly.
- Preview fails broadly.
- Production is touched.
- A secret appears.
- A live payment path appears.
- AI agents production appears.
- Real personal data is exposed or stored in the repo.
- Unauthorized users can see private messages, audit data, applications, jobs, or reviews.

## Required Inputs For Decision

- Tester completion count.
- Average quantitative feedback score.
- Issue list by severity.
- Auth and Preview access notes.
- RLS smoke result after sessions.
- Confirmation that no production or payments were touched.
- Confirmation that no AI agents production feature was active.

## Decision Record Template

- Date/time: `[YYYY-MM-DD HH:MM TZ]`
- Responsible human: `[RESPONSIBLE_HUMAN_PLACEHOLDER]`
- Decision: `[GO_TO_25_TESTERS / FIX_AND_RETEST / NO-GO]`
- Evidence summary: `[SUMMARY]`
- Highest severity: `[P0 / P1 / P2 / P3 / P4 / NONE]`
- Required follow-up: `[FOLLOW_UP]`
