# ExpressJobs First 100 GO/NO-GO Matrix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## First 25

`FIRST_25_TESTERS=NO-GO_UNTIL_FIRST_10_RESULTS_AND_RETEST`

GO only if:

- First 10 completes with at least 7/10 primary task completion.
- 0 P0 issues.
- Any P1 issue is fixed or explicitly mitigated.
- RLS and Preview smoke remain pass.
- No secrets, live payments, production deploy, or AI agents production.

## First 50

`FIRST_50_TESTERS=NO-GO_UNTIL_FIRST_25_PASS`

GO only if:

- First 25 completion and feedback thresholds pass.
- Support load is manageable.
- Client/worker balance is usable.
- Trust objections are understood and documented.

## First 100

`FIRST_100_TESTERS=NO-GO_UNTIL_FIRST_50_PASS`

GO only if:

- First 50 passes with no critical safety incidents.
- Onboarding and task flows are repeatable.
- Observability and triage routines are operating.
- Paid pilot remains clearly separated from free staging tests.

## Production

`PRODUCTION=NO-GO_PRODUCTION`

Production remains blocked until a separate production launch gate passes with explicit human approval.
