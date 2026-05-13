# ExpressJobs First 100 Users Prep

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Scope

Prepare a controlled, non-production first-user launch package. No real outreach is executed from this repo. No guaranteed employment or guaranteed income claims are allowed.

## Target Segments

- Clients in Montevideo who need quick local tasks.
- Local workers with existing skills or informal service experience.
- Small shops and neighborhood businesses.
- People who do changas/oficios.
- Students looking for extra income opportunities.
- Neighborhood entrepreneurs.

## Rollout Stages

### First 10 Testers

Goal: validate comprehension, onboarding, trust, and one controlled client-worker flow.

- 5 potential clients.
- 4 potential workers.
- 1 small business or neighborhood entrepreneur.
- Manual observation, no paid acquisition.
- Use demo/staging only until Supabase and Vercel are unlocked.

Success criteria:

- 10 testers complete onboarding.
- At least 3 jobs are published.
- At least 5 applications are created.
- At least 1 client-worker flow is simulated or controlled end-to-end.
- Feedback from at least 5 users.
- 0 critical trust/safety incidents.

### First 25 Users

Goal: test repeatability across roles.

- 10 clients.
- 10 workers.
- 5 small shops, students, or entrepreneurs.
- Validate WhatsApp sharing and job detail comprehension.
- Identify top 3 job categories.

### First 50 Users

Goal: test marketplace balance.

- Keep client-worker ratio near 40/60.
- Track application rate per open job.
- Run short interviews after completed or abandoned flows.
- Add trust/safety objections to the risk register.

### First 100 Users

Goal: decide whether the MVP is ready for broader local launch.

- Require staging Auth/RLS/Preview validation before any public push.
- Measure signup, job creation, application, message, completion, and review funnel.
- Keep payments disabled.
- Keep support/manual review active.

## 7-Day Plan

| Day | Focus | Output |
| --- | --- | --- |
| 1 | Internal pilot | Confirm landing, onboarding, job detail, worker flow, admin read-only view. |
| 2 | 3 clients | Observe whether clients understand job creation and trust boundaries. |
| 3 | 3 workers | Observe worker profile, job browsing, and application comprehension. |
| 4 | Publish/apply test | Simulate or run one controlled postulation flow. |
| 5 | Short interviews | Collect objections, confusing labels, and safety concerns. |
| 6 | UX/docs adjustments | Update copy, checklist, FAQ, and onboarding notes. |
| 7 | GO/NO-GO for 25 | Decide whether to expand to 25 users. |

## 30-Day Plan

| Week | Focus | Targets |
| --- | --- | --- |
| 1 | First 10 testers | Onboarding, job/apply flow, feedback. |
| 2 | First 25 users | Role balance, trust objections, top categories. |
| 3 | First 50 users | Completion/review loop, WhatsApp sharing, support load. |
| 4 | First 100 readiness | Metrics review, safety review, monetization learning without live payments. |

## Unlock Dependencies

- Supabase staging project.
- Live RLS smoke tests.
- Vercel Preview deploy.
- Auth and chat verification.

## Decision Gates

- Expand from 10 to 25 only if users understand the product.
- Expand from 25 to 50 only if job/application mechanics work.
- Expand from 50 to 100 only if trust concerns are manageable.
- Do not go production until release gate changes from `NO-GO_PRODUCTION`.
