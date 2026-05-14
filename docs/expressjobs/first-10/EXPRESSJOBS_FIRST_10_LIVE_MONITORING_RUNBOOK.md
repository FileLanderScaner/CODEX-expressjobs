# ExpressJobs First 10 Live Monitoring Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## What To Monitor

- Preview access works for the tester.
- Auth flow works for the assigned role.
- Client and worker routes load without 5xx errors.
- RLS behavior remains consistent with expected role boundaries.
- No live payment path appears.
- No AI agents production feature appears.
- Tester understands staging versus production.
- Tester does not enter sensitive data.

## Per-session Checklist

- [ ] Placeholder tester ID assigned.
- [ ] Role assigned.
- [ ] Session start time recorded.
- [ ] Protected Preview access confirmed.
- [ ] Tester reminded not to share link.
- [ ] Tester reminded not to enter sensitive data.
- [ ] Tester reminded not to test payments.
- [ ] Main task completed, partially completed, or blocked.
- [ ] Feedback captured.
- [ ] Maximum severity classified.
- [ ] Session closed.

## Critical Errors

Treat these as `P0 blocker` until proven otherwise:

- Secret, token, or bypass value exposed.
- Production touched or reached by mistake.
- Live payment path visible or usable.
- AI agents production active.
- Unauthorized data visible.
- Private message visible to a non-participant.
- Audit table visible to normal user.
- RLS smoke regression.

## Abandonment Signals

- Tester cannot access Preview after one retry.
- Tester cannot understand assigned role.
- Tester cannot find the first task.
- Tester repeatedly asks if this is production.
- Tester is uncomfortable continuing.
- Tester is about to enter sensitive data.

## UX Confusion Signals

- Tester mixes client and worker roles.
- Tester cannot identify the next action.
- Tester misunderstands pricing as live payment.
- Tester cannot tell whether the account step succeeded.
- Tester submits feedback without route or device.

## Auth Problems

- Record route, role, browser, and non-sensitive visible error.
- Do not request real passwords.
- Retry once.
- If unresolved, stop role task and mark `AUTH_BLOCKED`.

## RLS Problems

- Stop immediately if a user can see or change data outside their expected role.
- Record only non-sensitive evidence.
- Mark as `P0 blocker` until investigated.
- Do not relax RLS policies during the live tester session.

## Performance Problems

- Record route, device, browser, and approximate wait time.
- Mark repeated route timeouts as `P1 critical`.
- Mark isolated slow screens as `P2 major` or `P3 minor` depending on task impact.

## Evidence Rules

- Use screenshots only when they contain no personal data, credentials, headers, tokens, or protected access URLs.
- Redact tester-provided private content.
- Store only placeholder tester IDs in repo docs.
- Keep raw personal feedback outside git if it contains private details.

## Closing The Session

1. Confirm the tester finished or stopped safely.
2. Ask the tester to complete `[FORMULARIO_FEEDBACK]`.
3. Confirm no additional people were invited.
4. Classify maximum severity.
5. Move issues into the triage board.
6. Decide whether immediate stop conditions were triggered.
