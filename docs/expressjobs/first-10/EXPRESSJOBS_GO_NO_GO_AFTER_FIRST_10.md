# ExpressJobs GO/NO-GO After First 10

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Pass To 25 Testers

Move to 25 controlled testers only if:

- At least 8 of 10 testers complete assigned tasks.
- No open P0 issue.
- No unresolved P1 issue in client/worker core flows.
- No sensitive-data incident.
- No payment confusion or live payment path.
- No production confusion.
- RLS and Preview browser smoke remain PASS.
- Feedback identifies clear next improvements rather than fundamental trust failure.

## Return To Fix Mode

Return to fix mode if:

- Any P0 issue appears.
- Two or more testers cannot complete the same core task.
- Auth, job creation, application, or acceptance flow breaks.
- Testers misunderstand staging versus production.
- Testers report trust concerns that block continued testing.
- Browser/device compatibility issue blocks a key group.

## Maintain NO-GO

Maintain NO-GO for broader rollout if:

- Preview access is unstable.
- RLS smoke regresses.
- Protected access is leaked publicly.
- Payments or AI agents appear active in production-like context.
- The team lacks capacity to triage feedback within 24-48 hours.

## Minimum Security Criteria

- No secrets exposed.
- No real payment data collected.
- No production access.
- No unauthorized users.
- No public sharing of protected Preview access.
- No P0/P1 unresolved security issue.

## Minimum UX Criteria

- Testers understand their assigned role.
- Client can create a job.
- Worker can find and apply to a job.
- Client can review applications.
- Error states are understandable.
- Pricing page does not imply live payments.

## Minimum Stability Criteria

- No 5xx route failures in tested paths.
- No critical browser console errors from app code.
- No repeated auth failure for assigned test accounts.
- No broken navigation in assigned flows.

## Production

Production remains:

`NO-GO_PRODUCTION`

Passing the first 10 pilot does not authorize production launch.
