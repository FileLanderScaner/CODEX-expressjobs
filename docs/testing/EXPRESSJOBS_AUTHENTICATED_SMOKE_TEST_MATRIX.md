# ExpressJobs Authenticated Smoke Test Matrix

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Decision

Status: `AUTHENTICATED_E2E_DEFERRED_BY_HUMAN_DECISION`

The real browser E2E with controlled staging accounts is intentionally deferred. PR #51 must not be merged through bypass, admin override, or "Merge without waiting for requirements". The current safe path is to keep improving the product locally and prepare a clean future test handoff.

## Current Account Matrix

| Account type | Availability | Source | Current use |
| --- | --- | --- | --- |
| Client staging | Available | Ignored local env union, values not printed | Covered by `npm run rls:smoke` for authenticated DB flow |
| Worker staging | Available | Ignored local env union, values not printed | Covered by `npm run rls:smoke` for authenticated DB flow |
| Admin staging | Available | Ignored local env union, values not printed | Covered only for audit-table allow/deny smoke |
| Outsider staging | Not available | No dedicated ignored env pair found | Cross-user browser checks remain deferred |

## Covered Without Browser Login

- Client authenticated DB smoke creates a non-production job.
- Worker authenticated DB smoke reads open jobs and creates an application.
- Worker cannot accept own application.
- Client sees applications for own job and accepts one.
- Client assigns accepted worker, completes the job, and creates a review.
- Participant messaging is allowed.
- Normal user cannot read admin audit data.
- Client/worker self-promotion attempts are blocked.

## Deferred Browser E2E

Browser login is deferred because `/auth` uses magic-link email access. Running it end to end requires a controlled inbox or sanitized human evidence. Do not print emails, passwords, cookies, tokens, auth codes, or user IDs.

Future browser E2E should verify:

1. Client logs in through controlled staging email.
2. Client selects role and completes profile.
3. Client publishes `TEST_STAGING_DO_NOT_CONTACT` job data.
4. Worker logs in through controlled staging email.
5. Worker selects role, completes profile, opens the job, and applies.
6. Client sees the application and accepts or rejects it.
7. Worker sees the updated application status.
8. Outsider, if provided, cannot view private participant data.

## Safety Rules

- No production deploys.
- No `vercel --prod`.
- No `vercel promote`.
- No Production env mutation.
- No live payments.
- No real users contacted automatically.
- No secrets or credentials in logs, commits, docs, screenshots, or PR bodies.
- No RLS relaxation.

## Controlled Pilot Link

Use `docs/testing/EXPRESSJOBS_CONTROLLED_STAGING_USER_PILOT_MATRIX.md` for the human pilot plan and `docs/testing/EXPRESSJOBS_CONTROLLED_USER_FEEDBACK_FORM.md` for sanitized feedback capture. Authenticated browser E2E remains deferred until a controlled inbox or sanitized human evidence is available.
