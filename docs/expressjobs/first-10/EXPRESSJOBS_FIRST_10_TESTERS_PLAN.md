# ExpressJobs First 10 Testers Plan

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Objective

Run a controlled internal pilot with up to 10 trusted testers to validate the Trabajos Rapidos staging Preview before any public launch.

## Scope

This pilot is limited to the protected Vercel Preview and Supabase staging data. It is not production, not public, and not a payment test.

## Tester Profiles

- 4 client-role testers who create realistic local job requests.
- 4 worker-role testers who browse open jobs and submit applications.
- 1 admin/observer who checks audit visibility and triage flow.
- 1 backup tester for either client or worker flow.

## Roles

- `client`: creates jobs, reviews applications, accepts a worker, completes a job, leaves a review.
- `worker`: reviews open jobs, submits applications, sends participant messages after acceptance.
- `admin/observer`: observes issues, verifies admin-only surfaces, keeps the pilot inside scope.

## Selection Criteria

- Trusted internal or close-contact testers only.
- Comfortable using a staging/preproduction product.
- Willing to report bugs with route, device, browser, and severity.
- No need to enter real private documents, payment cards, or sensitive personal data.
- Able to complete one 30-45 minute session.

## Routes To Test

- `/`
- `/auth`
- `/jobs/open`
- `/pricing`
- `/client/jobs/new`
- `/worker/jobs`
- `/dashboard/client`
- `/dashboard/worker`

## Client Flow

1. Open the protected Preview through the approved access path.
2. Start from `/auth` or the home page.
3. Use staging credentials or the assigned test account.
4. Create a job with synthetic but realistic details.
5. Review worker applications.
6. Accept one application.
7. Send a participant message if available.
8. Mark the job complete if the flow allows it.
9. Leave a review.
10. Submit feedback.

## Worker Flow

1. Open the protected Preview through the approved access path.
2. Sign in with the assigned worker test account.
3. Browse `/jobs/open`.
4. Open a job detail page.
5. Submit an application with a synthetic proposal.
6. Confirm the worker cannot accept or reject their own application.
7. After acceptance, verify participant-only messaging if available.
8. Submit feedback.

## Admin/Observer Flow

1. Confirm testers are using only staging Preview.
2. Confirm no one enters sensitive personal data.
3. Observe `/admin` or assigned admin surfaces.
4. Track issues in the triage board.
5. Classify severity.
6. Decide whether the pilot can advance to 25 testers.

## Risks

- Testers may confuse Preview with production.
- Testers may share protected links publicly.
- Testers may enter personal data unnecessarily.
- Vercel protected access can expire or be misused.
- Staging data may need cleanup after sessions.
- UX issues may hide RLS or auth problems.

## Data Not To Enter

- Real payment card data.
- Government IDs.
- Home addresses beyond synthetic neighborhood text.
- Private phone numbers unless explicitly assigned test numbers.
- Passwords reused from real accounts.
- Medical, financial, legal, or employment-sensitive records.
- Production business data.

## Confidentiality Rules

- Do not share the Preview link publicly.
- Do not post screenshots publicly.
- Do not share credentials or bypass access.
- Do not invite extra testers without approval.
- Report issues through the approved feedback form only.

## Recommended Duration

- Session length: 30-45 minutes per tester.
- Pilot window: 2-3 days.
- Review window: 24 hours after the final session.

## Success Criteria

- At least 8 of 10 testers complete their assigned task.
- No P0 blocker or unresolved P1 critical issue remains.
- No production, payment, or sensitive-data incident occurs.
- Client and worker flows are understandable without live support.
- Feedback is sufficient to prioritize the next fix cycle.
