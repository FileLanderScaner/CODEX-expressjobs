# ExpressJobs Tester Onboarding Guide

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Access

Use only the approved protected Preview access path provided by the project team. The Preview is staging/preproduction and is not public production.

Do not share the Preview link, credentials, or protected access mechanism outside the approved tester group.

## What To Test

- Home page clarity.
- Sign-in or assigned account access.
- Job creation as a client.
- Open job browsing as a worker.
- Worker application submission.
- Client application review and acceptance.
- Participant messaging if available.
- Pricing page clarity with payments disabled.
- Feedback reporting workflow.

## What Not To Test

- Do not test real payments.
- Do not attempt to bypass access controls.
- Do not invite external users.
- Do not load test or spam job creation.
- Do not attempt production URLs.
- Do not test AI agents.

## Reporting Errors

For every issue, include:

- Route or screen.
- What you expected.
- What happened.
- Browser and device.
- Screenshot only if it contains no private data.
- Severity estimate.
- Whether you can reproduce it.

## Screenshots

Allowed:

- UI bugs without personal information.
- Error states without tokens, credentials, or private data.
- Layout issues.

Prohibited:

- Credentials.
- Protected access links or bypass values.
- Personal data.
- Browser devtools with secrets or headers.
- Anything from production systems.

## Sensitive Data Rules

Use synthetic information only. Do not enter real payment data, government IDs, private addresses, confidential job information, or passwords used elsewhere.

## Payments

Payments are not live. Do not attempt real payments, subscriptions, invoices, or card entry.

## Confidentiality

This is a controlled internal staging pilot. Do not share the link publicly, post screenshots publicly, or invite anyone else.
