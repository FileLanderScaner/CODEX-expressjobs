# Cycle ExpressJobs 034 First 10 Execution Dry Run

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Modo ejecutado

`EXPRESSJOBS_FIRST_10_TESTERS_EXECUTION_DRY_RUN`

## Checks

- `git branch --show-current`: PASS (`codex/expressjobs-autonomous-bootstrap`)
- `git status --short`: PASS, clean before dry-run docs
- `npm run secret:scan`: PASS
- `npm run staging:check`: PASS
- `npm run test:rls:static`: PASS
- `npm run rls:smoke`: PASS (`EXPRESSJOBS_RLS_STAGING_PASS`)
- `npm run production:check`: PASS (`PRODUCTION_STATUS=NO-GO_PRODUCTION`)
- `git diff --check`: PASS

## Matriz de testers ficticios

All entries below are `SIMULATED_DRY_RUN_DATA`. No real person, email, phone, or private identifier was used.

| Tester code | Placeholder name | Role | Device | Browser | Assigned focus |
| --- | --- | --- | --- | --- | --- |
| T-C01 | Tester Client 01 | client | Desktop | Chrome | Landing, auth, create job |
| T-C02 | Tester Client 02 | client | Mobile | Chrome | Client job form |
| T-C03 | Tester Client 03 | client | Desktop | Edge | Pricing clarity |
| T-C04 | Tester Client 04 | client | Mobile | Safari | Client dashboard scan |
| T-W01 | Tester Worker 01 | worker | Desktop | Chrome | Open jobs list |
| T-W02 | Tester Worker 02 | worker | Mobile | Chrome | Worker jobs route |
| T-W03 | Tester Worker 03 | worker | Desktop | Firefox | Application flow |
| T-W04 | Tester Worker 04 | worker | Mobile | Edge | Navigation and auth redirect |
| T-A01 | Tester Admin 01 | admin/observer | Desktop | Chrome | Safety and claims review |
| T-M01 | Tester Mixed Observer 01 | mixed observer | Desktop | Edge | End-to-end notes and triage |

## Tareas simuladas

### Client

- Open protected Preview through the approved access path.
- Review `/` for staging-safe copy and value proposition.
- Open `/auth` without using real personal data.
- Walk through a fictitious job creation flow at `/client/jobs/new`.
- Review `/pricing` and confirm no live payment path is requested.
- Submit feedback using only placeholder details.

### Worker

- Open protected Preview through the approved access path.
- Review `/jobs/open` and `/worker/jobs`.
- Simulate a worker application if the flow allows it.
- Confirm no worker can accept or reject their own application.
- Report friction with route, expected result, actual result, device, and browser.

### Admin/observer

- Confirm no public production claim appears in the tested scope.
- Confirm no live payments are visible.
- Confirm no AI agents production claim or activation appears.
- Confirm no protected access value, credential, or token is captured.
- Classify simulated findings in the triage board.

## Feedback simulado

All feedback below is `SIMULATED_DRY_RUN_DATA`.

### Positive comments

- The route list gives testers a clear sequence and avoids random exploration.
- The onboarding guide clearly warns that Preview is staging and not public production.
- The feedback form asks for enough debugging context without asking for private data.

### UX frictions

- Some testers may need a shorter one-page task checklist before starting.
- The distinction between client and worker roles may need a visual cue in the invite message.
- Mobile testers may need explicit instruction to include browser version when reporting issues.

### Simulated bugs

- `SIM-BUG-001`: Tester cannot tell whether auth route is a mock, redirect, or assigned-account flow.
- `SIM-BUG-002`: Client job creation task may be too broad if no exact sample job payload is provided.
- `SIM-BUG-003`: Observer needs a clearer rule for when pricing confusion becomes a P1 versus P2.

### Frequent questions

- "Can I use my real phone number?" Answer: no, use placeholders or assigned synthetic data only.
- "Can I send the link to another friend?" Answer: no, only approved internal testers.

### Suggested improvements

- Add a one-page session script with exact start and stop points per role.
- Add synthetic job examples so testers do not invent sensitive or personal scenarios.

## Bug triage simulado

All bug cards below are `SIMULATED_DRY_RUN_DATA` and do not represent observed production or Preview defects.

| ID | Severity | Status | Route | Role | Summary | Dry-run decision |
| --- | --- | --- | --- | --- | --- | --- |
| SIM-P0-001 | P0 blocker | Closed | N/A | observer | Placeholder for any secret leak, production touch, or live payment exposure | No real P0 observed in dry-run |
| SIM-P1-001 | P1 critical | Repro Needed | `/auth` | client/worker | Assigned-account confusion could block login if instructions are unclear | Add dry-run script before real contact |
| SIM-P2-001 | P2 major | New | `/client/jobs/new` | client | Sample job data is not prescribed enough for consistent feedback | Add synthetic payload examples |
| SIM-P3-001 | P3 minor | New | `/pricing` | client | Testers may ask whether listed prices are live | Keep payment-off warning in onboarding |
| SIM-P4-001 | P4 polish | New | feedback workflow | all | Feedback form could be easier to copy into a single message | Optional template refinement |

## GO/NO-GO simulado hacia 25 testers

`GO_TO_25_TESTERS=NOT_AUTHORIZED_FROM_DRY_RUN_ONLY`

The dry-run supports moving to real internal contact only after human approval. Expansion to 25 testers requires real First 10 results.

Simulated 25-tester gate:

- `0 P0`: PASS in dry-run data.
- `maximum 1 P1 corrected or mitigated`: PASS if the account-flow script is added before contact.
- `RLS smoke still PASS`: PASS.
- `Preview smoke still PASS`: PASS from prior protected Preview browser smoke.
- `no secrets`: PASS.
- `no live payment claims`: PASS.
- `no AI agents production`: PASS.
- `onboarding understood by fictitious testers`: PASS with suggested one-page script.

## Riesgos restantes

- Real testers may still share the protected Preview link despite instructions.
- Real feedback may include personal data if the intake form is not moderated.
- Preview access can still fail for a tester due to browser/session differences.
- Security Advisor recheck remains pending or not rechecked after `SEARCH_PATH_FIX=APPLIED`.
- Dry-run data cannot replace actual tester behavior.

## Decision

- `DRY_RUN_STATUS=PASS`
- `TESTERS_REAL_CONTACTED=false`
- `REAL_PERSONAL_DATA_USED=false`
- `REAL_TESTER_CONTACT=READY_FOR_HUMAN_APPROVAL`
- `FIRST_10_TESTERS=GO_CONTROLLED_INTERNAL_ONLY`
- `SEARCH_PATH_FIX=APPLIED`
- `SECURITY_ADVISOR_RECHECK=PENDING_OR_NOT_RECHECKED`
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Proximo modo seguro

`EXPRESSJOBS_FIRST_10_REAL_INTERNAL_CONTACT_PACKAGE`

Do not contact real testers automatically. Prepare a human-approved contact package and runbook only.
