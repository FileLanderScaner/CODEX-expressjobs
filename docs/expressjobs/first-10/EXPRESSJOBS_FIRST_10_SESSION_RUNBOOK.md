# ExpressJobs First 10 Session Runbook

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Preparation Before The Session

1. Confirm `RLS_REAL_SMOKE_STATUS=PASS`.
2. Confirm `PREVIEW_BROWSER_SMOKE=PASS`.
3. Confirm `PRODUCTION_STATUS=NO-GO_PRODUCTION`.
4. Confirm `PAYMENTS_LIVE=OFF`.
5. Confirm `AI_AGENTS_PRODUCTION=OFF`.
6. Prepare the tester's role-specific task list.
7. Prepare the feedback form and triage board.
8. Confirm the tester understands this is staging/preproduction.

## Sharing Protected Preview Access

- Share only the approved protected Preview access path manually.
- Do not paste or save any bypass secret.
- Do not create URLs that include `x-vercel-protection-bypass`.
- Do not post Preview access in public channels.
- If a protected access value must be used, keep it outside git and outside screenshots.

## What To Say To The Tester

Use this framing:

> This is a controlled internal staging test of Trabajos Rapidos. It is not public production. Please use only synthetic data, do not enter payment information, do not share the link, and report anything confusing or broken with the route, device, browser, and what happened.

## Client Tasks

- Open the protected Preview.
- Review `/` and `/auth`.
- Use the assigned test flow.
- Create a fictitious job through `/client/jobs/new`.
- Review `/pricing` without attempting payment.
- Submit feedback.

## Worker Tasks

- Open the protected Preview.
- Review `/jobs/open`.
- Review `/worker/jobs`.
- Simulate applying to a job if available.
- Confirm the worker cannot accept or reject their own application.
- Submit feedback.

## Admin/Observer Tasks

- Confirm testers stay inside staging.
- Watch for production confusion.
- Watch for live payment claims.
- Watch for AI agents production claims.
- Classify issues by severity.
- Confirm no sensitive data is captured.

## Observing The Session

- Record only tester ID placeholder, role, route, device, browser, and issue summary.
- Do not record real private contact details.
- Do not capture credentials, headers, bypass values, or personal data.
- Mark whether the assigned task was completed.

## Registering Problems

For each issue, capture:

- Placeholder tester ID.
- Route or screen.
- Assigned role.
- Steps to reproduce.
- Expected result.
- Actual result.
- Severity.
- Screenshot status, only if safe.

## When To Stop The Test

Stop immediately if:

- A secret or protected access value is exposed.
- A tester reaches production by mistake.
- Live payment collection appears.
- AI agents production appears active.
- A tester enters sensitive personal data.
- RLS, Auth, or Preview access fails in a way that blocks the session.

## Severity Criteria

- `P0 blocker`: security risk, secret exposure, production touch, live payment, sensitive data incident, or core app unusable.
- `P1 critical`: Auth, Preview, RLS, client, or worker core path blocks without workaround.
- `P2 major`: important role flow degraded with workaround.
- `P3 minor`: isolated issue, non-critical copy, or small UX confusion.
- `P4 polish`: spacing, labels, visual polish, or nice-to-have improvement.

## If 401 Appears

- Confirm the tester is using the approved protected Preview access path.
- Do not paste bypass values into screenshots or docs.
- Retry once in a clean browser session.
- If still blocked, stop that tester session and mark `PREVIEW_ACCESS_BLOCKED_401`.

## If Auth Fails

- Confirm the tester is using the assigned staging role flow.
- Do not ask for real passwords or reused credentials.
- Retry once.
- If still blocked, mark `AUTH_BLOCKED` and stop the role task.

## If Supabase Error Appears

- Record route, action, and non-sensitive error summary.
- Do not expose request headers, tokens, or raw secrets.
- Stop if the error suggests RLS regression, data leakage, or unauthorized access.

## If Tester Uses Sensitive Data

- Stop the session.
- Ask the tester not to continue with that data.
- Record `SENSITIVE_DATA_ATTEMPTED` without storing the actual data.
- Decide whether staging cleanup is required.

## If Tester Asks About Real Payments

- Say payments are not live and must not be tested.
- Do not request card details.
- Mark any payment confusion as at least `P3`, or `P0` if a live payment path appears.
